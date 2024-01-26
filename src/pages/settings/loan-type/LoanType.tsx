import {useState} from 'react'
import {LOAN_TYPE_CONFIG} from './config'
import Table from '@/components/table/Table'
import {LoanTypeItem} from '@/app/types'
import CreateEditLoanType from './CreateEditLoanType'

const LoanType = () => {
  const [dataItem, setDataItem] = useState<LoanTypeItem | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleShowPopup(item?: LoanTypeItem) {
    setShowPopup(true)
    item && setDataItem(item)
  }

  function handleAfterUpdate() {
    setIsUpdated(true)
  }

  function handleClosePopup() {
    setShowPopup(false)
    setDataItem(null)
  }

  return (
    <>
      {showPopup && (
        <CreateEditLoanType
          data={dataItem}
          handleClose={handleClosePopup}
          handleUpdated={handleAfterUpdate}
        />
      )}

      <Table
        config={LOAN_TYPE_CONFIG}
        onEditItem={handleShowPopup}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        handleAddNew={() => handleShowPopup()}
      />
    </>
  )
}

export default LoanType
