import {useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'

import {BRANCH_TABLE_CONFIG} from './BranchTableConfig'
import {NewBranch} from './NewBranch'
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
  const [data, setData] = useState([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [id, setId] = useState<Number>(1)
  const {rows} = BRANCH_TABLE_CONFIG

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
        <div
          style={{marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'end'}}
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <button
            onClick={() => setShowCreateAppModal(!showCreateAppModal)}
            className='btn btn-sm btn-light-primary'
          >
            <KTIcon iconName='plus' className='fs-3' />
            New Branch
          </button>
        </div>
        {showCreateAppModal && (
          <NewBranch
            setLoadApi={setLoadApi}
            loadapi={loadapi}
            show={showCreateAppModal}
            handleClose={() => setShowCreateAppModal(false)}
          />
        )}
        <Table
          config={BRANCH_TABLE_CONFIG}
          onEditItem={handleShowEdit}
          onViewDetail={handleViewDetail}
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
        <NewBranch
          setLoadApi={setLoadApi}
          loadapi={loadapi}
          show={editShowCreateAppModal}
          titleLable='Edit'
          data={dataItem}
          handleClose={() => {
            setEditShowCreateAppModal(false)
            setDataItem({})
          }}
        />
      ) : null}
    </>
  )
}

export default BranchManagement
