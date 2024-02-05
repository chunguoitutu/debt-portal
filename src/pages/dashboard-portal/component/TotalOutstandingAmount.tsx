import '../style.scss'
import ChartPortal from '@/app/images/chart-portal.svg'

type Props = {
  className?: string
}

const TotalOutstandingAmount: React.FC<Props> = ({className}: Props) => {
  return (
    <div className={`loan-amount-portal p-30px gap-20px position-relative ${className}`}>
      <div className='res-parent-amount-details' style={{position: 'relative', zIndex: 1}}>
        <img src={ChartPortal} alt='chart-portal' className='chart-resp' />
      </div>
      <div className='loan-amount-title mt-xl-20px mt-lg-20px res-detail-text-head'>
        Total Outstanding Amount
      </div>
      <div className='fs-14 fw-normal text-gray-400'>Includes Interest</div>
      <div className='d-flex align-items-center mt-20px hichic'>
        <span className=' fs-3 fs-20px-responsive fw-bold text-gray-500 me-1 mt-2 align-self-start dollar-responsive'>
          $
        </span>
        <span className='fs-2hx fw-bold text-gray-900 fs-24px-responsive'>12,806.00</span>
      </div>
      <div className='quarter-circle-first'>
        <div className='quarter-circle-second'></div>
      </div>
    </div>
  )
}

export default TotalOutstandingAmount
