/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link} from 'react-router-dom'
import {useAuth} from '../../../auth'

export function Overview() {
  const {currentUser} = useAuth()
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>

          <Link
            to='/account/settings'
            className='btn btn-primary align-self-center'
            style={{fontSize: 12}}
          >
            Edit Profile
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-semibold text-muted'>Full Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {`${currentUser?.firstname} ${currentUser?.middlename || ''} ${
                  currentUser?.lastname || ''
                }`}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-semibold text-muted'>Branch Name</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{currentUser?.branch_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-semibold text-muted'>Contact Phone</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{currentUser?.telephone}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-semibold text-muted'>Role</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currentUser?.role_name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-semibold text-muted'>Contact Email</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currentUser?.email}</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-semibold text-muted'>Status</label>

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
