import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link, useNavigate} from 'react-router-dom'
import React, {ChangeEvent, Fragment, useEffect, useMemo, useRef, useState} from 'react'
import numeral from 'numeral'
import moment from 'moment'
import clsx from 'clsx'
import './style.scss'

import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import {
  ApplicationItem,
  OrderBy,
  ResponseApplicationListing,
  SearchCriteria,
  TableRow,
} from '@/app/types'
import request from '@/app/axios'
import {handleFormatFilter, isObject, parseJson} from '@/app/utils'
import {APPLICATION_LISTING_CONFIG} from './config'
import RowPerPage from '@/components/row-per-page'
import Badge from '@/components/badge/Badge'
import Loading from '@/components/table/components/Loading'
import ButtonEdit from '@/components/button/ButtonEdit'
import SortBy from '@/components/sort-by'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {KTCardBody, KTIcon} from '@/_metronic/helpers'
import {useAuth} from '@/app/context/AuthContext'
import {Input} from '@/components/input'
import Pagination from '@/components/table/components/Pagination'
import {FilterApplication} from './FilterApplication'
import {faClose, faSearch} from '@fortawesome/free-solid-svg-icons'
import {useSocket} from '@/app/context/SocketContext'
import {Checkbox} from '@/components/checkbox'
import {GLOBAL_CONSTANTS, SESSION_NAME} from '@/app/constants'
import gridImg from '@/app/images/grid.svg'
import useClickOutside from './../../../app/hooks/useClickOutside'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Applications',
    path: '/application/listing',
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
    key: 'application_no',
    value: 'Application No',
  },
  {
    key: 'fullname',
    value: 'Name Of Borrower',
  },
  {
    key: 'identification_type',
    value: 'Identity Card Type',
  },
  {
    key: 'identification_no',
    value: 'NRIC No',
  },
  {
    key: 'loan_type_id',
    value: 'Loan Type',
  },
  {
    key: 'loan_amount_requested',
    value: 'Loan Amount',
  },
  {
    key: 'loan_terms',
    value: 'Loan Terms',
  },
  {
    key: 'application_date',
    value: 'Application Date',
  },
  {
    key: 'status',
    value: 'Status',
  },
]

