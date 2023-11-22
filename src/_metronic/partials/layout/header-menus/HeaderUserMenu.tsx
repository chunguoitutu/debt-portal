/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../../../../app/modules/profile/components/profile/Avatar'
import {useAuth} from '../../../../app/context/AuthContext'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout, company_name} = useAuth()

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-300px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <Avatar
              firstname={currentUser?.firstname}
              lastname={currentUser?.lastname}
              style={{width: 50, height: 50}}
            />
          </div>
          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {` ${currentUser?.firstname} ${currentUser?.middlename || ''} ${
                currentUser?.lastname || ''
              } `}
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7 two-line'>
              {currentUser?.email}
            </a>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {company_name}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5 my-1'>
        <Link to='/account/overview' className='menu-link px-5 fs-6'>
          Account Settings
        </Link>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <span onClick={() => logout()} className='menu-link px-5 fs-6'>
          Sign Out
        </span>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
