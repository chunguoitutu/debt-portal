import clsx from 'clsx'
import {HeaderNotificationsMenu, HeaderUserMenu} from '../../../partials'
import {AiOutlineSetting} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {useLayout} from '../../core'
import {KTIcon} from '../../../helpers'
import {Link, useLocation} from 'react-router-dom'
import Avatar from '../../../../app/modules/profile/components/profile/Avatar'
import {useMemo} from 'react'
import {useAuth} from '../../../../app/context/AuthContext'

const itemClass = 'ms-1 ms-md-4'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px'
const userAvatarClass = 'symbol-35px'
const btnIconClass = 'fs-2'

const Navbar = () => {
  const {config} = useLayout()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {currentUser, priority} = useAuth()
  const {firstname, lastname, middlename} = currentUser || {}

  const fullName = useMemo(
    () => {
      if (!currentUser) return 'Guest'
      let name = firstname || ''
      middlename && (name = name.trim() + ` ${middlename}`)
      lastname && (name = name.trim() + ` ${lastname}`)
      return name
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firstname, lastname, middlename]
  )
  const location = useLocation()

  return (
    <div className='app-navbar'>
      {/* Priority <= 2 means super admin or admin */}
      {priority <= 2 && (
        <Link
          to={`/settings/${priority === 1 ? 'company-management' : 'users'}`}
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

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'hover'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <div
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '4px',
              paddingBottom: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#071437',
              borderRadius: '100px',
              border: '1px solid var(--color-border-border-gray-800, #252F4A)',
            }}
          >
            <Avatar
              firstname={currentUser?.firstname}
              lastname={currentUser?.lastname}
              style={{
                width: 30,
                borderRadius: '50%',
                height: 30,
                objectFit: 'cover',
              }}
            />
            <div style={{marginLeft: '16px'}} className='d-none d-xl-block'>
              <p
                style={{
                  wordWrap: 'break-word',
                  lineHeight: 'normal',
                  fontWeight: '400',
                  fontStyle: 'normal',
                  fontSize: '14px',
                  color: 'white',
                  margin: '0',
                }}
              >
                {fullName}
              </p>
              <p
                style={{
                  lineHeight: 'normal',
                  fontWeight: '400',
                  fontStyle: 'normal',
                  fontSize: '12px',
                  color: 'white',
                  margin: '0',
                  opacity: '0.7',
                }}
              >
                {currentUser?.role_name || ''}
              </p>
            </div>
          </div>
        </div>
        <HeaderUserMenu />
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
