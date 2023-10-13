import {useEffect, useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import {deleteRoleById, getRoleList, getUserList} from '../../../modules/auth/core/_requests'
import {RoleInfo, SearchCriteria, UserInfo} from '../../../modules/auth'
import ButtonEdit from '../../../components/button/ButtonEdit'
import ButtonDelete from '../../../components/button/ButtonDelete'
import {swalConfirmDelete, swalToast} from '../../../swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../constants/error-message'
import {USER_TABLE_CONFIG} from './UserTableConfig'
import CreateEditRole from '../role/CreateEditRole'
import UserEdit from './UserEdit'
import request from '../../../axios'

const UserManagement = () => {
  const [data, setData] = useState<UserInfo[]>([])
  const [filter, setFilter] = useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
  })
  const [dataEdit, setDataEdit] = useState<UserInfo>()
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const {rows} = USER_TABLE_CONFIG

  useEffect(() => {
    onFetchUserList()
  }, [])

  async function onFetchUserList() {
    try {
      const {data} = await getUserList(filter)

      Array.isArray(data.data) && setData(data.data)
    } catch (error) {
      // no thing
    }
  }

  function handleShowConfirmDelete(item: UserInfo) {
    swalConfirmDelete
      .fire({
        title: 'Are you sure?',
        text: `This will delete the "${item.username}" role and can't be restored.`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          onDeleteDeleteRole(item.user_id)
        }
      })
  }

  async function onDeleteDeleteRole(roleId: number) {
    if (!roleId) return
    try {
      const {data} = await request.delete('config/loan_officer/' + roleId)
      await onFetchUserList()
      swalToast.fire({
        title: 'Role successfully deleted',
        icon: 'success',
      })
    } catch (error: any) {
      const message = error?.response?.data?.message || DEFAULT_MSG_ERROR

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    }
  }

  // data = undefined -> create new. Otherwise edit
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

      <EnhancedTable
        EnhancedTableHead={rows.map((row) => row.name)}
        rows={data.map((item, index: number) => {
          return rows.map((row) => {
            if (row.key === 'id') return index + 1

            if (row.key === 'action')
              return (
                <div className='d-flex justify-content-center'>
                  <ButtonEdit onClick={() => onShowPopup(item)} />
                  <ButtonDelete onClick={() => handleShowConfirmDelete(item)} />
                </div>
              )

            return item[row.key]
          })
        })}
      />
    </>
  )
}

export default UserManagement
