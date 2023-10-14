/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import CreateDocumentType from './CreateDocumentTypes'
import {DOCUMENT_TABLE_CONFIG} from './DocumentTableConfig'
import Table from '../../../components/table/Table'

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
        <div
          style={{marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'end'}}
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
        >
          <button
            onClick={() => setShowPopupCreate(!showPopupCreate)}
            className='btn btn-sm btn-light-primary fw-bold'
          >
            <KTIcon iconName='plus' className='fs-3 fw-bold' />
            New Document Type
          </button>
        </div>

        <CreateDocumentType
          setLoadApi={setLoadApi}
          loadApi={loadapi}
          show={showPopupCreate}
          handleClose={() => setShowPopupCreate(false)}
          handleUpdated={() => setIsUpdated(true)}
        />

        <Table
          config={DOCUMENT_TABLE_CONFIG}
          onEditItem={handleShowEdit}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
        />
      </div>
      {showPopupEdit ? (
        <CreateDocumentType
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
