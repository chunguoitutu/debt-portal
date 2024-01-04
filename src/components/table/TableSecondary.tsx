import {OrderBy, TableConfig} from '@/app/types'
import clsx from 'clsx'
import {FC, useMemo} from 'react'
import SortBy from '../sort-by'
import moment from 'moment'
import numeral from 'numeral'
import Loading from './components/Loading'

type Props = {
  config: TableConfig
  className?: string
  keySort?: string
  onChangeSortBy: (key: string) => void
  orderBy?: OrderBy
  loading?: boolean
  data: any[]
  currentPage?: number
  pageSize?: number
}

const TableSecondary: FC<Props> = ({
  config,
  className,
  keySort,
  orderBy = 'desc',
  data = [],
  loading,
  currentPage = 1,
  pageSize = 10,
  onChangeSortBy,
}) => {
  const {rows} = config

  const ROW_LISTING = useMemo(() => {
    return rows.filter((el) => !el.isHide)
  }, [config])

  function handleSwitchChangeValue(key: string, item: any, index: number) {
    const value = item[key]
    switch (key) {
      case 'id':
        return index + 1 + pageSize * (currentPage - 1)
      case 'due_date':
      case 'repayment_date':
        return moment(value).format('MMM D, YYYY')
      case 'interest_amount':
      case 'principal_amount':
      case 'principal_paid':
      case 'interest_paid':
      case 'penalty_paid':
        return numeral(value).format('$0,0.00')
      default:
        return value
    }
  }

  function handleSwitchClassName(key: string, item: any) {
    switch (key) {
      default:
        return ''
    }
  }

  return (
    <div className={clsx(['table-responsive', className])}>
      {loading && <Loading />}

      <table
        id='kt_table_users'
        className='table align-middle table-row-dashed fs-6 no-footer mb-0'
      >
        {/* Table head */}
        <thead className='position-sticky top-0 bg-white'>
          <tr className='text-start text-muted fw-bolder fs-7 text-uppercase'>
            {ROW_LISTING.map((el, i) => {
              const {key, name, classNameTableHead, infoFilter} = el
              const {isSort} = infoFilter || {}
              return (
                <th
                  className={clsx([
                    'text-nowrap min-w-75px user-select-none px-10px pb-16px pt-0',
                    isSort && 'cursor-pointer',
                    classNameTableHead,
                  ])}
                  data-title={key}
                  key={i}
                  onClick={() => isSort && onChangeSortBy(key)}
                >
                  {name}

                  {isSort && <SortBy isActive={keySort === key} orderBy={orderBy} />}
                </th>
              )
            })}
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {Array.isArray(data) && !!data.length ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  {ROW_LISTING.map((row, i) => {
                    const {key, classNameTableBody} = row

                    const value = handleSwitchChangeValue(key, item, index)
                    const customClassName = handleSwitchClassName(key, item)

                    return (
                      <td
                        className={clsx([
                          'fs-14 fw-semibold py-16px px-10px',
                          classNameTableBody,
                          customClassName,
                        ])}
                        key={i}
                      >
                        {value}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={ROW_LISTING.length + 1}>
                <div className='d-flex text-center w-100 align-content-center justify-content-center fs-14 fw-medium text-gray-600'>
                  No matching records found
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableSecondary
