import {Fragment, useMemo} from 'react'
import {CUSTOMER_EMPLOYMENT_CONFIG, CUSTOMER_INCOME_CONFIG, DataOverview} from './config'
import clsx from 'clsx'
import {Table} from 'react-bootstrap'
import {formatMoney} from '@/app/utils'

const Employment = ({data}: DataOverview) => {
  const {employment} = data || {}

  const isSelfEmployed = useMemo(() => {
    return employment?.['employment_status'] === 'UNEMPINC' ? true : false
  }, [employment])

  return (
    <div className='d-flex flex-column gap-16px'>
      {/* Header */}
      <div className='grid-2-column gap-12px'>
        {CUSTOMER_EMPLOYMENT_CONFIG.map((el, i) => {
          let value = employment?.[el.key]

          if (el.key === 'employment_status') {
            value = isSelfEmployed ? 'Yes' : 'No'
          } else if (el.format === 'option') {
            const label = el.options?.find((o) => o.value === value)?.label || ''
            value = label
          }

          if (isSelfEmployed && el.key === 'company_name') return <Fragment key={i}></Fragment>

          return (
            <Fragment key={i}>
              <span className='fs-14 text-gray-700 w-fit-content'>{el.label}</span>
              <span
                className={clsx([
                  'fw-semibold',
                  !value ? 'fs-16 text-gray-400 font-italic' : 'fs-14 text-gray-900',
                ])}
              >
                {value || 'None'}
              </span>
            </Fragment>
          )
        })}
      </div>

      {/* Body */}
      <Table className='table-bordered mb-24px'>
        <tbody className='border-gray-300'>
          {CUSTOMER_INCOME_CONFIG.map((el, i) => {
            let value: any = employment?.[el.key]

            if (el.format === 'money') {
              value = formatMoney(value)
            }
            return (
              <tr key={i}>
                <td className='text-gray-700 fs-14'>{el.label}</td>
                <td className='fw-semibold'>{value}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Employment
