import React, {useState} from 'react'
import * as Yup from 'yup'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useFormik} from 'formik'

import {useAuth} from '../../../auth'
import {updateInfoUser} from '../../../auth/core/_requests'
import ChangePassword from '../change-password/ChangePassword'

const profileDetailsSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  email: Yup.string().required('Email name is required'),
  telephone: Yup.string().required('Telephone is required'),
  status: Yup.string().required('Status is required'),
})

interface UserProfile {
  avatar: string
  firstname: string
  middlename: string
  lastname: string
  telephone: string
  email: string
}

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [isShowResetPassword, setIsShowResetPassword] = useState<boolean>(false)

  const {currentUser, refreshToken} = useAuth()

  const formik = useFormik<UserProfile>({
    initialValues: {
      avatar: '',
      firstname: currentUser?.firstname || '',
      middlename: currentUser?.middlename || '',
      lastname: currentUser?.lastname || '',
      telephone: currentUser?.telephone || '',
      email: currentUser?.email || '',
    },
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      setLoading(true)
    },
  })

  async function handleSubmitForm() {
    if (!currentUser) return
    try {
      setLoading(true)
      const values: UserProfile = {
        avatar: formik.values.avatar || '',
        firstname: formik.values.firstname,
        middlename: formik.values.middlename,
        lastname: formik.values.lastname,
        telephone: formik.values.telephone,
        email: formik.values.email,
      }

      const {data} = await updateInfoUser(currentUser.user_id, values)
      refreshToken(data.token)
      toast.success('Change your information successfully')
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  function toggleResetPassword() {
    setIsShowResetPassword(!isShowResetPassword)
  }

  return (
    <>
      <ToastContainer />

      {currentUser && isShowResetPassword && (
        <ChangePassword
          username={currentUser.username}
          onClose={toggleResetPassword}
          show={isShowResetPassword}
        />
      )}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header d-flex'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <button
            type='button'
            id='kt_sign_in_submit'
            className='btn btn-primary align-self-center'
            onClick={toggleResetPassword}
          >
            Reset Password
          </button>
        </div>

        <div id='kt_account_profile_details' className='collapse show'>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-4 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                        placeholder='First name'
                        {...formik.getFieldProps('firstname')}
                      />
                      {formik.touched.firstname && formik.errors.firstname && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.firstname}</div>
                        </div>
                      )}
                    </div>

                    <div className='col-lg-4 fv-row '>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Middle name'
                        {...formik.getFieldProps('middlename')}
                      />
                      {formik.touched.middlename && formik.errors.middlename && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.middlename}</div>
                        </div>
                      )}
                    </div>

                    <div className='col-lg-4 fv-row'>
                      <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        placeholder='Last name'
                        {...formik.getFieldProps('lastname')}
                      />
                      {formik.touched.lastname && formik.errors.lastname && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{formik.errors.lastname}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className='required'>Telephone</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='tel'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Phone number'
                    {...formik.getFieldProps('telephone')}
                  />
                  {formik.touched.telephone && formik.errors.telephone && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.telephone}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Company name'
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.email}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={loading}
                onClick={handleSubmitForm}
              >
                {!loading && 'Save Changes'}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export {Settings}
