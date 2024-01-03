import {LoanDetailsProps} from '@/app/types'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import moment from 'moment'
import {FC} from 'react'

const LoanHeader: FC<LoanDetailsProps> = ({loanInfo}) => {
  return (
    <div className='loan-header card p-30px position-relative'>
      <div className='d-flex flex-column gap-4px pb-30px'>
        <h1 className='loan-identification-no fs-14 fs-bolder'>L-MC-2024-00123</h1>
        <span className='fs-14 text-gray-500 fw-semibold'>Application ID: A-MC-2024-00123</span>
      </div>

      {/* Ribbon */}
      <div className='loan-ribbon px-8px pt-30px fs-14 fw-semibold bg-primary text-white'>
        Pending
      </div>

      {/* Loan date payment */}
      <div className='d-flex flex-column gap-4px'>
        <span className='text-gray-700 fs-14'>
          Loan Start Date:{' '}
          <strong className='fw-bold'>{moment(new Date()).format('MMM D, YYYY')}</strong>
        </span>
        <span className='text-gray-700 fs-14'>
          Loan Next Due Date:{' '}
          <strong className='fw-bold'>{moment(new Date()).format('MMM D, YYYY')}</strong>
        </span>
      </div>

      <div className='p-16px mt-16px border border-gray-200 rounded-inherit'>
        {/* Loan info payment */}
        <div className='d-flex border-bottom border-gray-200 mb-16px pb-16px'>
          <div className='d-flex flex-column fs-14 flex-grow-1 border-end border-gray-200 pe-16px me-16px'>
            <span className='loan-amount fw-bolder'>$25,000.00</span>
            <span>Loan Amount</span>
          </div>

          <div className='d-flex flex-column fs-14 flex-grow-1'>
            <span className='loan-interest fw-bolder'>%4</span>
            <span>Interest Rate</span>
          </div>
        </div>

        {/* View more */}
        <span className='text-gray-700 text-hover-primary cursor-pointer fs-14 w-100 d-flex align-items-center justify-content-between gap-16px'>
          View More <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>
    </div>
  )
}

export default LoanHeader
