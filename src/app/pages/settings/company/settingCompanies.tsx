import {useEffect, useState} from 'react'
import {NewCompanies} from './newCompanies'
import {KTIcon} from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import {swalConfirmDelete, swalToast} from '../../../swal-notification'
import request from '../../../axios'
import CompanyDetail from './companyDetail'
import moment from 'moment'
import {COMPANY_TABLE_CONFIG} from './companyConfig'
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

const SettingCompanies = (props: Props) => {
  const [data, setData] = useState([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [showDetail, setshowDetail] = useState<boolean>(false)
  const [id, setId] = useState<Number>(1)
  const [loadapi, setLoadApi] = useState<boolean>(false)
  const [dataItem, setDataItem] = useState({})

  const {rows} = COMPANY_TABLE_CONFIG

  const [editShowCreateAppModal, setEditShowCreateAppModal] = useState<boolean>(false)

  function handleShowConfirmDelete(item: any) {
    swalConfirmDelete
      .fire({
        title: 'Are you sure?',
        text: `This will delete the company "${item.company_name}" and can't be restored.`,
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
      await request.delete(`config/company/${roleId}`).then((response) => {
        setLoadApi(!loadapi)
        swalToast.fire({
          title: 'Company successfully deleted',
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

  const handleFetchCompany = async () => {
    request
      .get('config/company')
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
        {showCreateAppModal && (
          <NewCompanies
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
                  <div className='d-flex justify-content-end flex-shrink-0'>
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
      {showDetail && (
        <CompanyDetail
          data={dataItem}
          show={showDetail}
          id={id}
          handleClose={() => setshowDetail(false)}
        />
      )}
      {editShowCreateAppModal && (
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
      )}
    </>
  )
}

export default SettingCompanies
