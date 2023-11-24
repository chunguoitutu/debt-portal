import {useMemo} from 'react'
import {useAuth} from '../../../app/context/AuthContext'
import {UsersListFilter} from '../../../app/modules/apps/user-management/users-list/components/header/UsersListFilter'
import {KTIcon} from '../../../_metronic/helpers'
import {TableConfig} from '@/app/types'

type Props = {
  config: TableConfig
  handleAddNew: () => void
}

const ToolBar = ({config, handleAddNew}: Props) => {
  const {settings} = config
  const {currentUser} = useAuth()
  const {buttonAddNew, showFilter, showAddNewButton = true} = settings

  const checkNewButton = useMemo(() => {
    if (settings?.endPointGetListing === '/config/branch' && currentUser?.priority !== 1) {
      return false
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {showFilter && <UsersListFilter />}

      {checkNewButton && showAddNewButton && (
        <button onClick={handleAddNew} type='button' className='btn btn-primary'>
          <KTIcon iconName='plus' className='fs-2' />
          {buttonAddNew}
        </button>
      )}
    </div>
  )
}

export default ToolBar
