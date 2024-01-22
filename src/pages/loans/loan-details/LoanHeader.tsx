import {LoanDetailsProps} from '@/app/types'
import moment from 'moment'
import {FC} from 'react'
import {formatMoney} from '@/app/utils'
import {useNavigate} from 'react-router-dom'

const LoanHeader: FC<LoanDetailsProps> = ({loanInfo}) => {
  const {loan_info, instalment_schedule} = loanInfo || {}
  const {loan_no, loan_amount, application, interest} = loan_info

  const navigate = useNavigate()

  return (
    <div className='loan-header card p-30px position-relative'>
      <div className='d-flex flex-column gap-4px pb-30px'>
        <h1 className='loan-identification-no fw-bolder'>{loan_no}</h1>
        <span className='fs-14 text-gray-500 fw-semibold'>
          Application No:{' '}
          <span
            className='text-gray-500 text-hover-primary cursor-pointer'
            onClick={() => navigate(`/application/edit/${application.id}`)}
          >
            {application?.application_no}
          </span>
        </span>
      </div>

      {/* Ribbon */}
      <div className='loan-ribbon px-8px pt-30px fs-14 fw-semibold bg-primary text-white'>
        Pending
      </div>

      {/* Loan date payment */}

      <div className='p-16px mt-16px border-dashed-loan rounded-inherit'>
        {/* Loan info payment */}
        <div className='d-flex boder-bottom-dashed mb-16px pb-16px'>
          <div className='d-flex flex-column fs-14 flex-grow-1 boder-end-dashed pe-16px me-16px'>
            <span className='loan-amount fs-2 fw-bold'>{formatMoney(+loan_amount)}</span>
            <span>Loan Amount</span>
          </div>

          <div className='d-flex flex-column fs-14 flex-grow-1'>
            <span className='loan-interest fw-bolder'>%{interest}</span>
            <span>Interest Rate</span>
          </div>
        </div>

        {/* View more */}
        <div className='d-flex flex-column gap-4px'>
          {instalment_schedule?.[0]?.date && (
            <span className='text-gray-500 fs-14'>
              Loan Start Date:{' '}
              <span className='fw-bold text-gray-900'>
                {moment(instalment_schedule?.[0]?.date).format('MMM D, YYYY')}
              </span>
            </span>
          )}

          <span className='text-gray-500 fs-14'>
            Loan Next Due Date:{' '}
            <span className='fw-bold text-gray-900'>
              {moment(new Date()).format('MMM D, YYYY')}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoanHeader
