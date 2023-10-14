import {useEffect, useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import {UserInfo} from '../../../modules/auth'
import {USER_TABLE_CONFIG} from './UserTableConfig'
import UserEdit from './UserEdit'
import Table from '../../../components/table/Table'

const UserManagement = () => {
  const [dataEdit, setDataEdit] = useState<UserInfo>()
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

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
      <div className='d-flex justify-content-end mb-8'>
        <button
          className='btn btn-sm btn-light-primary'
          title='Click to add new user'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          onClick={() => onShowPopup()}
        >
          <KTIcon iconName='plus' className='fs-3' />
          New User
        </button>
      </div>
      <Table
        config={USER_TABLE_CONFIG}
        onEditItem={onShowPopup}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
    </>
  )
}

export default UserManagement
