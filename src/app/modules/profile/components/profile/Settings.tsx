import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css'

import {useAuth} from '@/app/context/AuthContext'
import {updateInfoUser} from '@/app/axios/request'
import {swalToast} from '@/app/swal-notification'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import ChangePassword from '../change-password/ChangePassword'
import {Input} from '@/components/input'
import Tippy from '@tippyjs/react'
import {Select} from '@/components/select'
import {COUNTRY_PHONE_CODE} from '@/app/utils'

const profileDetailsSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
})

interface UserProfile {
  firstname: string
  lastname: string
  telephone: string
  email: string
}

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [isShowResetPassword, setIsShowResetPassword] = useState<boolean>(false)

  const [originalData, setOriginalData] = useState<UserProfile | null>(null)

  const {currentUser, refreshToken} = useAuth()

  const {
    values,
    handleChange,
    setValues,
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    handleBlur,
    dirty,
  } = useFormik<UserProfile>({
    initialValues: {
      firstname: currentUser?.firstname || '',
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
      const valuesFormik: UserProfile = {
        firstname: values.firstname,
        lastname: values.lastname,
        telephone: values.telephone,
        email: values.email,
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
      setValues(originalData)
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
          <form onSubmit={handleSubmit} noValidate className='form'>
            <div className='card-body p-9'>
              <div className='row mb-6 p-1'>
                <label className='col-lg-4 col-form-label required fw-bold fs-5'>Full Name</label>

                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <input
                        type='text'
                        className='fs-4 form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                        placeholder='First name'
                        {...getFieldProps('firstname')}
                      />
                      {touched.firstname && errors.firstname && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block fs-13'>{errors.firstname}</div>
                        </div>
                      )}
                    </div>

                    <div className='col-lg-6 fv-row'>
                      <input
                        type='text'
                        className='fs-4 form-control form-control-lg form-control-solid'
                        placeholder='Last name'
                        {...getFieldProps('lastname')}
                      />
                      {touched.lastname && errors.lastname && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block fs-13'>{errors.lastname}</div>
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
                  <Input
                    onBlur={handleBlur}
                    name={'telephone'}
                    type={'number'}
                    value={values['telephone'] || ''}
                    onChange={handleChange}
                    touched={!!touched['telephone']}
                    insertLeft={
                      <Tippy offset={[120, 0]} content='Please choose the phone number you prefer.'>
                        {/* Wrapper with a span tag to show tooltip */}
                        <span>
                          <Select
                            onChange={handleChange}
                            value={values['telephone']}
                            isOptionDefault={false}
                            classShared='m-0'
                            className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                            name='country_phone_code'
                            options={COUNTRY_PHONE_CODE}
                          />
                        </span>
                      </Tippy>
                    }
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
                    {...getFieldProps('email')}
                    pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
                  />
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button
                disabled={!dirty}
                type='button'
                className='btn btn-secondary align-self-center me-8px'
                onClick={handleDiscardChanges}
              >
                Discard Changes
              </button>
              <button
                type='submit'
                className='btn btn-primary align-self-center fs-14'
                disabled={!dirty}
                onClick={() => handleSubmit}
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
