/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';

import request from '../../../axios'
import { DOCUMENT_TYPE_TABLE_CONFIG } from './documentConfig';
import CreateDocumentType from './createDocumentTypes'

interface items {
  id: string
  type_name: string
  description: string
  status: number
  createdAt: string
  updatedAt: string
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
  const handleDeleteDocument = async () => {
    request
      .delete(`config/document_type/${itemDelete?.id}`)
      .then((response) => {
        if (!response.data?.error) {
          Swal.fire({
            timer: 1500,
            icon: 'success',
            title: 'You have delete successfully',
          })
          refreshData()
          onClose()
        }
      })
      .catch((error) => {
        Swal.fire({
            timer: 1500,
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
        >{`Do you want to detete "${itemDelete?.type_name}" ?`}</span>
        <div className='d-flex justify-content-end mt-8 gap-4'>
          <button
            type='button'
            id='kt_sign_in_submit'
            className='btn btn-danger'
            onClick={handleDeleteDocument}
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

 const  DocumentTypes = () => {

  const [data, setData] = useState([])
  const [showPopupCreate, setShowPopupCreate] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showPopupEdit, setShowPopupEdit] = useState<boolean>(false)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [itemDelete, setItemDelete] = useState({})

  const { rows } = DOCUMENT_TYPE_TABLE_CONFIG

  const handleFetchLoanType = async () => {
    request
      .get('config/document_type')
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

export default DocumentTypes
