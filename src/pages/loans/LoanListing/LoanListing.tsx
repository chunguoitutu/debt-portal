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
import {useEffect, useState} from 'react'
import {OrderBy, ResponseLoanListing, SearchCriteria, TableRow} from '@/app/types'
import {FilterLoan} from './FilterLoan'
import {handleFormatFilter, isObject, parseJson} from '@/app/utils'
import moment from 'moment'
import {useAuth} from '@/app/context/AuthContext'

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
    value: 'Application No',
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
    key: 'loan_amount_requested',
    value: 'Loan Amount',
  },
  {
    key: 'monthly_due_date',
    value: 'Monthly Due Date',
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
  const [dataFilter, setDataFilter] = useState<{[key: string]: any}>(
    isObject(sessionData?.dataFilter) ? sessionData?.dataFilter : {}
  )
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
  }, [company_id, keySort, orderBy, pageSize, currentPage])

  async function handleChangePagination(goToPage: number) {
    setSearchCriteria({...searchCriteria, currentPage: goToPage})
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
    // setLoadApi(!loadApi)
  }

  function handleFilter() {
    setSearchCriteria({...searchCriteria, currentPage: 1})
    // setLoadApi(!loadApi)
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
            insertLeft={
              <FontAwesomeIcon
                className='ps-12px cursor-pointer text-gray-600 text-hover-gray-900'
                icon={faSearch}
              />
            }
            insertRight={
              searchValue ? (
                <FontAwesomeIcon
                  className='pe-12px cursor-pointer text-gray-600 text-hover-gray-900'
                  icon={faClose}
                  onClick={() => {
                    setSearchValue('')
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
              className={`align-self-center fs-6 text-primary btn btn-secondary h-45px`}
              disabled={false}
              onClick={showInputFilter}
            >
              <Icons name={'filterIcon'} />
              Filter
            </Button>
          </div>
        </div>

        {/* {Object.keys(checkFilter).length !== 0 &&
          !(
            Object.keys(checkFilter).length === 1 && Object.keys(checkFilter).includes('searchBar')
          ) && (
            <div className='d-flex justify-content  px-30px pt-14px m-0 '>
              <h1 className='fs-14 text-gray-600 fw-semibold m-0 py-4px  mt-16px '>Filter:</h1>

              <div className='d-flex justify-content-start align-items-center p-0 m-0 flex-wrap '>
                {showFilter.map((filter, index) => (
                  <div key={index} className='p-0 m-0'>
                    {(!!checkFilter[`${filter.key}`] || checkFilter[`${filter.key}`] === 0) &&
                      !['monthly_due_date', 'loan_amount_requested'].includes(filter.key) && (
                        <div className='wrapper-filter-application mt-16px ms-16px py-0 '>
                          <h2 className='filter-title-show'>
                            {filter.value}: {checkFilter[`${filter.key}`]}
                          </h2>
                          <div
                            onClick={() => {
                              setDataFilter({...dataFilter, [`${filter.key}`]: ''})
                              //   setLoadApi(!loadApi)
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
                            moment(checkFilter?.monthly_due_date?.gte).format('MMM D, YYYY')}{' '}
                          {!!checkFilter?.monthly_due_date?.lte && 'To '}
                          {!!checkFilter?.monthly_due_date?.lte &&
                            moment(checkFilter?.monthly_due_date?.lte)
                              .subtract(1, 'days')
                              .format('MMM D, YYYY')}
                        </h2>
                        <div
                          onClick={() => {
                            setDataFilter({...dataFilter, monthly_due_date: ''})
                            // setLoadApi(!loadApi)
                          }}
                          className='p-0 m-0 cursor-pointer'
                        >
                          <Icons name={'CloseSmall'} />
                        </div>
                      </div>
                    )}
                    {!!checkFilter?.loan_amount_requested &&
                      ['loan_amount_requested'].includes(filter.key) && (
                        <div className='wrapper-filter-application mt-16px ms-16px py-0 '>
                          <h2 className='filter-title-show'>
                            {filter.value}:{' '}
                            {(!!checkFilter?.loan_amount_requested?.gte ||
                              checkFilter?.loan_amount_requested?.gte === 0) &&
                              'From '}
                            {(!!checkFilter?.loan_amount_requested?.gte ||
                              checkFilter?.loan_amount_requested?.gte === 0) &&
                              checkFilter?.loan_amount_requested?.gte}{' '}
                            {(!!checkFilter?.loan_amount_requested?.lte ||
                              checkFilter?.loan_amount_requested?.lte === 0) &&
                              'To '}
                            {(!!checkFilter?.loan_amount_requested?.lte ||
                              checkFilter?.loan_amount_requested?.lte === 0) &&
                              checkFilter?.loan_amount_requested?.lte}
                          </h2>
                          <div
                            onClick={() => {
                              setDataFilter({...dataFilter, loan_amount_requested: ''})
                              //   setLoadApi(!loadApi)
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
          )} */}

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
                {/* {data.length ? (
                  renderRows()
                ) : ( */}
                <tr>
                  <td colSpan={rows.length + 1}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center fs-14 fw-medium text-gray-600'>
                      No matching records found
                    </div>
                  </td>
                </tr>
                {/* )} */}
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
