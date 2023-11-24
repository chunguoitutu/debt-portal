import {Navigate, Outlet} from 'react-router-dom'
import logo from './../../app/images/logo-auth.png'
import welcomeText from './../../app/images/welcome-3d.svg'
import Cookies from 'js-cookie'
import {FooterWrapper} from 'src/_metronic/layout/components/footer'

const AuthLayout = () => {
  const token = Cookies.get('token')

  if (token) {
    return <Navigate to='/dashboard' />
  }

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      <div className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center bg-auth w-100 h-100 object-fit-cover'>
        <div className='d-flex flex-column justify-content-center gap-5 gap-lg-32px px-10 px-sm-15 px-xl-96px py-9'>
          <img
            src={logo}
            alt='logo'
            style={{
              backgroundBlendMode: 'overlay',
              mixBlendMode: 'overlay',
            }}
            className='w-50px w-lg-140px  mw-100 object-fit-contain'
          />
          <div>
            <img
              style={{
                padding: '0',
                marginLeft: '-8px',
              }}
              className='mw-100 object-fit-contain'
              src={welcomeText}
              alt='welcome'
            />
            <h1 className='text-capitalize text-white m-0 fw-normal fs-xl-2tx'>
              The Money Lending System Monetium Credit
            </h1>
          </div>
          <span className='text-capitalize text-white fs-2 fw-semibold'>
            Sign In To Access Your Account
          </span>
        </div>
      </div>

      <div className='d-flex flex-column flex-lg-row-fluid align-items-center w-lg-50 p-13 order-2 order-lg-1'>
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          <div className='w-lg-500px p-lg-10'>
            <Outlet />
          </div>
        </div>
        <FooterWrapper className='p-0 d-none d-lg-block' />
      </div>
    </div>
  )
}

export {AuthLayout}
