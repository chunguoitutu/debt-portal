import './style.scss'
import NextPaymentDatePortal from './loan-details-portal/NextPaymentDatePortal'
import ChartLoanDetailsPortal from './loan-details-portal/ChartLoanDetailsPortal'
import Statistical from './loan-details-portal/Statistical'
import RepaymentHistoryPortal from './loan-details-portal/RepaymentHistoryPortal'

const LoanDetailsPortal = () => {
  return (
    <div className='container app-main-loan next-payment-date-portal '>
      <div className='col-12'>
        <div className='row'>
          {/* col left */}
          <div className='col-5'>
            <NextPaymentDatePortal />
            <ChartLoanDetailsPortal />
            <Statistical />
          </div>

          {/* col right */}
          <div className='col-7'>
            <RepaymentHistoryPortal />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanDetailsPortal
