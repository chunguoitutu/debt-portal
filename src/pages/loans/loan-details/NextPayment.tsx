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

      <div className='py-16px d-flex flex-column '>
        {!![1].length ? (
          [1, 23].map((item, i) => {
            return (
              <div className='d-flex gap-16px position-relative mb-16px' key={i}>
                <p className='border-vertical-next-payment'></p>
                <div className='d-flex align-items-center justify-content-center w-48px h-48px flex-shrink-0 object-fit-cover img-next-payment'>
                  <img src={cardImg} alt='card' />
                </div>

                {/* payment info */}
                <div className='d-flex flex-column gap-4px flex-grow-1'>
                  <span className='fs-13 fw-semibold' style={{color: '#F64E60'}}>
                    {moment(new Date()).format('MMM D, YYYY')}
                  </span>
                  <span className='fs-20 fw-bold'>{numeral(10031.415).format('$0,0.00')}</span>
                  {/* due date */}
                  <span className='rounded-8 fs-13 text-gray-600 '>
                    {Math.floor(Math.random() * 2) === 1 ? '1 day' : '2 days'} left until payment is
                    due
                  </span>
                </div>
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
