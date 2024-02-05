import React, {FC, ReactNode, useMemo} from 'react'
import clsx from 'clsx'
import SortBy from '../sort-by'
import moment from 'moment'
import Loading from './components/Loading'
import {formatDate, formatMoney, getFullName} from '@/app/utils'
import ButtonViewDetail from '../button/ButtonViewDetail'
import {useNavigate} from 'react-router-dom'
import Badge from '@/components/badge/Badge'
import {OrderBy, TableConfig} from '@/app/types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'

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

const TableMobile: FC<Props> = ({
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

  return (
    <div className='row g-12px'>
      {Array.isArray(data) && !!data.length ? (
        data.map((item, index) => (
          <div className='col-12' key={index}>
            <div className='card p-12px'>
              {rows.map((row, i) => {
                const {key, format, name} = row
                let value = item[key]
                if (format === 'date') {
                  value = formatDate(value, 'DD MMM, YYYY')
                } else if (format === 'money') {
                  value = formatMoney(value)
                }
                if (key === 'status') {
                  let title: any = ''
                  let color: any = ''
                  if (value === 1) {
                    title = 'Active'
                    color = 'success'
                  } else if (value === 2) {
                    title = 'In-Prison'
                    color = 'danger'
                  } else if (value === 3) {
                    title = 'Bankrupt'
                    color = 'danger'
                  } else {
                    title = 'Decreased'
                    color = 'danger'
                  }

                  return (
                    <div
                      key={i}
                      className='text-start fs-14 ps-2 mb-2 w-100 d-flex align-items-center justify-content-between'
                    >
                      <Badge color={color as any} title={title as any} key={i} />
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        color='#0D6EFD'
                        className='cursor-pointer'
                      />
                    </div>
                  )
                }

                if (key === 'loan_no') {
                  return <div className='text-gray-900 fw-bold fs-16 ps-8px mb-8px'>{value}</div>
                }

                return (
                  <div
                    className='d-flex flex-row align-items-center justify-content-between w-100'
                    key={i}
                  >
                    <div
                      className={clsx(['text-nowrap fw-normal px-8px pb-4px pt-4px text-gray-500'])}
                      data-title={key}
                      key={i}
                    >
                      {name}
                    </div>
                    <div key={key} className='text-gray-900 fw-semibold'>
                      {value}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      ) : (
        <div className='d-flex text-center w-100 align-content-center justify-content-center fs-14 fw-medium text-gray-600'>
          No matching records found
        </div>
      )}
    </div>
  )
}

export default TableMobile
