/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import {FormikHelpers, useFormik} from 'formik'
import clsx from 'clsx'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {login} from '../core/_requests'
import {LoginInfo} from '../core/_models'
import Cookies from 'js-cookie'
import {convertErrorMessageResponse} from '../../../utils'

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Username is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  username: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const {status, errors, touched, handleSubmit, getFieldProps} = useFormik<LoginInfo>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  })

  async function onSubmit(values: LoginInfo, {setStatus, setSubmitting}: FormikHelpers<LoginInfo>) {
    const redirect = searchParams.get('redirect')
    setLoading(true)

    try {
      const {data} = await login(values)

      // If account isn't active -> no login
      if (data.error) {
        setStatus(data.message)
        setSubmitting(false)
        setLoading(false)
        return
      }

      Cookies.set('token', data.token)

      setSubmitting(false)
      setLoading(false)

      // after navigate -> master layout will get current user
      navigate(`/${redirect ? redirect : 'dashboard'}`)
    } catch (error) {
      const message = convertErrorMessageResponse(error)
      setStatus(message)
      setSubmitting(false)
      setLoading(false)
    }
  }
  return (
    <form className='form w-100' onSubmit={handleSubmit} noValidate id='kt_login_signin_form'>
      <div className='text-start mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-bold fs-6'>Please Sign In With Your Account</div>
      </div>

      {status && (
        <div className='mb-8 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{status}</div>
        </div>
      )}

      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
        <input
          placeholder='Username'
          {...getFieldProps('username')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': touched.username && errors.username},
            {
              'is-valid': touched.username && !errors.username,
            }
          )}
          type='username'
          name='username'
          autoComplete='off'
        />
        {touched.username && errors.username && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{errors.username}</span>
            </div>
          </div>
        )}
      </div>

      <div className='fv-row'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          placeholder='Password'
          {...getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': touched.password && errors.password,
            },
            {
              'is-valid': touched.password && !errors.password,
            }
          )}
        />
        {touched.password && errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{errors.password}</span>
            </div>
          </div>
        )}
      </div>

      <div className='d-grid mt-8'>
        <button type='submit' id='kt_sign_in_submit' className='btn btn-primary' disabled={loading}>
          {!loading && <span className='indicator-label'>Sign In</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
