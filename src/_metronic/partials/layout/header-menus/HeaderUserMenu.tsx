import {useAuth} from '../../../../app/context/AuthContext'
import Avatar from '@/app/modules/profile/components/profile/Avatar'
import {FC} from 'react'
import {Link} from 'react-router-dom'
import './style.scss'
import {getFullName} from '@/app/utils'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout, company_name} = useAuth()

  return (
    <div className='dropdown-menu-application'>
      <div className='dropdown-fixed fw-bold py-4 fs-6 w-300px'>
        <div className='d-flex ms-5 p-2'>
          <div className='symbol symbol-50px me-5'>
            <Avatar
              firstname={currentUser?.firstname}
              lastname={currentUser?.lastname}
              style={{width: 50, height: 50}}
            />
          </div>
          <div className='d-flex flex-column' style={{marginTop: '-4px'}}>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {getFullName(currentUser)}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7 two-line'>
              {currentUser?.email}
            </a>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {company_name}
            </a>
          </div>
        </div>

        <div className='separator my-2'></div>

        <div className='menu-item px-5 my-1'>
          <Link
            to='/account/overview'
            className='menu-link px-5 fs-6 text-dropdown-black menu-item-child'
          >
            Account Settings
          </Link>
        </div>

        <div className='separator my-2'></div>

        <div className='menu-item px-5'>
          <span
            onClick={() => logout()}
            className='menu-link px-5 fs-6 text-dropdown-black menu-item-child'
          >
            Sign Out
          </span>
        </div>
      </div>
    </div>
  )
}
export default HeaderUserMenu
