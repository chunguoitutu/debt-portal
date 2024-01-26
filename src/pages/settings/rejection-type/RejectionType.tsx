import {useState} from 'react'

import Table from '@/components/table/Table'
import {REJECTION_TYPE_TABLE_CONFIG} from './config'
import {RejectionTypeItem} from '@/app/types'
import CreateEditRejectionType from './CreateEditRejectionType'

const RejectionType = () => {
  const [dataItem, setDataItem] = useState<RejectionTypeItem | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleShowPopup(item?: RejectionTypeItem) {
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
        <CreateEditRejectionType
          data={dataItem}
          handleClose={handleClosePopup}
          handleUpdated={handleAfterUpdate}
        />
      )}

      <Table
        config={REJECTION_TYPE_TABLE_CONFIG}
        onEditItem={handleShowPopup}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        handleAddNew={() => handleShowPopup()}
      />
    </>
  )
}

export default RejectionType
