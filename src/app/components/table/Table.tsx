import {FC, Fragment, useEffect, useState} from 'react'
import {KTCardBody} from '../../../_metronic/helpers'
import {TableConfig} from '../../modules/auth'
import moment from 'moment'
import ButtonDelete from '../button/ButtonDelete'
import ButtonEdit from '../button/ButtonEdit'
import {swalConfirmDelete, swalToast} from '../../swal-notification'
import request from '../../axios'
import {DEFAULT_MSG_ERROR} from '../../constants/error-message'
import TableHelper from './components/TableHelper'
import Loading from './components/Loading'
import Pagination from './components/Pagination'
import ButtonViewDetail from '../button/ButtonViewDetail'

type Props = {
  config: TableConfig
  onEditItem?: (data: any) => void
  onViewDetail?: (data: any) => void
  isUpdated?: boolean
  setIsUpdated?: any
  handleAddNew: () => void
}

type SearchCriteria = {
  pageSize: number
  currentPage: number
  total: number
}

const Table: FC<Props> = ({
  config,
  onEditItem,
  onViewDetail,
  isUpdated,
  setIsUpdated,
  handleAddNew,
}) => {
  const {settings, rows} = config
  const {
    showAction = true,
    showDeleteButton = true,
    showEditButton = true,
    showViewButton = true,
    textConfirmRemove,
    endPointDelete,
    endPointGetListing,
    fieldDelete,
    messageDeleteError,
    messageDeleteSuccess,
  } = settings

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleResfresh = async () => {
      await onFetchDataList()
      setIsUpdated(false)
    }
    if (isUpdated) {
      handleResfresh()
    }
  }, [isUpdated])

  function convertValue(type: string, value: string | number) {
    if (typeof value !== 'string' && typeof value !== 'number') return

    switch (type) {
      case 'datetime':
        return moment(value).format('lll') === 'Invalid date' ? value : moment(value).format('lll')
      default:
        return value
    }
  }

  function handleEditItem(item: any) {
    if (typeof onEditItem !== 'function') return
    onEditItem(item)
  }

  function handleViewDetailItem(item: any) {
    if (typeof onViewDetail !== 'function') return
    onViewDetail(item)
  }

  async function onFetchDataList() {
    setLoading(true)
    try {
      const {data} = await request.post(endPointGetListing + '/listing')
      Array.isArray(data.data) && setData(data.data)
      data?.searchCriteria && setSearchCriteria(data?.searchCriteria)
    } catch (error) {
      // no thing
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteItem(item: any) {
    const idRemove = fieldDelete ? item[fieldDelete] : item.id

    if (!idRemove || !endPointDelete)
      return (
        process.env.NODE_ENV === 'development' &&
        console.warn('You need to provide a endpoint and id remove to delete')
      )

    try {
      const endPoint = endPointDelete + `/${fieldDelete || item.id}`
      await request.delete(endPoint)

      // handle refresh data
      await onFetchDataList()
      swalToast.fire({
        title: messageDeleteSuccess || 'Delete Successfully',
        icon: 'success',
      })
    } catch (error: any) {
      const message = error?.response?.data?.message || DEFAULT_MSG_ERROR

      swalToast.fire({
        title: messageDeleteError || message,
        icon: 'error',
      })
    }
  }
  async function changePagePagination(page: number, pageSize: number) {
    const {data} = await request.post(endPointGetListing + '/listing', {
      pageSize,
      currentPage: page,
    })
    Array.isArray(data.data) && setData(data.data)
    data?.searchCriteria && setSearchCriteria(data?.searchCriteria)
  }

  function handleShowConfirmDelete(item: any) {
    swalConfirmDelete
      .fire({
        title: 'Are you sure?',
        text: textConfirmRemove || `You won't be able to revert this.`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDeleteItem(item)
        }
      })
  }

  return (
    <div className='card'>
      <TableHelper config={config} handleAddNew={handleAddNew} />

      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                {rows.map((row, i) => (
                  <th className={row.classNameTableHead} key={i}>
                    {row.name}
                  </th>
                ))}
                {showAction && (showDeleteButton || showEditButton || showViewButton) && (
                  <th className='text-center'>Action</th>
                )}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold'>
              {data.length > 0 ? (
                data.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      {rows.map(({key, component, type, classNameTableBody}, i) => {
                        let Component = component || Fragment
                        let value = item[key]

                        if (key === 'id') {
                          return <td key={i}>{idx + 1}</td>
                        }

                        if (component) {
                          if (key === 'status' || key === 'is_active') {
                            return (
                              <td key={i}>
                                <Component
                                  color={value === 1 ? 'success' : 'danger'}
                                  title={value === 1 ? 'Active' : 'Disable'}
                                />
                              </td>
                            )
                          }
                        }

                        if (type) {
                          value = convertValue(type, value)
                        }

                        return (
                          <td key={i}>
                            {component ? (
                              <Component />
                            ) : (
                              <span className={classNameTableBody}>{value}</span>
                            )}
                          </td>
                        )
                      })}
                      {showAction && (showDeleteButton || showEditButton || showViewButton) && (
                        <td className='text-center'>
                          <div className='d-flex align-items-center justify-content-center gap-1'>
                            {showViewButton && (
                              <ButtonViewDetail onClick={() => handleViewDetailItem(item)} />
                            )}

                            {showEditButton && <ButtonEdit onClick={() => handleEditItem(item)} />}

                            {showDeleteButton && (
                              <ButtonDelete onClick={() => handleShowConfirmDelete(item)} />
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={rows.length}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      No matching records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          changePagePagination={changePagePagination}
          isLoading={loading}
          searchCriteria={searchCriteria}
        />
        {loading && <Loading />}
      </KTCardBody>
    </div>
  )
}

export default Table
