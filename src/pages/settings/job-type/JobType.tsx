/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'

import {JOB_TABLE_CONFIG} from './config'
import CreateJobType from './CreateEditJobType'
import Table from '@/components/table/Table'

const JobType = () => {
  const [showPopupCreate, setShowPopupCreate] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showPopupEdit, setShowPopupEdit] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleEditItem(item: any) {
    setShowPopupEdit(!showPopupEdit)
    setDataItem(item)
  }

  return (
    <>
      <div>
        {showPopupCreate && (
          <CreateJobType
            setLoadApi={setLoadApi}
            loadApi={loadapi}
            show={showPopupCreate}
            handleClose={() => setShowPopupCreate(false)}
            handleUpdated={() => setIsUpdated(true)}
          />
        )}

        <Table
          config={JOB_TABLE_CONFIG}
          onEditItem={handleEditItem}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          handleAddNew={() => setShowPopupCreate(!showPopupCreate)}
        />
      </div>
      {showPopupEdit ? (
        <CreateJobType
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

export default JobType
