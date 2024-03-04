import Icons from '@/components/icons'
import {DEBT_MENU} from './config'
import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {useLocation, useNavigate} from 'react-router-dom'

const DebtMenu = () => {
  const [currentActive, setCurrentActive] = useState<number>(
    DEBT_MENU.find((menu) => menu.default)?.id || DEBT_MENU[0]?.id
  )

  const navigate = useNavigate()
  const {pathname} = useLocation()

  function handleChangeActive(newPathName: string) {
    navigate(newPathName)
  }

  return (
    <nav className='debt__menu mt-auto bg-black position-sticky bottom-0'>
      <ul className='debt__menu-list d-flex list-style-none m-0 p-0 px-12px gap-8px'>
        {DEBT_MENU.map((menu) => {
          const isActive = menu.id === currentActive

          return (
            <li
              key={menu.id}
              className={clsx([
                'debt__menu-item cursor-pointer fs-12px flex-grow-1 text-white d-flex flex-column justify-content-center align-items-center gap-8px',
                pathname === menu.path && 'active',
              ])}
              onClick={() => handleChangeActive(menu.path)}
            >
              <Icons name={menu.icon} />
              {menu.label}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default DebtMenu
