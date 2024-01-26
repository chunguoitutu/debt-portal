/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import CreateEditDocumentType from './CreateEditDocumentType'
import {DOCUMENT_TABLE_CONFIG} from './config'
import Table from '@/components/table/Table'
import {DocumentTypeItem} from '@/app/types'

const DocumentType = () => {
  const [dataItem, setDataItem] = useState<DocumentTypeItem | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleShowPopup(item?: DocumentTypeItem) {
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
      <div>
        {showPopup && (
          <CreateEditDocumentType
            data={dataItem}
            handleClose={handleClosePopup}
            handleUpdated={handleAfterUpdate}
          />
        )}

        <Table
          config={DOCUMENT_TABLE_CONFIG}
          onEditItem={handleShowPopup}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          handleAddNew={() => handleShowPopup()}
        />
      </div>
    </>
  )
}

export default DocumentType
