import {Link} from 'react-router-dom'

import Button from '../../components/button/Button'
import {toAbsoluteUrl} from '@/_metronic/helpers'

const NotFoundPage = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center align-self-center h-100'>
      <img src={toAbsoluteUrl('/media/svg/not-found/NotFound.svg')} alt='Not Found' />
      <div className='fs-1 fw-bold'>Oops!</div>
      <div className='mt-4 fs-3 fw-normal'>We're sorry.</div>
      <div className='mt-1 fs-3 fw-normal'>The page you requested was not found.</div>
      <div className='mt-1 fs-3 fw-normal'>Please try again soon or try another search.</div>
      <div className='mt-3'>
        <Link to='/dashboard'>
          <Button>Go to Home Page</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
