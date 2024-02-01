import {OrderBy, TableConfig} from '@/app/types'
import clsx from 'clsx'
import {Component, FC, ReactNode, useMemo} from 'react'
import SortBy from '../sort-by'
import moment from 'moment'
import Loading from './components/Loading'
import {formatDate, formatMoney, getFullName} from '@/app/utils'
import ButtonViewDetail from '../button/ButtonViewDetail'
import {useNavigate} from 'react-router-dom'
import Badge from '@/components/badge/Badge'

type Props = {
  config: TableConfig
  className?: string
  keySort?: string
  onChangeSortBy: (key: string) => void
  orderBy?: OrderBy
  loading?: boolean
  data: any[]
  currentPage?: number
  showTableFooter?: boolean
  pageSize?: number
  tableFooter?: ReactNode
  actions?: boolean
}

const TableSecondary: FC<Props> = ({
  config,
  className,
  keySort,
  orderBy = 'desc',
  data = [],
  loading,
  showTableFooter = false,
  actions = false,
  onChangeSortBy,
  tableFooter,
}) => {
  const {rows, settings} = config
  const navigate = useNavigate()
  const ROW_LISTING = useMemo(() => {
    return rows.filter((el) => !el.isHide)
  }, [config])

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

        <thead
          style={{
            zIndex: '1',
            borderBottom: '1px solid #f1f1f4',
          }}
          className='position-sticky z-3 top-0 bg-white'
        >
          <tr
            className='text-start text-muted fw-bold fs-6 text-uppercase'
            style={{borderTop: '1px solid #f1f1f4'}}
          >
            {ROW_LISTING.map((el, i) => {
              const {key, name, classNameTableHead, infoFilter} = el
              const {isSort} = infoFilter || {}
              const isColumnLast = ROW_LISTING.length === i + 1
              return (
                <th
                  className={clsx([
                    'text-nowrap min-w-75px user-select-none px-10px pb-8px pt-0 text-gray-500',
                    isColumnLast && 'text-end pe-0',
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

            {actions && (
              <th
                className={clsx([
                  'text-nowrap min-w-75px user-select-none px-10px pb-8px pt-0 text-center',
                ])}
              >
                Action
              </th>
            )}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {Array.isArray(data) && !!data.length ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  {ROW_LISTING.map((row, i) => {
                    const {key, classNameTableBody, format, typeValue, component} = row
                    const customClassName = handleSwitchClassName(key, item)
                    const isColumnLast = ROW_LISTING.length === i + 1

                    let value = item[key]

                    if (format === 'date') {
                      value = formatDate(value, 'DD MMM, YYYY')
                    } else if (format === 'money') {
                      value = formatMoney(value)
                    }

                    if (key === 'fullname') {
                      return (
                        <td
                          key={i}
                          className='fs-6 fw-medium w-250px ps-10'
                          style={{color: '#071437'}}
                        >
                          {getFullName(item)}
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
                          className='fs-6 fw-medium w-250px text-center '
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
                      <td
                        style={{
                          whiteSpace: 'nowrap',
                          color: +item[key] < 0 && ['p&l'].includes(key) ? '#F64E60' : '#071437',
                        }}
                        className={clsx([
                          'fs-14 fw-normal py-16px px-10px ',
                          isColumnLast && 'text-end pe-0',
                          classNameTableBody,
                          customClassName,
                        ])}
                        key={i}
                      >
                        {key === 'id' ? index + 1 : value}
                      </td>
                    )
                  })}

                  {actions && (
                    <td className='text-center'>
                      <ButtonViewDetail
                        onClick={() => {
                          sessionStorage.setItem(
                            settings?.saveSESSION_NAME,
                            JSON.stringify(item?.id)
                          )
                          navigate(`${settings?.endpointNavigate}${item?.id}`)
                        }}
                      />
                    </td>
                  )}
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
        {/* Table footer */}
        {tableFooter && showTableFooter && tableFooter}
      </table>
    </div>
  )
}

export default TableSecondary
