import {LoanDetailsProps, OrderBy, PaginationType} from '@/app/types'
import {FC, useEffect, useMemo, useState} from 'react'
import {CONFIG_RECEIPT_HISTORY} from './config'
import {TableSecondary} from '@/components/table'
import RowPerPage from '@/components/row-per-page'
import Pagination from '@/components/table/components/Pagination'
import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import clsx from 'clsx'
import {FilterPopup} from '@/components/filter/FilterPopup'
import {filterObjectKeyNotEmpty, handleFormatFilter, isObject} from '@/app/utils'
import moment from 'moment'

const Receipt: FC<LoanDetailsProps> = ({loanInfo}) => {
  const {loan_payment_history = []} = loanInfo || {}

  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>('desc')
  const [keySort, setKeySort] = useState<string>('id')
  const [dataFilter, setDataFilter] = useState<{[key: string]: any}>({})
  const [dataFilterSubmitted, setDataFilterSubmitted] = useState<{[key: string]: any}>({})
  const [loadApi, setLoadApi] = useState<boolean>(true)
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false)
  const [pagination, setPagination] = useState<PaginationType>({
    pageSize: 10,
    currentPage: 1,
  })
  const {pageSize, currentPage} = pagination

  const filterHasValue = useMemo(() => {
    const newFilter = filterObjectKeyNotEmpty(dataFilter)

    const finishFilter = Object.keys(newFilter).reduce((acc, key) => {
      if (isObject(newFilter[key])) {
        const newObject = filterObjectKeyNotEmpty(newFilter[key])
        const isHasValue = Object.keys(newObject).length ? true : false

        return {...acc, ...(isHasValue ? {[key]: newObject} : {})}
      }

      return {...acc, [key]: newFilter[key]}
    }, {})

    return finishFilter
  }, [dataFilterSubmitted])

  useEffect(() => {
    handleGetListing()
  }, [pageSize, currentPage, loadApi, keySort, orderBy])

  /**
   * Handle change filter sort
   */
  function handleChangeSortBy(key: string) {
    if (key === keySort) {
      setOrderBy(orderBy === 'desc' ? 'asc' : 'desc')
    } else {
      setKeySort(key)
      setOrderBy('desc')
    }
  }

  // Change page number
  function handleChangePagination(goToPage: number) {
    setPagination({...pagination, currentPage: goToPage})
  }

  function handleShowToggleFilter() {
    setShowFilterPopup(!showFilterPopup)
  }

  function handleResetFilter() {
    setDataFilter({})
    setLoadApi(!loadApi)
  }

  /**
   * Change search value.
   * @param e element event
   * @param key Expected use for range search
   */
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

  function handleFilter() {
    setPagination({...pagination, currentPage: 1})
    setLoadApi(!loadApi)
  }

  async function handleGetListing() {
    const newDataFilter = handleFormatFilter({
      dataFilter: {
        ...dataFilter,
      },
      keyDate: ['application_date'],
      keyNumber: ['loan_type_id', 'id', 'loan_terms'],
    })
    setDataFilterSubmitted(dataFilter) // show data filtered
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      setLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between gap-16px py-16px border-bottom border-gray-200 position-relative'>
        <div className='d-flex align-items-center gap-32px'>
          {/* Note item */}
          <div className='d-flex align-items-center gap-8px'>
            <div className='bg-F64E60 w-10px h-10px flex-shrink-0 rounded-circle'></div>
            <span className='fs-14 fw-semibold text-gray-600'>Late Payment</span>
          </div>

          {/* Note item */}
          <div className='d-flex align-items-center gap-8px'>
            <div className='bg-primary w-10px h-10px flex-shrink-0 rounded-circle'></div>
            <span className='fs-14 fw-semibold text-gray-600'>On-Time Payment</span>
          </div>
        </div>

        {/* Popup */}
        {showFilterPopup && (
          <FilterPopup
            className='top-0'
            onClose={handleShowToggleFilter}
            dataFilter={dataFilter}
            dataOption={{}}
            handleLoadApi={handleFilter}
            handleResetFilter={handleResetFilter}
            handleChangeFilter={handleChangeFilter}
            rows={CONFIG_RECEIPT_HISTORY.rows}
          />
        )}

        <Button
          onClick={handleShowToggleFilter}
          className={clsx(['align-self-center fs-6 text-primary btn btn-secondary h-45px'])}
        >
          <Icons name={'filterIcon'} />
          Filter
        </Button>
      </div>

      {!!Object.keys(filterHasValue).length && (
        <div className='d-flex justify-content pt-14px m-0'>
          <h1 className='fs-14 text-gray-600 fw-semibold m-0 py-4px mt-16px'>Filter:</h1>

          <div className='d-flex justify-content-start align-items-center p-0 m-0 flex-wrap'>
            {Object.keys(filterHasValue).map((key, i) => {
              const currentConfig = CONFIG_RECEIPT_HISTORY.rows.find((row) => row.key === key)

              const name = currentConfig?.name
              const isDate = currentConfig?.infoFilter?.typeInput === 'date' ? true : false

              let value = filterHasValue[key]

              if (isObject(value)) {
                const fromValue =
                  isDate && value?.gte ? moment(value?.gte).format('MMM D, YYYY') : value?.gte
                const toValue =
                  isDate && value?.lte ? moment(value?.lte).format('MMM D, YYYY') : value?.lte

                // gte key comes first, followed by lte
                value = [fromValue || '...', toValue || '...'].join(' - ')
              }

              return (
                <div className='wrapper-filter-application mt-16px ms-16px py-0' key={i}>
                  <h2 className='filter-title-show'>
                    {name}: {value}
                  </h2>
                  <div
                    onClick={() => {
                      const _newDataFilter = {...dataFilter}
                      delete _newDataFilter[key]

                      setDataFilter(_newDataFilter)
                      setLoadApi(!loadApi)
                    }}
                    className='p-0 m-0 cursor-pointer'
                  >
                    <Icons name={'CloseSmall'} />
                  </div>
                </div>
              )
            })}
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

      {/* Table */}
      <TableSecondary
        keySort={keySort}
        orderBy={orderBy}
        className='mt-16px mh-350px'
        config={CONFIG_RECEIPT_HISTORY}
        onChangeSortBy={handleChangeSortBy}
        data={loan_payment_history}
        loading={loading}
        pageSize={pageSize}
        currentPage={currentPage}
      />

      <div className='d-flex align-items-center justify-content-between gap-16px mt-30px'>
        <RowPerPage
          lenghtData={loan_payment_history.length}
          limit={pagination.pageSize}
          page={pagination.currentPage}
          setLimit={(e: any) => {
            setPagination({...pagination, pageSize: +e.target.value, currentPage: 1})
          }}
        />

        <Pagination
          onChangePagePagination={handleChangePagination}
          searchCriteria={{...pagination, total: loan_payment_history?.length || 0}}
        />
      </div>
    </div>
  )
}

export default Receipt
