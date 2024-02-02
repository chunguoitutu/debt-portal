import {formatMoney} from '@/app/utils'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './../style.scss'
import {Button} from 'react-bootstrap'
import {FC} from 'react'

type Props = {
  className?: string
}

const NextPaymentDatePortal: FC<Props> = ({className}) => {
  return (
    <div className={`loan-amount-portal p-20px gap-20px position-relative ${className}`}>
      <div className='loan-amount-title'>Next Payment Date</div>

      <div className='d-flex flex-row gap-24px mt-20px'>
        <div className='calendar p-16px'>
          <div className='text-primary fs-2hx fw-bold'>12</div>
          <div className='text-gray-900 fs-3 fw-bold mt-2'>Dec, 2024</div>
        </div>

        <div className='d-flex flex-column w-75 gap-10px'>
          <div className='d-flex flex-row align-items-center justify-content-between'>
            <div className='text-gray-700 fs-16 fw-normal'>Number of days due</div>
            <div className='fs-16 text-gray-900 fw-bold'>2 days</div>
          </div>
          <div className='d-flex flex-row align-items-center justify-content-between'>
            <div className='text-gray-700 fs-16 fw-normal'>Expected payment during the period</div>
            <div className='fs-16 text-gray-900 fw-bold'>{formatMoney(8200)}</div>
          </div>
          <Button className='btn btn-secondary fw-semibold '>
            Payment Now <FontAwesomeIcon icon={faArrowRight} className='ms-2' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NextPaymentDatePortal
