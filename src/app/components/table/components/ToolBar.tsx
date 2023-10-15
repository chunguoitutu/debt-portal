import {KTIcon} from '../../../../_metronic/helpers'
import {UsersListFilter} from '../../../modules/apps/user-management/users-list/components/header/UsersListFilter'
import {TableConfig} from '../../../modules/auth'

type Props = {
  config: TableConfig
  handleAddNew: () => void
}

const ToolBar = ({config, handleAddNew}: Props) => {
  const {settings} = config
  const {buttonAddNew} = settings
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <UsersListFilter />

      {/* begin::Add user */}
      <button onClick={handleAddNew} type='button' className='btn btn-primary'>
        <KTIcon iconName='plus' className='fs-2' />
        {buttonAddNew}
      </button>
      {/* end::Add user */}
    </div>
  )
}

export default ToolBar
