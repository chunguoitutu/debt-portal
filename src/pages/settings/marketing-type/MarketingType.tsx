import {useState} from 'react'

import Table from '@/components/table/Table'
import {MARKETING_TABLE_CONFIG} from './config'
import CreateEditMarketingType from './CreateEditMarketing'
import {MarketingTypeItem} from '@/app/types'

const MarketingType = () => {
  const [dataItem, setDataItem] = useState<MarketingTypeItem | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleShowPopup(item?: MarketingTypeItem) {
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
        <CreateEditMarketingType
          data={dataItem}
          handleClose={handleClosePopup}
          handleUpdated={handleAfterUpdate}
        />
      )}

      <Table
        config={MARKETING_TABLE_CONFIG}
        onEditItem={handleShowPopup}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        handleAddNew={() => handleShowPopup()}
      />
    </>
  )
}

export default MarketingType