const ApplicationListing = () => {
  const {settings, rows} = APPLICATION_LISTING_CONFIG || {}
  const {showAction = true, showEditButton} = settings || {}

  const {company_id} = useAuth()
  const {socket} = useSocket()

  // Get search criteria from session
  const sessionData = isObject(
    parseJson(sessionStorage.getItem(SESSION_NAME.applicationFilter) || '')
  )
    ? parseJson(sessionStorage.getItem(SESSION_NAME.applicationFilter) || '')
    : {}
  const idRecentlyViewed =
    +parseJson(sessionStorage.getItem(SESSION_NAME.recentlyViewedApplicationId)) || 0

  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [dataFilter, setDataFilter] = React.useState<{[key: string]: any}>(
    isObject(sessionData?.dataFilter) ? sessionData?.dataFilter : {}
  )
  const [checkFilter, setCheckFilter] = React.useState<any>({})
  const [data, setData] = React.useState<ApplicationItem[]>([])
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>(sessionData?.orderBy || 'desc')
  const [keySort, setKeySort] = useState<string>(sessionData?.keySort || 'id')
  const [searchValue, setSearchValue] = useState<string>(sessionData?.searchValue || '')
  const [loadApi, setLoadApi] = React.useState<boolean>(true)

  const [showConfigColumn, setShowConfigColumn] = useState<boolean>(false)

  const [configColumn, setConfigColumn] = useState<any>(handleInitialConfigColumn())
  const [configColumnSubmitted, setConfigColumnSubmitted] = useState<any>(
    handleInitialConfigColumn()
  )

  const rowsConfigColumn = useMemo(() => {
    const keyIgnored = Object.keys(configColumnSubmitted).filter(
      (key) => configColumnSubmitted[key] === false
    )
    return rows.filter((el) => !keyIgnored.includes(el.key))
  }, [configColumnSubmitted])

  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: sessionData?.pageSize || 10,
    currentPage: sessionData?.currentPage || 1,
    total: 0,
  })
  const [newDataSocket, setNewDataSocket] = React.useState<number>(0) // new data in realtime
  const {pageSize, currentPage} = searchCriteria

  const [typeTermUnit, setTypeTermUnit] = useState(null)

  const selectRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectRef, () => {
    setShowConfigColumn(false)
  })

  useEffect(() => {
    const handleDetectNewApplication = () => {
      setNewDataSocket((prev) => prev + 1)
    }

    socket?.on('newApplication', handleDetectNewApplication)

    return () => {
      socket?.off('newApplication', handleDetectNewApplication) // Clean up event listener on component unmount
    }
  }, [socket])

  /**
   * get api or filter
   */
  React.useEffect(() => {
    const allApi = rows
      .filter((item) => item?.infoFilter?.dependencyApi)
      .map(
        (item) =>
          request.post(item?.infoFilter?.dependencyApi as string, {
            company_id: +company_id,
            pageSize: 9999,
            currentPage: 1,
          }),
        {
          status: true,
        }
      )

    Promise.all(allApi).then((res) => {
      let result: {[key: string]: any[]} = {}

      res.forEach((res) => {
        const configItem = rows.find((item) => item.infoFilter?.dependencyApi === res.config.url)

        const data = res.data.data
        result = {...result, [configItem?.key as string]: data}

        if (!configItem) return
      })

      setDataOption(result)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const navigate = useNavigate()

  function handleSaveSearchToSession() {
    const data = {
      searchValue,
      dataFilter,
      pageSize,
      currentPage,
    }

    sessionStorage.setItem(SESSION_NAME.applicationFilter, JSON.stringify(data))
  }

  function handleNavigateEditApplication(item: ApplicationItem) {
    navigate(`/application/edit/${item.id}`)
  }

  function showInputFilter() {
    setShowInput(!showInput)
  }

  const renderRows = () => {
    return data.map((item, idx) => {
      const termUnit = item?.term_unit
      const customer_no = item?.customer_no

      return (
        <tr
          key={idx}
          className={clsx([
            'hover-tr-listing cursor-pointer',
            idRecentlyViewed === item.id && 'bg-light-primary',
          ])}
        >
          {rowsConfigColumn.map(
            (
              {key, component, classNameTableBody, isHide, options, infoFilter, isLink, linkUrl},
              i
            ) => {
              const {keyLabelOption, keyValueOption} = infoFilter || {}

              if (item.application_no === 'A-CO-2024-00044') {
              }
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

              if (key === 'application_date') {
                value = moment(item[key]).format('DD MMM, YYYY')
              }

              if (key === 'loan_amount_requested') {
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

              if (key === 'status') {
                let title: string = ''
                let color: string = ''
                if (item[key] === 1) {
                  title = 'Awaiting Approval'
                  color = 'warning'
                } else if (item[key] === 2) {
                  title = 'Rejected'
                  color = 'danger'
                } else if (item[key] === 3) {
                  title = 'Approved'
                  color = 'success'
                } else {
                  title = 'Draft'
                  color = 'info'
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
              if (key === 'identification_no') {
                return (
                  <td key={i} className='fs-6 fw-medium' style={{color: '#071437'}}>
                    {value}
                  </td>
                )
              }

              if (key === 'fullname') {
                if (isLink && item.status === 3) {
                  return (
                    <td key={i} className='fs-6 fw-medium cursor-pointer'>
                      <Link
                        to={`${linkUrl}/${customer_no}`}
                        className='text-hover-primary text-gray-900'
                      >
                        {value}
                      </Link>
                    </td>
                  )
                }
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
                  <ButtonEdit onClick={() => handleNavigateEditApplication(item)} />
                )}
              </div>
            </td>
          )}
        </tr>
      )
    })
  }

  // get list application
  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponseApplicationListing>>, 'total'>
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

      setTypeTermUnit(response.term_unit)
      Array.isArray(response.data) && setData(response.data)
      response?.searchCriteria && setSearchCriteria(response?.searchCriteria)
    } catch (error) {
      // no thing
    } finally {
      setLoading(false)
    }
  }

  // Change page number
  async function handleChangePagination(goToPage: number) {
    setSearchCriteria({...searchCriteria, currentPage: goToPage})
    setLoadApi(!loadApi)
  }

  /**
   * Change search value.
   * @param e element event
   * @param key Expected use for range search
   */

  function handleChangeFilter(e: React.ChangeEvent<HTMLInputElement>, key?: 'gte' | 'lte') {
    const {value, name} = e.target

    if (['Rejected', 'Awaiting Approval', 'Draft', 'Approved'].includes(name)) {
      if ((dataFilter?.status?.in || []).includes(Number(e.target.value))) {
        const newArr = (dataFilter?.status?.in || []).filter(
          (num) => num !== Number(e.target.value)
        )

        setDataFilter({
          ...dataFilter,
          status: {
            in: newArr,
          },
        })
      } else {
        setDataFilter({
          ...dataFilter,
          status: {
            in: [...(dataFilter?.status?.in || []), Number(e.target.value)],
          },
        })
      }
    } else {
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
  }

  // Reset the filter. include search bar, filter
  function handleResetFilter() {
    setDataFilter({})
    setSearchValue('')
    setLoadApi(!loadApi)
  }

  /**
   * Delete empty fields, reformat data to send to API
   * Re-run api on useEffect
   * @returns New data after formatting
   */
  function handleConvertDataFilter(dataFilter: {[key: string]: any}) {
    return handleFormatFilter({
      dataFilter: {
        ...dataFilter,
        searchBar: searchValue,
      },
      keyDate: ['application_date'],
      keyNumber: ['loan_type_id', 'id', 'loan_terms'],
    })
  }

  /**
   * Handle change filter sort
   * Re-run api on useEffect
   */
  function handleChangeSortBy(item: TableRow) {
    if (item.key === keySort) {
      setOrderBy(orderBy === 'desc' ? 'asc' : 'desc')
    } else {
      setKeySort(item.key)
      setOrderBy('asc')
    }
  }

  // Change value search bar
  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  //to call api when get listing/filter/search
  function handleReGetApi() {
    setLoadApi(!loadApi)
    setSearchCriteria({...searchCriteria, currentPage: 1})
  }

  function handleFilter() {
    setSearchCriteria({...searchCriteria, currentPage: 1})
    setLoadApi(!loadApi)
  }

  // Reset force data
  function handleRefreshDataSocket() {
    setDataFilter({})
    setSearchValue('')
    setNewDataSocket(0)
    setSearchCriteria({
      ...searchCriteria,
      currentPage: 1,
    })
    setLoadApi(!loadApi)
  }

  function handleToggleConfigColumn() {
    setShowConfigColumn(!showConfigColumn)
    setShowInput(false)
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
    localStorage.setItem(GLOBAL_CONSTANTS.applicationConfigColumn, JSON.stringify(configColumn))
  }

  function handleResetConfigColumn() {
    const config = APPLICATION_LISTING_CONFIG.rows
      .filter((el) => !el.isHide)
      .reduce((acc, el) => ({...acc, [el.key]: el.defaultShow === false ? false : true}), {})

    setConfigColumn(config)
    setConfigColumnSubmitted(config)
    localStorage.setItem(GLOBAL_CONSTANTS.applicationConfigColumn, JSON.stringify(config))
  }

  function handleInitialConfigColumn() {
    let config = APPLICATION_LISTING_CONFIG.rows
      .filter((el) => !el.isHide)
      .reduce((acc, el) => ({...acc, [el.key]: el.defaultShow === false ? false : true}), {})

    const configFromLocalStorage = parseJson(
      localStorage.getItem(GLOBAL_CONSTANTS.applicationConfigColumn) || ''
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
    <div className='card '>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'Application Listing'}</PageTitle>
      {showInput && (
        <FilterApplication
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
        <div className='d-flex flex-row align-items-center p-16px'>
          <Input
            classShared='flex-grow-1 h-30px mb-5'
            placeholder='Search application (Enter Application No or Name or NRIC No to search)'
            value={searchValue}
            transparent={true}
            className='fs-5'
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
          <div className='d-flex flex-row position-relative flex-end ms-2'>
            <div
              className={clsx(['position-relative p-3 pe-0', showConfigColumn && 'text-gray-900'])}
            >
              <div
                className='show-column-repayment d-flex align-items-center gap-8px cursor-pointer text-gray-600 text-hover-gray-900 justify-content-end me-1'
                onClick={handleToggleConfigColumn}
              >
                <img src={gridImg} alt='grid' />
                <span
                  className='fs-14 d-inline-block fw-semibold pe-5'
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
                  <div className='d-flex align-items-center justify-content-between gap-16px fs-16 px-30px py-16px border-bottom border-gray-300'>
                    <span className='fw-bold'>Config Columns</span>

                    <div
                      className='btn btn-sm btn-icon btn-active-color-primary btn-hover-color-primary ps-6'
                      onClick={handleToggleConfigColumn}
                    >
                      <KTIcon className='fs-1' iconName='cross' />
                    </div>
                  </div>

                  {/* Body */}
                  <div className='grid-2-column gap-16px mh-300px overflow-y-auto px-30px fw-semibold py-24px'>
                    {APPLICATION_LISTING_CONFIG.rows.map((el, i) => {
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
                  <div className='d-flex justify-content-end p-30px pt-0 gap-8px'>
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
              className={`align-self-center fs-6 h-45px p-3 pt-4 fw-semibold cursor-pointer text-gray-600 text-hover-gray-900 ms-2`}
              onClick={showInputFilter}
            >
              <Icons name={'FilterIconBorrower'} />
              Filter
            </div>
          </div>
        </div>

        {!!newDataSocket && (
          <div className='wrapper-records-applications '>
            <div className='p-0 m-0'>
              <p className='records-applications'>
                Detected {newDataSocket} new {Number(newDataSocket) === 1 ? 'record' : 'records'}.
              </p>
              <p className='records-applications-reset'>Do you want to refresh the data now?</p>
            </div>

            <Button disabled={loading} loading={loading} onClick={handleRefreshDataSocket}>
              Refresh
            </Button>
          </div>
        )}

        {Object.keys(checkFilter).length !== 0 &&
          !(
            Object.keys(checkFilter).length === 1 && Object.keys(checkFilter).includes('searchBar')
          ) &&
          ((checkFilter[`status`]?.in || []).length > 0 ||
            !Object.keys(checkFilter).includes('searchBar')) && (
            <div className='d-flex align-self-center px-30px pb-5 ps-5'>
              <h1 className='fs-14 text-gray-600 fw-semibold m-0 pt-4px align-self-center'>
                Filter:
              </h1>

              <div className='d-flex justify-content-start align-items-center p-0 m-0 flex-wrap'>
                {showFilter.map((filter, index) => {
                  return (
                    <div key={index} className='p-0 m-0'>
                      {(!!checkFilter[`${filter.key}`] || checkFilter[`${filter.key}`] === 0) &&
                        ![
                          'application_date',
                          'loan_amount_requested',
                          'status',
                          'loan_type_id',
                          'loan_terms',
                          'identification_type',
                        ].includes(filter.key) && (
                          <div className='wrapper-filter-application ms-16px py-0 mt-2'>
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
                      {!!checkFilter[`${filter.key}`] &&
                        ['status'].includes(filter.key) &&
                        (checkFilter[`${filter.key}`]?.in || []).length > 0 && (
                          <div className='wrapper-filter-application ms-16px py-0 mt-2'>
                            <h2 className='filter-title-show d-flex justify-content-center align-items-center gap-4px'>
                              {filter.value}:
                              {(checkFilter[`${filter.key}`]?.in || []).map((status, i) => (
                                <p key={i} className='p-0 m-0 '>
                                  {+status === 0 && 'Draft'}
                                  {+status === 1 && 'Awaiting Approval'}
                                  {+status === 2 && 'Rejected'}
                                  {+status === 3 && 'Approved'}
                                  {(checkFilter[`${filter.key}`]?.in || []).length > 1 &&
                                    i < (checkFilter[`${filter.key}`]?.in || []).length - 1 &&
                                    ','}
                                </p>
                              ))}
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
                      {(!!checkFilter[`${filter.key}`] ||
                        Number(checkFilter[`${filter.key}`]) == 0) &&
                        ['loan_terms'].includes(filter.key) && (
                          <div className='wrapper-filter-application ms-16px py-0 mt-2'>
                            <h2 className='filter-title-show'>
                              {filter.value}:{' '}
                              {[1, 0].includes(Number(checkFilter[`${filter.key}`]) || 0)
                                ? `${checkFilter[`${filter.key}`]}`
                                : `${checkFilter[`${filter.key}`]}`}
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
                      {!!checkFilter[`${filter.key}`] &&
                        ['identification_type'].includes(filter.key) && (
                          <div className='wrapper-filter-application ms-16px py-0 mt-2'>
                            <h2 className='filter-title-show'>
                              {filter.value}:{' '}
                              {checkFilter[`${filter.key}`] === 'foreign_identification_number'
                                ? 'Foreign Identification Number'
                                : 'Singapore NRIC No'}
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
                      {!!checkFilter?.application_date &&
                        ['application_date'].includes(filter.key) && (
                          <div className='wrapper-filter-application ms-16px py-0 mt-2'>
                            <h2 className='filter-title-show'>
                              {filter.value}:{' '}
                              {!!checkFilter?.application_date?.gte
                                ? moment(checkFilter?.application_date?.gte).format('MMM D, YYYY')
                                : '...'}{' '}
                              -{' '}
                              {!!checkFilter?.application_date?.lte
                                ? moment(checkFilter?.application_date?.lte)
                                    .subtract(1, 'days')
                                    .format('MMM D, YYYY')
                                : '...'}
                            </h2>
                            <div
                              onClick={() => {
                                setDataFilter({...dataFilter, application_date: ''})
                                setLoadApi(!loadApi)
                              }}
                              className='p-0 m-0 cursor-pointer'
                            >
                              <Icons name={'CloseSmall'} />
                            </div>
                          </div>
                        )}
                      {!!checkFilter?.loan_amount_requested &&
                        ['loan_amount_requested'].includes(filter.key) && (
                          <div className='wrapper-filter-application ms-16px py-0 mt-2'>
                            <h2 className='filter-title-show'>
                              {filter.value}:{' '}
                              {!!checkFilter?.loan_amount_requested?.gte ||
                              checkFilter?.loan_amount_requested?.gte === 0
                                ? `$${checkFilter?.loan_amount_requested?.gte}`
                                : '...'}{' '}
                              -{' '}
                              {!!checkFilter?.loan_amount_requested?.lte ||
                              checkFilter?.loan_amount_requested?.lte === 0
                                ? `$${checkFilter?.loan_amount_requested?.lte}`
                                : '...'}
                            </h2>
                            <div
                              onClick={() => {
                                setDataFilter({...dataFilter, loan_amount_requested: ''})
                                setLoadApi(!loadApi)
                              }}
                              className='p-0 m-0 cursor-pointer'
                            >
                              <Icons name={'CloseSmall'} />
                            </div>
                          </div>
                        )}
                      {!!checkFilter?.loan_type_id &&
                        ['loan_type_id'].includes(filter.key) &&
                        dataOption?.loan_type_id.length !== 0 && (
                          <div className='wrapper-filter-application ms-16px py-0 mt-2'>
                            <h2 className='filter-title-show'>
                              {filter.value}:{' '}
                              {
                                dataOption?.loan_type_id.filter(
                                  (data) => +data?.id === +checkFilter?.loan_type_id
                                )[0]?.type_name
                              }
                            </h2>
                            <div
                              onClick={() => {
                                setDataFilter({...dataFilter, loan_type_id: ''})
                                setLoadApi(!loadApi)
                              }}
                              className='p-0 m-0 cursor-pointer'
                            >
                              <Icons name={'CloseSmall'} />
                            </div>
                          </div>
                        )}
                    </div>
                  )
                })}
                <button
                  onClick={() => {
                    handleResetFilter()
                  }}
                  className='reset-all-filter-application ms-16px mt-2'
                >
                  Reset All
                </button>
              </div>
            </div>
          )}

        <KTCardBody className='p-0'>
          <div className='table-responsive'>
            <table
              id='kt_table_users'
              className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            >
              <thead className='border-top-bottom-thead position-sticky  bg-white'>
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
            padding: '16px',
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
export default ApplicationListing
