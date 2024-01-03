import {KTCardBody} from '@/_metronic/helpers'
import {PageLink, PageTitle} from '@/_metronic/layout/core'
import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import {Input} from '@/components/input'
import {faClose, faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useEffect, useState} from 'react'
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
import ButtonViewDetail from '@/components/button/ButtonViewDetail'
import {BORROWER_CONFIG_LISTING} from './config'

type Props = {}

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Borrowers',
    path: '/borrower/listing',
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
  },
  {
    key: 'fullname',
    value: 'Full Name',
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
    key: 'gender',
    value: 'Gender',
  },
  {
    key: 'date_of_birth',
    value: 'Date Of Birth',
  },
  {
    key: 'mobilephone_1',
    value: 'Telephone',
  },
]

const BorrowersListing = (props: Props) => {
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
  const [checkFilter, setCheckFilter] = React.useState<any>({})
  const [showInput, setShowInput] = React.useState<boolean>(false)

  const [orderBy, setOrderBy] = useState<OrderBy>(sessionData?.orderBy || 'desc')
  const [keySort, setKeySort] = useState<string>(sessionData?.keySort || 'id')
  const [searchValue, setSearchValue] = useState<string>(sessionData?.searchValue || '')

  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: sessionData?.pageSize || 10,
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

  const renderRows = () => {
    return data.map((item, idx) => {
      return (
        <tr key={idx}>
          {rows.map(({key, component, classNameTableBody, isHide, options, infoFilter}, i) => {
            const {keyLabelOption, keyValueOption} = infoFilter || {}

            const {firstname, middlename, lastname} = item

            const fullname = [firstname, middlename, lastname].filter(Boolean).join(' ')

            const phoneNumber = item.borrower?.[0].mobilephone_1 || ''

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
                <td key={i} className='fs-6 fw-medium w-250px' style={{color: '#071437'}}>
                  {fullname}
                </td>
              )
            }

            if (key === 'mobilephone_1') {
              return (
                <td
                  key={i}
                  className={`${classNameTableBody} fs-6 fw-medium w-250px ps-20`}
                  style={{color: '#071437'}}
                >
                  {phoneNumber}
                </td>
              )
            }

            if (key === 'date_of_birth') {
              value = moment(item[key]).format('MMM D, YYYY')
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
    <div className='card p-5 h-fit-content'>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'Borrower Listing'}</PageTitle>
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
              className={` align-self-center fs-6 text-primary  btn btn-secondary h-45px`}
              disabled={false}
              onClick={showInputFilter}
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
                      !['identification_type', 'date_of_birth'].includes(filter.key) && (
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

                    {!!checkFilter[`${filter.key}`] &&
                      ['identification_type'].includes(filter.key) && (
                        <div className='wrapper-filter-application mt-16px  ms-16px py-0 '>
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
                    {!!checkFilter?.date_of_birth && ['date_of_birth'].includes(filter.key) && (
                      <div className='wrapper-filter-application mt-16px ms-16px py-0 '>
                        <h2 className='filter-title-show'>
                          {filter.value}:{' '}
                          {!!checkFilter?.date_of_birth?.gte &&
                            moment(checkFilter?.date_of_birth?.gte).format('MMM D, YYYY')}{' '}
                          {!!checkFilter?.date_of_birth?.lte && 'To '}
                          {!!checkFilter?.date_of_birth?.lte &&
                            moment(checkFilter?.date_of_birth?.lte)
                              .subtract(1, 'days')
                              .format('MMM D, YYYY')}
                        </h2>
                        <div
                          onClick={() => {
                            setDataFilter({...dataFilter, date_of_birth: ''})
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

export default BorrowersListing
