import { FC } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const ApplicationsMenu: FC = () => {
  return (
    <>
      <div className='dropdown-menu-application'>
        <div className='dropdown-fixed'>
          <div className='menu-item px-5 my-1'>
              <Link id='applications' to='/applications' className='menu-link fs-5 px-4 menu-item-child mt-2'>
                Application
              </Link>
          </div>

          <div className='menu-item px-5'>
              <Link id='application-listings' to='/application-listings' className='menu-link fs-5 px-4 menu-item-child mb-3'>
                Application Listing
              </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { ApplicationsMenu };
