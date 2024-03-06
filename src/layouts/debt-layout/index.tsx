import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import DebtMenu from './DebtMenu'
import './style.scss'
import {useEffect} from 'react'
import {useAuth} from '@/app/context/AuthContext'
import Cookies from 'js-cookie'

const DebtLayout = () => {
  const {pathname} = useLocation()
  const {refreshToken} = useAuth()

  // const {pathname} = useLocation()
  const navigate = useNavigate()

  const token = Cookies.get('token')

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login')
  //   }
  //   refreshToken(token || '')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [token, pathname])

  return (
    <div className='debt d-flex justify-content-center vh-100 overflow-hidden'>
      <div className='d-flex flex-column mw-500px w-100 h-100 bg-body overflow-hidden position-relative'>
        <Outlet />
        <DebtMenu />
      </div>
    </div>
  )
}

export default DebtLayout
