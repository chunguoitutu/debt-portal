import {FC, Fragment, useEffect, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import {RoleInfo, TableConfig, UpdateById, useAuth} from '../../../modules/auth'
import {useFormik} from 'formik'
import TextArea from '../../../components/textarea/TextArea'
import ErrorMessage from '../../../components/error/ErrorMessage'
import {createNewRole, updateRole} from '../../../modules/auth/core/_requests'
import {swalToast} from '../../../swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../constants/error-message'
import * as Yup from 'yup'
import {Input} from '../../../components/inputs/input'
import {ROLE_PRIORITY} from '../../../utils/globalConfig'
import Select from '../../../components/selects/select'

type Props = {
  data?: RoleInfo
  show: boolean
  onClose: () => void
  onRefreshListing: () => Promise<void>
  config?: TableConfig
}

export const roleSchema = Yup.object().shape({
  role_name: Yup.string().required('Role name is required.'),
  priority: Yup.string().required('Priority is required.'),
})

const CreateEditRole: FC<Props> = ({data, show, config, onClose, onRefreshListing}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const {rows} = config || {}

  const {currentUser, priority} = useAuth()

  const {values, touched, errors, handleChange, handleSubmit, resetForm, setValues, setFieldValue} =
    useFormik<RoleInfo>({
      initialValues: {
        id: 0,
        role_name: '',
        description: '',
        permissions: '',
        priority: 0,
      },
      validationSchema: roleSchema,
      onSubmit: handleSubmitForm,
    })

  useEffect(() => {
    if (!data) return
    setValues(data)

    return () => resetForm()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmitForm(values: RoleInfo) {
    const {id, ...payload} = values

    if (data) {
      onUpdateRole({
        id,
        data: {
          ...payload,
          priority: Number(payload.priority),
        },
      })
    } else {
      onCreateNewRole({
        ...payload,
        priority: Number(payload.priority),
      })
    }
  }

  async function onCreateNewRole(payload: Omit<RoleInfo, 'id'>) {
    setLoading(true)

    try {
      await createNewRole({...payload, company_id: currentUser?.company_id || 0})

      // handle after create successfully
      await onRefreshListing()
      onClose()
      swalToast.fire({
        title: 'Role successfully created',
        icon: 'success',
      })
    } catch (error: any) {
      const message = error?.response?.data?.message || DEFAULT_MSG_ERROR

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  async function onUpdateRole(payload: UpdateById<Omit<RoleInfo, 'id'>>) {
    // Pass if id = 0
    if (!payload.id) return

    setLoading(true)

    try {
      await updateRole(payload)

      // handle after update successfully
      await onRefreshListing()
      onClose()
      swalToast.fire({
        title: 'Role successfully updated',
        icon: 'success',
      })
    } catch (error: any) {
      const message = error?.response?.data?.message || DEFAULT_MSG_ERROR

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const DATA_ROLE_PRIORITY = ROLE_PRIORITY.filter(
    (rolePriority) => Number(rolePriority.value) > Number(priority)
  )

  return (
    <Modal
      title={data ? `Edit Role "${data.role_name}"` : 'Create New Role'}
      show={show}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        {(rows || [])
          .filter((item) => item.isCreateEdit)
          .map((item, index) => {
            const {informCreateEdit, key, name} = item
            const {type, typeInput, isRequired} = informCreateEdit || {}

            if (type === 'input') {
              return (
                <Input
                  key={index}
                  title={name}
                  type={typeInput || 'text'}
                  id={key}
                  error={errors[key]}
                  touched={touched[key]}
                  errorTitle={errors[key]}
                  value={values[key] || ''}
                  onChange={handleChange}
                  required={isRequired}
                />
              )
            } else if (type === 'textarea') {
              return (
                <div className='mb-8' key={index}>
                  <TextArea
                    title={name}
                    name={key}
                    value={values[key] || ''}
                    onChange={handleChange}
                    isRequired={isRequired}
                  />

                  <ErrorMessage
                    className='mt-2'
                    shouldShowMessage={!!(errors[key] && touched[key])}
                    message={errors[key]}
                  />
                </div>
              )
            } else if (type === 'select') {
              if (key === 'priority')
                return (
                  <Select
                    key={index}
                    datas={DATA_ROLE_PRIORITY}
                    valueTitle='label'
                    setValueTitle='value'
                    required={true}
                    title='Priority'
                    id='priority'
                    errors={errors.priority}
                    touched={touched.priority}
                    errorTitle={errors.priority}
                    value={values.priority || ''}
                    onChange={setFieldValue}
                  />
                )

              return (
                <Select
                  key={index}
                  datas={DATA_ROLE_PRIORITY}
                  valueTitle='label'
                  setValueTitle='value'
                  required={isRequired}
                  title='Priority'
                  id='priority'
                  errors={errors.priority}
                  touched={touched.priority}
                  errorTitle={errors.priority}
                  value={values.priority || ''}
                  onChange={setFieldValue}
                />
              )
            } else {
              return <Fragment key={index}></Fragment>
            }
          })}

        <div className='d-flex flex-end'>
          <button type='submit' className='btn btn-lg btn-primary'>
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
      </form>
    </Modal>
  )
}

export default CreateEditRole
