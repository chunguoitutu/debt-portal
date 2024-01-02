import {Navigate, Outlet} from 'react-router-dom'
import logo from './../../app/images/logo-login.png'
import Cookies from 'js-cookie'
import {FooterWrapper} from '@/components/footer'
import './style.scss'

const AuthLayout = () => {
  const token = Cookies.get('token')

  if (token) {
    return <Navigate to='/dashboard' />
  }

  return (
    <>
      <div className='d-flex flex-column flex-root bg-auth flex-column-fluid flex-lg-row bg-norepeat-sign-in'>
        <div className='d-flex flex-row justify-content-center px-10 px-sm-15 px-xl-96px py-9 bgi-size-cover bgi-position-center object-fit-cover'>
          <img
            src={logo}
            alt='logo'
            style={{
              backgroundBlendMode: 'overlay',
              mixBlendMode: 'overlay',
              width: '59.43px',
              height: '80px',
            }}
            className='w-lg-140px  mw-100 object-fit-contain align-self-center'
          />
          <div className='d-flex flex-column justify-content-center'>
            <h1 className='text-capitalize  m-0 title-company-welcome'>Welcome To</h1>
            <h1 className='text-capitalize m-0 name-company-signin'>The Finance 360 System</h1>
            <span className='text-capitalize fs-2 fw-semibold text-FCFCFC' style={{paddingTop: 32}}>
              Sign In To Access Your Account
            </span>
          </div>
        </div>

        <div
          className='d-flex flex-column flex-lg-row-fluid align-items-center w-lg-50 p-13 order-2 order-lg-1 ms-9 me-15 align-self-center mb-10'
          style={{height: 600}}
        >
          <div className='d-flex flex-center flex-column flex-lg-row-fluid bg-white rounded-18 sign-in-page-custom-dev'>
            <div className='p-lg-10 responsive-sign-in'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {AuthLayout}
