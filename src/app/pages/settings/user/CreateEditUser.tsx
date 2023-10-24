import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import {
  BranchItem,
  DataResponse,
  RoleInfo,
  TableConfig,
  UserInfo,
  useAuth,
} from '../../../modules/auth'
import {useFormik} from 'formik'
import {swalToast} from '../../../swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../constants/error-message'
import * as Yup from 'yup'
import {Input} from '../../../components/inputs/input'
import request from '../../../axios'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import InputCheck from '../../../components/inputs/InputCheckRounded'
import Select from '../../../components/select/select'

type Props = {
  config?: TableConfig
  data?: UserInfo
  show: boolean
  onClose: () => void
  onRefreshListing: () => Promise<void>
}

export const roleSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required.'),
  lastname: Yup.string().required('Last name is required.'),
  username: Yup.string().required('User name is required.'),
  company_id: Yup.string().required('Branch is required.'),
  role_id: Yup.string().required('Role is required.'),
  email: Yup.string().email("Email isn't valid").required('Email is required.'),
  telephone: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(11, 'Maximum 11 symbols')
    .required('Telephone is required.'),
})

export const passwordSchema = Yup.object().shape({
  password: Yup.string().required('Password is required.'),
})

interface ValuesCreateEdit
  extends Omit<
    UserInfo,
    'priority' | 'role_name' | 'company_name' | 'id' | 'status' | 'permissions' | 'last_login_date'
  > {
  password: string | undefined
}

const initialValues: ValuesCreateEdit = {
  firstname: '',
  middlename: '',
  lastname: '',
  username: '',
  password: '',
  company_id: 0,
  role_id: 0,
  email: '',
  telephone: '',
  is_active: true,
}

