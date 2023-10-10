import clsx from 'clsx'
import {HeaderNotificationsMenu, HeaderUserMenu} from '../../../partials'
import {AiOutlineSetting} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {useLayout} from '../../core'
import {KTIcon} from '../../../helpers'

const itemClass = 'ms-1 ms-md-4'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px'
const userAvatarClass = 'symbol-35px'
const btnIconClass = 'fs-2'

const Navbar = () => {
  const {config} = useLayout()
  return (
    <div className='app-navbar'>
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
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
          className={btnClass}
        >
          <AiOutlineSetting className={btnIconClass} />
        </div>
        <HeaderNotificationsMenu />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <div
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
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
            <img
              alt='Logo'
              src='https://vcdn-thethao.vnecdn.net/2021/12/13/2-jpeg-1639413745-3590-1639413816.jpg'
              style={{
                width: '22px',
                borderRadius: '50%',
                height: '22px',
                objectFit: 'cover',
              }}
            />
            <div className='d-none d-lg-block'>
              <p
                style={{
                  marginLeft: '16px',
                  wordWrap: 'break-word',
                  lineHeight: 'normal',
                  fontWeight: '400',
                  fontStyle: 'normal',
                  fontSize: '14px',
                  color: 'white',
                  margin: '0',
                }}
              >
                Darlene Robertson
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
                Officer
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
