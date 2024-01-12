import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import clsx from 'clsx'
import {useFormik} from 'formik'

import {TableConfig, TableRow, UserInfo} from '@/app/types'
import {useAuth} from '@/app/context/AuthContext'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import Modal from '@/components/modal/Modal'
import ErrorMessage from '@/components/error/ErrorMessage'
import Button from '@/components/button/Button'
import {COUNTRY_PHONE_CODE, convertErrorMessageResponse} from '@/app/utils'
import Tippy from '@tippyjs/react'
import {Select} from '@/components/select'

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
  const {validationCreateEdit, validationEdit} = settings || {}

  const {currentUser, company_id} = useAuth()

  const formik = useFormik<any>({
    initialValues,
    validationSchema: data ? validationEdit : validationCreateEdit,
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
    const {firstname, lastname, username, role_id, email, telephone, is_active} = data

    setValues({
      ...values,
      firstname,

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
    return rows?.filter(({infoCreateEdit, key}) => fieldAccount.includes(key) && infoCreateEdit)
  }, [rows])
  const dataInformation = useMemo(() => {
    return rows?.filter(({infoCreateEdit, key}) => !fieldAccount.includes(key) && infoCreateEdit)
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
    const {typeComponent, isRequired, typeInput, keyLabelOption, keyValueOption, options} =
      infoCreateEdit || {}

    // General props
    let props: {[key: string]: any} = {
      value: values[key] || '',
      name: key,
      onChange: handleChange,
      onBlur: handleBlur,
    }

    if (typeComponent === 'input') {
      props = {
        ...props,
        transparent: true,
        required: key === 'password' && data ? false : isRequired,
        type: typeInput,
        label: name,
        autoComplete: 'off',
      }
    }

    if (typeComponent === 'select') {
      props = {
        ...props,
        required: isRequired,
        type: typeInput,
        label: name,
        options: dataOption[key] || options || [],
        keyLabelOption: keyLabelOption || 'label',
        keyValueOption: keyValueOption || dataOption[key] ? 'id' : 'value',
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
      <div className='py-30px ps-30px pe-30px d-flex'>
        <div className='flex-grow-1 pe-6 border-end border-gray-200'>
          <h3 className='mb-24px fw-bold'>Information</h3>
          <div className='row gx-5'>
            {dataInformation.map((item, i) => {
              const {infoCreateEdit, key, name} = item
              const {component, typeComponent, column, typeInput} = infoCreateEdit || {}

              if (component) {
                const Component = component as FC<any>
                const props = generatePropsComponent(item)

                if (key === 'is_active') {
                  const Component = component as any
                  return (
                    <div className='mt-16px' key={i}>
                      <Component
                        label={name}
                        checked={values[key]}
                        onChange={handleChange}
                        id={key}
                      />
                    </div>
                  )
                }

                return (
                  <div className={clsx(['mb-16px', column ? 'col-6' : 'col-12'])} key={i}>
                    <Component
                      {...props}
                      transparent={false}
                      insertLeft={
                        typeInput === 'phone' ? (
                          <Tippy
                            offset={[120, 0]}
                            content='Please choose the phone number you prefer.'
                          >
                            {/* Wrapper with a span tag to show tooltip */}
                            <span>
                              <Select
                                disabled
                                onChange={handleChange}
                                value={values[key]}
                                isOptionDefault={false}
                                classShared='m-0'
                                className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                                name='country_phone_code'
                                options={COUNTRY_PHONE_CODE}
                              />
                            </span>
                          </Tippy>
                        ) : undefined
                      }
                    />

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
              const {infoCreateEdit, key, name} = item
              const {component, typeComponent, column, isLastChild} = infoCreateEdit || {}

              const Component = component as any

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

      <div className='d-flex flex-end py-30px ps-30px pe-30px border-top border-gray-200'>
        <Button
          type='reset'
          onClick={() => onClose()}
          className='btn-lg btn-secondary align-self-center me-8px fs-6'
        >
          Cancel
        </Button>
        <Button
          className='btn-lg btn-primary fs-6'
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
