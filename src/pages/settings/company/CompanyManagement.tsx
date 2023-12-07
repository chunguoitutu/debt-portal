/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'

import {CreateEditCompanies} from './CreateEditCompany'
import Table from '@/components/table/Table'
import {COMPANY_TABLE_CONFIG} from './config'
import CompanyDetail from './CompanyDetail'
import {SearchCriteria} from '@/app/types'

type Props = {}

const CompanyListing = (props: Props) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [searchCriterias, setSearchCriterias] = useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })
  const [id, setId] = useState<Number>(1)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [sttTable, setSttTable] = useState(1)
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
        {showCreateAppModal && (
          <CreateEditCompanies
            setLoadApi={setLoadApi}
            loadapi={loadapi}
            show={showCreateAppModal}
            handleClose={() => setShowCreateAppModal(false)}
            handleUpdated={() => setIsUpdated(true)}
          />
        )}
        <Table
          setSearchCriterias={setSearchCriterias}
          config={COMPANY_TABLE_CONFIG}
          onEditItem={handleShowEdit}
          onViewDetail={handleViewDetail}
          setSttTable={setSttTable}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          handleAddNew={() => setShowCreateAppModal(!showCreateAppModal)}
        />
      </div>
      {showDetail && (
        <CompanyDetail
          searchCriterias={searchCriterias}
          data={dataItem}
          sttTable={sttTable}
          show={showDetail}
          id={id}
          handleClose={() => {
            setShowDetail(false)
          }}
          handleCloseShowEdit={() => {
            setShowDetail(false), handleShowEdit(dataItem)
          }}
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
