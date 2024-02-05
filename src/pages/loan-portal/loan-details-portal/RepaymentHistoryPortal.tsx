import {formatDate, formatMoney} from '@/app/utils'
import moment from 'moment'
import {FC} from 'react'

type Props = {
  className?: string
}

const RepaymentHistoryPortal: FC<Props> = ({className}) => {
  const data = [
    {
      no_payment: '26th',
      date_payment: '2024-01-17',
      time_payment: '20:30',
      amount_payment: 820,
      balance_at_the_end: 26640,
    },
    {
      no_payment: '26th',
      date_payment: '2024-01-17',
      time_payment: '20:30',
      amount_payment: 820,
      balance_at_the_end: 26640,
    },
    {
      no_payment: '26th',
      date_payment: '2024-01-17',
      time_payment: '20:30',
      amount_payment: 820,
      balance_at_the_end: 26640,
    },
    {
      no_payment: '26th',
      date_payment: '2024-01-17',
      time_payment: '20:30',
      amount_payment: 820,
      balance_at_the_end: 26640,
    },
    {
      no_payment: '26th',
      date_payment: '2024-01-17',
      time_payment: '20:30',
      amount_payment: 820,
      balance_at_the_end: 26640,
    },
    {
      no_payment: '26th',
      date_payment: '2024-01-17',
      time_payment: '20:30',
      amount_payment: 820,
      balance_at_the_end: 26640,
    },
    {
      no_payment: '26th',
      date_payment: '2024-01-17',
      time_payment: '20:30',
      amount_payment: 820,
      balance_at_the_end: 26640,
    },
  ]

  return (
    <div
      className={`loan-amount-portal p-20px gap-20px position-relative h-100 flex-grow-1 overflow-auto ${className}`}
      style={{maxHeight: '759px'}}
    >
      <div className='loan-amount-title'>Repayment History</div>
      <div className='text-gray-400 fs-14 fw-normal mt-2'>Past 12 months</div>

      {data.map((item, key) => {
        return (
          <div className='d-flex flex-row p-16px ps-0 pb-0 pe-0' key={key}>
            <div className='d-flex pe-20px'>
              <div className='timeline-badge d-flex flex-column align-items-center gap-8px '>
                <i className='fa fa-genderless text-primary fs-1'></i>
                <div className='flex-grow-1 w-1px bg-gray-300'></div>
              </div>
            </div>

            <div
              className='d-flex flex-column w-100 gap-8px pb-20px'
              style={{borderBottom: '1px dashed #DBDFE9'}}
            >
              <div className='d-flex flex-row align-items-center justify-content-between w-100'>
                <div className='fs-16 text-gray-900 fw-bold'>{item.no_payment} Payment</div>
                <div className='d-flex flex-row gap-8px'>
                  <div className='fs-13 fw-normal text-gray-700'>
                    {formatDate(item.date_payment, 'DD MMM, YYYY')}
                  </div>
                  <div className='fs-13 fw-normal text-gray-700'>
                    {moment(item.time_payment, 'HH:mm').format('LT')}
                  </div>
                </div>
              </div>

              <div className='d-flex flex-row align-items-center justify-content-between w-100'>
                <div className='fs-14 text-gray-900 fw-normal'>Payment amount</div>
                <div className='fs-16 fw-normal text-gray-900 fw-bold'>
                  {formatMoney(item.amount_payment)}
                </div>
              </div>

              <div className='d-flex flex-row align-items-center justify-content-between w-100'>
                <div className='fs-14 text-gray-900 fw-normal'>
                  Balance at the end of the period
                </div>
                <div className='fs-16 fw-normal text-primary fw-bold'>
                  {formatMoney(item.balance_at_the_end)}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RepaymentHistoryPortal
