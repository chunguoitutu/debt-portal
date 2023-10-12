/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import {LOAN_TYPE_TABLE_CONFIG} from './loanConfig'
import { KTIcon } from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import { Modal } from 'react-bootstrap'
import { swalToast } from '../../../swal-notification'
import  CreateLoanType  from './createLoanType'
// import { CreateLoanType } from './createLoanType'
import request from '../../../axios'

interface items {
  id: string
  loan_type: string
  description: string
  status: number
}

const ModalDelete = ({
  isShow,
  onClose,
  itemDelete,
  refreshData,
}: {
  isShow: boolean
  onClose: () => void
  itemDelete: any
  refreshData: () => void
}) => {
  const handleDeleteCompany = async () => {
    request
      .delete(`config/loan_type/${itemDelete?.id}`)
      .then((response) => {
        if (!response.data?.error) {
          swalToast.fire({
            icon: 'success',
            title: 'You have delete successfully',
          })
          refreshData()
          onClose()
        }
      })
      .catch((error) => {
        swalToast.fire({
          icon: 'error',
          title: error?.message,
        })
        onClose()
      })
  }
  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={isShow}
      onHide={onClose}
      animation={true}
    >
      <div className='modal-header'>
        <h2>Notification</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={onClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <span
          style={{fontSize: '20px'}}
        >{`Do you want to detete "${itemDelete?.type_name}"`}</span>
        <div className='d-flex justify-content-end mt-8 gap-4'>
          <button
            type='button'
            id='kt_sign_in_submit'
            className='btn btn-danger'
            onClick={handleDeleteCompany}
            disabled={false}
          >
            <span className='indicator-label'>Delete</span>
          </button>

          <button
            type='button'
            id='kt_sign_in_submit'
            className='btn btn-light btn-active-light-primary'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

 const  LoanTypes = () => {

  const [data, setData] = useState([])
  const [showPopupCreate, setShowPopupCreate] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showPopupEdit, setShowPopupEdit] = useState<boolean>(false)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [itemDelete, setItemDelete] = useState({})

  const { rows } = LOAN_TYPE_TABLE_CONFIG

  const handleFetchLoanType = async () => {
    request
      .get('config/loan_type')
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.error('Erorr: ', error)
      })
  }

  useEffect(() => {
    handleFetchLoanType()
  }, [loadapi])

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
            className='btn btn-sm btn-light-primary'
          >
            <KTIcon iconName='plus' className='fs-3' />
            New Loan Type
          </button>
        </div>

        <CreateLoanType
          setLoadApi={setLoadApi}
          loadApi={loadapi}
          show={showPopupCreate}
          handleClose={() => setShowPopupCreate(false)}
        />

        <EnhancedTable
          EnhancedTableHead={rows.map((row) => row.name)}
          rows={data?.map((item: items, index: number) => {
            return rows.map((row) => {
              if (row.key === 'id') return index + 1
              if (row.key === 'status' && item[row.key] === 1) {
                return <span className='badge badge-light-success fs-7 fw-semibold'>Active</span>
              }
              if (row.key === 'status' && item[row.key] === 0) {
                return <span className='badge badge-light-danger fs-8 fw-bold my-2'>Disabled</span>
              }
              if (row.key === 'action') {
                return (
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    <div>
                      <button
                       onClick={() => {
                        setShowPopupEdit(!showPopupEdit)
                        setDataItem(item)
                      }}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='pencil' className='fs-3' />
                      </button>
                    </div>
                    <button
                    onClick={() => {
                      setItemDelete(item)
                      setIsShowDelete(true)
                    }}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTIcon iconName='trash' className='fs-3' />
                    </button>
                  </div>
                )
              }
              return item[row.key]
            })
          })}
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
        />
      ) : null}
     
      {isShowDelete ? (
        <ModalDelete
          itemDelete={itemDelete}
          isShow={isShowDelete}
          onClose={() => setIsShowDelete(false)}
          refreshData={handleFetchLoanType}
        />
      ) : null} 
    </>
  )
}

export default LoanTypes
