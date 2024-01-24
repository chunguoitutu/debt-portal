import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import moment from 'moment'
import ButtonDelete from '../button/ButtonDelete'
import ButtonEdit from '../button/ButtonEdit'
import TableHelper from './components/TableHelper'
import Loading from './components/Loading'
import Pagination from './components/Pagination'
import ButtonViewDetail from '../button/ButtonViewDetail'
import {Filter} from '../filter/Filter'
import {useAuth} from '../../app/context/AuthContext'
import request from '../../app/axios'
import {KTCardBody} from '../../_metronic/helpers'
import clsx from 'clsx'
import {SearchCriteria, TableConfig} from '@/app/types'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {convertErrorMessageResponse, formatMoney} from '@/app/utils'

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

  const ROW_LIST = useMemo(() => {
    return rows.filter((el) => !el.isHide)
  }, [rows])

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

  async function handleChangePagination(goToPage: number) {
    setSearchCriteria((prev) => ({...prev, currentPage: goToPage}))
    setSearchCriterias((prev) => ({...prev, currentPage: goToPage}))
    await onFetchDataList({...pagination, currentPage: goToPage})
  }

  function handleShowConfirmDelete(item: any) {
    swalConfirm
      .fire({
        title: 'Are You Sure?',
        text: textConfirmDelete || `You Won't Be Able To Revert This.`,
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
        <div className='table-responsive mb-3'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                {ROW_LIST.map((row, i) => (
                  <th
                    className={clsx(['min-w-50px text-nowrap', row.classNameTableHead])}
                    key={i}
                    style={{
                      paddingRight: row.name === 'Status' ? '9.75px' : '',
                    }}
                  >
                    <div
                      className={clsx([
                        row.name === 'Status'
                          ? 'w-100 d-flex justify-content-center text-uppercase text-gray-500 align-items-center fs-14 fw-bold'
                          : 'w-100 text-uppercase text-gray-500 fs-14 fw-bold',
                      ])}
                    >
                      <span>{row.name}</span>
                      {isShowFilter && <Filter />}
                    </div>
                  </th>
                ))}
                {(showAction || showRefresh) && (
                  <th className='text-center w-150px '>
                    <div
                      className={clsx([
                        'w-100 d-flex justify-content-center text-uppercase text-gray-500 align-items-center fs-14 fw-bold',
                      ])}
                    >
                      <span>ACTIONS</span>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold'>
              {data.length > 0 ? (
                data.map((item, idx) => {
                  return (
                    <tr key={idx} className='fw-medium'>
                      {rows.map(({key, component, classNameTableBody, isHide, color}, index) => {
                        if (isHide) {
                          return <Fragment key={index}></Fragment>
                        }
                        let Component = component || Fragment
                        let value = item[key]

                        if (key === 'id') {
                          return (
                            <td key={index} className='w-xxl-6 fw-semibold fs-14'>
                              {Number(idx) +
                                1 +
                                (Number(searchCriteria.currentPage) *
                                  Number(searchCriteria.pageSize) -
                                  Number(searchCriteria.pageSize))}
                            </td>
                          )
                        }

                        if (['created_date', 'updated_date'].includes(key)) {
                          return (
                            <td className='fs-14 fw-semibold' key={index}>
                              {moment(value).format('DD MMM, YYYY')}
                            </td>
                          )
                        }

                        if (
                          ['quota_new', 'quota_existing', 'quota_foreigner', 'late_fee'].includes(
                            key
                          )
                        ) {
                          return (
                            <td className='fs-14 fw-semibold text-end' key={index}>
                              {formatMoney(value)}
                            </td>
                          )
                        }

                        if (['open_date'].includes(key)) {
                          return (
                            <td className={`fs-14 fw-semibold ${classNameTableBody}`} key={index}>
                              {moment(value).format('DD MMM, YYYY')}
                            </td>
                          )
                        }

                        if (['late_interest', 'interest'].includes(key)) {
                          return (
                            <td className={`fs-14 fw-semibold text-end`} key={index}>
                              {value !== null && value !== undefined ? `${value}%` : ''}
                            </td>
                          )
                        }

                        if (key === 'telephone') {
                          return (
                            <td className='fs-14 fw-semibold' style={{color: 'rgb(120, 130, 157)'}}>
                              {value ? `+65${value}` : ''}
                            </td>
                          )
                        }

                        if (component) {
                          if (
                            [
                              'is_default',
                              'status',
                              'is_active',
                              'request_more_information',
                            ].includes(key)
                          ) {
                            let title = value === 1 ? 'Active' : 'Disable'

                            if (['is_default', 'request_more_information'].includes(key)) {
                              title = value === 1 ? 'Yes' : 'No'
                            }

                            return (
                              <td
                                key={index}
                                className='text-center fs-14 min-w-150px fw-semibold'
                                style={{
                                  borderBottom: 'none',
                                }}
                              >
                                <div className='d-flex align-items-center justify-content-center gap-1'>
                                  <Component
                                    color={value === 1 ? 'success' : 'danger'}
                                    title={title}
                                  />
                                </div>
                              </td>
                            )
                          }

                          //HANDLE ADD PERMISSION DROPDOWN
                          if (key === 'permissions') {
                            return (
                              <td key={index}>
                                <Component
                                  tittle={''}
                                  checked={handlePermissionChecked(item[key])}
                                />
                              </td>
                            )
                          }

                          return (
                            <td key={index} className='fs-14 min-w-150px fw-semibold'>
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

                        return (
                          <td key={index}>
                            {component ? (
                              <Component />
                            ) : (
                              <span
                                style={{
                                  color: !!color ? color : '#78829D',
                                }}
                                className={clsx(['fs-14 fw-semibold', classNameTableBody])}
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