const CreateEditUser: FC<Props> = ({data, show, config, onClose, onRefreshListing}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataBranch, setDataBranch] = useState<BranchItem[]>([])
  const [dataRole, setDataRole] = useState<RoleInfo[]>([])
  const [active, setActive] = useState<boolean>(true)

  const {apiGetCompanyList, apiGetRoleList, apiCreateUser, apiUpdateUser} =
    config?.settings?.dependencies || {}
  const {messageCreateSuccess, messageEditSuccess} = config?.settings || {}
  const {rows} = config || {}

  const {priority, currentUser} = useAuth()

  const validationSchema = useMemo(() => {
    let schema = roleSchema
    if (!data) return schema.concat(passwordSchema)

    return schema
  }, [data])

  const {values, touched, errors, handleChange, handleSubmit, resetForm, setValues} =
    useFormik<any>({
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
          setDataBranch(data.data)
        })
        .catch((error) => {
          console.error('Error: ', error?.message)
        })

    apiGetRoleList &&
      request
        .post<DataResponse<RoleInfo[]>>(apiGetRoleList)
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
    const {
      firstname,
      middlename,
      lastname,
      username,
      company_id,
      role_id,
      email,
      telephone,
      is_active,
    } = data

    setValues({
      ...values,
      firstname,
      middlename,
      lastname,
      username,
      company_id,
      role_id,
      email,
      telephone,
      is_active: !!is_active,
    })

    return () => resetForm()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  function handleSubmitForm(values: ValuesCreateEdit) {
    const mappingPayload = {
      ...values,
      is_active: values.is_active ? 1 : 0,
      company_id: +values.company_id,
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
    setLoading(true)

    try {
      const {data} = await request.post(apiCreateUser, payload)

      // handle after create successfully
      if (!data?.error) {
        await onRefreshListing()
        onClose()
        swalToast.fire({
          title: messageCreateSuccess,
          icon: 'success',
        })
      } else {
        swalToast.fire({
          title: "Can't create user. Please try again!",
          icon: 'error',
        })
      }
    } catch (error: any) {
      const message = DEFAULT_MSG_ERROR

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  async function onUpdateUser(payload: ValuesCreateEdit) {
    // Pass if id = 0
    if (!data?.id) return

    setLoading(true)

    try {
      const {data: dataRes} = await request.post(apiUpdateUser + `/${data.id}`, payload)
      if (!dataRes?.error) {
        await onRefreshListing()
        onClose()
        swalToast.fire({
          title: messageEditSuccess,
          icon: 'success',
        })
      } else {
        swalToast.fire({
          title: "Can't update user",
          icon: 'error',
        })
      }
    } catch (error: any) {
      swalToast.fire({
        title: DEFAULT_MSG_ERROR,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={data ? `Edit User "${data.username}"` : 'Create New User'}
      show={show}
      onClose={onClose}
    >
      <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
        <Row>
          <Col>
            <Nav variant='pills' className='flex-column gap-2 '>
              <Nav.Item
                style={{
                  marginRight: '0',
                }}
              >
                <Nav.Link
                  onClick={() => setActive(true)}
                  eventKey='first'
                  style={{
                    width: '100%',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: active ? 'white' : '#071437',
                    background: active ? '#3e97ff' : '',
                  }}
                >
                  Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setActive(false)}
                  eventKey='second'
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: active ? '#071437' : 'white',
                    background: active ? '' : '#3e97ff',
                    marginBottom: '30px',
                  }}
                >
                  Account
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className='h-lg-350px'>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <div>
                  <div className='row'>
                    {(rows || [])
                      ?.filter(
                        (item) =>
                          item.isCreateEdit &&
                          !['username', 'password', 'role_id'].includes(item.key)
                      )
                      .map((item, i) => {
                        const {informCreateEdit, key, name} = item
                        const {type, typeInput, isRequired, fieldLabelOption, fieldValueOption} =
                          informCreateEdit || {}
                        if (type === 'input') {
                          return (
                            <div className='col-6' key={i}>
                              <Input
                                type={typeInput}
                                title={name}
                                id={key}
                                error={errors[key]}
                                touched={touched[key]}
                                errorTitle={errors[key]}
                                value={values[key] || ''}
                                onChange={handleChange}
                                required={isRequired}
                              />
                            </div>
                          )
                        } else if (type === 'select') {
                          return (
                            <div className='col-6' key={i}>
                              <Select
                                name={key}
                                required={isRequired}
                                options={dataBranch}
                                fieldLabelOption={fieldLabelOption || key}
                                fieldValueOption={fieldValueOption || 'id'}
                                label={name}
                                id={key}
                                shouldShowError={!!(touched[key] && errors[key])}
                                errorMessage={errors[key] as string}
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
                              title='Active'
                            />
                          )
                        }

                        return <Fragment key={i}></Fragment>
                      })}
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <div className='row'>
                  {(rows || [])
                    ?.filter(
                      (item) =>
                        item.isCreateEdit && ['username', 'password', 'role_id'].includes(item.key)
                    )
                    .map((item, i) => {
                      const {informCreateEdit, key, name} = item
                      const {type, typeInput, isRequired, fieldLabelOption, fieldValueOption} =
                        informCreateEdit || {}
                      if (type === 'input') {
                        return (
                          <div className='col-6' key={i}>
                            <Input
                              type={typeInput}
                              title={name}
                              id={key}
                              error={errors[key]}
                              touched={touched[key]}
                              errorTitle={errors[key]}
                              value={values[key] || ''}
                              onChange={handleChange}
                              required={isRequired}
                            />
                          </div>
                        )
                      } else if (type === 'select') {
                        return (
                          <div className='col-6' key={i}>
                            <Select
                            name={key}
                              required={isRequired}
                              options={dataRole}
                              fieldLabelOption={fieldLabelOption || key}
                              fieldValueOption={fieldValueOption || 'id'}
                              label={name}
                              id={key}
                              shouldShowError={!!(touched[key] && errors[key])}
                              errorMessage={errors[key] as string}
                              value={values[key]}
                              onChange={handleChange}
                            />
                          </div>
                        )
                      }

                      return <Fragment key={i}></Fragment>
                    })}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <div className='d-flex flex-end pt-4'>
        <button type='button' className='btn btn-lg btn-primary' onClick={() => handleSubmit()}>
          {loading ? (
            <>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </>
          ) : (
            <span>{data ? 'Update' : 'Create'}</span>
          )}
        </button>
      </div>
    </Modal>
  )
}

export default CreateEditUser
