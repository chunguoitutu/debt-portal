import Icons from '@/components/icons'
import '../style.scss'
import ChartPortal from '@/app/images/chart-portal.svg'

type Props = {
  className: string
}

const LoanAmountPortal: React.FC<Props> = ({className}: Props) => {
  return (
    <div className={`loan-amount-portal p-30px gap-20px ${className}`}>
      <div className='res-parent-amount-details'>
        <img src={ChartPortal} alt='chart-portal' className='chart-resp' />
        <div className='loan-amount-title mt-xl-20px mt-lg-20px res-detail-text-head'>
          Loan Amount
        </div>
      </div>
      <div className='fs-14 fw-normal text-gray-400'>No. Of Instalment: 12 Monthly</div>
      <div className='d-flex align-items-center mt-20px'>
        <span className='fs-4 fw-semibold text-gray-500 me-1 align-self-start'>$</span>
        <span className='fs-2hx fw-bold text-gray-900'>60,785</span>
      </div>
    </div>
  )
}

export default LoanAmountPortal
