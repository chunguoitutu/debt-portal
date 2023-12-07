/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {FormikHelpers, useFormik} from 'formik'
import clsx from 'clsx'
import {useNavigate, useSearchParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import request from '../../../app/axios'
import Form from 'react-bootstrap/Form'
import {LoginInfo} from '@/app/types'
import {Input} from '@/components/input'
import {login} from '@/app/axios/request'
import {convertErrorMessageResponse} from '@/app/utils'
import Button from '@/components/button/Button'
import {DEFAULT_MESSAGE_ERROR_500} from '@/app/constants'

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
  const [isAdmin, setIsAdmin] = useState(false)
  const [listBranch, setListBranch] = useState<null | any[]>(null)
  const [token, setToken] = useState<any>({})
  const redirect = searchParams.get('redirect')

  const navigate = useNavigate()

  const {
    status,
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setStatus,
    setSubmitting,
    resetForm,
  } = useFormik<LoginInfo>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  })

  /**
   * handle login system
   * @param values info login
   */

  async function onSubmit(values: LoginInfo) {
    setLoading(true)

    try {
      const {data} = await login(values)
      const {info, token} = data || {}
      const {priority, company_id, company_name} = info

      // If account isn't active -> no login
      if (data.error || !priority || !company_id || !company_name) {
        setStatus(data.message || DEFAULT_MESSAGE_ERROR_500)
        setSubmitting(false)
        setLoading(false)
        return
      }

      Cookies.set('token', data.token)
      Cookies.set('company_id', company_id.toString())
      Cookies.set('company_name', company_name)

      // priority === 1 -> super admin -> need select company first
      if (priority === 1) {
        const {data} = await request.post('config/company/listing', {
          status: true,
        })

        // unexpected error
        if (data.error || !Array.isArray(data?.data) || !data?.data.length) {
          setStatus(data?.message || DEFAULT_MESSAGE_ERROR_500)
          setSubmitting(false)
          setLoading(false)
          return
        }

        setSubmitting(false)
        setLoading(false)
        setListBranch(data.data)
        setToken(token)
        return
      }

      // after navigate -> master layout will get current user
      navigate(`/${redirect ? redirect : 'dashboard'}`)
    } catch (error) {
      const message = convertErrorMessageResponse(error)
      setStatus(message)
      setSubmitting(false)
      setLoading(false)
    }
  }

  const handleSelectBranch = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target

    const currentBranch = listBranch?.find((el: any) => el.id === +value)

    if (value && currentBranch) {
      Cookies.set('company_id', value)
      Cookies.set('company_name', currentBranch?.company_name || '')
      navigate(`/${redirect ? redirect : 'dashboard'}`)
    } else {
      setStatus('Something went wrong!')
      setListBranch(null)
      resetForm()
      setSubmitting(false)
    }
  }

  function checkValidInput(key: string) {
    return clsx(
      {
        'is-invalid': errors[key] && touched[key],
      },
      {
        'is-valid': !errors[key] && touched[key],
      }
    )
  }

  return (
    <>
      {!!listBranch ? (
        <Form.Group controlId='formBasicSelect'>
          <label className='form-label fs-6 fw-bolder text-dark mb-2'>Please Select Company:</label>
          <Form.Select as='select' onChange={handleSelectBranch}>
            <option value=''>{''}</option>
            {listBranch.map((el) => (
              <option key={el?.company_name + el?.id} value={el?.id}>
                {el?.company_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      ) : (
        <form className='form w-100' onSubmit={handleSubmit} noValidate id='kt_login_signin_form'>
          <div className='text-start mb-11'>
            <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
            <div className='text-gray-500 fw-semibold fs-6'>Please Sign In With Your Account</div>
          </div>

          {status && (
            <div className='mb-8 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{status}</div>
            </div>
          )}

          <div className='fv-row mb-8'>
            <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
            <Input
              placeholder='Username'
              {...getFieldProps('username')}
              classInputWrap={checkValidInput('username')}
              className={checkValidInput('username')}
              type='username'
              name='username'
              autoComplete='off'
              touched={touched.username}
              error={errors.username as string}
            />
          </div>

          <div className='fv-row'>
            <label className='form-label fw-bolder text-dark fs-6'>Password</label>
            <Input
              type='password'
              autoComplete='off'
              placeholder='Password'
              classInputWrap={checkValidInput('password')}
              className={checkValidInput('password')}
              {...getFieldProps('password')}
              touched={touched.password}
              error={errors.password as string}
            />
          </div>

          <div className='d-grid mt-8'>
            <Button
              className='btn-primary text-center'
              loading={loading}
              disabled={
                loading ||
                !!(touched.password && errors.password) ||
                !!(touched.username && errors.username)
              }
            >
              Continue
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
