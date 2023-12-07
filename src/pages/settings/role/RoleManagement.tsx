import {useState} from 'react'

import CreateEditRole from './CreateEditRole'
import Table from '@/components/table/Table'
import {ROLE_TABLE_CONFIG} from './config'
import {RoleInfo} from '@/app/types'

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
          config={ROLE_TABLE_CONFIG}
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
