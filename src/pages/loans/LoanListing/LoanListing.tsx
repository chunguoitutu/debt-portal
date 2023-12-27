import {KTCardBody} from '@/_metronic/helpers'
import {PageLink, PageTitle} from '@/components/breadcrumbs'
import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import {Input} from '@/components/input'
import {faClose, faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {LOAN_LISTING_CONFIG} from './config'
import clsx from 'clsx'
import SortBy from '@/components/sort-by'
import ButtonViewDetail from '@/components/button/ButtonViewDetail'
import Pagination from '@/components/table/components/Pagination'
import RowPerPage from '@/components/row-per-page'
import Loading from '@/components/table/components/Loading'
import React, {useEffect, useState} from 'react'
import {LoanItem, OrderBy, ResponseLoanListing, SearchCriteria, TableRow} from '@/app/types'
import {FilterLoan} from './FilterLoan'
import {handleFormatFilter, isObject, parseJson} from '@/app/utils'
import moment from 'moment'
import {useAuth} from '@/app/context/AuthContext'
import request from '@/app/axios'
import {Badge} from 'react-bootstrap'
import numeral from 'numeral'
import {Footer} from '@/components/footer/Footer'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Loans',
    path: '/loan/listing',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const showFilter = [
  {
    key: 'loan_no',
    value: 'Loan No',
  },
  {
    key: 'fullname',
    value: 'Name Of Borrower',
  },
  {
    key: 'identification_no',
    value: 'NRIC No',
  },
  {
    key: 'loan_amount',
    value: 'Loan Amount',
  },
  {
    key: 'monthly_due_date',
    value: 'Monthly Due Date',
  },
  {
    key: 'status',
    value: 'UFO',
  },
]

const LoanListing = () => {
  const sessionData = isObject(parseJson(sessionStorage.getItem('loan') || ''))
    ? parseJson(sessionStorage.getItem('loan') || '')
    : {}

  const {settings, rows} = LOAN_LISTING_CONFIG || {}
  const {showAction = true, showEditButton} = settings || {}
  const [loading, setLoading] = useState<boolean>(false)
  const [showInput, setShowInput] = useState<boolean>(false)
  const [data, setData] = useState<LoanItem[]>([])
  const [dataFilter, setDataFilter] = useState<{[key: string]: any}>(
    isObject(sessionData?.dataFilter) ? sessionData?.dataFilter : {}
  )
  const [loadApi, setLoadApi] = React.useState<boolean>(true)
  const [searchValue, setSearchValue] = useState<string>('')
  const [checkFilter, setCheckFilter] = useState<any>({})
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })
  const [keySort, setKeySort] = useState<string>('id')
  const [orderBy, setOrderBy] = useState<OrderBy>('desc')

  const {pageSize, currentPage} = searchCriteria

  const {company_id} = useAuth()

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

  function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) {
      return `${day}th`
    }
    const lastDigit = day % 10
    switch (lastDigit) {
      case 1:
        return `${day}st`
      case 2:
        return `${day}nd`
      case 3:
        return `${day}rd`
      default:
        return `${day}th`
    }
  }

  const renderRows = () => {
    return data.map((item, idx) => {
      return (
        <tr key={idx}>
          {rows.map(({key, component, classNameTableBody, isHide, options, infoFilter}, i) => {
            const {keyLabelOption, keyValueOption} = infoFilter || {}

            const identificationNo = item?.borrower?.customer?.identification_no

            const {firstname, lastname, middlename} = item?.borrower?.customer || {}

            const fullname = `${firstname || ''} ${middlename || ''} ${lastname || ''}`.trim()

            const month_due_date = moment(item.approval_date).format('DD')

            const dayWithSuffix = getDayWithSuffix(parseInt(month_due_date, 10))

            if (isHide) {
              return <React.Fragment key={i}></React.Fragment>
            }
            let Component = component || React.Fragment
            let value = item[key]

            if (key === 'id') {
              return (
                <td key={i} className='w-xxl-6 fw-semibold fs-14 ps-6'>
                  {Number(idx) +
                    1 +
                    (Number(searchCriteria.currentPage) * Number(searchCriteria.pageSize) -
                      Number(searchCriteria.pageSize))}
                </td>
              )
            }

            if (key === 'loan_amount') {
              value = numeral(item[key]).format('$0,0.00')
            }

            // handle for select
            if (dataOption[key] || options) {
              const currentItem =
                (options || dataOption[key]).find(
                  (item) => item[keyValueOption || 'value'] === value
                ) || {}

              value = currentItem[keyLabelOption || 'label'] || ''
            }

            if (key === 'fullname') {
              return (
                <td key={i} className='fs-6 fw-medium' style={{color: '#071437'}}>
                  {fullname}
                </td>
              )
            }

            if (key === 'monthly_due_date') {
              return (
                <td
                  key={i}
                  className={clsx([
                    'fs-14 fw-semibold hover-applications-listing ps-7',
                    classNameTableBody,
                  ])}
                  style={{color: '#071437'}}
                >
                  {dayWithSuffix}
                </td>
              )
            }

            if (key === 'status') {
              if (item[key] === 0) {
                return (
                  <td
                    className={clsx([
                      'fs-14 fw-semibold hover-applications-listing ps-7',
                      classNameTableBody,
                    ])}
                  >
                    F
                  </td>
                )
              } else if (item[key] === 1) {
                return (
                  <td
                    key={i}
                    className={clsx([
                      'fs-14 fw-semibold hover-applications-listing ps-7',
                      classNameTableBody,
                    ])}
                  >
                    U
                  </td>
                )
              } else {
                return (
                  <td
                    key={i}
                    className={clsx([
                      'fs-14 fw-semibold hover-applications-listing ps-7',
                      classNameTableBody,
                    ])}
                  >
                    0
                  </td>
                )
              }
            }

            if (key === 'identification_no') {
              return (
                <td key={i} className='fs-6 fw-medium' style={{color: '#071437'}}>
                  {identificationNo}
                </td>
              )
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

  async function handleChangePagination(goToPage: number) {
    setSearchCriteria({...searchCriteria, currentPage: goToPage})
    setLoadApi(!loadApi)
  }

  function handleConvertDataFilter(dataFilter: {[key: string]: any}) {
    return handleFormatFilter({
      dataFilter: {
        ...dataFilter,
        searchBar: searchValue,
      },
      keyDate: ['monthly_due_Date'],
      keyNumber: ['id'],
    })
  }

  function handleSaveSearchToSession() {
    const data = {
      searchValue,
      dataFilter,
      pageSize,
      currentPage,
    }

    sessionStorage.setItem('loan', JSON.stringify(data))
  }

  function showInputFilter() {
    setShowInput(!showInput)
  }

  function handleResetFilter() {
    setDataFilter({})
    setSearchValue('')
    setLoadApi(!loadApi)
  }

  function handleFilter() {
    setSearchCriteria({...searchCriteria, currentPage: 1})
    setLoadApi(!loadApi)
  }

  function handleChangeFilter(e: React.ChangeEvent<HTMLInputElement>, key?: 'gte' | 'lte') {
    const {value, name} = e.target
    setDataFilter({
      ...dataFilter,
      [name]: key
        ? {
            ...dataFilter[name],
            [key]: value,
          }
        : value,
    })
  }

  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponseLoanListing>>, 'total'>
  ) {
    setLoading(true)
    try {
      setCheckFilter(body?.filters || {})

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

  function handleChangeSortBy(item: TableRow) {
    if (item.key === keySort) {
      setOrderBy(orderBy === 'desc' ? 'asc' : 'desc')
    } else {
      setKeySort(item.key)
      setOrderBy('asc')
    }
  }

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function handleReGetApi() {
    setLoadApi(!loadApi)
  }

  return (
    <div className='card p-5 h-fit-content'>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'Loan Listing'}</PageTitle>
      {showInput && (
        <FilterLoan
          onClose={showInputFilter}
          handleResetFilter={handleResetFilter}
          rows={rows}
          handleLoadApi={handleFilter}
          dataFilter={dataFilter}
          handleChangeFilter={handleChangeFilter}
          dataOption={dataOption}
        />
      )}
      <div>
        <div className='d-flex flex-row align-items-center'>
          <Input
            classShared='flex-grow-1 h-30px mb-5'
            placeholder='Search'
            value={searchValue}
            onChange={handleChangeSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleReGetApi()
              }
            }}
            insertLeft={
              <FontAwesomeIcon
                className='ps-12px cursor-pointer text-gray-600 text-hover-gray-900'
                icon={faSearch}
                onClick={handleReGetApi}
              />
            }
            insertRight={
              searchValue ? (
                <FontAwesomeIcon
                  className='pe-12px cursor-pointer text-gray-600 text-hover-gray-900'
                  icon={faClose}
                  onClick={() => {
                    setSearchValue('')
                    handleReGetApi()
                  }}
                />
              ) : null
            }
          />
          <div className='d-flex position-relative flex-end ms-4'>
            <Button
              style={{
                backgroundColor:
                  Object.keys(checkFilter).length !== 0 &&
                  !(
                    Object.keys(checkFilter).length === 1 &&
                    Object.keys(checkFilter).includes('searchBar')
                  )
                    ? '#c4cada'
                    : '#f1f1f4',
              }}
              onClick={showInputFilter}
              className={` align-self-center fs-6 text-primary  btn btn-secondary h-45px`}
              disabled={false}
            >
              <Icons name={'filterIcon'} />
              Filter
            </Button>
          </div>
        </div>

        {Object.keys(checkFilter).length !== 0 &&
          !(
            Object.keys(checkFilter).length === 1 && Object.keys(checkFilter).includes('searchBar')
          ) && (
            <div className='d-flex justify-content  px-30px pt-14px m-0 '>
              <h1 className='fs-14 text-gray-600 fw-semibold m-0 py-4px  mt-16px '>Filter:</h1>

              <div className='d-flex justify-content-start align-items-center p-0 m-0 flex-wrap '>
                {showFilter.map((filter, index) => (
                  <div key={index} className='p-0 m-0'>
                    {(!!checkFilter[`${filter.key}`] || checkFilter[`${filter.key}`] === 0) &&
                      !['monthly_due_date', 'status', 'loan_amount'].includes(filter.key) && (
                        <div className='wrapper-filter-application mt-16px ms-16px py-0 '>
                          <h2 className='filter-title-show'>
                            {filter.value}: {checkFilter[`${filter.key}`]}
                          </h2>
                          <div
                            onClick={() => {
                              setDataFilter({...dataFilter, [`${filter.key}`]: ''})
                              setLoadApi(!loadApi)
                            }}
                            className='p-0 m-0 cursor-pointer'
                          >
                            <Icons name={'CloseSmall'} />
                          </div>
                        </div>
                      )}

                    {!!checkFilter?.monthly_due_date && ['monthly_due_date'].includes(filter.key) && (
                      <div className='wrapper-filter-application mt-16px ms-16px py-0 '>
                        <h2 className='filter-title-show'>
                          {filter.value}:{' '}
                          {!!checkFilter?.monthly_due_date?.gte &&
                            moment(checkFilter?.monthly_due_date?.gte).format('MMM DD, YYYY')}{' '}
                          {!!checkFilter?.monthly_due_date?.lte && 'To '}
                          {!!checkFilter?.monthly_due_date?.lte &&
                            moment(checkFilter?.monthly_due_date?.lte)
                              .subtract(1, 'days')
                              .format('MMM D, YYYY')}
                        </h2>
                        <div
                          onClick={() => {
                            setDataFilter({...dataFilter, monthly_due_date: ''})
                            setLoadApi(!loadApi)
                          }}
                          className='p-0 m-0 cursor-pointer'
                        >
                          <Icons name={'CloseSmall'} />
                        </div>
                      </div>
                    )}

                    {!!checkFilter?.loan_amount && ['loan_amount'].includes(filter.key) && (
                      <div className='wrapper-filter-application mt-16px ms-16px py-0 '>
                        <h2 className='filter-title-show'>
                          {filter.value}:{' '}
                          {(!!checkFilter?.loan_amount?.gte ||
                            checkFilter?.loan_amount?.gte === 0) &&
                            'From '}
                          {(!!checkFilter?.loan_amount?.gte ||
                            checkFilter?.loan_amount?.gte === 0) &&
                            checkFilter?.loan_amount?.gte}{' '}
                          {(!!checkFilter?.loan_amount?.lte ||
                            checkFilter?.loan_amount?.lte === 0) &&
                            'To '}
                          {(!!checkFilter?.loan_amount?.lte ||
                            checkFilter?.loan_amount?.lte === 0) &&
                            checkFilter?.loan_amount?.lte}
                        </h2>
                        <div
                          onClick={() => {
                            setDataFilter({...dataFilter, loan_amount: ''})
                            setLoadApi(!loadApi)
                          }}
                          className='p-0 m-0 cursor-pointer'
                        >
                          <Icons name={'CloseSmall'} />
                        </div>
                      </div>
                    )}

                    {!!checkFilter[`${filter.key}`] && ['status'].includes(filter.key) && (
                      <div className='wrapper-filter-application mt-16px ms-16px py-0 '>
                        <h2 className='filter-title-show'>
                          {filter.value}: {+checkFilter[`${filter.key}`] === 0 && 'F'}
                          {+checkFilter[`${filter.key}`] === 1 && 'U'}
                          {+checkFilter[`${filter.key}`] === 2 && 'O'}
                        </h2>
                        <div
                          onClick={() => {
                            setDataFilter({...dataFilter, [`${filter.key}`]: ''})
                            setLoadApi(!loadApi)
                          }}
                          className='p-0 m-0 cursor-pointer'
                        >
                          <Icons name={'CloseSmall'} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  handleResetFilter()
                }}
                className='reset-all-filter-application mt-16px ms-16px'
              >
                Reset All
              </button>
            </div>
          )}

        {/* listing rows */}
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
                      const {classNameTableHead, name, infoFilter, key} = item

                      const {isSort} = infoFilter || {}

                      return (
                        <th
                          className={clsx([
                            'text-nowrap min-w-100px user-select-none',
                            classNameTableHead,
                          ])}
                          data-title={item.key}
                          key={i}
                          onClick={() => isSort && handleChangeSortBy(item)}
                        >
                          <div className='cursor-pointer'>
                            <span className='fs-14 fw-bold'>{name}</span>

                            {isSort && <SortBy isActive={keySort === key} orderBy={orderBy} />}
                          </div>
                        </th>
                      )
                    })}
                  {showAction && <th className='text-center w-150px fs-6 fw-bold'>Actions</th>}
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
            padding: '10px 22.75px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <RowPerPage
            lenghtData={searchCriteria.total}
            limit={searchCriteria.pageSize}
            page={searchCriteria.currentPage}
            setLimit={(e: any) => {
              setSearchCriteria({...searchCriteria, pageSize: +e.target.value, currentPage: 1})
            }}
          />

          <Pagination
            onChangePagePagination={handleChangePagination}
            searchCriteria={searchCriteria}
          />

          {loading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default LoanListing
