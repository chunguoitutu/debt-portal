import {FC, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './style.scss'
import {getTheBeginningAndEndOfTheName} from '@/app/utils'
import Cookies from 'js-cookie'
import {useShared} from '@/app/context/SharedContext'

const HeaderUserMenu: FC = () => {
  const navigate = useNavigate()
  const {setShowLoginForm} = useShared()

  function handleLogOut() {
    Cookies.remove('token')
    setTimeout(() => {
      window?.scroll({
        top: 0,
        behavior: 'smooth',
      })
      setShowLoginForm(true)
    }, 100)
    navigate('/')
  }

  return (
    <div className='dropdown-menu-application'>
      <div className='dropdown-fixed fw-bold  fs-6 w-250px' style={{zIndex: 999999}}>
        <div className='d-flex px-24px mt-24px mb-20px'>
          <div className='symbol symbol-50px me-16px'>
            <h1 className='img-header-portal w-28px w-lg-35px aspect-ratio-1-1 fs-13 fw-bold text-black p-0 m-0'>
              {getTheBeginningAndEndOfTheName('Fung Yong Chang' || '')}
            </h1>
          </div>
          <div className='d-flex flex-column' style={{marginTop: '-4px'}}>
            <div className='fw-semibold d-flex align-items-center fs-14'>{'Fung Yong Chang'}</div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7 two-line'>
              {''}
            </a>
            <a
              href='#'
              className='fw-normal text-muted text-capitalize text-gray-600 text-hover-primary fs-7'
            >
              {'Customer'}
            </a>
          </div>
        </div>

        <div className='separator mb-2'></div>

        <div className='menu-item px-5 my-1'>
          <Link
            to='/profile'
            className='menu-link px-5 fs-6 text-dropdown-black text-gray-900 menu-item-child'
          >
            My Profile
          </Link>
        </div>

        <div className='separator my-2'></div>

        <div className='menu-item px-5 mb-2'>
          <span
            onClick={handleLogOut}
            className='menu-link px-5 fs-6 text-dropdown-black text-gray-900 menu-item-child'
          >
            Sign Out
          </span>
        </div>
      </div>
    </div>
  )
}
export default HeaderUserMenu
