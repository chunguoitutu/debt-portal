import {NavLink} from 'react-router-dom'
import {linkHeader} from '.'
import clsx from 'clsx'
import {useShared} from '@/app/context/SharedContext'

type Props = {
  onClose: () => void
}

const HeaderMenuMobile = ({onClose}: Props) => {
  const {showLoginForm} = useShared()
  return (
    <div
      className={clsx([
        'header-mobile-menu-portal d-flex justify-content-center align-items-center ',
        !showLoginForm ? 'viewed' : 'visibility-hidden pe-none user-select-none',
      ])}
    >
      <div onClick={onClose} className='w-100 h-100'></div>
      <div className='mobile-menu-portal'>
        <div className='d-flex justify-content-center flex-column align-items-start '>
          {linkHeader.map((el, i) => {
            return (
              <NavLink
                onClick={onClose}
                className={({isActive}) =>
                  `${
                    isActive ? 'active-mobile' : 'disable-mobile'
                  } px-12px py-9px w-100 d-flex fs-13 fw-semibold justify-content-start h-100 align-items-center link-header-portal`
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
    </div>
  )
}

export default HeaderMenuMobile
