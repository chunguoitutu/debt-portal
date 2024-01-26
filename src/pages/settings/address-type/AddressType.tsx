import {useState} from 'react'

import Table from '@/components/table/Table'
import {ADDRESS_TABLE_CONFIG} from './config'
import {AddressTypeItem} from '@/app/types'
import CreateEditAddressType from './CreateEditAddressType'

const AddressType = () => {
  const [dataItem, setDataItem] = useState<AddressTypeItem | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleShowPopup(item?: AddressTypeItem) {
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
        <CreateEditAddressType
          data={dataItem}
          handleClose={handleClosePopup}
          handleUpdated={handleAfterUpdate}
        />
      )}

      <Table
        config={ADDRESS_TABLE_CONFIG}
        onEditItem={handleShowPopup}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        handleAddNew={() => handleShowPopup()}
      />
    </>
  )
}

export default AddressType
