/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import Swal from 'sweetalert2';
import request from '../../../axios'
import { JOBS_TYPE_TABLE_CONFIG } from './jobConfig';
import CreateJobType from './createJobType'
import { swalConfirmDelete, swalToast } from '../../../swal-notification';

interface items {
  id: string
  job_type_name: string
  description: string
  request_more_information: number
  status: number
}


 const  JobType = () => {

  const [data, setData] = useState([])
  const [showPopupCreate, setShowPopupCreate] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showPopupEdit, setShowPopupEdit] = useState<boolean>(false)

  const { rows } = JOBS_TYPE_TABLE_CONFIG

  const handleFetchLoanType = async () => {
    request
      .get('config/job_type')
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.error('Erorr: ', error)
      })
  }

  const handleDeleteDocument = async (data) => {
    request
      .delete(`config/job_type/${data?.id}`)
      .then((response) => {
        if (!response.data?.error) {
          swalToast.fire({
            icon: 'success',
            title: 'You have delete successfully',
          })
        }
        handleFetchLoanType()
      })
      .catch((error) => {
        Swal.fire({
            timer: 1500,
          icon: 'error',
          title: error?.message,
        })
      })
  }


  function handleShowConfirmDelete(item: any) {
    swalConfirmDelete.fire({
      title: 'Are you sure?',
      text: `This will delete item ${item?.job_type_name} and can't be restored.`,
    }).then((result) => {
      if(result.isConfirmed){
        handleDeleteDocument(item)
      }
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
            New Job Type
          </button>
        </div>

        <CreateJobType
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
                return <span className='badge badge-light-success fs-7 '>Active</span>
              }
              if (row.key === 'status' && item[row.key] === 0) {
                return <span className='badge badge-light-danger fs-8  my-2'>Disabled</span>
              }
              if (row.key === 'request_more_information' && item[row.key] === 1) {
                return <span className=' d-block fs-7'>Yes</span>
              }
              if (row.key === 'request_more_information' && item[row.key] === 0) {
                return <span className=' d-block fs-7'>No</span>
              }

              if (row.key === 'action') {
                return (
                  <div className='d-flex justify-content-end flex-shrink-0 align-items-center justify-content-center'>
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
                    onClick={() =>  handleShowConfirmDelete(item)}
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
        />
      ) : null}
    </>
  )
}

export default JobType
