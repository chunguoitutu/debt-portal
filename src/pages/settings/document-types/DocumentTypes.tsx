/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'

import CreateEditDocumentType from './CreateEditDocumentType'
import {DOCUMENT_TABLE_CONFIG} from './config'
import Table from '@/components/table/Table'

const DocumentTypes = () => {
  const [showPopupCreate, setShowPopupCreate] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showPopupEdit, setShowPopupEdit] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleShowEdit(item: any) {
    setShowPopupEdit(!showPopupEdit)
    setDataItem(item)
  }
  return (
    <>
      <div>
        {showPopupCreate && (
          <CreateEditDocumentType
            setLoadApi={setLoadApi}
            loadApi={loadapi}
            show={showPopupCreate}
            handleClose={() => setShowPopupCreate(false)}
            handleUpdated={() => setIsUpdated(true)}
          />
        )}

        <Table
          config={DOCUMENT_TABLE_CONFIG}
          onEditItem={handleShowEdit}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          handleAddNew={() => setShowPopupCreate(!showPopupCreate)}
        />
      </div>
      {showPopupEdit ? (
        <CreateEditDocumentType
          setLoadApi={setLoadApi}
          loadApi={loadapi}
          show={showPopupEdit}
          title='Edit'
          data={dataItem}
          handleClose={() => {
            setShowPopupEdit(!showPopupEdit)
            setDataItem({})
          }}
          handleUpdated={() => setIsUpdated(true)}
        />
      ) : null}
    </>
  )
}

export default DocumentTypes
