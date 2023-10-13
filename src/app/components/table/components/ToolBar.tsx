import {KTIcon} from '../../../../_metronic/helpers'
import {UsersListFilter} from '../../../modules/apps/user-management/users-list/components/header/UsersListFilter'

const ToolBar = () => {
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter />

      {/* begin::Export */}
      <button type='button' className='btn btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Export
      </button>
      {/* end::Export */}

      {/* begin::Add user */}
      <button type='button' className='btn btn-primary'>
        <KTIcon iconName='plus' className='fs-2' />
        Add User
      </button>
      {/* end::Add user */}
    </div>
  )
}

export default ToolBar
