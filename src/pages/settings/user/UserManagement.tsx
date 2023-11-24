import {useState} from 'react'
import {USER_TABLE_CONFIG} from './UserTableConfig'
import CreateEditUser from './CreateEditUser'
import Table from '@/components/table/Table'
import {UserInfo} from '@/app/types'

const UserManagement = () => {
  const [dataEdit, setDataEdit] = useState<UserInfo>()
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  async function onFetchUserList() {
    try {
      setIsUpdated(true)
    } catch (error) {
      // no thing
    }
  }

  function onShowPopup(data?: UserInfo) {
    setDataEdit(data)
    setShowPopup(true)
  }

  function handleClosePopupCreateEditPopup() {
    setShowPopup(false)
    setDataEdit(undefined)
  }

  return (
    <>
      {showPopup && (
        <CreateEditUser
          config={USER_TABLE_CONFIG}
          show={showPopup}
          data={dataEdit}
          onClose={handleClosePopupCreateEditPopup}
          onRefreshListing={onFetchUserList}
        />
      )}
      <Table
        config={USER_TABLE_CONFIG}
        onEditItem={onShowPopup}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        handleAddNew={() => onShowPopup()}
      />
    </>
  )
}

export default UserManagement
