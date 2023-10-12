import {FC, useEffect, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import {RoleInfo, UpdateById} from '../../../modules/auth'
import {useFormik} from 'formik'
import TextArea from '../../../components/textarea/TextArea'
import ErrorMessageFormik from '../../../components/error/ErrorMessageFormik'
import {createNewRole, updateRole} from '../../../modules/auth/core/_requests'
import {swalToast} from '../../../swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../constants/error-message'
import * as Yup from 'yup'
import {Input} from '../../../../components/inputs/input'

type Props = {
  data?: RoleInfo
  show: boolean
  onClose: () => void
  onRefreshListing: () => Promise<void>
}

export const roleSchema = Yup.object().shape({
  role_name: Yup.string().required('Role name is required.'),
})

const CreateEditRole: FC<Props> = ({data, show, onClose, onRefreshListing}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const {values, touched, errors, handleChange, handleSubmit, resetForm, setValues} =
    useFormik<RoleInfo>({
      initialValues: {
        id: 0,
        role_name: '',
        description: '',
        permissions: '',
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
      onUpdateRole({id, data: payload})
    } else {
      onCreateNewRole(payload)
    }
  }

  async function onCreateNewRole(payload: Omit<RoleInfo, 'id'>) {
    setLoading(true)

    try {
      await createNewRole(payload)

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

  return (
    <Modal
      title={data ? `Edit Role "${data.role_name}"` : 'Create New Role'}
      show={show}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Input
          title='Role Name'
          id='role_name'
          error={errors.role_name}
          touched={touched.role_name}
          errorTitle={errors.role_name}
          value={values.role_name || ''}
          onChange={handleChange}
          required
        />

        <div className='mb-8'>
          <TextArea
            title='Description'
            name='description'
            value={values.description || ''}
            onChange={handleChange}
          />

          <ErrorMessageFormik
            className='mt-2'
            shouldShowMessage={!!(errors.description && touched.description)}
            message={errors.description}
          />
        </div>

        <Input
          title='Permissions'
          id='permissions'
          error={errors.permissions}
          touched={touched.permissions}
          errorTitle={errors.permissions}
          value={values.permissions || ''}
          onChange={handleChange}
        />

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
