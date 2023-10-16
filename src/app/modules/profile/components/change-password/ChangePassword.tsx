import {FC, useMemo, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {KTIcon} from '../../../../../_metronic/helpers'
import {FormikHelpers, useFormik} from 'formik'
import * as Yup from 'yup'
import {updatePasswordCurrentUser} from '../../../auth/core/_requests'
import {UpdatePasswordInfo, useAuth} from '../../../auth'
import {swalToast} from '../../../../swal-notification'
import {convertErrorMessageResponse} from '../../../../utils'
import ErrorMessageFormik from '../../../../components/error/ErrorMessageFormik'

type Props = {
  show: boolean
  ignoreOldPassword?: boolean
  username: string
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
    .matches(regexPassword, 'New Password must be at least 8 character and contain symbols')
    .required('New Password is required'),
  confirm_new_password: Yup.string()
    .matches(regexPassword, 'Confirm New Password must be at least 8 character and contain symbols')
    .required('Confirm New Password is required')
    .oneOf([Yup.ref('new_password')], 'Confirm New Password must match'),
})

const oldPasswordValidationSchema = Yup.object().shape({
  old_password: Yup.string()
    .matches(regexPassword, 'Current Password must be at least 8 character and contain symbols')
    .required('Current Password is required'),
})

const ChangePassword: FC<Props> = ({show, onClose, ignoreOldPassword = false, username}) => {
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
          username,
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
        title: 'Password change successfully. Please login again.',
      })
      onClosePopup()
      logout()
    } catch (error: any) {
      const message = convertErrorMessageResponse(error)
      setStatus(message)
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
      <div className='modal-header'>
        <h3 className='mb-0'>Change Password</h3>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={onClosePopup}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='row gy-4'>
          {!ignoreOldPassword && (
            <div className='col-12'>
              <div className='fv-row mb-0'>
                <label htmlFor='old_password' className='form-label fs-6 fw-bold mb-3'>
                  Current Password
                </label>
                <input
                  type='password'
                  className='form-control form-control-lg form-control-solid'
                  id='old_password'
                  {...getFieldProps('old_password')}
                />
                <ErrorMessageFormik
                  shouldShowMessage={!!(touched.old_password && errors.old_password)}
                  message={errors.old_password}
                />
              </div>
            </div>
          )}

          <div className='col-12'>
            <div className='fv-row mb-0'>
              <label htmlFor='new_password' className='form-label fs-6 fw-bold mb-3'>
                New Password
              </label>
              <input
                type='password'
                className='form-control form-control-lg form-control-solid '
                id='new_password'
                {...getFieldProps('new_password')}
              />
              <ErrorMessageFormik
                shouldShowMessage={!!(touched.new_password && errors.new_password)}
                message={errors.new_password}
              />
            </div>
          </div>

          <div className='col-12'>
            <div className='fv-row mb-0'>
              <label htmlFor='confirm_new_password' className='form-label fs-6 fw-bold mb-3'>
                Confirm New Password
              </label>
              <input
                type='password'
                className='form-control form-control-lg form-control-solid '
                id='confirm_new_password'
                {...getFieldProps('confirm_new_password')}
              />
              {touched.confirm_new_password && errors.confirm_new_password && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>{errors.confirm_new_password}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='d-flex justify-content-end mt-8 gap-4'>
          <button
            type='button'
            id='kt_sign_in_submit'
            className='btn btn-primary'
            onClick={() => handleSubmit()}
            disabled={loading}
          >
            {!loading && <span className='indicator-label'>Update Password</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>

          <button
            type='button'
            id='kt_sign_in_submit'
            className='btn btn-color-gray-400 btn-active-light-primary'
            onClick={onClosePopup}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ChangePassword
