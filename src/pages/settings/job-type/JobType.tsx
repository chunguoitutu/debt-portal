/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'

import {JOB_TABLE_CONFIG} from './config'
import Table from '@/components/table/Table'
import {JobTypeItem} from '@/app/types'
import CreateEditJobType from './CreateEditJobType'

const JobType = () => {
  const [dataItem, setDataItem] = useState<JobTypeItem | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleShowPopup(item?: JobTypeItem) {
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
        <CreateEditJobType
          data={dataItem}
          handleClose={handleClosePopup}
          handleUpdated={handleAfterUpdate}
        />
      )}

      <Table
        config={JOB_TABLE_CONFIG}
        onEditItem={handleShowPopup}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        handleAddNew={() => handleShowPopup()}
      />
    </>
  )
}

export default JobType
