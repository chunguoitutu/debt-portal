import clsx from 'clsx'
import {PageTitleWrapper} from './page-title'
import {Link, useLocation} from 'react-router-dom'
import Button from '@/components/button/Button'
import Icons from '@/components/icons'

interface IProps {}

const ToolbarWrapper = ({}: IProps) => {
  const pathname = useLocation()

  return (
    <div className={clsx('pt-6 pb-6')}>
      {pathname.pathname === '/application' || pathname.pathname === '/application/listing' ? (
        <div className='d-flex flex-row align-items-center justify-content-between'>
          <PageTitleWrapper />
          <Link to='/application/create'>
            <Button
              className='btn-primary align-self-center ms-4 fs-6 text-white h-45px'
              disabled={false}
            >
              <Icons name={'AddIcon'} />
              Add New Application
            </Button>
          </Link>
        </div>
      ) : pathname.pathname === '/borrower' ? (
        <div className='d-flex flex-row align-items-center justify-content-between'>
          <PageTitleWrapper />
          <Link to='/borrower/create'>
            <Button
              className='btn-primary align-self-center ms-4 fs-6 text-white h-45px'
              disabled={false}
            >
              <Icons name={'AddIcon'} />
              Add New Borrower
            </Button>
          </Link>
        </div>
      ) : (
        <PageTitleWrapper />
      )}
    </div>
  )
}

export {ToolbarWrapper}
