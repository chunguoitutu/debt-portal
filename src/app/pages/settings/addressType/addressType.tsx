import {useState} from 'react'
import {ADDRESS_TABLE_CONFIG} from './addressConfig'
import {NewAddress} from './NewAddress'
import Table from '../../../components/table/Table'

const AddressType = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [editShowCreateAppModal, setEditShowCreateAppModal] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleEditItem(item: any) {
    setEditShowCreateAppModal(true)
    setDataItem(item)
  }

  return (
    <>
      <div>
        {showCreateAppModal && (
          <NewAddress
            setLoadApi={setLoadApi}
            loadapi={loadapi}
            show={showCreateAppModal}
            handleClose={() => setShowCreateAppModal(false)}
            handleUpdated={() => setIsUpdated(true)}
          />
        )}
        <Table
          config={ADDRESS_TABLE_CONFIG}
          onEditItem={handleEditItem}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          handleAddNew={() => setShowCreateAppModal(!showCreateAppModal)}
        />
      </div>

      {editShowCreateAppModal ? (
        <NewAddress
          setLoadApi={setLoadApi}
          loadapi={loadapi}
          show={editShowCreateAppModal}
          titleLable='Edit'
          data={dataItem}
          handleClose={() => {
            setEditShowCreateAppModal(false)
            setDataItem({})
          }}
          handleUpdated={() => setIsUpdated(true)}
        />
      ) : null}
    </>
  )
}

export default AddressType
