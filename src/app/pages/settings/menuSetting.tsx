/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link, useLocation} from 'react-router-dom'

const MenuSetting: React.FC = () => {
  const location = useLocation()

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
                Branch
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/settings/documents-type' && 'active')
                }
                to='/settings/documents-type'
              >
                Documents Type
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/settings/roles' && 'active')
                }
                to='/settings/roles'
              >
                Roles
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/settings/loan-type' && 'active')
                }
                to='/settings/loan-type'
              >
                Loan Type
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/settings/job-type' && 'active')
                }
                to='/settings/job-type'
              >
                Job Type
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/settings/address-type' && 'active')
                }
                to='/settings/address-type'
              >
                Address Type
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {MenuSetting}
