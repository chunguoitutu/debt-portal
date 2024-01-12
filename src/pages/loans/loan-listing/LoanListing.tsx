import {KTCardBody, KTIcon} from '@/_metronic/helpers'
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
import React, {ChangeEvent, Fragment, useEffect, useMemo, useRef, useState} from 'react'
import {LoanItem, OrderBy, ResponseLoanListing, SearchCriteria, TableRow} from '@/app/types'
import {FilterLoan} from './FilterLoan'
import {getFullName, handleFormatFilter, isObject, parseJson} from '@/app/utils'
import moment from 'moment'
import {useAuth} from '@/app/context/AuthContext'
import request from '@/app/axios'
import numeral from 'numeral'
import {PageTitle, PageLink} from '@/_metronic/layout/core'
import {useNavigate} from 'react-router-dom'
import Badge from '@/components/badge/Badge'
import {GLOBAL_CONSTANTS} from '@/app/constants'
import {Checkbox} from '@/components/checkbox'
import gridImg from '@/app/images/grid.svg'
import useClickOutside from '@/app/hooks/useClickOutside'

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
    key: 'approval_date',
    value: 'Monthly Due Date',
  },
  {
    key: 'loan_term',
    value: 'Loan Term',
  },
  {
    key: 'status',
    value: 'Status',
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

  const [showConfigColumn, setShowConfigColumn] = useState<boolean>(false)

  const [configColumn, setConfigColumn] = useState<any>(handleInitialConfigColumn())
  const [configColumnSubmitted, setConfigColumnSubmitted] = useState<any>(
    handleInitialConfigColumn()
  )

  const {pageSize, currentPage} = searchCriteria

  const navigate = useNavigate()

  const {company_id} = useAuth()

  const rowsConfigColumn = useMemo(() => {
    const keyIgnored = Object.keys(configColumnSubmitted).filter(
      (key) => configColumnSubmitted[key] === false
    )
    return rows.filter((el) => !keyIgnored.includes(el.key))
  }, [configColumnSubmitted])

  const selectRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectRef, () => {
    setShowConfigColumn(false)
  })

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
          {rowsConfigColumn.map(
            ({key, component, classNameTableBody, isHide, options, infoFilter}, i) => {
              const {keyLabelOption, keyValueOption} = infoFilter || {}

              const identificationNo = item?.borrower?.customer?.identification_no

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
                    {getFullName(item?.borrower?.customer)}
                  </td>
                )
              }

              if (key === 'approval_date') {
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

              if (key === 'identification_no') {
                return (
                  <td
                    key={i}
                    className='fs-6 fw-medium text-hover-primary cursor-pointer'
                    style={{color: '#071437'}}
                  >
                    {identificationNo}
                  </td>
                )
              }

              if (key === 'loan_term') {
                return (
                  <td key={i} className='ps-8 pe-8 text-end fs-6 fw-medium text-gray-900'>
                    {value < 2 ? `${value} Month` : `${value} Months`}
                  </td>
                )
              }

              if (key === 'status') {
                let title: string = ''
                let color: string = ''
                if (item[key] === 1) {
                  title = 'Active'
                  color = 'success'
                } else if (item[key] === 2) {
                  title = 'Close'
                  color = 'info'
                } else if (item[key] === 3) {
                  title = 'Cancelled'
                  color = 'danger'
                } else {
                  title = 'Peding'
                  color = 'warning'
                }

                return (
                  <td
                    key={i}
                    className={clsx([
                      'fs-14 fw-semibold hover-applications-listing',
                      classNameTableBody,
                    ])}
                  >
                    <Badge color={color as any} title={title as any} key={i} />
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
            }
          )}
          {showAction && showEditButton && (
            <td className='text-center'>
              <div className='d-flex align-items-center justify-content-center gap-1'>
                {showEditButton && (
                  <ButtonViewDetail
                    onClick={() => {
                      navigate(`/loans/details/${item?.id}`)
                    }}
                  />
                )}
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
      keyDate: ['approval_date'],
      keyNumber: ['id', 'loan_term'],
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
    setSearchCriteria({...searchCriteria, currentPage: 1})
  }

  function handleToggleConfigColumn() {
    setShowConfigColumn(!showConfigColumn)
  }

  function handleChangeConfigColumn(e: ChangeEvent<HTMLInputElement>) {
    const {name, checked} = e.target
    setConfigColumn({
      ...configColumn,
      [name]: checked,
    })
  }

  function handleApplyConfigColumn() {
    setConfigColumnSubmitted(configColumn)
    localStorage.setItem(GLOBAL_CONSTANTS.loanConfigColumn, JSON.stringify(configColumn))
  }

  function handleResetConfigColumn() {
    const config = LOAN_LISTING_CONFIG.rows
      .filter((el) => !el.isHide)
      .reduce((acc, el) => ({...acc, [el.key]: el.defaultShow === false ? false : true}), {})

    setConfigColumn(config)
    setConfigColumnSubmitted(config)
    localStorage.setItem(GLOBAL_CONSTANTS.loanConfigColumn, JSON.stringify(config))
  }

  function handleInitialConfigColumn() {
    let config = LOAN_LISTING_CONFIG.rows
      .filter((el) => !el.isHide)
      .reduce((acc, el) => ({...acc, [el.key]: el.defaultShow === false ? false : true}), {})

    const configFromLocalStorage = parseJson(
      localStorage.getItem(GLOBAL_CONSTANTS.loanConfigColumn) || ''
    )

    if (isObject(configFromLocalStorage)) {
      const newConfig = Object.keys(configFromLocalStorage).reduce(
        (acc, key) => ({...acc, [key]: !!configFromLocalStorage[key]}),
        {}
      )
      config = {...config, ...newConfig}
    }

    return config
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
        <div className='d-flex flex-row align-items-center pb-12px'>
          <Input
            classShared='flex-grow-1 h-30px mb-5'
            placeholder='Search'
            value={searchValue}
            transparent={true}
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
          <div className='d-flex flex-row position-relative flex-end ms-3'>
            <div
              className={clsx(['position-relative p-3 pe-0', showConfigColumn && 'text-gray-900'])}
            >
              <div
                className='show-column-repayment d-flex align-items-center gap-8px cursor-pointer text-gray-600 text-hover-gray-900 justify-content-end me-1'
                onClick={handleToggleConfigColumn}
              >
                <img src={gridImg} alt='grid' />
                <span
                  className='fs-14 d-inline-block fw-semibold pe-4'
                  style={{borderRight: '1px solid #ccc'}}
                >
                  Show Columns
                </span>
              </div>

              {/* config */}
              {showConfigColumn && (
                <div
                  className='config-column-grid-customer card justify-content-end'
                  ref={selectRef}
                >
                  {/* Header */}
                  <div className='d-flex align-items-center justify-content-between gap-16px fs-16 px-30px py-16px mb-16px border-bottom border-gray-300'>
                    <span className='fw-bold'>Config Columns</span>

                    <div
                      className='btn btn-sm btn-icon btn-active-color-primary btn-hover-color-primary'
                      onClick={handleToggleConfigColumn}
                    >
                      <KTIcon className='fs-1' iconName='cross' />
                    </div>
                  </div>

                  {/* Body */}
                  <div className='grid-2-column gap-16px mh-300px overflow-y-auto px-30px fw-semibold'>
                    {LOAN_LISTING_CONFIG.rows.map((el, i) => {
                      if (el.key === 'id' || el.isHide) return <Fragment key={i}></Fragment>

                      const isChecked = configColumn[el.key]

                      return (
                        <Checkbox
                          name={el.key}
                          label={el.name}
                          classNameLabel={`ms-8px ${isChecked ? '' : 'text-gray-600'}`}
                          key={i}
                          checked={isChecked}
                          onChange={handleChangeConfigColumn}
                        />
                      )
                    })}
                  </div>

                  {/* Footer */}
                  <div className='d-flex justify-content-end p-30px gap-8px'>
                    <Button
                      className='btn btn-lg btn-light btn-active-light-primary me-2 fs-6'
                      onClick={handleResetConfigColumn}
                    >
                      Reset
                    </Button>

                    <Button
                      className='btn btn-lg btn-primary fs-6'
                      onClick={handleApplyConfigColumn}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                backgroundColor:
                  Object.keys(checkFilter).length !== 0 &&
                  !(
                    Object.keys(checkFilter).length === 1 &&
                    Object.keys(checkFilter).includes('searchBar')
                  )
                    ? ''
                    : '',
              }}
              className={`align-self-center fs-6 h-45px p-3 pt-4 fw-semibold cursor-pointer text-gray-600 text-hover-gray-900`}
              onClick={showInputFilter}
            >
              <Icons name={'FilterIconBorrower'} />
              Filter
            </div>
          </div>
        </div>

        {Object.keys(checkFilter).length !== 0 &&
          !(
            Object.keys(checkFilter).length === 1 && Object.keys(checkFilter).includes('searchBar')
          ) && (
            <div className='d-flex align-self-center px-30px pb-4 ps-1'>
              <h1 className='fs-14 text-gray-600 fw-semibold m-0 pt-4px '>Filter:</h1>

              <div className='d-flex justify-content-start align-items-center p-0 m-0 flex-wrap '>
                {showFilter.map((filter, index) => (
                  <div key={index} className='p-0 m-0'>
                    {(!!checkFilter[`${filter.key}`] || checkFilter[`${filter.key}`] === 0) &&
                      !['approval_date', 'status', 'loan_amount', 'loan_term'].includes(
                        filter.key
                      ) && (
                        <div className='wrapper-filter-application ms-16px py-0 '>
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

                    {!!checkFilter?.approval_date && ['approval_date'].includes(filter.key) && (
                      <div className='wrapper-filter-application ms-16px py-0 '>
                        <h2 className='filter-title-show'>
                          {filter.value}:{' '}
                          {getDayWithSuffix(parseInt(checkFilter[`${filter.key}`], 10))}
                        </h2>
                        <div
                          onClick={() => {
                            setDataFilter({...dataFilter, approval_date: ''})
                            setLoadApi(!loadApi)
                          }}
                          className='p-0 m-0 cursor-pointer'
                        >
                          <Icons name={'CloseSmall'} />
                        </div>
                      </div>
                    )}

                    {!!checkFilter?.loan_term && ['loan_term'].includes(filter.key) && (
                      <div className='wrapper-filter-application ms-16px py-0 '>
                        <h2 className='filter-title-show'>
                          {filter.value}:{' '}
                          {checkFilter[`${filter.key}`] < 2
                            ? `${checkFilter[`${filter.key}`]} Month`
                            : `${checkFilter[`${filter.key}`]} Months`}
                        </h2>
                        <div
                          onClick={() => {
                            setDataFilter({...dataFilter, loan_term: ''})
                            setLoadApi(!loadApi)
                          }}
                          className='p-0 m-0 cursor-pointer'
                        >
                          <Icons name={'CloseSmall'} />
                        </div>
                      </div>
                    )}

                    {!!checkFilter?.loan_amount && ['loan_amount'].includes(filter.key) && (
                      <div className='wrapper-filter-application ms-16px py-0 '>
                        <h2 className='filter-title-show'>
                          {filter.value}:{' '}
                          {!!checkFilter?.loan_amount?.gte || checkFilter?.loan_amount?.gte === 0
                            ? `$${checkFilter?.loan_amount?.gte}`
                            : '...'}{' '}
                          -{' '}
                          {!!checkFilter?.loan_amount?.lte || checkFilter?.loan_amount?.lte === 0
                            ? `$${checkFilter?.loan_amount?.lte}`
                            : '...'}
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
                      <div className='wrapper-filter-application ms-16px py-0 '>
                        <h2 className='filter-title-show'>
                          {filter.value}: {+checkFilter[`${filter.key}`] === 0 && 'Peding'}
                          {+checkFilter[`${filter.key}`] === 1 && 'Active'}
                          {+checkFilter[`${filter.key}`] === 2 && 'Close'}
                          {+checkFilter[`${filter.key}`] === 3 && 'Cancelled'}
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
                className='reset-all-filter-application ms-16px'
              >
                Reset All
              </button>
            </div>
          )}

        {/* listing rows */}
        <KTCardBody className='p-0'>
          <div className='table-responsive'>
            <table
              id='kt_table_users'
              className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            >
              <thead className='border-top-bottom-thead'>
                <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                  {rowsConfigColumn
                    .filter((item) => !item.isHide)
                    .map((item, i) => {
                      const {classNameTableHead, name, infoFilter, key} = item

                      const {isSort} = infoFilter || {}

                      return (
                        <th
                          className={clsx([
                            'text-nowrap min-w-75px user-select-none',
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
                  {showAction && (
                    <th className='text-center w-125px fs-6 fw-bold pt-2 pb-2'>Actions</th>
                  )}
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
          className='ps-2'
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
