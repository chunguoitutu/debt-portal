import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import * as Yup from 'yup'
import ErrorMessage from '../../../components/error/ErrorMessage'
import Button from '../../../components/button/Button'
import request from '../../../app/axios'
import {TableConfig, TableRow, UserInfo} from '../../../app/types/common'
import {useAuth} from '../../../app/context/AuthContext'
import {useFormik} from 'formik'
import {swalToast} from '../../../app/swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../app/constants/error-message'
import {convertErrorMessageResponse} from 'src/app/utils'
import clsx from 'clsx'

type Props = {
  config?: TableConfig
  data?: UserInfo
  show: boolean
  onClose: () => void
  onRefreshListing: () => Promise<void>
}

export interface CreateEditUser
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

const initialValues: CreateEditUser = {
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
  const [dataOption, setDataOption] = useState<{
    [key: string]: any[]
  }>({})

  const {apiCreateUser, apiUpdateUser} = config?.settings?.dependencies || {}
  const {rows = [], settings} = config || {}
  const {validationCreate, validationEdit} = settings || {}

  const {currentUser, company_id} = useAuth()

  const validationSchema = useMemo(
    () =>
      Yup.object().shape(
        !!(validationCreate || validationEdit)
          ? data
            ? (validationEdit as any) || validationCreate
            : validationCreate
          : {}
      ),
    [data]
  )

  const formik = useFormik<any>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmitForm,
  })
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
  } = formik

  useEffect(() => {
    if (!currentUser) return

    const rowHasDependencyApi = rows.filter((el) => el?.infoCreateEdit?.dependencyApi)
    const allDependencyApi = rowHasDependencyApi.map((el) =>
      request.post(el?.infoCreateEdit?.dependencyApi as string, {company_id, status: 1})
    )

    // GET all dependency of select component
    Promise.all(allDependencyApi).then((resList) => {
      let newDataOption = {}
      resList.forEach((res) => {
        const {data = {}, config} = res
        const options = data.data || []
        const dependencyApiRequest = config?.url

        const keyOption = rowHasDependencyApi.find(
          (el) => el.infoCreateEdit?.dependencyApi === dependencyApiRequest
        )?.key

        // unexpected
        if (data.error || !keyOption || !Array.isArray(options) || !options.length) return

        newDataOption = {...newDataOption, [keyOption]: options}
      })

      setDataOption(newDataOption)
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

  const fieldAccount = ['username', 'password', 'role_id']

  const dataAccount = useMemo(() => {
    return rows?.filter(({isCreateEdit, key}) => fieldAccount.includes(key) && isCreateEdit)
  }, [rows])
  const dataInformation = useMemo(() => {
    return rows?.filter(({isCreateEdit, key}) => !fieldAccount.includes(key) && isCreateEdit)
  }, [rows])

  function handleSubmitForm(values: CreateEditUser) {
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

  async function handleCreateUser(payload: CreateEditUser) {
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
          title: `User "${user_name}" successfully created`,
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

  async function onUpdateUser(payload: CreateEditUser) {
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
          title: `User "${user_name}" successfully updated`,
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

  function generatePropsComponent(row: TableRow) {
    const {infoCreateEdit, key, name} = row
    const {typeComponent, isRequired, typeInput, fieldLabelOption, fieldValueOption, options} =
      infoCreateEdit || {}

    // General props
    let props: {[key: string]: any} = {
      value: values[key] || '',
      name: key,
      onChange: handleChange,
      onBlur: handleBlur,
    }

    // Declare props for special cases
    if (key === 'firstname') {
      props = {
        formik: formik,
      }
    }

    if (typeComponent === 'input') {
      props = {
        ...props,
        required: key === 'password' && data ? false : isRequired,
        type: typeInput,
        title: name,
      }
    }

    if (typeComponent === 'select') {
      props = {
        ...props,
        required: isRequired,
        type: typeInput,
        label: name,
        options: dataOption[key] || options || [],
        fieldLabelOption: fieldLabelOption || 'label',
        fieldValueOption: fieldValueOption || dataOption[key] ? 'id' : 'value',
        classShared: '',
      }
    }

    if (typeComponent === 'checkbox-rounded') {
      props = {
        ...props,
        checked: values[key],
        title: name,
      }

      delete props.value
    }

    return props
  }

  return (
    <Modal
      title={data ? `Edit User "${data.username}"` : 'New User'}
      show={show || true}
      onClose={onClose}
      dialogClassName='mw-modal-1200px'
    >
      <div className='p-30px d-flex'>
        <div className='flex-grow-1 pe-6 border-end border-gray-200'>
          <h3 className='mb-24px fw-bold'>Information</h3>
          <div className='row gx-5'>
            {dataInformation.map((item, i) => {
              const {infoCreateEdit, key} = item
              const {component, typeComponent, column} = infoCreateEdit || {}

              if (component) {
                const Component = component as FC
                const props = generatePropsComponent(item)

                return (
                  <div className={clsx(['mb-16px', column ? 'col-6' : 'col-12'])} key={i}>
                    <Component {...props} />

                    {/* special cases not show error here */}
                    {typeComponent && errors[key] && touched[key] && (
                      <ErrorMessage message={errors[key] as string} />
                    )}
                  </div>
                )
              }

              // unexpected
              return <Fragment key={i} />
            })}
          </div>
        </div>

        <div className='w-300px ps-6 flex-shrink-0'>
          <h3 className='mb-24px fw-bold'>Account</h3>
          <div className='row gx-5 last-child-marin-0'>
            {dataAccount.map((item, i) => {
              const {infoCreateEdit, key} = item
              const {component, typeComponent, column, isLastChild} = infoCreateEdit || {}

              if (component) {
                const Component = component as FC
                const props = generatePropsComponent(item)

                return (
                  <div
                    className={clsx([isLastChild ? 'm-0' : 'mb-16px', column ? 'col-6' : 'col-12'])}
                    key={i}
                  >
                    <Component {...props} />

                    {/* special cases not show error here */}
                    {typeComponent && errors[key] && touched[key] && (
                      <ErrorMessage message={errors[key] as string} />
                    )}
                  </div>
                )
              }

              // unexpected
              return <Fragment key={i} />
            })}
          </div>
        </div>
      </div>

      <div className='d-flex flex-end p-30px border-top border-gray-200'>
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
          onClick={() => handleSubmit()}
        >
          {data ? 'Update' : 'Create'}
        </Button>
      </div>
    </Modal>
  )
}

export default CreateEditUser
