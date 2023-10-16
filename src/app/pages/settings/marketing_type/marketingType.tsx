import {useState} from 'react'
import {MAKETTING_TABLE_CONFIG} from './markettingConfig'
import {NewMarketting} from './NewMarketing'
import Table from '../../../components/table/Table'

const MarkettingType = () => {
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [editShowCreateAppModal, setEditShowCreateAppModal] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleEditItem(item) {
    setEditShowCreateAppModal(true)
    setDataItem(item)
  }

  return (
    <>
      <div>
        {showCreateAppModal && (
          <NewMarketting
            setLoadApi={setLoadApi}
            loadapi={loadapi}
            show={showCreateAppModal}
            handleClose={() => setShowCreateAppModal(false)}
            handleUpdated={() => setIsUpdated(true)}
          />
        )}
        <Table
          config={MAKETTING_TABLE_CONFIG}
          onEditItem={handleEditItem}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          handleAddNew={() => setShowCreateAppModal(!showCreateAppModal)}
        />
      </div>

      {editShowCreateAppModal ? (
        <NewMarketting
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

export default MarkettingType
