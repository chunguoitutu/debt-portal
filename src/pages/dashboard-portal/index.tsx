import LoanAmountPortal from './component/LoanAmountPortal'
import NextPayment from './component/NextPayment'
import TotalOutstandingAmount from './component/TotalOutstandingAmount'
import TablePortal from './component/TablePortal'
import {useState} from 'react'
import TitleContainer from '@/components/title-container.tsx'

const profileBreadCrumbs = {
  title: 'Dashboard',
  link: [
    {
      to: '/',
      titleLink: 'Home',
    },
  ],
  render: ['Dashboard'],
}

const DashBoardPortal = () => {
  const [loanInfo, setLoanInfo] = useState<any>({
    instalment_schedule: [
      {
        id: 1,
        loan_no: 'L-MC-2024-00003',
        total_collection: 0,
        full_repayment_date: '2025-02-28T00:00:00.000Z',
        loan_amount: '12',
        status: 1,
      },
      {
        id: 1,
        loan_no: 'L-MC-2024-00003',
        total_collection: 0,
        full_repayment_date: '2025-02-28T00:00:00.000Z',
        loan_amount: '12',
        status: 1,
      },
      {
        id: 1,
        loan_no: 'L-MC-2024-00003',
        total_collection: 0,
        full_repayment_date: '2025-02-28T00:00:00.000Z',
        loan_amount: '12',
        status: 1,
      },
    ],
  })
  return (
    <>
      <TitleContainer data={profileBreadCrumbs} />
      <div className='container pt30-cus-dashboard padding-responsive ps-0 pe-0'>
        <div className='col-12 h-fit-content main-portal lck'>
          <div className='row h-fit-content mb-xl-1'>
            <div className='col-xxl-6 col-xl-7 col-lg-7 res-next-payment ps-0'>
              <NextPayment />
            </div>
            <div className='col-xxl-3 col-xl-3 col-lg-1 w-50 fragment-parent w-lg-25 flex-grow-1 lolo ti'>
              <div className='d-flex mb-md-5 w-100 flex-xl-column flex-lg-column gap-xl-0 gap-lg-16px column-res-amount gap-20px kiki'>
                <LoanAmountPortal className=' mb-xl-6 w-100 flex-grow-1 res-amount-details opop' />
                <TotalOutstandingAmount className='h-fit-content res-amount-details opop' />
              </div>
            </div>
          </div>
          <TablePortal loanInfo={loanInfo} setLoanInfo={setLoanInfo} />
        </div>
      </div>
    </>
  )
}

export default DashBoardPortal
