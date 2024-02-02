import {useShared} from '@/app/context/SharedContext'
import './style.scss'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'

import {Dispatch, useState} from 'react'
import ImgHeader from './ImgHeader'
import LogoHeader from './LogoHeader'
import LogInHeader from './LogInHeader'

export const linkHeader = [
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
  const {showLoginForm, setShowLoginForm} = useShared()
  const [isMenuVisible, setMenuVisible] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  const currentPath = location.pathname

  function toggleFormLogin() {
    if (!showLoginForm) {
      window?.scroll({
        top: 0,
        behavior: 'smooth',
      })
    }
    setShowLoginForm((prev) => !prev)
  }

  function handleNavigate() {
    if (currentPath === '/') {
      navigate('/')
    } else {
      navigate('/dashboard')
    }
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
    <header className='header  bg-black'>
      <div className='container h-100 d-flex align-items-center justify-content-between gap-12px gap-sm-24px'>
        {/* Logged */}
        <LogoHeader handleNavigate={handleNavigate} />

        {currentPath !== '/' && (
          <div className='d-none d-md-block h-100'>
            <div className='d-flex justify-content-center h-100 align-items-center '>
              {linkHeader.map((el, i) => {
                return (
                  <NavLink
                    className={({isActive}) =>
                      `${
                        isActive ? 'active-link ' : 'disable-link'
                      }  px-16px d-flex fs-16 fw-semibold justify-content-center  align-items-center link-header-portal`
                    }
                    key={i}
                    to={el?.to}
                  >
                    {el?.title}
                  </NavLink>
                )
              })}
            </div>
          </div>
        )}

        {/* Not logged */}
        {currentPath === '/' ? (
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
