/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import {ROLE_TABLE_CONFIG} from './jobConfig'
import CreateJobType from './createJobType'
import Table from '../../../components/table/Table'

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
            New Job Type
          </button>
        </div>

        <CreateJobType
          setLoadApi={setLoadApi}
          loadApi={loadapi}
          show={showPopupCreate}
          handleClose={() => setShowPopupCreate(false)}
          handleUpdated={() => setIsUpdated(true)}
        />

        <Table
          config={ROLE_TABLE_CONFIG}
          onEditItem={handleEditItem}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
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
