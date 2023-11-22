import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import * as Yup from 'yup'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import InputCheck from '../../../components/input/InputCheckRounded'
import Select from '../../../components/select/select'
import Input from '../../../components/input'
import ErrorMessage from '../../../components/error/ErrorMessage'
import Button from '../../../components/button/Button'
import request from '../../../app/axios'
import {BranchItem, DataResponse, RoleInfo, TableConfig, UserInfo} from '../../../app/types/common'
import {useAuth} from '../../../app/context/AuthContext'
import {useFormik} from 'formik'
import {swalToast} from '../../../app/swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../app/constants/error-message'
import {convertErrorMessageResponse} from 'src/app/utils'
import {CREATE_USER_TAB} from 'src/app/constants/common'

type Props = {
  config?: TableConfig
  data?: UserInfo
  show: boolean
  onClose: () => void
  onRefreshListing: () => Promise<void>
}

const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi

interface ValuesCreateEdit
  extends Omit<
    UserInfo,
    | 'priority'
    | 'role_name'
    | 'company_name'
    | 'id'
    | 'status'
    | 'permissions'
    | 'last_login_date'
    | 'role_id'
    | 'company_id'
  > {
  password: string | undefined
  role_id: string | number
}

const initialValues: ValuesCreateEdit = {
  firstname: '',
  middlename: '',
  lastname: '',
  username: '',
  password: '',
  role_id: '',
  email: '',
  telephone: '',
  is_active: true,
}

