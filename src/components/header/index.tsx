import {useShared} from '@/app/context/SharedContext'
import './style.scss'
import {NavLink, useNavigate} from 'react-router-dom'

import {Dispatch, useEffect, useState} from 'react'
import ImgHeader from './ImgHeader'
import LogoHeader from './LogoHeader'
import LogInHeader from './LogInHeader'
import Cookies from 'js-cookie'
import clsx from 'clsx'

export const linkHeader = [
  {id: 2, to: '/', title: 'Home'},

  {id: 2, to: '/dashboard', title: 'Dashboard'},
  {
    id: 3,
    to: '/my-loans',
    title: 'My Loans',
  },
  {
    id: 4,
    to: '/application',
    title: 'New Application',
  },
]
interface Props {
  setSCroll: Dispatch<any>
  scroll: boolean
}

const Header = ({setSCroll, scroll}: Props) => {
  const [token, setToken] = useState(Cookies.get('token'))
  const {showLoginForm, setShowLoginForm} = useShared()
  const [isMenuVisible, setMenuVisible] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setToken(Cookies.get('token'))
  }, [Cookies.get('token')])

  function toggleFormLogin() {
    if (!showLoginForm) {
      window?.scroll({
        top: 0,
        behavior: 'smooth',
      })
    }
    setShowLoginForm(!showLoginForm)
  }
  console.log(showLoginForm)

  function handleNavigate() {
    navigate('/')
  }

  const fakeData = {
    lastName: 'Fung',
    firstName: 'Yong Chang',
    role: 'customer',
  }

  const showMenu = () => {
    setMenuVisible(true)
  }

  const hideMenu = () => {
    setMenuVisible(false)
  }

  return (
    <header className='header bg-black px-0 px-md-3'>
      <div className='container h-100 d-flex align-items-center justify-content-between gap-12px gap-sm-24px p-20px py-sm-0  px-sm-0'>
        {/* Logged */}
        <LogoHeader handleNavigate={handleNavigate} />

        {!!token && (
          <div
            className={clsx([
              'd-none d-md-block h-100',
              !showLoginForm ? 'viewed' : 'visibility-hidden pe-none user-select-none',
            ])}
          >
            <div className='d-flex justify-content-center h-100 align-items-center '>
              {linkHeader.map((el, i) => {
                return (
                  <div key={i} className='cursor-pointer'>
                    <NavLink
                      className={({isActive}) =>
                        `${
                          isActive ? 'active-link ' : 'disable-link'
                        }   d-flex fs-14 fw-semibold justify-content-center align-items-center link-header-portal`
                      }
                      to={el?.to}
                    >
                      {el?.title}
                    </NavLink>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Not logged */}
        {!token ? (
          <LogInHeader toggleFormLogin={toggleFormLogin} />
        ) : (
          <ImgHeader
            setSCroll={setSCroll}
            scroll={scroll}
            data={fakeData}
            hideMenu={hideMenu}
            showMenu={showMenu}
            isMenuVisible={isMenuVisible}
          />
        )}
      </div>
    </header>
  )
}

export default Header
