import {
  LoanDetailsProps,
  LoanInstalmentSchedule,
  OrderBy,
  PaginationType,
  TotalRepayment,
} from '@/app/types'
import {ChangeEvent, FC, Fragment, useEffect, useMemo, useState} from 'react'
import {CONFIG_REPAYMENT_SCHEDULE} from './config'
import {TableSecondary} from '@/components/table'
import RowPerPage from '@/components/row-per-page'
import Pagination from '@/components/table/components/Pagination'
import {
  filterObjectKeyNotEmpty,
  formatMoney,
  handleFormatFilter,
  isObject,
  parseJson,
} from '@/app/utils'
import gridImg from '@/app/images/grid.svg'
import {Checkbox} from '@/components/checkbox'
import clsx from 'clsx'
import {KTIcon} from '@/_metronic/helpers'
import Button from '@/components/button/Button'
import {GLOBAL_CONSTANTS} from '@/app/constants'

const RepaymentSchedule: FC<LoanDetailsProps> = ({loanInfo}) => {
  const {loan_instalment_schedule = []} = loanInfo || {}

  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>('desc')
  const [keySort, setKeySort] = useState<string>('id')
  const [dataFilter, setDataFilter] = useState<{[key: string]: any}>({})
  const [dataFilterSubmitted, setDataFilterSubmitted] = useState<{[key: string]: any}>({})
  const [loadApi, setLoadApi] = useState<boolean>(true)
  const [showConfigColumn, setShowConfigColumn] = useState<boolean>(false)
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false)
  const [pagination, setPagination] = useState<PaginationType>({
    pageSize: 10,
    currentPage: 1,
  })
  const [configColumn, setConfigColumn] = useState<any>(handleInitialConfigColumn())
  const [configColumnSubmitted, setConfigColumnSubmitted] = useState<any>(
    handleInitialConfigColumn()
  )
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

  const configTable = useMemo(() => {
    const keyIgnored = Object.keys(configColumnSubmitted).filter(
      (key) => configColumnSubmitted[key] === false
    )

    const newRows = CONFIG_REPAYMENT_SCHEDULE.rows.filter((el) => !keyIgnored.includes(el.key))
    return {
      ...CONFIG_REPAYMENT_SCHEDULE,
      rows: newRows,
    }
  }, [configColumnSubmitted])

  const loanRepayment: LoanInstalmentSchedule[] = useMemo(() => {
    let newData = [...loan_instalment_schedule]
    const qtySkip = (currentPage - 1) * pageSize

    // Slice current page
    newData = newData.slice(qtySkip, qtySkip + pageSize)

    newData = newData.map((item) => ({
      ...item,
      instalment_total: +(item.principal + item.interest).toFixed(2) || 0,
      instalment_total_balance: +(item.principal_balance + item.interest_balance).toFixed(2) || 0,
    }))
    return newData
  }, [pageSize, currentPage])

  const loanTotalInfo = useMemo(() => {
    const result = loanRepayment.reduce(
      (acc: TotalRepayment, item) => ({
        ...acc,
        total_principal: item.principal + (acc?.total_principal || 0),
        total_principal_balance: item.principal_balance + (acc?.total_principal_balance || 0),
        total_interest: item.interest + (acc?.total_interest || 0),
        total_interest_balance: item.interest_balance + (acc?.total_interest_balance || 0),
        total_late_interest: item.late_interest + (acc?.total_late_interest || 0),
        total_instalment: item.instalment_total + (acc?.total_instalment || 0),
        total_instalment_balance:
          item.instalment_total_balance + (acc?.total_instalment_balance || 0),
      }),
      {} as TotalRepayment
    )

    return result
  }, [loanRepayment])

  useEffect(() => {
    handleGetListing()
  }, [pageSize, currentPage, loadApi, keySort, orderBy])

  function handleInitialConfigColumn() {
    let config = CONFIG_REPAYMENT_SCHEDULE.rows
      .filter((el) => !el.isHide)
      .reduce((acc, el) => ({...acc, [el.key]: el.defaultShow === false ? false : true}), {})

    const configFromLocalStorage = parseJson(
      localStorage.getItem(GLOBAL_CONSTANTS.loanRepaymentConfigColumn) || ''
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
    } finally {
      setLoading(false)
    }
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

  function handleResetConfigColumn() {
    const config = CONFIG_REPAYMENT_SCHEDULE.rows
      .filter((el) => !el.isHide)
      .reduce((acc, el) => ({...acc, [el.key]: el.defaultShow === false ? false : true}), {})

    setConfigColumn(config)
    setConfigColumnSubmitted(config)
    localStorage.setItem(GLOBAL_CONSTANTS.loanRepaymentConfigColumn, JSON.stringify(config))
  }

  function handleApplyConfigColumn() {
    setConfigColumnSubmitted(configColumn)
    localStorage.setItem(GLOBAL_CONSTANTS.loanRepaymentConfigColumn, JSON.stringify(configColumn))
  }

  function handleDisplayTotalByKey(key: string) {
    const {
      total_principal,
      total_principal_balance,
      total_interest,
      total_interest_balance,
      total_late_interest,
      total_instalment,
      total_instalment_balance,
    } = loanTotalInfo || {}

    switch (key) {
      case 'id':
        return 'Total'
      case 'principal':
        return total_principal
      case 'principal_balance':
        return total_principal_balance
      case 'interest':
        return total_interest
      case 'interest_balance':
        return total_interest_balance
      case 'late_interest':
        return total_late_interest
      case 'instalment_total':
        return total_instalment
      case 'instalment_total_balance':
        return total_instalment_balance
      default:
        return ''
    }
  }

  // ============================== RENDER JSX, handle logic above ======================================================
  function renderTableFooter() {
    return (
      <tfoot className='table-foot-repayment position-sticky bottom-0 bg-gray-100'>
        <tr>
          {configTable.rows.map((el, i) => {
            const value = handleDisplayTotalByKey(el.key)

            // hidden column instalment_due_date when table has show due date
            if (el.key === 'instalment_due_date' && configColumnSubmitted[el.key])
              return <Fragment key={i}></Fragment>

            return (
              <td
                className={clsx([
                  'fs-16 fw-bold',
                  el.key === 'id' ? 'p-16px text-start' : 'px-10px text-end',
                ])}
                colSpan={el.key === 'id' && configColumnSubmitted?.['instalment_due_date'] ? 2 : 1}
                key={i}
              >
                {+value ? formatMoney(+value) : value}
              </td>
            )
          })}
          {/* <td className='fs-16 fw-bold p-16px' colSpan={2}>
            Total
          </td>
          <td className='px-10px text-end fs-16 fw-bold'>{formatMoney(total_principal)}</td>
          <td className='px-10px text-end fs-16 fw-bold'>{formatMoney(total_principal_balance)}</td>
          <td className='px-10px text-end fs-16 fw-bold'>{formatMoney(total_interest)}</td>
          <td className='px-10px text-end fs-16 fw-bold'>{formatMoney(total_interest_balance)}</td>
          <td className='px-10px text-end fs-16 fw-bold'>{formatMoney(total_late_interest)}</td> */}
        </tr>
      </tfoot>
    )
  }
  return (
    <div>
      <div className='d-flex align-items-center justify-content-between gap-16px py-16px border-bottom border-gray-200 position-relative'>
        <div className='d-flex align-items-center gap-32px'>
          {/* Note item */}
          <div className='d-flex align-items-center gap-8px'>
            <div className='bg-danger w-10px h-10px flex-shrink-0 rounded-circle'></div>
            <span className='fs-14 fw-semibold text-gray-600'>Late Payment</span>
          </div>

          {/* Note item */}
          <div className='d-flex align-items-center gap-8px'>
            <div className='bg-gray-900 w-10px h-10px flex-shrink-0 rounded-circle'></div>
            <span className='fs-14 fw-semibold text-gray-600'>On-Time Payment</span>
          </div>
        </div>

        {/* Popup */}
        <div className={clsx(['position-relative ', showConfigColumn && 'text-gray-900'])}>
          <div className='show-column-repayment d-flex align-items-center gap-8px cursor-pointer text-gray-600 text-hover-gray-900'>
            <img src={gridImg} alt='grid' />
            <span className='fs-14 d-inline-block fw-semibold' onClick={handleToggleConfigColumn}>
              Show Columns
            </span>
          </div>

          {/* config */}
          {showConfigColumn && (
            <div className='config-column-grid card'>
              {/* Header */}
              <div className='d-flex align-items-center justify-content-between gap-16px fs-16 px-30px py-16px mb-16px border-bottom border-gray-300'>
                <span className='fw-bold'>Config Column</span>

                <div
                  className='btn btn-sm btn-icon btn-active-color-primary btn-hover-color-primary'
                  onClick={handleToggleConfigColumn}
                >
                  <KTIcon className='fs-1' iconName='cross' />
                </div>
              </div>

              {/* Body */}
              <div className='grid-2-column gap-16px mh-300px overflow-y-auto px-30px'>
                {CONFIG_REPAYMENT_SCHEDULE.rows.map((el, i) => {
                  if (el.key === 'id' || el.isHide) return <Fragment key={i}></Fragment>

                  return (
                    <Checkbox
                      name={el.key}
                      label={el.name}
                      classNameLabel='ms-8px'
                      key={i}
                      checked={configColumn[el.key]}
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

                <Button className='btn btn-lg btn-primary fs-6' onClick={handleApplyConfigColumn}>
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* {showFilterPopup && (
          <FilterPopup
            className='top-0'
            onClose={handleShowToggleFilter}
            dataFilter={dataFilter}
            dataOption={{}}
            handleLoadApi={handleFilter}
            handleResetFilter={handleResetFilter}
            handleChangeFilter={handleChangeFilter}
            rows={CONFIG_REPAYMENT_SCHEDULE.rows}
          />
        )}

        <Button
          onClick={handleShowToggleFilter}
          className={clsx(['align-self-center fs-6 text-primary btn btn-secondary h-45px'])}
        >
          <Icons name={'filterIcon'} />
          Filter
        </Button> */}
      </div>

      {/* {!!Object.keys(filterHasValue).length && (
        <div className='d-flex justify-content pt-14px m-0'>
          <h1 className='fs-14 text-gray-600 fw-semibold m-0 py-4px mt-16px'>Filter:</h1>

          <div className='d-flex justify-content-start align-items-center p-0 m-0 flex-wrap'>
            {Object.keys(filterHasValue).map((key, i) => {
              const currentConfig = CONFIG_REPAYMENT_SCHEDULE.rows.find((row) => row.key === key)

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
      )} */}

      {/* Table */}
      <TableSecondary
        keySort={keySort}
        orderBy={orderBy}
        className='mt-16px mh-350px'
        config={configTable}
        onChangeSortBy={handleChangeSortBy}
        data={loanRepayment}
        loading={loading}
        pageSize={pageSize}
        currentPage={currentPage}
        tableFooter={renderTableFooter()}
      />

      <div className='d-flex align-items-center justify-content-between gap-16px mt-30px'>
        <RowPerPage
          lenghtData={loan_instalment_schedule.length}
          limit={pagination.pageSize}
          page={pagination.currentPage}
          setLimit={(e: any) => {
            setPagination({...pagination, pageSize: +e.target.value, currentPage: 1})
          }}
        />

        <Pagination
          onChangePagePagination={handleChangePagination}
          searchCriteria={{...pagination, total: loan_instalment_schedule?.length || 0}}
        />
      </div>
    </div>
  )
}

export default RepaymentSchedule
