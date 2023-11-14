import {FC} from 'react'
import {Link} from 'react-router-dom'
import './style.scss'

const ApplicationsMenu: FC = () => {
  return (
    <>
      <div className='dropdown-menu-application'>
        <div className='dropdown-fixed'>
          <div className='menu-item px-5 my-1'>
            <Link
              id='application-listings'
              to='/application/listing'
              className='menu-link fs-5 px-4 menu-item-child mt-2'
            >
              Application Listing
            </Link>
          </div>
          <div className='menu-item px-5'>
            <Link
              id='applications'
              to='/application/create'
              className='menu-link fs-5 px-4 menu-item-child mb-3'
            >
              Create Application
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export {ApplicationsMenu}
