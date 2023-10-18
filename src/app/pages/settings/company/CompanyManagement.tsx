/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {CreateEditCompanies} from './CreateEditCompany'
import Table from '../../../components/table/Table'
import {COMPANY_TABLE_CONFIG} from './CompanyTableConfig'
import CompanyDetail from './CompanyDetail'

type Props = {}

const CompanyListing = (props: Props) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [id, setId] = useState<Number>(1)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
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
        <Table
          config={COMPANY_TABLE_CONFIG}
          onEditItem={handleShowEdit}
          onViewDetail={handleViewDetail}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          handleAddNew={() => setShowCreateAppModal(!showCreateAppModal)}
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
        <CreateEditCompanies
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
      )}
    </>
  )
}

export default CompanyListing
