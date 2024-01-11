import clsx from 'clsx'
import {HeaderNotificationsMenu} from '../../../partials'
import {AiOutlineSetting} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {useLayout} from '../../core'
import {KTIcon} from '../../../helpers'
import {Link, useLocation} from 'react-router-dom'
import Avatar from '../../../../app/modules/profile/components/profile/Avatar'
import {useMemo, useState} from 'react'
import {useAuth} from '../../../../app/context/AuthContext'
import HeaderUserMenu from '@/_metronic/partials/layout/header-menus/HeaderUserMenu'
import './style.scss'
import {getFullName} from '@/app/utils'

const itemClass = 'ms-1 ms-md-4'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px'
const userAvatarClass = 'symbol-35px'
const btnIconClass = 'fs-2'

const Navbar = () => {
  const {config} = useLayout()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {currentUser, priority} = useAuth()
  const [isMenuVisible, setMenuVisible] = useState(false)

  const showMenu = () => {
    setMenuVisible(true)
  }

  const hideMenu = () => {
    setMenuVisible(false)
  }

  const location = useLocation()

  return (
    <div className='app-navbar'>
      {/* Priority <= 2 means super admin or admin */}
      {priority <= 2 && (
        <Link
          to={`/settings/${priority === 1 ? 'business-units' : 'manager-users'}`}
          className={clsx('app-navbar-item', itemClass)}
        >
          <div
            data-kt-menu-trigger="{default: 'click'}"
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            className={`${btnClass} ${
              location.pathname?.split('/').includes('settings')
                ? 'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px show menu-dropdown'
                : ''
            }`}
          >
            <AiOutlineSetting className={btnIconClass} />
          </div>
        </Link>
      )}

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          className={btnClass}
        >
          <IoMdNotificationsOutline className={btnIconClass} />
        </div>
        <HeaderNotificationsMenu />
      </div>
      <div
        className={clsx('app-navbar-item', itemClass)}
        onMouseEnter={showMenu}
        onMouseLeave={hideMenu}
      >
        <div className={clsx('app-navbar-item', itemClass)}>
          <div className={clsx('cursor-pointer symbol', userAvatarClass)}>
            <div className='navbar-user-custom-non-metronic'>
              <Avatar
                firstname={currentUser?.firstname}
                lastname={currentUser?.lastname}
                style={{
                  width: 35,
                  height: 35,
                  objectFit: 'cover',
                  borderRadius: '0.475rem',
                }}
              />
              <div style={{marginLeft: '16px'}} className='d-none d-xl-block'>
                <p className='text-full-mid-last-name'>{getFullName(currentUser) || 'Guest'}</p>
                <p className='dropdown-text-role'>{currentUser?.role_name || ''}</p>
              </div>
            </div>
          </div>
          {isMenuVisible && (
            <div
              style={{
                position: 'relative',
                right: 200,
              }}
            >
              <HeaderUserMenu />
            </div>
          )}
        </div>
      </div>
      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTIcon iconName='text-align-left' className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  )
}

export {Navbar}
