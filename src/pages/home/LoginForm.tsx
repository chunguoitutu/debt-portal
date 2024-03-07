import request from '@/app/axios'
import * as Yup from 'yup'
import {useShared} from '@/app/context/SharedContext'
import useClickOutside from '@/app/hooks/useClickOutside'
import {HomeProps} from '@/app/types'
import {convertErrorMessageResponse} from '@/app/utils'
import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import clsx from 'clsx'
import {useFormik} from 'formik'
import Cookies from 'js-cookie'
import {FC, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {DEFAULT_MSG_ERROR} from '@/app/constants'

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Debt Collector ID is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const LoginForm: FC<HomeProps> = ({screenWidth}) => {
  const {showLoginForm, setShowLoginForm} = useShared()
  const navigate = useNavigate()
  const configColumnRef = useRef(null)
  const {
    values,
    status,
    errors,
    touched,
    isSubmitting,
    setStatus,
    handleSubmit,
    getFieldProps,
    setSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  })

  async function handleLogin() {
    try {
      setSubmitting(true) // show loading
      setStatus('') // reset error
      const payload = {
        username: values.username,
        password: values.password,
      }
      const {data: dataRes} = await request.post('debt/login', payload)
      const {error, token, data} = dataRes
      if (!token || !data || error) {
        throw new Error(DEFAULT_MSG_ERROR)
      }
      const redirect = Cookies.get('lastPageViewed') || '/debt'
      Cookies.set('token', token) // set the token to the cookies
      navigate(redirect)
    } catch (error) {
      const message = convertErrorMessageResponse(error)
      setStatus(message)
      setSubmitting(false)
    } finally {
      setSubmitting(false) // end loading
    }
  }

  useClickOutside(configColumnRef, () => {
    if (!showLoginForm) return

    setShowLoginForm(false)
  })
  return (
    <>
      <div
        ref={configColumnRef}
        className={clsx([
          'card d-flex flex-column gap-24px p-20px p-lg-20px align-self-center login-form fade w-100 mw-500px w-lg-fit-content flex-shrink-0',
          showLoginForm ? 'viewed' : 'visibility-hidden pe-none user-select-none',
          screenWidth < 992 && 'order-1',
          !showLoginForm && screenWidth < 992 && 'position-absolute z-index-negative',
        ])}
      >
        <h3 className='m-0 text-gray-900 fw-bold fs-26 text-center'>Sign In</h3>

        <p className='m-0 text-gray-600 text-center d-flex align-items-center justify-content-center fs-14 gap-8px'>
          <span className='d-inline-block w-20px h-1px bg-gray-600'></span>
          <span className='fs-14'>Welcome to field service for debt collector</span>
          <span className='d-inline-block w-20px h-1px bg-gray-600'></span>
        </p>

        {status && (
          <div className='m-0 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{status}</div>
          </div>
        )}

        <div className='w-100 mw-100 d-flex flex-column gap-16px px-10px'>
          <Input
            classInputWrap='w-100'
            label='Debt Collector ID'
            type='text'
            name='username'
            required
            autoComplete='new-password'
            {...getFieldProps('username')}
            error={errors['username']}
            touched={touched['username']}
          />
          <Input
            classInputWrap='w-100'
            label='Password'
            type='password'
            name='password'
            required
            autoComplete='new-password'
            {...getFieldProps('password')}
            error={errors['password']}
            touched={touched['password']}
          />
        </div>

        <Button
          className='btn-primary cursor-pointer'
          loading={isSubmitting}
          onClick={() => {
            handleSubmit()
          }}
          disabled={
            isSubmitting ||
            !!(touched.password && errors.password) ||
            !!(touched.username && errors.username) ||
            !values.password ||
            !values.username
          }
        >
          Sign In
        </Button>
      </div>
    </>
  )
}

export default LoginForm
