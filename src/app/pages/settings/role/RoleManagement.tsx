import {useState} from 'react'
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
      <Table
        config={ROLE_TABLE_CONFIG}
        onEditItem={handleEditItem}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        handleAddNew={() => onShowPopup()}
      />
    </>
  )
}

export default RolePage
