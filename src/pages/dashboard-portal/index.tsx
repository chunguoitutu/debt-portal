import LoanAmountPortal from './component/LoanAmountPortal'
import NextPayment from './component/NextPayment'
import TotalOutstandingAmount from './component/TotalOutstandingAmount'
import TablePortal from './component/TablePortal'
import {useState} from 'react'

const DashBoardPortal = () => {
  const [loanInfo, setLoanInfo] = useState<any>({
    instalment_schedule: [
      {
        id: 3,
        loan_no: 'L-MC-2024-00003',
        total_collection: 0,
        full_repayment_date: '2025-02-28T00:00:00.000Z',
        loan_amount: '12',
        status: 0,
      },
    ],
  })
  return (
    <div className='container app-main-loan'>
      <div className='col-12 h-fit-content main-portal'>
        <div className='row h-fit-content'>
          <div className='col-xxl-6 col-xl-6 col-lg-6 res-next-payment'>
            <NextPayment />
          </div>
          <div className='col-xxl-3 col-xl-3 col-lg-3 w-50 fragment-parent'>
            <div className='d-flex mb-md-5 w-100 flex-xl-column flex-lg-column gap-xl-0 gap-lg-16px column-res-amount gap-20px'>
              <LoanAmountPortal className=' mb-xl-7 w-100 flex-grow-1 res-amount-details' />
              <TotalOutstandingAmount className='h-fit-content res-amount-details' />
            </div>
          </div>
        </div>
        <TablePortal loanInfo={loanInfo} setLoanInfo={setLoanInfo} />
      </div>
    </div>
  )
}

export default DashBoardPortal
