/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo} from 'react'
import {NavLink, Navigate} from 'react-router-dom'
import {useAuth} from '../../modules/auth'

const MenuSetting: React.FC = () => {
  const {priority} = useAuth()

  const menuArray = useMemo(() => {
    const fullMenu = [
      {
        to: '/settings/companies',
        label: 'Companies',
      },
      {
        to: '/settings/branches',
        label: 'Branches',
      },
      {
        to: '/settings/users',
        label: 'Users',
      },
      {
        to: '/settings/roles',
        label: 'Roles',
      },
      {
        to: '/settings/document-type',
        label: 'Document Type',
      },
      {
        to: '/settings/loan-type',
        label: 'Loan Type',
      },
      {
        to: '/settings/job-type',
        label: 'Job Type',
      },
      {
        to: '/settings/address-type',
        label: 'Address Type',
      },
      {
        to: '/settings/marketing-type',
        label: 'Marketing Type',
      },
      {
        to: '/settings/rejection-type',
        label: 'Rejection Type',
      },
    ]

    // Priority = 2 means admin
    if (priority === 2) return fullMenu.filter((menu) => ['Branches', 'Users'].includes(menu.label))

    return fullMenu
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority])

  // If priority > 2 means not super admin or admin
  if (priority > 2) return <Navigate to='/error/404' />

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-0 pb-0 '>
        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            {menuArray.map(({to, label}, i) => {
              return (
                <li className='nav-item' key={i}>
                  <NavLink
                    className={({isActive}) =>
                      'nav-link text-active-primary me-6' + (isActive ? ' active' : '')
                    }
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {MenuSetting}
