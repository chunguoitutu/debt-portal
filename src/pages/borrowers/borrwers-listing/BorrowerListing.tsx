import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import {Input} from '@/components/input'
import {faClose, faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {ChangeEvent, FC, Fragment, useEffect, useMemo, useRef, useState} from 'react'
import clsx from 'clsx'
import RowPerPage from '@/components/row-per-page'
import {BorrowerItem, OrderBy, ResponseBorrowerListing, SearchCriteria, TableRow} from '@/app/types'
import Pagination from '@/components/table/components/Pagination'

import SortBy from '@/components/sort-by'
import moment from 'moment'
import Loading from '@/components/table/components/Loading'
import {handleFormatFilter, isObject, parseJson} from '@/app/utils'
import request from '@/app/axios'
import {useAuth} from '@/app/context/AuthContext'
import {FilterBorrower} from './FilterBorrower'
import {BORROWER_CONFIG_LISTING} from './config'
import {GLOBAL_CONSTANTS, SESSION_NAME} from '@/app/constants'
import {Checkbox} from '@/components/checkbox'
import gridImg from '@/app/images/grid.svg'
import './style.scss'
import {getCSSVariableValue} from '@/_metronic/assets/ts/_utils'

import ChartImg from '@/app/images/ChartBorrowerListing.png'
import Badge from '@/components/badge/Badge'
import useClickOutside from '@/app/hooks/useClickOutside'
import ButtonViewDetail from '@/components/button/ButtonViewDetail'
import {useNavigate} from 'react-router-dom'
import {PageLink, PageTitle} from '@/components/breadcrumbs'
import {KTIcon} from '@/_metronic/helpers'

type Props = {
  chartSize?: number
  chartLine?: number
  chartRotate?: number
}

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Customers',
    path: '/customer/listing',
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
    key: 'customer_no',
    value: 'Customer No',
    valueStart: '',
  },
  {
    key: 'fullname',
    value: 'Full Name',
    valueStart: '',
  },
  {
    key: 'identification_no',
    value: 'NRIC No',
    valueStart: '',
  },
  {
    key: 'blacklisted',
    value: 'Blacklisted',
    valueStart: '',
  },
  {
    key: 'exclusion',
    value: 'Exclusion',
    valueStart: '',
  },
  {
    key: 'status',
    value: 'Status',
  },
]

