import {Outlet} from 'react-router-dom'
import SettingMenu from './SettingMenu'

const SettingManagementLayout = () => {
  return (
    <div className='row gx-10 gy-8'>
      <div className='col-12 col-lg-3'>
        <SettingMenu />
      </div>
      <div className='col-12 col-lg-9'>
        <Outlet />
      </div>
    </div>
  )
}

export default SettingManagementLayout
