import {useMemo} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import {UsersListFilter} from '../../../modules/apps/user-management/users-list/components/header/UsersListFilter'
import {TableConfig, useAuth} from '../../../modules/auth'

type Props = {
  config: TableConfig
  handleAddNew: () => void
}

const ToolBar = ({config, handleAddNew}: Props) => {
  const {settings} = config
  const {currentUser} = useAuth()
  const {buttonAddNew, showfilter} = settings
  const checkNewButton = useMemo(() => {
    if (
      settings?.endPointGetListing === '/config/branch' &&
      currentUser?.role_name !== 'Full-Access'
    ) {
      return false
    }
    return true
  }, [])
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {showfilter && <UsersListFilter />}

      {checkNewButton && (
        <button onClick={handleAddNew} type='button' className='btn btn-primary'>
          <KTIcon iconName='plus' className='fs-2' />
          {buttonAddNew}
        </button>
      )}
    </div>
  )
}

export default ToolBar
