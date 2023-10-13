import {useEffect, useState} from 'react'
import {KTIcon} from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import {swalConfirmDelete, swalToast} from '../../../swal-notification'
import request from '../../../axios'
import moment from 'moment'
import {ADDRESS_TABLE_CONFIG} from './addressConfig'
import {NewAddress} from './NewAddress'
import {DEFAULT_MSG_ERROR} from '../../../constants/error-message'

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

const AddressType = (props: Props) => {
  const [data, setData] = useState([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)

  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})

  const {rows} = ADDRESS_TABLE_CONFIG

  const [editShowCreateAppModal, setEditShowCreateAppModal] = useState<boolean>(false)

  const handleFetchCompany = async () => {
    request
      .get('config/address_type')
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
        text: `This will delete the Address Type "${item.address_type_name}" and can't be restored.`,
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
      await request.delete(`config/address_type/${roleId}`).then((response) => {
        setLoadApi(!loadapi)
        swalToast.fire({
          title: 'Address Type successfully deleted',
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
            New Address Type
          </button>
        </div>
        {showCreateAppModal && (
          <NewAddress
            setLoadApi={setLoadApi}
            loadapi={loadapi}
            show={showCreateAppModal}
            handleClose={() => setShowCreateAppModal(false)}
          />
        )}
        <EnhancedTable
          EnhancedTableHead={rows?.map((row: any) => row.name)}
          rows={data?.map((item: items, index: number) => {
            return rows.map((row) => {
              if (row.key === 'id') return index + 1

              if (row.key === 'status') {
                const isActive = item[row.key] === 1
                return (
                  <span
                    className={`badge badge-light-${
                      isActive ? 'success' : 'danger'
                    } fs-8 fw-bold my-2`}
                  >
                    {isActive ? 'Active' : 'Disabled'}
                  </span>
                )
              }
              if (row.key === 'registration_date') {
                return moment(item[row.key]).format('YYYY-MM-DD')
              }

              if (row.key === 'action') {
                return (
                  <div className='d-flex justify-content-end flex-shrink-0 align-items-center justify-content-center'>
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

      {editShowCreateAppModal ? (
        <NewAddress
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

export default AddressType
