/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {NewCompanies} from './CreateEditCompany'
import {KTIcon} from '../../../../_metronic/helpers'
import Table from '../../../components/table/Table'
import {COMPANY_TABLE_CONFIG} from './CompanyTableConfig'
import CompanyDetail from './CompanyDetail'

type Props = {}

const CompanyManagement = (props: Props) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [id, setId] = useState<Number>(1)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})

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
            New Company
          </button>
        </div>
        {showCreateAppModal && (
          <NewCompanies
            setLoadApi={setLoadApi}
            loadapi={loadapi}
            show={showCreateAppModal}
            handleClose={() => setShowCreateAppModal(false)}
          />
        )}
        <Table
          config={COMPANY_TABLE_CONFIG}
          onEditItem={handleShowEdit}
          onViewDetail={handleViewDetail}
        />
      </div>
      {showDetail && (
        <CompanyDetail
          data={dataItem}
          show={showDetail}
          id={id}
          handleClose={() => setShowDetail(false)}
        />
      )}
      {editShowCreateAppModal && (
        <NewCompanies
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
      )}
    </>
  )
}

export default CompanyManagement
