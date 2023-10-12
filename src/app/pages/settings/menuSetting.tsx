/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useAuth} from '../../modules/auth'

const MenuSetting: React.FC = () => {
  const location = useLocation()
  const {currentUser} = useAuth()

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-0 pb-0 '>
        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/settings/company' && 'active')
                }
                to='/settings/company'
              >
                Companies
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/settings/branch' && 'active')
                }
                to='/settings/branch'
              >
                branch
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/campaigns' && 'active')
                }
                to='/crafted/pages/profile/campaigns'
              >
                Campaigns
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/documents' && 'active')
                }
                to='/crafted/pages/profile/documents'
              >
                Documents
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/roles' && 'active')
                }
                to='/roles'
              >
                Roles
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/connections' && 'active')
                }
                to='/settings/loan-type'
              >
                Loan Type
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {MenuSetting}
