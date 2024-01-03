import NoRecord from '@/components/no-records'
import {FC} from 'react'
import cardImg from '@/app/images/card.png'
import numeral from 'numeral'
import moment from 'moment'
import {LoanDetailsProps} from '@/app/types'

const NextPayment: FC<LoanDetailsProps> = () => {
  return (
    <div className='card p-30px h-100'>
      <h2 className='fs-20 fw-bold mb-16px'>Next Payment</h2>

      <div className='py-16px d-flex flex-column gap-16px'>
        {!![1].length ? (
          [1, 23].map((item, i) => {
            return (
              <div className='d-flex align-items-center gap-16px' key={i}>
                <div className='d-flex align-items-center justify-content-center w-48px h-48px flex-shrink-0 object-fit-cover bg-gray-100 rounded-8'>
                  <img src={cardImg} alt='card' />
                </div>

                {/* payment info */}
                <div className='d-flex flex-column gap-4px flex-grow-1'>
                  <span className='fs-16 fw-bold'>{numeral(10031.415).format('$0,0.00')}</span>
                  <span className='fs-14 fw-semibold text-gray-600'>
                    {moment(new Date()).format('MMM D, YYYY')}
                  </span>
                </div>

                {/* due date */}
                <span className='p-8px border border-gray-200 bg-gray-100 rounded-8'>
                  {Math.floor(Math.random() * 2) === 1 ? '1 day' : '2 days'} left until payment is
                  due
                </span>
              </div>
            )
          })
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  )
}

export default NextPayment
