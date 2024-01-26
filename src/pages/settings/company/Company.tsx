/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'

import CreateEditCompany from './CreateEditCompany'
import Table from '@/components/table/Table'
import {COMPANY_TABLE_CONFIG} from './config'
import CompanyDetails from './CompanyDetails'
import {CompanyItem, SearchCriteria} from '@/app/types'

const CompanyListing = () => {
  const [showCreateOrEditPopup, setShowCreateOrEditPopup] = useState<boolean>(false)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [sttTable, setSttTable] = useState(1)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState<CompanyItem | null>(null)

  function handleShowCreateOrEdit(item?: any) {
    showDetails && setShowDetails(false)
    setShowCreateOrEditPopup(true)
    setDataItem(item)
  }

  function handleViewDetail(item: any) {
    setShowDetails(true)
    setDataItem(item)
  }

  function handleClose() {
    showDetails && setShowDetails(false)
    showCreateOrEditPopup && setShowCreateOrEditPopup(false)
  }

  return (
    <>
      {showDetails && (
        <CompanyDetails
          data={dataItem}
          sttTable={sttTable}
          handleClose={handleClose}
          handleShowEdit={() => handleShowCreateOrEdit(dataItem)}
        />
      )}

      {showCreateOrEditPopup && (
        <CreateEditCompany
          handleClose={handleClose}
          handleUpdated={() => setIsUpdated(true)}
          data={dataItem}
        />
      )}

      <Table
        config={COMPANY_TABLE_CONFIG}
        onEditItem={handleShowCreateOrEdit}
        onViewDetail={handleViewDetail}
        setSttTable={setSttTable}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        handleAddNew={() => handleShowCreateOrEdit()}
      />
    </>
  )
}

export default CompanyListing
