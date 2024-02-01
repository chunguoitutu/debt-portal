import ChartPortal from '@/app/images/chart-portal.svg'
import {formatMoney} from '@/app/utils'
import '../style.scss'

const ChartLoanDetailsPortal = () => {
  return (
    <div className='col-12'>
      <div className='row'>
        <div className={`col-6`}>
          <div className='loan-amount-portal mt-20px p-20px gap-20px'>
            <img src={ChartPortal} alt='' />
            <div className='text-gray-900 fw-bold fs-2hx'>{formatMoney(25000)}</div>
            <div className='fs-3 text-gray-600 fw-normal'>Outstand amount</div>
          </div>
        </div>
        <div className={`col-6`}>
          <div className='loan-amount-portal mt-20px p-20px gap-20px'>
            <img src={ChartPortal} alt='' />
            <div className='text-gray-900 fw-bold fs-2hx'>3.8%</div>
            <div className='fs-3 text-gray-600 fw-normal'>Interest rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartLoanDetailsPortal
