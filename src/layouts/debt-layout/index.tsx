import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import DebtMenu from './DebtMenu'
import './style.scss'
import {useEffect} from 'react'
import {useAuth} from '@/app/context/AuthContext'
import Cookies from 'js-cookie'
import {useSocket} from '@/app/context/SocketContext'
import {swalConfirm} from '@/app/swal-notification'

const DebtLayout = () => {
  const {pathname} = useLocation()
  const {socket, setupSocket} = useSocket()
  const {company_id, currentUser, logout, refreshToken} = useAuth()

  // const {pathname} = useLocation()
  const navigate = useNavigate()

  const token = Cookies.get('token')

  useEffect(() => {
    // const pathNameArray = pathname.split('/')?.filter((path) => path)
    // const firstPathName = pathNameArray?.[0] || 'debt'

    const isViewProfile = pathname.includes('profile')
    !isViewProfile && Cookies.set('lastPageViewed', pathname)

    if (!token) {
      navigate('/login')
      socket?.disconnect()
    }
    refreshToken(token || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, pathname])

  useEffect(() => {
    if (!company_id) return

    setupSocket(company_id)
  }, [company_id])

  useEffect(() => {
    const handleDetectUserInactiveOrDeleted = async (data: any) => {
      if (data?.userId !== currentUser?.id) return

      Cookies.remove('token')

      try {
        await swalConfirm.fire({
          showCancelButton: false,
          confirmButtonText: 'OK',
          title: 'Log out',
          text: 'Your account has been deactivated or deleted by the administrator.',
        })
      } catch (error) {
        console.error(error)
      } finally {
        logout()
        navigate('/login')
        socket?.disconnect()
      }
    }

    socket?.on('disabledOrDeletedUser', handleDetectUserInactiveOrDeleted)

    return () => {
      socket?.off('disabledOrDeletedUser', handleDetectUserInactiveOrDeleted) // Clean up event listener on component unmount
    }
  }, [socket])

  return (
    <div className='debt d-flex justify-content-center vh-100 overflow-hidden'>
      <div className='d-flex flex-column wrapper-mobile-debt  h-100 bg-body overflow-hidden position-relative bg-f6f6f6'>
        {!!company_id && <Outlet />}
        <DebtMenu />
      </div>
    </div>
  )
}

export default DebtLayout
