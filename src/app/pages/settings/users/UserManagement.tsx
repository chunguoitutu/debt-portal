import {useEffect, useState} from 'react'
import {UserInfo, useAuth} from '../../../modules/auth'
import {USER_TABLE_CONFIG} from './UserTableConfig'
import UserEdit from './UserEdit'
import Table from '../../../components/table/Table'

const UserManagement = () => {
  const [dataEdit, setDataEdit] = useState<UserInfo>()
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const {currentUser} = useAuth()

  useEffect(() => {
    onFetchUserList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <UserEdit
          show={showPopup}
          data={dataEdit}
          onClose={handleClosePopupCreateEditPopup}
          onRefreshListing={onFetchUserList}
        />
      )}
      <Table
        currentUser={currentUser}
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
