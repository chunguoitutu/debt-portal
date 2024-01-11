/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import './style.scss'

import {KTIcon} from '../../../../../_metronic/helpers'
import AvatarHeader from './AvatarHeader'
import {useAuth} from '../../../../context/AuthContext'

const AccountHeader: React.FC = () => {
  const location = useLocation()

  const {currentUser} = useAuth()

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-5'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-100px symbol-fixed position-relative'>
              <AvatarHeader firstname={currentUser?.firstname} lastname={currentUser?.lastname} />
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-hover-primary style-image-account-header'>
                    {`${currentUser?.firstname} ${currentUser?.lastname || ''}`}
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-3 mt-0 pe-2'>
                  <span className='d-flex align-items-center text-gray-500 me-4 mb-2'>
                    <KTIcon iconName='sms' className='fs-4 me-1 mb-0' />
                    {currentUser?.email || 'None'}
                  </span>
                  <span className='d-flex align-items-center text-gray-500 me-4 mb-2'>
                    <KTIcon iconName='phone' className='fs-4 me-1 mb-0' />
                    {currentUser?.telephone || 'None'}
                  </span>
                  <span
                    className={`d-flex align-items-center text-gray-500 mb-2 ${
                      currentUser?.is_active === 1 ? 'active' : 'disabled'
                    }`}
                  >
                    {currentUser?.is_active === 1 ? (
                      <>
                        <KTIcon iconName='check' className='fs-4 me-1 mb-0' />
                        Active
                      </>
                    ) : (
                      <>
                        <KTIcon iconName='close' className='fs-4 me-1 mb-0' />
                        Disabled
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'></div>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 flex-nowrap fw-bold'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 fw-bolder ` +
                  (location.pathname === '/account/overview' && 'active')
                }
                to='/account/overview'
              >
                Overview
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 fw-bolder ` +
                  (location.pathname === '/account/settings' && 'active')
                }
                to='/account/settings'
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {AccountHeader}
