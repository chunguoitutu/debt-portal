import React, {useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useAuth} from '../../../auth'
import {updateInfoUser} from '../../../auth/core/_requests'

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

  const {currentUser} = useAuth()

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [avatarSrc, setAvatarSrc] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfYusZmpReA8vWiN3mQbyyBHpEcmO_GjGhhokiCGO9Q&s'
  )

  const handleImageClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.addEventListener('change', (e: any) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result
          if (typeof result === 'string') {
            setAvatarSrc(result)
          }
        }
        reader.readAsDataURL(file)
      }
    })
    input.click()
  }

  async function handleSubmitForm() {
    if (!currentUser) return
    try {
      setLoading(true)
      const values: UserProfile = {
        avatar: avatarSrc,
        firstname: formik.values.firstname,
        middlename: formik.values.middlename,
        lastname: formik.values.lastname,
        telephone: formik.values.telephone,
        email: formik.values.email,
      }

      const newData = await updateInfoUser(currentUser.user_id, values)
      console.log(newData)
    } catch (error) {
      console.error('Error updating user info:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <img
                    className='image-input-wrapper w-125px h-125px cursor-pointer'
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfYusZmpReA8vWiN3mQbyyBHpEcmO_GjGhhokiCGO9Q&s'
                    alt='avatar'
                    onClick={handleImageClick}
                  ></img>
                </div>
              </div>
            </div>

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
  )
}

export {Settings}
