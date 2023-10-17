import {useMemo, useState} from 'react'
import request from '../../../axios'
import ButtonDelete from '../../../components/button/ButtonDelete'
import ButtonEdit from '../../../components/button/ButtonEdit'
import ButtonViewDetail from '../../../components/button/ButtonViewDetail'
import {swalConfirmDelete, swalToast} from '../../../swal-notification'
import {convertErrorMessageResponse} from '../../../utils'
import BranchDetail from './BranchDetail'
import {CreateEditBranch} from './CreateEditBranch'
import {useAuth} from '../../../modules/auth'

type Props = {
  data: any
  isUpdated: boolean
  setIsUpdated: any
}

const ButtonAction = ({data, setIsUpdated, isUpdated}: Props) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [id, setId] = useState<Number>(1)

  const [editShowCreateAppModal, setEditShowCreateAppModal] = useState<boolean>(false)

  function handleShowEdit(item: any) {
    setEditShowCreateAppModal(true)
    setDataItem(item)
  }

  function handleViewDetail(item: any) {
    setId(item.id)
    setShowDetail(true)
    setDataItem(item)
  }

  async function handleDeleteItem(item: any) {
    try {
      const endPoint = `/config/branch/${item?.id}`
      await request.delete(endPoint)
      swalToast.fire({
        title: 'Branch successfully deleted',
        icon: 'success',
      })
      setIsUpdated(!isUpdated)
      // handle refresh dat
    } catch (error: any) {
      const message = convertErrorMessageResponse(error)

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    }
  }
  function handleShowConfirmDelete(item: any) {
    swalConfirmDelete
      .fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this.`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDeleteItem(item)
        }
      })
  }
  const {currentUser} = useAuth()

  const checkNewButton = useMemo(() => {
    if (currentUser?.priority !== 1) {
      return false
    }
    return true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {showCreateAppModal && (
        <CreateEditBranch
          setLoadApi={setLoadApi}
          loadapi={loadapi}
          show={showCreateAppModal}
          handleClose={() => setShowCreateAppModal(false)}
          handleUpdated={() => setIsUpdated(true)}
        />
      )}
      {showDetail && (
        <BranchDetail
          data={dataItem}
          show={showDetail}
          id={id}
          handleClose={() => setShowDetail(false)}
        />
      )}
      {editShowCreateAppModal ? (
        <CreateEditBranch
          setLoadApi={setLoadApi}
          loadapi={loadapi}
          show={editShowCreateAppModal}
          titleLable='Edit'
          data={dataItem}
          handleClose={() => {
            setEditShowCreateAppModal(false)
            setDataItem({})
          }}
          handleUpdated={() => setIsUpdated(true)}
        />
      ) : null}
      <div className='text-center'>
        <div className='d-flex align-items-center justify-content-center gap-1'>
          <ButtonViewDetail onClick={() => handleViewDetail(data)} />

          <ButtonEdit onClick={() => handleShowEdit(data)} />

          {checkNewButton && <ButtonDelete onClick={() => handleShowConfirmDelete(data)} />}
        </div>
      </div>
    </>
  )
}

export default ButtonAction
