import {useState} from 'react'
import {BRANCH_TABLE_CONFIG} from './BranchTableConfig'
import {CreateEditBranch} from './CreateEditBranch'
import BranchDetail from './BranchDetail'
import Table from '../../../components/table/Table'

type Props = {}
export interface items {
  id: string
  business_uen: string
  company_id: string
  branch_name: string
  address_id: string
  telephone: string
  email: string
  open_date: string
  status: number
}

const BranchManagement = (props: Props) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [id, setId] = useState<Number>(1)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

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

  return (
    <>
      <div>
        {showCreateAppModal && (
          <CreateEditBranch
            setLoadApi={setLoadApi}
            loadapi={loadapi}
            show={showCreateAppModal}
            handleClose={() => setShowCreateAppModal(false)}
            handleUpdated={() => setIsUpdated(true)}
          />
        )}
        <Table
          config={BRANCH_TABLE_CONFIG}
          onEditItem={handleShowEdit}
          onViewDetail={handleViewDetail}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          handleAddNew={() => setShowCreateAppModal(!showCreateAppModal)}
        />
      </div>
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
    </>
  )
}

export default BranchManagement
