import {useEffect} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import mainLogo from '../../../app/images/main-logo.png'
import Cookies from 'js-cookie'

const AuthLayout = () => {
  const token = Cookies.get('token')

  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }

    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (token) {
    return <Navigate to='/dashboard' />
  }

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center'
        style={{backgroundColor: '#050B18'}}
      >
        <div className='d-flex flex-column flex-center py-15 px-5 px-md-15 w-100'>
          <img
            className='mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
            src={mainLogo}
            alt=''
          />
        </div>
      </div>

      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          <div className='w-lg-500px p-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export {AuthLayout}
