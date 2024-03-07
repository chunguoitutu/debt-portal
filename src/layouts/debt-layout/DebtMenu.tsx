import {DEBT_MENU} from './config'
import clsx from 'clsx'
import {useLocation, useNavigate} from 'react-router-dom'

const DebtMenu = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()

  function handleChangeActive(newPathName: string) {
    navigate(newPathName)
  }

  return (
    <nav className='debt__menu mt-auto bg-black position-sticky bottom-0'>
      <ul className='debt__menu-list d-flex list-style-none m-0 p-0 px-12px gap-8px'>
        {DEBT_MENU.map((menu) => {
          const isActive = pathname === menu.path
          const IconComponent = menu.icon

          return (
            <li
              key={menu.id}
              className={clsx([
                'debt__menu-item cursor-pointer fs-13 flex-grow-1 text-white d-flex flex-column justify-content-between fw-semibold align-items-center gap-8px',
                isActive && 'active',
              ])}
              onClick={() => handleChangeActive(menu.path)}
              style={{opacity: pathname === menu.path ? 'unset' : '0.6'}}
            >
              <div className='text-white'>
                <IconComponent />
              </div>
              {menu.label}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default DebtMenu
