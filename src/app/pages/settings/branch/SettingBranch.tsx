import React, {useEffect, useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import {swalConfirmDelete, swalToast} from '../../../swal-notification'
import request from '../../../axios'
import {BRANCH_TABLE_CONFIG} from './BranchConfig'
import {NewBranch} from './NewBranch'
import BranchDetail from './branchDetail'
import moment from 'moment'
import {DEFAULT_MSG_ERROR} from '../../../constants/error-message'

type Props = {}
export interface items {
  id: string
  business_uen: string
  company_id: string
  branch_name: string
  address_id: string
  telephone: string
  email: string
  open_date: string
  status: number
}

const SettingBranch = (props: Props) => {
  const [data, setData] = useState([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [showDetail, setshowDetail] = useState<boolean>(false)
  const [id, setId] = useState<Number>(1)
  const {rows} = BRANCH_TABLE_CONFIG

  const [editShowCreateAppModal, setEditShowCreateAppModal] = useState<boolean>(false)

  const handleFetchCompany = async () => {
    request
      .get('config/branch')
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.error('Erorr: ', error)
      })
  }

  function handleShowConfirmDelete(item: any) {
    swalConfirmDelete
      .fire({
        title: 'Are you sure?',
        text: `This will delete the branch "${item.branch_name}" and can't be restored.`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          onDeleteDeleteRole(item.id)
        }
      })
  }

  async function onDeleteDeleteRole(roleId: number) {
    if (!roleId) return
    try {
      await request.delete(`config/branch/${roleId}`).then((response) => {
        setLoadApi(!loadapi)
        swalToast.fire({
          title: 'Branch successfully deleted',
          icon: 'success',
        })
      })
    } catch (error: any) {
      const message = error?.response?.data?.message || DEFAULT_MSG_ERROR

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    }
  }

  useEffect(() => {
    handleFetchCompany()
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
          title='Click to add a user'
        >
          <button
            onClick={() => setShowCreateAppModal(!showCreateAppModal)}
            className='btn btn-sm btn-light-primary'
          >
            <KTIcon iconName='plus' className='fs-3' />
            New Branch
          </button>
        </div>
        {showCreateAppModal && (
          <NewBranch
            setLoadApi={setLoadApi}
            loadapi={loadapi}
            show={showCreateAppModal}
            handleClose={() => setShowCreateAppModal(false)}
          />
        )}
        <EnhancedTable
          EnhancedTableHead={rows?.map((row) => row.name)}
          rows={data?.map((item: items, index: number) => {
            return rows.map((row) => {
              if (row.key === 'id') return index + 1
              if (row.key === 'status' && Number(item[row.key]) === 1) {
                return <span className='badge badge-light-success fs-7 fw-semibold'>Active</span>
              }
              if (row.key === 'status' && Number(item[row.key]) === 0) {
                return <span className='badge badge-light-danger fs-8 fw-bold my-2'>Disabled</span>
              }
              if (row.key === 'open_date') {
                return moment(item[row.key]).format('YYYY-MM-DD')
              }

              if (row.key === 'action') {
                return (
                  <div className='d-flex justify-content-end flex-shrink-0 align-items-center justify-content-center'>
                    <div>
                      <button
                        onClick={() => {
                          setId(index + 1)
                          setshowDetail(true)
                          setDataItem(item)
                        }}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTIcon iconName='eye' className='fs-3' />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setEditShowCreateAppModal(true)
                        setDataItem(item)
                      }}
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </button>
                    <button
                      onClick={() => {
                        handleShowConfirmDelete(item)
                      }}
                      className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
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
      {showDetail && (
        <BranchDetail
          data={dataItem}
          show={showDetail}
          id={id}
          handleClose={() => setshowDetail(false)}
        />
      )}
      {editShowCreateAppModal ? (
        <NewBranch
          setLoadApi={setLoadApi}
          loadapi={loadapi}
          show={editShowCreateAppModal}
          titleLable='Edit'
          data={dataItem}
          handleClose={() => {
            setEditShowCreateAppModal(false)
            setDataItem({})
          }}
        />
      ) : null}
    </>
  )
}

export default SettingBranch