const BorrowersListing: FC<Props> = ({chartSize = 100, chartLine = 18, chartRotate = 145}) => {
  const sessionData = isObject(parseJson(sessionStorage.getItem('borrower') || ''))
    ? parseJson(sessionStorage.getItem('borrower') || '')
    : {}

  const idRecentlyViewed =
    +parseJson(sessionStorage.getItem(SESSION_NAME.recentlyViewedCustomerId)) || 0

  const {settings, rows} = BORROWER_CONFIG_LISTING || {}
  const {showAction = true, showViewButton} = settings || {}
  const [loadApi, setLoadApi] = React.useState<boolean>(true)

  const [data, setData] = React.useState<BorrowerItem[]>([])
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [dataFilter, setDataFilter] = React.useState<{[key: string]: any}>(
    isObject(sessionData?.dataFilter) ? sessionData?.dataFilter : {}
  )
  const [checkFilter, setCheckFilter] = React.useState<any>({})
  const [showInput, setShowInput] = React.useState<boolean>(false)

  const [orderBy, setOrderBy] = useState<OrderBy>(sessionData?.orderBy || 'desc')
  const [keySort, setKeySort] = useState<string>(sessionData?.keySort || 'id')
  const [searchValue, setSearchValue] = useState<string>(sessionData?.searchValue || '')

  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: 10,
    currentPage: sessionData?.currentPage || 1,
    total: 0,
  })

  const {pageSize, currentPage} = searchCriteria
  const {company_id} = useAuth()

  const [showConfigColumn, setShowConfigColumn] = useState<boolean>(false)

  const [configColumn, setConfigColumn] = useState<any>(handleInitialConfigColumn())
  const [configColumnSubmitted, setConfigColumnSubmitted] = useState<any>(
    handleInitialConfigColumn()
  )

  const navigate = useNavigate()

  const selectRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectRef, () => {
    setShowConfigColumn(false)
  })

  const rowsConfigColumn = useMemo(() => {
    const keyIgnored = Object.keys(configColumnSubmitted).filter(
      (key) => configColumnSubmitted[key] === false
    )
    return rows.filter((el) => !keyIgnored.includes(el.key))
  }, [configColumnSubmitted])

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

  function handleResetFilter() {
    setDataFilter({})
    setSearchValue('')
    setLoadApi(!loadApi)
  }

  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponseBorrowerListing>>, 'total'>
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

  async function handleChangePagination(goToPage: number) {
    setSearchCriteria({...searchCriteria, currentPage: goToPage})
    setLoadApi(!loadApi)
  }
  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function handleReGetApi() {
    setLoadApi(!loadApi)
    setSearchCriteria({...searchCriteria, currentPage: 1})
  }

  function handleChangeSortBy(item: TableRow) {
    if (item.key === keySort) {
      setOrderBy(orderBy === 'desc' ? 'asc' : 'desc')
    } else {
      setKeySort(item.key)
      setOrderBy('asc')
    }
  }

  function showInputFilter() {
    setShowInput(!showInput)
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
    localStorage.setItem(GLOBAL_CONSTANTS.borrowerConfigColumn, JSON.stringify(configColumn))
  }

  function handleResetConfigColumn() {
    const config = BORROWER_CONFIG_LISTING.rows
      .filter((el) => !el.isHide)
      .reduce((acc, el) => ({...acc, [el.key]: el.defaultShow === false ? false : true}), {})

    setConfigColumn(config)
    setConfigColumnSubmitted(config)
    localStorage.setItem(GLOBAL_CONSTANTS.borrowerConfigColumn, JSON.stringify(config))
  }

  function handleInitialConfigColumn() {
    let config = BORROWER_CONFIG_LISTING.rows
      .filter((el) => !el.isHide)
      .reduce((acc, el) => ({...acc, [el.key]: el.defaultShow === false ? false : true}), {})

    const configFromLocalStorage = parseJson(
      localStorage.getItem(GLOBAL_CONSTANTS.borrowerConfigColumn) || ''
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

  const renderRows = () => {
    return data.map((item, idx) => {
      return (
        <tr
          key={idx}
          className={`hover-tr-listing cursor-pointer ${
            item.id === idRecentlyViewed && 'bg-light-primary'
          }`}
        >
          {rowsConfigColumn.map(
            ({key, component, classNameTableBody, isHide, options, infoFilter}, i) => {
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

              if (key === 'application_date') {
                value = moment(item[key]).format('MMM D, YYYY')
              }

              // handle for select
              if (dataOption[key] || options) {
                const currentItem =
                  (options || dataOption[key]).find(
                    (item) => item[keyValueOption || 'value'] === value
                  ) || {}

                value = currentItem[keyLabelOption || 'label'] || ''
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
                  <td key={i} className='fs-6 fw-medium w-250px ps-10' style={{color: '#071437'}}>
                    {item.lastname} {''} {item.firstname}
                  </td>
                )
              }

              if (key === 'blacklisted') {
                return (
                  <td
                    key={i}
                    className='fs-6 fw-medium w-250px text-center'
                    style={{color: '#071437'}}
                  >
                    {item.blacklisted === 0 ? 'No' : 'Yes'}
                  </td>
                )
              }

              if (key === 'exclusion') {
                return (
                  <td
                    key={i}
                    className='fs-6 fw-medium w-250px text-center'
                    style={{color: '#071437'}}
                  >
                    {value === 0 ? 'No' : 'Yes'}
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
                  title = 'In-Prison'
                  color = 'danger'
                } else if (item[key] === 3) {
                  title = 'Bankrupt'
                  color = 'danger'
                } else {
                  title = 'Decreased'
                  color = 'danger'
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
          {showAction && showViewButton && (
            <td className='text-center'>
              <div className='d-flex align-items-center justify-content-center gap-1'>
                {showViewButton && (
                  <ButtonViewDetail
                    onClick={() => {
                      sessionStorage.setItem(
                        SESSION_NAME.recentlyViewedCustomerId,
                        JSON.stringify(item?.id)
                      )
                      navigate(`/customers/details/${item?.customer_no}`, {
                        state: {
                          id: item?.id,
                        },
                      })
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

  const chartRef = useRef<HTMLDivElement | null>(null)

  const initChart = function (
    chartSize: number = 120,
    chartLine: number = 18,
    chartRotate: number = 145
  ) {
    const el = document.getElementById('kt_card_widget_17_chart')
    if (!el) {
      return
    }
    el.innerHTML = ''

    var options = {
      size: chartSize,
      lineWidth: chartLine,
      rotate: chartRotate,
    }

    const canvas = document.createElement('canvas')
    const span = document.createElement('span')

    // @ts-ignore
    if (typeof G_vmlCanvasManager !== 'undefined') {
      // @ts-ignore
      G_vmlCanvasManager.initElement(canvas)
    }

    const ctx = canvas.getContext('2d')
    canvas.width = canvas.height = options.size

    el.appendChild(span)
    el.appendChild(canvas)

    // @ts-ignore
    ctx.translate(options.size / 2, options.size / 2) // change center
    // @ts-ignore
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI) // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
    const radius = (options.size - options.lineWidth) / 2

    const drawCircle = function (color: string, lineWidth: number, percent: number) {
      percent = Math.min(Math.max(0, percent || 1), 1)
      if (!ctx) {
        return
      }

      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false)
      ctx.strokeStyle = color
      ctx.lineCap = 'round' // butt, round or square
      ctx.lineWidth = lineWidth
      ctx.stroke()
    }

    // Init 2
    drawCircle('#E4E6EF', options.lineWidth, 100 / 100)
    drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, 100 / 125)
    drawCircle('#071437', options.lineWidth, 100 / 175)
    drawCircle('#C62828', options.lineWidth, 100 / 350)
  }

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    setTimeout(() => {
      initChart(chartSize, chartLine, chartRotate)
    }, 10)
  }

  useEffect(() => {
    refreshChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const configTable = useMemo(() => {
  //   const keyIgnored = Object.keys(configColumnSubmitted).filter(
  //     (key) => configColumnSubmitted[key] === false
  //   )

  //   const newRows = BORROWER_CONFIG_LISTING.rows.filter((el) => !keyIgnored.includes(el.key))
  //   return {
  //     ...BORROWER_CONFIG_LISTING,
  //     rows: newRows,
  //   }
  // }, [configColumnSubmitted])

  return (
    <div
      className=' d-flex flex-column flex-grow-1 h-fit-content overflow-hidden'
      style={{maxHeight: '100%'}}
    >
      <div className='row' style={{height: 'fit-content', overflow: 'hidden'}}>
        {/* left */}
        <div className='col-12 col-xxl-3 h-xxl-100'>
          {/* chart circle */}
          <div className='row h-xxl-100'>
            <div className='col-12 col-lg-6 col-xxl-12 flex-grow-1'>
              <div className='card p-30px flex-grow-1 h-100'>
                <div className='d-flex flex-column'>
                  <span className='fs-2 fw-bold text-gray-900'>
                    {searchCriteria.total} Customers
                  </span>
                  <span className='fs-13 fw-semibold' style={{color: '#99A1B7'}}>
                    Total number of customers in the company.
                  </span>
                </div>

                <div className='pt-24px'>
                  <div className='d-flex flex-wrap align-items-center justify-content-center'>
                    <div className='d-flex flex-center me-5 pt-2'>
                      <div
                        id='kt_card_widget_17_chart'
                        ref={chartRef}
                        style={{minWidth: chartSize + 'px', minHeight: chartSize + 'px'}}
                        data-kt-size={chartSize}
                        data-kt-line={chartLine}
                      ></div>
                    </div>
                  </div>
                  <div className='d-flex flex-column content-justify-center flex-row-fluid mt-5'>
                    <div className='d-flex fw-semibold align-items-center'>
                      <div className='bullet w-15px h-6px rounded-2 bg-primary me-3'></div>
                      <div className='text-gray-700 flex-grow-1 me-4 fs-14'>Active</div>
                      <div className=' fw-bold text-gray-900 text-xxl-end fs-14'>50 Customers</div>
                    </div>
                    <div className='d-flex fw-semibold align-items-center my-3'>
                      <div
                        className='bullet w-15px h-6px rounded-2 me-3'
                        style={{backgroundColor: '#071437'}}
                      ></div>
                      <div className='text-gray-700 flex-grow-1 me-4 fs-14'>Deceased</div>
                      <div className='fw-bold text-gray-900 text-xxl-end fs-14'>1 Customer</div>
                    </div>
                    <div className='d-flex fw-semibold align-items-center'>
                      <div
                        className='bullet w-15px h-6px rounded-2 me-3'
                        style={{backgroundColor: '#C62828'}}
                      ></div>
                      <div className='text-gray-700 flex-grow-1 me-4 fs-14'>Bankrupt</div>
                      <div className=' fw-bold text-gray-900 text-xxl-end fs-14'>14 Customers</div>
                    </div>
                    <div className='d-flex fw-semibold align-items-center mt-3'>
                      <div
                        className='bullet w-15px h-6px rounded-2 me-3'
                        style={{backgroundColor: '#E4E6EF'}}
                      ></div>
                      <div className='text-gray-700 flex-grow-1 me-4 fs-14'>In-Prison</div>
                      <div className='fw-bold text-gray-900 text-xxl-end fs-14'>12 Customers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* chart line */}
            <div className='col-12 col-lg-6 col-xxl-12 my-24px my-lg-0 mt-xxl-14px overflow-hidden'>
              <div className='card h-100'>
                <div className='loan-header p-30px pt-30px pb-0 position-relative '>
                  <div className='d-flex flex-column'>
                    <span className='fs-2 fw-bold text-gray-900'>32 Customers Blacklisted</span>
                    <span className='fs-13 fw-semibold' style={{color: '#99A1B7'}}>
                      Total number of customers blacklisted in the company.
                    </span>
                  </div>
                </div>
                <div className='p-30px pt-16px'>
                  <div className='d-flex flex-row gap-2'>
                    <div className='fs-2 fw-bold text-gray-900'>Accounting For</div>
                    <div className='fs-2 fw-bold text-primary'>12%</div>
                  </div>
                  <div className='d-flex flex-wrap align-items-center justify-content-center h-100 pb-30px'>
                    <img src={ChartImg} alt='' className='style-img-chart' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className='col-12 col-xxl-9 d-flex flex-column ps-xxl-1' style={{height: '100%'}}>
          <div className='card w-100 d-flex flex-column overflow-auto mt-lg-6 mt-xxl-0 h-100'>
            <div className='h-100 overflow-hidden flex-grow-1 h-100'>
              <PageTitle breadcrumbs={profileBreadCrumbs}>{'Customer Listing'}</PageTitle>
              {showInput && (
                <FilterBorrower
                  onClose={showInputFilter}
                  handleResetFilter={handleResetFilter}
                  rows={rows}
                  handleLoadApi={handleFilter}
                  dataFilter={dataFilter}
                  handleChangeFilter={handleChangeFilter}
                  dataOption={dataOption}
                />
              )}
              <div className='d-flex flex-column h-100 overflow-hidden h-100'>
                <div className='d-flex flex-row align-items-center p-16px'>
                  <Input
                    classShared='flex-grow-1 h-30px mb-5 '
                    placeholder='Search customer (Enter Customer ID or Name or NRIC No to search)'
                    value={searchValue}
                    transparent={true}
                    onChange={handleChangeSearch}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleReGetApi()
                      }
                    }}
                    className='fs-5'
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
                      className={clsx([
                        'position-relative p-3 pe-0',
                        showConfigColumn && 'text-gray-900',
                      ])}
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
                          <div
                            className='grid-2-column gap-16px mh-300px overflow-y-auto px-30px fw-semibold py-24px'
                            style={{maxHeight: 'calc(100vh - 450px)'}}
                          >
                            {BORROWER_CONFIG_LISTING.rows.map((el, i) => {
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

                {Object.keys(checkFilter).length !== 0 &&
                  !(
                    Object.keys(checkFilter).length === 1 &&
                    Object.keys(checkFilter).includes('searchBar')
                  ) && (
                    <div className='d-flex align-self-center px-30px pb-5 ps-6 w-100'>
                      <h1 className='fs-14 text-gray-600 fw-semibold m-0 pt-4px mt-2'>Filter:</h1>

                      <div className='d-flex justify-content-start align-items-center p-0 m-0 flex-wrap '>
                        {showFilter.map((filter, index) => (
                          <div key={index} className='p-0 m-0'>
                            {(!!checkFilter[`${filter.key}`] ||
                              checkFilter[`${filter.key}`] === 0) &&
                              !['blacklisted', 'exclusion', 'status'].includes(filter.key) && (
                                <div className='wrapper-filter-application ms-16px py-0 mt-2'>
                                  <h2 className='filter-title-show'>
                                    {filter.value}: {filter.valueStart}
                                    {checkFilter[`${filter.key}`]}
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

                            {!!checkFilter[`${filter.key}`] && ['exclusion'].includes(filter.key) && (
                              <div className='wrapper-filter-application  ms-16px py-0 mt-2'>
                                <h2 className='filter-title-show'>
                                  {filter.value}:{' '}
                                  {checkFilter[`${filter.key}`] === '1' ? 'Yes' : 'No'}
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
                              ['blacklisted'].includes(filter.key) && (
                                <div className='wrapper-filter-application  ms-16px py-0 mt-2'>
                                  <h2 className='filter-title-show'>
                                    {filter.value}:{' '}
                                    {checkFilter[`${filter.key}`] === '1' ? 'Yes' : 'No'}
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

                            {!!checkFilter[`${filter.key}`] && ['status'].includes(filter.key) && (
                              <div className='wrapper-filter-application ms-16px py-0 mt-2'>
                                <h2 className='filter-title-show'>
                                  {filter.value}:{' '}
                                  {+checkFilter[`${filter.key}`] === 0 && 'Decreased'}
                                  {+checkFilter[`${filter.key}`] === 1 && 'Active'}
                                  {+checkFilter[`${filter.key}`] === 2 && 'In-Prison'}
                                  {+checkFilter[`${filter.key}`] === 3 && 'Bankrupt'}
                                  {+checkFilter[`${filter.key}`] === 4 && 'Missing'}
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

                <div className='p-0 d-flex flex-column overflow-hidden'>
                  <div className='table-responsive flex-grow-1 overflow-auto h-100 mh-600px'>
                    <table
                      id='kt_table_users'
                      className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    >
                      <thead
                        className='table-foot-lookup position-sticky top-0 bg-white border-bottom border-gray-200'
                        style={{zIndex: 1}}
                      >
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

                                    {isSort && (
                                      <SortBy isActive={keySort === key} orderBy={orderBy} />
                                    )}
                                  </div>
                                </th>
                              )
                            })}
                          {showAction && (
                            <th className='text-center w-125px fs-6 fw-bold pt-2 pb-2'>Action</th>
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
                        setSearchCriteria({
                          ...searchCriteria,
                          pageSize: +e.target.value,
                          currentPage: 1,
                        })
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BorrowersListing
