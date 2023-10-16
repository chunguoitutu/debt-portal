/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import {FormikHelpers, useFormik} from 'formik'
import clsx from 'clsx'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
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

  const formik = useFormik<LoginInfo>({
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
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-start mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-semibold fs-6'>Please Sign In With Your Account</div>
      </div>

      {formik.status && (
        <div className='mb-8 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
        <input
          placeholder='Username'
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.username && formik.errors.username},
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
          type='username'
          name='username'
          autoComplete='off'
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.username}</span>
            </div>
          </div>
        )}
      </div>

      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          placeholder='Password'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>

      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        <Link to='/forgot-password' className='link-primary'>
          Forgot Password ?
        </Link>
      </div>

      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
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
