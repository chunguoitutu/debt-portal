/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTCardBody} from '@/_metronic/helpers'
import React, {useEffect, useState} from 'react'
import clsx from 'clsx'
import {BorrowerItem, OrderBy, ResponseBorrowerListing, SearchCriteria} from '@/app/types'

import Loading from '@/components/table/components/Loading'
import {getFullName, handleFormatFilter, isObject, parseJson} from '@/app/utils'
import request from '@/app/axios'
import {useAuth} from '@/app/context/AuthContext'
import ButtonViewDetail from '@/components/button/ButtonViewDetail'
import {BORROWER_CONFIG_LISTING} from '../config/config-borrower-dashboard'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

type Props = {
  className: string
}

const CustomerListingDashboard: React.FC<Props> = ({className}) => {
  const sessionData = isObject(parseJson(sessionStorage.getItem('borrower') || ''))
    ? parseJson(sessionStorage.getItem('borrower') || '')
    : {}

  const {settings, rows} = BORROWER_CONFIG_LISTING || {}
  const {showAction = true, showEditButton} = settings || {}
  const [loadApi, setLoadApi] = React.useState<boolean>(true)

  const [data, setData] = React.useState<BorrowerItem[]>([])
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [dataFilter, setDataFilter] = React.useState<{[key: string]: any}>(
    isObject(sessionData?.dataFilter) ? sessionData?.dataFilter : {}
  )

  const [orderBy, setOrderBy] = useState<OrderBy>(sessionData?.orderBy || 'desc')
  const [keySort, setKeySort] = useState<string>(sessionData?.keySort || 'id')
  const [searchValue, setSearchValue] = useState<string>(sessionData?.searchValue || '')

  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: 5,
    currentPage: sessionData?.currentPage || 1,
    total: 0,
  })

  const {pageSize, currentPage} = searchCriteria
  const {company_id} = useAuth()

  function handleSaveSearchToSession() {
    const data = {
      searchValue,
      dataFilter,
      pageSize,
      currentPage,
    }

    sessionStorage.setItem('borrower', JSON.stringify(data))
  }

  useEffect(() => {
    if (!+company_id) return

    const newDataFilter = handleConvertDataFilter(dataFilter)

    const timer = setTimeout(() => {
      onFetchDataList({
        ...searchCriteria,
        filters: newDataFilter,
      })
    }, 300)

    return () => {
      clearTimeout(timer)
      handleSaveSearchToSession()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_id, keySort, orderBy, pageSize, currentPage, loadApi])

  function handleConvertDataFilter(dataFilter: {[key: string]: any}) {
    return handleFormatFilter({
      dataFilter: {
        ...dataFilter,
        searchBar: searchValue,
      },
      keyDate: ['date_of_birth'],
      keyNumber: ['loan_type_id', 'id', 'loan_terms'],
    })
  }

  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponseBorrowerListing>>, 'total'>
  ) {
    setLoading(true)
    try {
      const {data: response} = await request.post(settings.endPointGetListing, {
        ...body,
        company_id: +company_id,
        keySort: keySort,
        orderBy: orderBy,
      })
      Array.isArray(response.data) && setData(response.data)
      response?.searchCriteria && setSearchCriteria(response?.searchCriteria)
    } catch (error) {
      // no thing
    } finally {
      setLoading(false)
    }
  }

  const renderRows = () => {
    return data.map((item, idx) => {
      return (
        <tr key={idx}>
          {rows.map(({key, component, classNameTableBody, isHide, infoFilter, options}, i) => {
            const {keyLabelOption, keyValueOption} = infoFilter || {}

            if (isHide) {
              return <React.Fragment key={i}></React.Fragment>
            }
            let Component = component || React.Fragment
            let value = item[key]

            if (key === 'id') {
              return (
                <td key={i} className='w-xxl-6 fw-semibold fs-14 ps-5'>
                  {Number(idx) +
                    1 +
                    (Number(searchCriteria.currentPage) * Number(searchCriteria.pageSize) -
                      Number(searchCriteria.pageSize))}
                </td>
              )
            }

            if (key === 'identification_no') {
              return (
                <td key={i} className='fs-6 fw-medium' style={{color: '#071437'}}>
                  {value}
                </td>
              )
            }

            if (key === 'fullname') {
              return (
                <td key={i} className='fs-6 fw-medium w-250px' style={{color: '#071437'}}>
                  {getFullName(item)}
                </td>
              )
            }

            if (dataOption[key] || options) {
              const currentItem =
                (options || dataOption[key]).find(
                  (item) => item[keyValueOption || 'value'] === value
                ) || {}

              value = currentItem[keyLabelOption || 'label'] || ''
            }

            return (
              <td key={i} className={classNameTableBody}>
                {component ? (
                  <Component />
                ) : (
                  <span className='fw-semibold fs-14 fw-semibold'>{value}</span>
                )}
              </td>
            )
          })}
          {showAction && showEditButton && (
            <td className='text-center'>
              <div className='d-flex align-items-center justify-content-center gap-1'>
                {showEditButton && <ButtonViewDetail onClick={() => {}} />}
              </div>
            </td>
          )}
        </tr>
      )
    })
  }
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Latest Customers</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>{`Over ${searchCriteria.total} members`}</span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='h-fit-content'>
        <div>
          <KTCardBody className='py-4'>
            <div className='table-responsive'>
              <table
                id='kt_table_users'
                className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
              >
                <thead>
                  <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                    {rows
                      .filter((item) => !item.isHide)
                      .map((item, i) => {
                        const {classNameTableHead, name} = item

                        return (
                          <th
                            className={clsx([
                              'text-nowrap min-w-75px user-select-none',
                              classNameTableHead,
                            ])}
                            data-title={item.key}
                            key={i}
                          >
                            <div className='cursor-pointer'>
                              <span className='fs-14 fw-bold'>{name}</span>
                            </div>
                          </th>
                        )
                      })}
                    {showAction && <th className='text-center w-125px fs-6 fw-bold'>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {data.length ? (
                    renderRows()
                  ) : (
                    <tr>
                      <td colSpan={rows.length + 1}>
                        <div className='d-flex text-center w-100 align-content-center justify-content-center fs-14 fw-medium text-gray-600'>
                          No matching records found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </KTCardBody>

          <div
            style={{
              padding: '10px 42px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            className='w-100 algin-items-center justify-content-between pb-6'
          >
            <div></div>
            <div className='fs-14 text-hover-primary hover-underline-link'>
              <Link to={'/customers'} className='text-primary text-hover-primary fw-medium'>
                Go To Customer Listing
              </Link>
              <FontAwesomeIcon icon={faArrowRight} className='text-primary ms-2 mt-1' />
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </div>
  )
}

export {CustomerListingDashboard}
