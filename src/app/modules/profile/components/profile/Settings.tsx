import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css'

import {useAuth} from '@/app/context/AuthContext'
import {updateInfoUser} from '@/app/axios/request'
import {swalToast} from '@/app/swal-notification'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import ChangePassword from '../change-password/ChangePassword'

const profileDetailsSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
})

interface UserProfile {
  firstname: string
  middlename: string
  lastname: string
  telephone: string
  email: string
}

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [isShowResetPassword, setIsShowResetPassword] = useState<boolean>(false)

  const [originalData, setOriginalData] = useState<UserProfile | null>(null)

  const {currentUser, refreshToken} = useAuth()

  const formik = useFormik<UserProfile>({
    initialValues: {
      firstname: currentUser?.firstname || '',
      middlename: currentUser?.middlename || '',
      lastname: currentUser?.lastname || '',
      telephone: currentUser?.telephone || '',
      email: currentUser?.email || '',
    },
    validationSchema: profileDetailsSchema,
    onSubmit: handleSubmitForm,
  })

  useEffect(() => {
    if (currentUser) {
      setOriginalData({
        firstname: currentUser.firstname || '',
        middlename: currentUser.middlename || '',
        lastname: currentUser.lastname || '',
        telephone: currentUser.telephone || '',
        email: currentUser.email || '',
      })
    }
  }, [currentUser])

  async function handleSubmitForm() {
    if (!currentUser) return
    try {
      setLoading(true)
      const values: UserProfile = {
        firstname: formik.values.firstname,
        middlename: formik.values.middlename,
        lastname: formik.values.lastname,
        telephone: formik.values.telephone,
        email: formik.values.email,
      }

      const {data} = await updateInfoUser(currentUser.id, values)
      refreshToken(data.token)
      swalToast.fire({
        title: `User "${currentUser.username}" successfully updated`,
        icon: 'success',
      })
    } catch (error) {
      swalToast.fire({
        title: DEFAULT_MSG_ERROR,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  function toggleResetPassword() {
    setIsShowResetPassword(!isShowResetPassword)
  }

  function handleDiscardChanges() {
    if (originalData) {
      formik.setValues(originalData)
    }
  }

  return (
    <>
      {currentUser && isShowResetPassword && (
        <ChangePassword
          id={currentUser.id}
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
            className='btn btn-light btn-active-light-primary align-self-center'
            onClick={toggleResetPassword}
          >
            Reset Password
          </button>
        </div>

        <div id='kt_account_profile_details' className='collapse show'>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='card-body p-9'>
              <div className='row mb-6 p-1'>
                <label className='col-lg-4 col-form-label required fw-bold fs-5'>Full Name</label>

                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-4 fv-row'>
                      <input
                        type='text'
                        className='fs-4 form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                        placeholder='First name'
                        {...formik.getFieldProps('firstname')}
                      />
                      {formik.touched.firstname && formik.errors.firstname && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block fs-13'>{formik.errors.firstname}</div>
                        </div>
                      )}
                    </div>

                    <div className='col-lg-4 fv-row '>
                      <input
                        type='text'
                        className='fs-4 form-control form-control-lg form-control-solid'
                        placeholder='Middle name'
                        {...formik.getFieldProps('middlename')}
                      />
                    </div>

                    <div className='col-lg-4 fv-row'>
                      <input
                        type='text'
                        className='fs-4 form-control form-control-lg form-control-solid'
                        placeholder='Last name'
                        {...formik.getFieldProps('lastname')}
                      />
                      {formik.touched.lastname && formik.errors.lastname && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block fs-13'>{formik.errors.lastname}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mb-6 '>
                <label className='col-lg-4 col-form-label fw-bold fs-5'>
                  <span>Contact Phone</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='tel'
                    className='fs-4 form-control form-control-lg form-control-solid'
                    placeholder='Contact Phone'
                    {...formik.getFieldProps('telephone')}
                  />
                </div>
              </div>

              <div className='row mb-6 p-1'>
                <label className='col-lg-4 col-form-label fw-bold fs-5'>Contact Email</label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='email'
                    className='fs-4 form-control form-control-lg form-control-solid'
                    placeholder='Contact Email'
                    {...formik.getFieldProps('email')}
                    pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
                  />
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button
                type='button'
                className='btn btn-secondary align-self-center me-8px'
                onClick={handleDiscardChanges}
                disabled={loading}
              >
                Discard Changes
              </button>
              <button
                type='submit'
                className='btn btn-primary align-self-center fs-14'
                disabled={loading}
                onClick={() => formik.handleSubmit}
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