const CreateEditUser: FC<Props> = ({data, show, config, onClose, onRefreshListing}) => {
  const [dataCompany, setDataCompany] = useState<BranchItem[]>([])
  const [dataRole, setDataRole] = useState<RoleInfo[]>([])
  const [isSwitchedAccount, setIsSwitchedAccount] = useState<boolean>(data ? true : false)
  const [activeTab, setActiveTab] = useState<number>(1)

  const {apiGetCompanyList, apiGetRoleList, apiCreateUser, apiUpdateUser} =
    config?.settings?.dependencies || {}
  const {rows = []} = config || {}

  const {priority, currentUser, company_id} = useAuth()

  const validationSchema = useMemo(() => {
    const schemaObj = rows
      .filter((row) =>
        data ? row.validationFormik : row.validationFormik && row.key !== 'password'
      )
      .reduce((acc, {key, validationFormik}) => ({[key]: validationFormik, ...acc}), {
        ...(!data
          ? {
              password: Yup.string()
                .required('Password is required')
                .matches(
                  regexPassword,
                  'Password must be at least 8 characters including at least one letter, one number, and one special character'
                ),
            }
          : {}),
      })

    return Yup.object().shape(schemaObj)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    handleBlur,
    setValues,
    setSubmitting,
  } = useFormik<any>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmitForm,
  })

  useEffect(() => {
    if (!currentUser) return

    apiGetCompanyList &&
      request
        .post<DataResponse<BranchItem[]>>(apiGetCompanyList)
        .then(({data}) => {
          setDataCompany(data.data)
        })
        .catch((error) => {
          console.error('Error: ', error?.message)
        })

    apiGetRoleList &&
      request
        .post<DataResponse<RoleInfo[]>>(apiGetRoleList, {
          company_id: +company_id || 0,
        })
        .then(({data}) => {
          let roleList = Array.isArray(data.data) ? [...data.data] : []

          if (priority === 2) {
            roleList = roleList.filter((role) => role.priority > 2)
          }
          setDataRole(roleList)
        })
        .catch((error) => {
          console.error('Error: ', error?.message)
        })

    if (!data) return
    const {firstname, middlename, lastname, username, role_id, email, telephone, is_active} = data

    setValues({
      ...values,
      firstname,
      middlename,
      lastname,
      username,
      role_id,
      email,
      telephone,
      is_active: !!is_active,
    })

    return () => resetForm()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const dataRender = useMemo(() => {
    return rows?.filter(({isCreateEdit, key}) => {
      const fieldAccount = ['username', 'password', 'role_id'].includes(key)

      return activeTab === 1 ? !fieldAccount && isCreateEdit : fieldAccount && isCreateEdit
    })
  }, [activeTab])

  function handleSubmitForm(values: ValuesCreateEdit) {
    const mappingPayload = {
      ...values,
      is_active: values.is_active ? 1 : 0,
      company_id: +company_id || 0,
      role_id: +values.role_id,
      telephone: values.telephone.toString(),
      password: values.password || undefined,
    }
    if (data) {
      onUpdateUser(mappingPayload)
    } else {
      handleCreateUser(mappingPayload)
    }
  }

  async function handleCreateUser(payload: ValuesCreateEdit) {
    try {
      const {data} = await request.post(apiCreateUser, {
        ...payload,
        company_id: +company_id,
      })

      // handle after create successfully
      if (!data?.error) {
        await onRefreshListing()
        onClose()
        const user_name = values.username
        swalToast.fire({
          title: `User ${user_name} successfully created`,
          icon: 'success',
        })
      } else {
        swalToast.fire({
          title: DEFAULT_MSG_ERROR,
          icon: 'error',
        })
      }
    } catch (error: any) {
      const message = convertErrorMessageResponse(error)

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  async function onUpdateUser(payload: ValuesCreateEdit) {
    // Pass if id = 0
    if (!data?.id) return

    try {
      const {data: dataRes} = await request.post(apiUpdateUser + `/${data.id}`, {
        ...payload,
        company_id: +company_id,
      })
      if (!dataRes?.error) {
        await onRefreshListing()
        const user_name = values.username
        onClose()
        swalToast.fire({
          title: `User ${user_name} successfully updated`,
          icon: 'success',
        })
      } else {
        swalToast.fire({
          title: "Can't update user",
          icon: 'error',
        })
      }
    } catch (error: any) {
      const message = convertErrorMessageResponse(error)
      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  console.log(
    rows?.filter(({isCreateEdit, key}) => {
      const fieldAccount = ['username', 'password', 'role_id'].includes(key)

      return activeTab === 1 ? !fieldAccount && isCreateEdit : fieldAccount && isCreateEdit
    })
  )

  return (
    <Modal title={data ? `Edit User "${data.username}"` : 'New User'} show={show} onClose={onClose}>
      <div className='p-30px'>
        <Tab.Container id='left-tabs-example' defaultActiveKey={1} activeKey={activeTab}>
          <Row>
            <Col>
              <Nav variant='pills' className='flex-column gap-2'>
                {CREATE_USER_TAB.map(({label}, index) => {
                  const isActive = activeTab === index + 1
                  const classDynamic = isActive
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-gray-900'
                  return (
                    <Nav.Item className='m-0' key={index}>
                      <Nav.Link
                        className={`w-100 fw-semibold fs-4 ${classDynamic}`}
                        onClick={() => {
                          setActiveTab(index + 1)
                          !isActive && setIsSwitchedAccount(true)
                        }}
                        eventKey={index + 1}
                      >
                        {label}
                      </Nav.Link>
                    </Nav.Item>
                  )
                })}
              </Nav>
            </Col>
            <Col sm={9} className='h-lg-350px'>
              <Tab.Content>
                <Tab.Pane eventKey={activeTab}>
                  <div>
                    <div className='row'>
                      {dataRender.map((item, i) => {
                        const {infoCreateEdit, key, name} = item
                        const {type, typeInput, isRequired, fieldLabelOption, fieldValueOption} =
                          infoCreateEdit || {}
                        if (type === 'input') {
                          return (
                            <div className='col-6' key={i}>
                              <div className='d-flex flex-column mb-16px'>
                                <Input
                                  onBlur={handleBlur}
                                  type={typeInput}
                                  title={name}
                                  name={key}
                                  value={values[key] || ''}
                                  onChange={handleChange}
                                  required={isRequired}
                                />

                                {errors[key] && touched[key] && (
                                  <ErrorMessage className='mt-2' message={errors[key] as string} />
                                )}
                              </div>
                            </div>
                          )
                        } else if (type === 'select') {
                          return (
                            <div className='col-6' key={i}>
                              <Select
                                name={key}
                                required={isRequired}
                                options={dataCompany}
                                fieldLabelOption={fieldLabelOption || key}
                                fieldValueOption={fieldValueOption || 'id'}
                                label={name}
                                onBlur={handleBlur}
                                id={key}
                                error={!!errors[key]}
                                touched={!!touched[key]}
                                errorTitle={errors[key] as string}
                                value={values[key]}
                                onChange={handleChange}
                              />
                            </div>
                          )
                        } else if (type === 'checkbox') {
                          return (
                            <InputCheck
                              name={key}
                              key={i}
                              checked={values[key]}
                              onChange={handleChange}
                              id={key}
                              title={name}
                            />
                          )
                        }

                        return <Fragment key={i}></Fragment>
                      })}
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      <div style={{borderTop: '1px solid #F1F1F2'}} className='d-flex flex-end p-30px'>
        <Button
          type='reset'
          onClick={() => onClose()}
          className='btn-lg btn-secondary align-self-center me-8px'
        >
          Cancel
        </Button>
        <Button
          className='btn-lg btn-primary'
          type='submit'
          loading={isSubmitting}
          onClick={() => (!isSwitchedAccount ? setActiveTab((prev) => prev + 1) : handleSubmit())}
        >
          {!isSwitchedAccount ? 'Continue' : data ? 'Update' : 'Create'}
        </Button>
      </div>
    </Modal>
  )
}

export default CreateEditUser
