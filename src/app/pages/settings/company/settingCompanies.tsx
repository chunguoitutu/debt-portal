import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {NewCompanies} from './newCompanies'
import {KTIcon} from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import {REACT_APP_BASE_URL_API} from '../../../modules/auth/core/_requests'
import {COMPANY_TABLE_CONFIG} from './companyConfig'
import {Modal} from 'react-bootstrap'
import {swalToast} from '../../../swal-notification'

type Props = {}
interface items {
  id: string
  company_name: string
  company_code: string
  business_uen: string
  address_id: string
  telephone: string
  email: string
  website: string
  registration_date: string
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
    axios
      .delete(REACT_APP_BASE_URL_API + `config/company/${itemDelete?.id}`)
      .then((response) => {
        if (!response.data?.error) {
          swalToast.fire({
            icon: 'success',
            title: 'Success',
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
        >{`Do you want to detete "${itemDelete?.company_name}"`}</span>
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

const SettingCompanies = (props: Props) => {
  const [data, setData] = useState([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})
  const [itemDelete, setItemDelete] = useState({})
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const {rows} = COMPANY_TABLE_CONFIG

  const [editShowCreateAppModal, setEditShowCreateAppModal] = useState<boolean>(false)

  const handleFetchCompany = async () => {
    axios
      .get(REACT_APP_BASE_URL_API + 'config/company')
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.error('Erorr: ', error)
      })
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
            New Company
          </button>
        </div>
        <NewCompanies
          setLoadApi={setLoadApi}
          loadapi={loadapi}
          show={showCreateAppModal}
          handleClose={() => setShowCreateAppModal(false)}
        />
        <EnhancedTable
          EnhancedTableHead={rows.map((row) => row.name)}
          rows={data.map((item: items, index: number) => {
            return rows.map((row) => {
              if (row.key === 'id') return index + 1
              if (row.key === 'status' && item[row.key] === 1) {
                return <span className='badge badge-light-primary fs-7 fw-semibold'>Active</span>
              }
              if (row.key === 'status' && item[row.key] === 0) {
                return <span className='badge badge-light-danger fs-8 fw-bold my-2'>isActive</span>
              }

              if (row.key === 'action') {
                return (
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    <div>
                      <button
                        onClick={() => {
                          setEditShowCreateAppModal(true)
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
      {editShowCreateAppModal ? (
        <NewCompanies
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
      {isShowDelete ? (
        <ModalDelete
          itemDelete={itemDelete}
          isShow={isShowDelete}
          onClose={() => setIsShowDelete(false)}
          refreshData={handleFetchCompany}
        />
      ) : null}
    </>
  )
}

export default SettingCompanies
