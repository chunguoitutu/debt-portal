import {NavLink} from 'react-router-dom'
import {linkHeader} from '.'
import clsx from 'clsx'
import useClickOutside from '@/app/hooks/useClickOutside'
import {useRef} from 'react'

type Props = {
  show: boolean
  onClose: () => void
}

const HeaderMenuMobile = ({show, onClose}: Props) => {
  const menuRef = useRef(null)

  useClickOutside(menuRef, onClose)

  return (
    <div
      className={clsx([
        'header-mobile-menu-portal d-flex justify-content-center align-items-center',
        show ? 'showed' : 'visibility-hidden pe-none user-select-none',
      ])}
    >
      <nav
        className='mobile-menu-portal d-flex flex-column justify-content-center gap-16px p-16px'
        ref={menuRef}
      >
        {linkHeader.map((el, i) => {
          return (
            <NavLink
              onClick={onClose}
              className={({isActive}) =>
                `${
                  isActive ? 'active-mobile' : 'disable-mobile'
                } fs-14 fw-semibold link-header-portal h-fit-content py-12px px-24px`
              }
              key={i}
              to={el?.to}
            >
              {el?.title}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}

export default HeaderMenuMobile
