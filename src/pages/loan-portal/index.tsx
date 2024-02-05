import './style.scss'
import NextPaymentDatePortal from './loan-details-portal/NextPaymentDatePortal'
import ChartLoanDetailsPortal from './loan-details-portal/ChartLoanDetailsPortal'
import Statistical from './loan-details-portal/Statistical'
import RepaymentHistoryPortal from './loan-details-portal/RepaymentHistoryPortal'
import TitleContainer from '@/components/title-container.tsx'

const profileBreadCrumbs = {
  title: 'My Loans',
  link: [
    {
      to: '/',
      titleLink: 'Home',
    },
    {
      to: '/my-loans',
      titleLink: 'My Loans',
    },
  ],
  render: ['Loan Details'],
}

const LoanDetailsPortal = () => {
  return (
    <>
      <TitleContainer data={profileBreadCrumbs} />
      <div className='portal-loan-details container my-30px next-payment-date-portal overflow-hidden'>
        <div className='col-12'>
          <div className='row w-xl-100'>
            {/* col left */}
            <div className='col-12 col-xl-6 col-xxl-5 flex-grow-1 d-flex flex-lg-row flex-xxl-column gap-lg-20px flex-md-column flex-sm-column flex-xs-column'>
              <div className='row'>
                <div className='col-lg-6 col-xxl-12 height-custom-portal-loan col-md-12 col-sm-12 col-xs-12'>
                  <NextPaymentDatePortal className='col-md-12 col-sm-12 col-xs-12' />
                  <ChartLoanDetailsPortal className='' />
                </div>
                <div className='col-lg-6 col-xxl-12 height-custom-portal-loan h-xl-100 mt-xxl-0 hihi'>
                  <Statistical className='flex-grow-1 h-lg-100 h-xxl-fit-content mt-md-20px mt-sm-20px mt-lg-0 mt-xxl-20px mt-xl-0' />
                </div>
              </div>
            </div>
            {/* col right */}
            <div className='col-xxl-7 col-lg-12 col-xs-12 hihi '>
              <RepaymentHistoryPortal className='container mt-xl-20px mt-xxl-0 mt-lg-20px mt-md-20px mt-sm-20px col-xs-12' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoanDetailsPortal
