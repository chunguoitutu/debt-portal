import {FC, useMemo, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {FormikHelpers, useFormik} from 'formik'
import * as Yup from 'yup'
import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import {convertErrorMessageResponse, convertFieldPassword} from '@/app/utils'
import {useAuth} from '@/app/context/AuthContext'
import {UpdatePasswordInfo} from '@/app/types'
import {updatePasswordCurrentUser} from '@/app/axios/request'
import {swalToast} from '@/app/swal-notification'
import {KTIcon} from '@/_metronic/helpers'

type Props = {
  show: boolean
  ignoreOldPassword?: boolean
  id: number
  onClose: () => void
}

type ValuesChangePassword = {
  old_password: string
  new_password: string
  confirm_new_password: string
}

const initialValues = {
  new_password: '',
  confirm_new_password: '',
  old_password: '',
}

const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi

const passwordFormValidationSchema = Yup.object().shape({
  new_password: Yup.string()
    .matches(regexPassword, convertFieldPassword('New Password'))
    .required('New Password is required'),
  confirm_new_password: Yup.string()
    .matches(regexPassword, convertFieldPassword('Confirm New Password'))
    .required('Confirm New Password is required')
    .oneOf([Yup.ref('new_password')], 'Confirm New Password must match'),
})

const oldPasswordValidationSchema = Yup.object().shape({
  old_password: Yup.string()
    .matches(regexPassword, convertFieldPassword('Current Password'))
    .required('Current Password is required'),
})

const ChangePassword: FC<Props> = ({show, onClose, ignoreOldPassword = false, id}) => {
  const [loading, setLoading] = useState(false)
  const {logout} = useAuth()

  const validationSchema = useMemo(() => {
    let schema = passwordFormValidationSchema
    if (!ignoreOldPassword) return schema.concat(oldPasswordValidationSchema)

    return schema
  }, [ignoreOldPassword])

  const {touched, errors, resetForm, getFieldProps, handleSubmit} = useFormik<ValuesChangePassword>(
    {
      initialValues,
      validationSchema,
      onSubmit: handleChangePassword,
    }
  )

  function handleChangePassword(
    values: ValuesChangePassword,
    config: FormikHelpers<ValuesChangePassword>
  ) {
    const {old_password, new_password} = values

    if (!ignoreOldPassword) {
      onUpdatePasswordCurrentUser(
        {
          id,
          old_password,
          new_password,
        },
        config
      )
    } else {
      // change user password when current user has role super admin or admin
    }
  }

  function onClosePopup() {
    resetForm()
    onClose()
  }

  async function onUpdatePasswordCurrentUser(
    updatePasswordInfo: UpdatePasswordInfo,
    {setStatus}: FormikHelpers<ValuesChangePassword>
  ) {
    setLoading(true)
    try {
      await updatePasswordCurrentUser(updatePasswordInfo)
      swalToast.fire({
        icon: 'success',
        title: 'Password successfully changed. Please login again.',
      })
      onClosePopup()
      logout()
    } catch (error: any) {
      const message = convertErrorMessageResponse(error)

      swalToast.fire({
        icon: 'error',
        title: message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={onClosePopup}
      animation={true}
    >
      <div className='modal-header ps-10'>
        <h2 className='mb-0'>Change Password</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={onClosePopup}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>

      <div className='modal-body p-10'>
        <form className='row gy-4'>
          {!ignoreOldPassword && (
            <div className='col-12'>
              <div className='fv-row mb-0'>
                <label
                  htmlFor='old_password'
                  className='form-label text-gray-900 fs-4 fw-semibold mb-3 required'
                >
                  Current Password
                </label>
                <Input
                  autoComplete='off'
                  type='password'
                  className='form-control form-control-lg form-control-solid'
                  id='old_password'
                  error={errors.old_password}
                  touched={touched.old_password}
                  {...getFieldProps('old_password')}
                />
              </div>
            </div>
          )}

          <div className='col-12'>
            <div className='fv-row mb-0'>
              <label
                htmlFor='new_password'
                className='form-label text-gray-900 fs-4 fw-semibold mb-3 required'
              >
                New Password
              </label>
              <Input
                autoComplete='off'
                type='password'
                className='form-control form-control-lg form-control-solid '
                id='new_password'
                error={errors.new_password}
                touched={touched.new_password}
                {...getFieldProps('new_password')}
              />
            </div>
          </div>

          <div className='col-12'>
            <div className='fv-row mb-0'>
              <label
                htmlFor='confirm_new_password'
                className='form-label text-gray-900 fs-4 fw-semibold mb-3 required'
              >
                Confirm New Password
              </label>
              <Input
                autoComplete='off'
                type='password'
                className='form-control form-control-lg form-control-solid '
                id='confirm_new_password'
                error={errors.confirm_new_password}
                touched={touched.confirm_new_password}
                {...getFieldProps('confirm_new_password')}
              />
            </div>
          </div>
        </form>

        <div className='d-flex justify-content-end mt-8 gap-4'>
          <Button className='btn-secondary' onClick={onClosePopup} disabled={loading}>
            Cancel
          </Button>

          <Button
            className='btn-primary'
            onClick={() => handleSubmit()}
            disabled={loading}
            loading={loading}
          >
            Update Password
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ChangePassword
