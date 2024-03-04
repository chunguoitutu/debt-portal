import request from '@/app/axios'
import {useAuth} from '@/app/context/AuthContext'
import {useShared} from '@/app/context/SharedContext'
import {HomeProps} from '@/app/types'
import {convertErrorMessageResponse} from '@/app/utils'
import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import clsx from 'clsx'
import {useFormik} from 'formik'
import Cookies from 'js-cookie'
import {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const LoginForm: FC<HomeProps> = ({screenWidth}) => {
  const {showLoginForm, setShowLoginForm} = useShared()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {values, status, setStatus, errors, touched, handleSubmit, getFieldProps, setSubmitting} =
    useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      onSubmit: () => {
        setLoading(true)

        request
          .post('debt/login', {
            username: values.username,
            password: values.password,
          })
          .then((data) => {
            Cookies.set('token', data?.data?.data?.token)
            setStatus('')
            navigate(`/debt`)
            setLoading(false)
          })
          .catch((e) => {
            const message = convertErrorMessageResponse(e)
            setStatus(message)
            setSubmitting(false)
            setLoading(false)
          })
      },
    })

  return (
    <>
      <div
        className={clsx([
          'card d-flex flex-column gap-24px p-20px p-lg-30px align-self-center login-form fade w-100 mw-400px w-lg-fit-content flex-shrink-0',
          showLoginForm ? 'viewed' : 'visibility-hidden pe-none user-select-none',
          screenWidth < 992 && 'order-1',
          !showLoginForm && screenWidth < 992 && 'position-absolute z-index-negative',
        ])}
      >
        <h3 className='m-0 text-gray-900 fw-bold fs-26 text-center'>Sign In</h3>

        <p className='m-0 text-gray-600 text-center d-flex align-items-center justify-content-center fs-14 gap-8px'>
          <span className='d-inline-block w-20px h-1px bg-gray-600'></span>
          <span className='text-nowrap'>Welcome to field service for debt collector</span>
          <span className='d-inline-block w-20px h-1px bg-gray-600'></span>
        </p>

        {status && (
          <div className='m-0 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{status}</div>
          </div>
        )}

        <div className='w-100 w-lg-320px mw-100 d-flex flex-column gap-16px'>
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
          loading={loading}
          onClick={() => {
            handleSubmit()
          }}
          disabled={
            loading ||
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
