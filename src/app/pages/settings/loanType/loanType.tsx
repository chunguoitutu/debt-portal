/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {LOAN_TYPE_TABLE_CONFIG} from './loanConfig'
import {KTIcon} from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import Swal from 'sweetalert2'
import CreateLoanType from './createLoanType'
import request from '../../../axios'
import {swalConfirmDelete, swalToast} from '../../../swal-notification'
import Table from '../../../components/table/Table'

interface items {
  id: string
  loan_type: string
  description: string
  status: number
}

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
            New Loan Type
          </button>
        </div>

        <CreateLoanType
          setLoadApi={setLoadApi}
          loadApi={loadapi}
          show={showPopupCreate}
          handleClose={() => setShowPopupCreate(false)}
          handleUpdated={() => setIsUpdated(true)}
        />

        <Table
          config={LOAN_TYPE_TABLE_CONFIG}
          onEditItem={handleEditIten}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
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
