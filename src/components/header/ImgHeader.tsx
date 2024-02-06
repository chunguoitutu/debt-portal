import {getTheBeginningAndEndOfTheName} from '@/app/utils'
import HeaderUserMenu from './HeaderUserMenu'
import HeaderMenuMobile from './HeaderMenuMobile'
import {Dispatch, useState} from 'react'
import barsImg from '@/app/images/bar.png'

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
        <h1 className='img-header-portal fs-13 fw-bold text-black w-28px h-28px w-lg-35px h-lg-35px p-0 m-0 me-12px'>
          {getTheBeginningAndEndOfTheName('Fung Yong Chang' || '')}
        </h1>
        <div className='d-none d-xl-block'>
          <p className='text-full-mid-last-name fs-14 p-0 mb-4px'>
            {`${data?.lastName} ${data?.firstName}` || 'Guest'}
          </p>
          <p className='dropdown-text-role  text-capitalize  fs-12 fw-normal p-0 m-0'>
            {data?.role || ''}
          </p>
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
        className='app-navbar-item d-lg-none ms-2'
        title='Show header menu'
      >
        <img src={barsImg} alt='bars' className='cursor-pointer' />
      </div>
      <HeaderMenuMobile
        show={show}
        onClose={() => {
          setShow(false)
          setSCroll(false)
        }}
      />
    </div>
  )
}

export default ImgHeader
