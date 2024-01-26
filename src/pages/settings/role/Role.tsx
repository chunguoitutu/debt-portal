import {useState} from 'react'

import CreateEditRole from './CreateEditRole'
import Table from '@/components/table/Table'
import {ROLE_TABLE_CONFIG} from './config'
import {RoleItem} from '@/app/types'

const Role = () => {
  const [dataItem, setDataItem] = useState<RoleItem | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleShowPopup(item?: RoleItem) {
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
        <CreateEditRole
          data={dataItem}
          handleClose={handleClosePopup}
          handleUpdated={handleAfterUpdate}
        />
      )}

      <Table
        config={ROLE_TABLE_CONFIG}
        onEditItem={handleShowPopup}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        handleAddNew={() => handleShowPopup()}
      />
    </>
  )
}

export default Role
