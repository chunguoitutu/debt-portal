import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {useEffect, useState} from 'react'

const LoginForm = () => {
  const [className, setClassName] = useState<string>('')

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setClassName('show')
  //   }, 300)

  //   return () => clearTimeout(timer)
  // }, [])

  const {status, errors, touched, handleSubmit, getFieldProps, setStatus, setSubmitting} =
    useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      onSubmit: () => {},
    })
  return (
    <div
      className={clsx([
        'card d-flex flex-column gap-24px p-30px py-lg-60px px-lg-80px align-self-center dashboard-animation fade w-100 w-lg-fit-content',
        className,
      ])}
    >
      <h3 className='m-0 text-gray-900 fw-bold fs-26 text-center'>Sign in</h3>

      <Button
        className='btn-light btn-active-light-primary'
        onClick={() => {
          alert('This feature is not available.')
        }}
      >
        Sign In With Singpass
      </Button>

      <div className='w-100 w-lg-320px mw-100 d-flex flex-column gap-16px'>
        <Input
          classInputWrap='w-100'
          label='Customer Login ID'
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
        onClick={() => {
          alert('This feature is not available.')
        }}
      >
        Sign In
      </Button>
    </div>
  )
}

export default LoginForm
