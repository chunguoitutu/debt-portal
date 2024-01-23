/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'

import {LOAN_TYPE_TABLE_CONFIG} from './config'
import CreateLoanType from './CreateEditLoanType'
import Table from '@/components/table/Table'

const LoanTypes = () => {
  const [showPopupCreate, setShowPopupCreate] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showPopupEdit, setShowPopupEdit] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  function handleEditIten(item: any) {
    setShowPopupEdit(!showPopupEdit)
    setDataItem(item)
  }

  return (
    <>
      <div>
        {showPopupCreate && (
          <CreateLoanType
            setLoadApi={setLoadApi}
            loadApi={loadapi}
            show={showPopupCreate}
            handleClose={() => setShowPopupCreate(false)}
            handleUpdated={() => setIsUpdated(true)}
          />
        )}

        <Table
          config={LOAN_TYPE_TABLE_CONFIG}
          onEditItem={handleEditIten}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          handleAddNew={() => setShowPopupCreate(!showPopupCreate)}
        />
      </div>
      {showPopupEdit ? (
        <CreateLoanType
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

export default LoanTypes
