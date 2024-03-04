import {Outlet} from 'react-router-dom'
import DebtMenu from './DebtMenu'
import './style.scss'

const DebtLayout = () => {
  return (
    <div className='debt d-flex justify-content-center vh-100 overflow-hidden'>
      <div className='d-flex flex-column mw-500px w-100 h-100 overflow-auto bg-body'>
        <div className='debt-layout d-flex flex-column flex-grow-1'>
          <Outlet />
          <DebtMenu />
        </div>
      </div>
    </div>
  )
}

export default DebtLayout
