import {getTheBeginningAndEndOfTheName} from '@/app/utils'
import HeaderUserMenu from './HeaderUserMenu'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList} from '@fortawesome/free-solid-svg-icons'
import HeaderMenuMobile from './HeaderMenuMobile'
import {Dispatch, useState} from 'react'

type Props = {
  showMenu: () => void
  hideMenu: () => void
  data: any
  isMenuVisible: boolean
  setSCroll: Dispatch<any>
  scroll: boolean
}

const ImgHeader = ({showMenu, hideMenu, isMenuVisible, data, setSCroll, scroll}: Props) => {
  const [show, setShow] = useState(false)
  return (
    <div className=' d-flex justify-content-center align-items-center h-100'>
      <div
        onClick={() => {
          if (!isMenuVisible) {
            showMenu()
          } else {
            hideMenu()
          }
        }}
        onMouseEnter={showMenu}
        onMouseLeave={hideMenu}
        className=' d-flex justify-content-center  h-100 align-items-center cursor-pointer'
      >
        <h1 className='img-header-portal fs-13 fw-bold text-black p-0 m-0'>
          {getTheBeginningAndEndOfTheName('Fung Yong Chang' || '')}
        </h1>
        <div style={{marginLeft: '16px'}} className='d-none d-xl-block'>
          <p className='text-full-mid-last-name fs-14 p-0 mb-4px'>
            {`${data?.lastName} ${data?.firstName}` || 'Guest'}
          </p>
          <p className='dropdown-text-role  fs-12 fw-normal p-0 m-0'>{data?.role || ''}</p>
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

      <div
        onClick={() => {
          setShow(true)
          setSCroll(true)
        }}
        className='app-navbar-item d-md-none ms-2 '
        title='Show header menu'
      >
        <div
          className='btn btn-icon btn-active-color-primary w-35px h-35px '
          id='kt_app_header_menu_toggle'
        >
          <FontAwesomeIcon icon={faList} className='menu-header-mobile' />
        </div>
      </div>
      {show && (
        <HeaderMenuMobile
          onClose={() => {
            setShow(false)
            setSCroll(false)
          }}
        />
      )}
    </div>
  )
}

export default ImgHeader
