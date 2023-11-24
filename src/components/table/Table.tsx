import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import ButtonDelete from '../button/ButtonDelete'
import ButtonEdit from '../button/ButtonEdit'
import TableHelper from './components/TableHelper'
import Loading from './components/Loading'
import Pagination from './components/Pagination'
import ButtonViewDetail from '../button/ButtonViewDetail'
import {Filter} from '../filter/Filter'
import Input from '../input'
import {SearchCriteria, TableConfig} from '../../app/types/common'
import {useAuth} from '../../app/context/AuthContext'
import request from '../../app/axios'
import {swalConfirmDelete, swalToast} from '../../app/swal-notification'
import {convertErrorMessageResponse} from '../../app/utils'
import {KTCardBody} from '../../_metronic/helpers'
import clsx from 'clsx'

type Props = {
  config: TableConfig
  onEditItem?: (data: any) => void
  onViewDetail?: (data: any) => void
  isUpdated?: boolean
  setIsUpdated?: any
  handleAddNew: () => void
  isShowFilter?: boolean
  setSearchCriterias?: any
  setSttTable?: any
}

const Table: FC<Props> = ({
  config,
  onEditItem,
  setSearchCriterias = () => {},
  onViewDetail,
  isUpdated,
  setIsUpdated,
  handleAddNew,
  setSttTable,
  isShowFilter = false,
}) => {
  const {settings, rows} = config
  const {
    showAction = true,
    showDeleteButton = true,
    showEditButton = true,
    showViewButton = true,
    showRefresh = false,
    textConfirmDelete,
    endPointDelete,
    endPointGetListing,
    fieldDelete,
    messageDeleteError,
    messageDeleteSuccess,
    showMessageTitle,
  } = settings

  const {currentUser, company_id} = useAuth()

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })

  const {total, ...pagination} = searchCriteria

  useEffect(() => {
    if (!currentUser) return
    onFetchDataList(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useEffect(() => {
    const handleRefresh = async () => {
      await onFetchDataList(pagination)

      setIsUpdated(false)
    }

    if (isUpdated) {
      handleRefresh()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated, currentUser])

  function convertValue(type: string, value: string | number) {
    if (typeof value !== 'string' && typeof value !== 'number') return

    switch (type) {
      case 'datetime':
        return moment(value).format('MMM DD, YYYY') === 'Invalid date'
          ? value
          : moment(value).format('MMM DD, YYYY')
      case 'yes/no':
        return value === 1 ? 'Yes' : 'No'
      default:
        return value
    }
  }

  function handleEditItem(item: any) {
    if (typeof onEditItem !== 'function') return
    onEditItem(item)
  }

  function handleViewDetailItem(item: any, idx: number) {
    setSttTable(idx)
    if (typeof onViewDetail !== 'function') return
    onViewDetail(item)
  }

  async function onFetchDataList(body: Omit<SearchCriteria, 'total'>) {
    setLoading(true)
    try {
      const {data} = await request.post(endPointGetListing + '/listing', {
        ...body,
        company_id: +company_id,
      })

      Array.isArray(data.data) && setData(data.data)

      data?.searchCriteria &&
        setSearchCriteria((prev) => ({
          ...prev,
          total: data?.total_count || 0,
          currentPage: data?.searchCriteria?.currentPage || 1,
        }))
      data?.searchCriteria &&
        setSearchCriterias((prev) => ({
          ...prev,
          total: data?.total_count || 0,
          currentPage: data?.searchCriteria?.currentPage || 1,
        }))
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
      const endPoint = endPointDelete + `/${idRemove}`
      const {data} = await request.delete(endPoint)
      if (data?.error) {
        return swalToast.fire({
          title:
            data?.message ||
            `Can't delete this Loan Type, because it has been assigned to one or more applications`,
          icon: 'error',
        })
      }

      // handle refresh data
      await onFetchDataList({
        ...pagination,
        currentPage:
          searchCriteria.total - (searchCriteria.currentPage - 1) * searchCriteria.pageSize === 1
            ? 1
            : searchCriteria.currentPage,
      })

      swalToast.fire({
        title:
          (messageDeleteSuccess || '').replace(/\/%\//g, `${data?.data[showMessageTitle || '']}`) ||
          'Delete Successfully',
        icon: 'success',
      })
    } catch (error: any) {
      const message = convertErrorMessageResponse(error)

      swalToast.fire({
        title: messageDeleteError || message,
        icon: 'error',
      })
    }
  }
  async function handleChangePagination(data: Omit<SearchCriteria, 'total'>) {
    setSearchCriteria((prev) => ({...prev, ...data}))
    setSearchCriterias((prev) => ({...prev, ...data}))
    await onFetchDataList({...pagination, ...data})
  }

  function handleShowConfirmDelete(item: any) {
    swalConfirmDelete
      .fire({
        title: 'Are you sure?',
        text: textConfirmDelete || `You won't be able to revert this.`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleDeleteItem(item)
        }
      })
  }

  if (!currentUser) return null

  //HANDLE ADD PERMISSION DROPDOWN
  function handlePermissionChecked(item: string | null) {
    if (item) {
      const permission = JSON.parse(item)
      if (permission.setting) {
        const checked = (permission.setting || [])
          .map((set: any) => {
            if (set.isAccess) return set.label
            return undefined
          })
          .filter((el: any) => !!el)
        return checked
      }
    }
    return []
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
                {rows
                  .filter((el) => !el.isHide)
                  .map(
                    (row, i) =>
                      !row?.isHide && (
                        <th
                          className={clsx(['min-w-50px text-nowrap', row.classNameTableHead])}
                          key={i}
                          style={{
                            paddingRight: row.name === 'Status' ? '9.75px' : '',
                          }}
                        >
                          <div
                            className={clsx([
                              row.name === 'Status' &&
                                'w-100 d-flex justify-content-center align-items-center fs-14 fw-semibold',
                            ])}
                          >
                            <span>{row.name}</span>
                            {isShowFilter && <Filter />}
                          </div>
                        </th>
                      )
                  )}
                {(showAction || showRefresh) && (
                  <th className='text-center w-150px fs-14 fw-semibold'>Actions</th>
                )}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold'>
              {rows.some((item) => item.isShowInput) && (
                <tr style={{borderColor: '#fff'}}>
                  {rows.map((item, key) => (
                    <td key={key}>
                      {item.isShowInput && <Input classShared='' name={item[key]} />}
                    </td>
                  ))}
                  {(showAction || showRefresh) && (
                    <td className='p-0'>
                      <div className='d-flex align-items-center justify-content-center gap-1'>
                        <div className='p-2 border cursor-pointer rounded'>
                          <FontAwesomeIcon icon={faArrowsRotate} />
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              )}
              {data.length > 0 ? (
                data.map((item, idx) => {
                  return (
                    <tr key={idx} className='fw-medium'>
                      {rows.map(({key, component, type, classNameTableBody, isHide, color}, i) => {
                        if (isHide) {
                          return <Fragment key={i}></Fragment>
                        }
                        let Component = component || Fragment
                        let value = item[key]

                        if (key === 'id') {
                          return (
                            <td key={i} className='w-xxl-6 fw-semibold fs-14'>
                              {Number(idx) +
                                1 +
                                (Number(searchCriteria.currentPage) *
                                  Number(searchCriteria.pageSize) -
                                  Number(searchCriteria.pageSize))}
                            </td>
                          )
                        }

                        if (key === 'open_date') {
                          return (
                            <td className='fs-14 fw-semibold' key={i}>
                              {moment(value).format('MMM DD, YYYY')}
                            </td>
                          )
                        }

                        if (key === 'created_date') {
                          return (
                            <td key={i} className='fs-14 fw-semibold mt-8px ms-16px ps-7'>
                              {moment(value).format('MMM DD, YYYY')}
                            </td>
                          )
                        }

                        if (key === 'updated_date') {
                          return (
                            <td key={i} className='fs-14 fw-semibold pl-20px ps-7'>
                              {moment(value).format('MMM DD, YYYY')}
                            </td>
                          )
                        }

                        if (component) {
                          if (key === 'status' || key === 'is_active') {
                            return (
                              <td
                                key={i}
                                className='text-center fs-14 min-w-150px fw-semibold'
                                style={{
                                  borderBottom: 'none',
                                }}
                              >
                                <div className='d-flex align-items-center justify-content-center gap-1'>
                                  <Component
                                    color={value === 1 ? 'success' : 'danger'}
                                    title={value === 1 ? 'Active' : 'Disable'}
                                  />
                                </div>
                              </td>
                            )
                          }
                          //HANDLE ADD PERMISSION DROPDOWN
                          if (key === 'permissions') {
                            return (
                              <td key={i}>
                                <Component
                                  tittle={''}
                                  checked={handlePermissionChecked(item[key])}
                                />
                              </td>
                            )
                          }

                          return (
                            <td key={i} className='fs-14 min-w-150px fw-semibold'>
                              <>
                                <Component
                                  data={item}
                                  isUpdated={isUpdated}
                                  setIsUpdated={setIsUpdated}
                                />
                              </>
                            </td>
                          )
                        }

                        if (type) {
                          value = convertValue(type, value)
                        }

                        return (
                          <td key={i}>
                            {component ? (
                              <Component />
                            ) : (
                              <span
                                style={{
                                  color: !!color ? color : '#78829D',
                                }}
                                className={`${classNameTableBody} fs-14 fw-semibold `}
                              >
                                {value}
                              </span>
                            )}
                          </td>
                        )
                      })}
                      {showAction && (showDeleteButton || showEditButton || showViewButton) && (
                        <td className='text-center'>
                          <div className='d-flex align-items-center justify-content-center gap-1'>
                            {showViewButton && (
                              <ButtonViewDetail
                                onClick={() => {
                                  handleViewDetailItem(item, idx)
                                }}
                              />
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
                    <div
                      style={{fontSize: '14px', fontWeight: '500', lineHeight: '20px'}}
                      className='d-flex text-center w-100 align-content-center justify-content-center'
                    >
                      No matching records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          onChangePagePagination={handleChangePagination}
          isLoading={loading}
          searchCriteria={searchCriteria}
        />

        {loading && <Loading />}
      </KTCardBody>
    </div>
  )
}

export default Table
