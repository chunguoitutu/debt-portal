import {useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import {ROLE_TABLE_CONFIG} from './RoleTableConfig'
import {RoleInfo} from '../../../modules/auth'
import CreateEditRole from './CreateEditRole'
import Table from '../../../components/table/Table'

const RolePage = () => {
  const [dataEdit, setDataEdit] = useState<RoleInfo | undefined>()
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  // data = undefined -> create new. Otherwise edit
  function onShowPopup(data?: RoleInfo) {
    setDataEdit(data)
    setShowPopup(true)
  }

  function handleClosePopupCreateEditPopup() {
    setShowPopup(false)
    setDataEdit(undefined)
  }

  function handleEditItem(data: any) {
    setDataEdit(data)
    setShowPopup(true)
  }

  async function onFetchRoleList() {
    try {
      setIsUpdated(true)
    } catch (error) {
      // no thing
    }
  }

  return (
    <>
      {showPopup && (
        <CreateEditRole
          show={showPopup}
          data={dataEdit}
          onClose={handleClosePopupCreateEditPopup}
          onRefreshListing={onFetchRoleList}
        />
      )}
      <div className='d-flex justify-content-end mb-8'>
        <button
          className='btn btn-sm btn-light-primary'
          title='Click to add new role'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          onClick={() => onShowPopup()}
        >
          <KTIcon iconName='plus' className='fs-3' />
          New Role
        </button>
      </div>

      <Table
        config={ROLE_TABLE_CONFIG}
        onEditItem={handleEditItem}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
    </>
  )
}

export default RolePage
