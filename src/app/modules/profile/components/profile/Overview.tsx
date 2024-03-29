/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link} from 'react-router-dom'

import {useAuth} from '../../../../context/AuthContext'
import {getFullName} from '@/app/utils'

export function Overview() {
  const {currentUser} = useAuth()
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link to='/account/settings' className='btn btn-primary align-self-center fs-14'>
            Edit Profile
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6 text-dark'>{getFullName(currentUser)}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{currentUser?.company_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Role</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6 text-dark'>{currentUser?.role_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Contact Phone</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bold fs-6 me-2'>+65{currentUser?.telephone}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Contact Email</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6 text-dark'>{currentUser?.email}</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Status</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>
                {currentUser?.is_active === 1 ? 'Active' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
