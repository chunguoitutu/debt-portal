import ChartPortal from '@/app/images/chart-portal.svg'
import {formatMoney} from '@/app/utils'
import '../style.scss'
import {FC} from 'react'

type Props = {
  className?: string
}

const ChartLoanDetailsPortal: FC<Props> = ({className}) => {
  return (
    <div className={`col-12 ${className}`}>
      <div className='row jayce'>
        <div className={`col-6 kaka`}>
          <div className='loan-amount-portal mt-20px p-20px gap-20px height-992'>
            <img src={ChartPortal} alt='' />
            <div className='text-gray-900 fw-bold fs-2hx fs-responsive-loan-chart-details mt-16px'>
              {formatMoney(25000)}
            </div>
            <div className='fs-16 text-gray-700 fw-normal h-custom-responsive'>Outstand amount</div>
          </div>
        </div>
        <div className={`col-6 kaka`}>
          <div className='loan-amount-portal mt-20px p-20px gap-20px height-992'>
            <img src={ChartPortal} alt='' />
            <div className='text-gray-900 fw-bold fs-2hx fs-responsive-loan-chart-details mt-16px'>
              3.8%
            </div>
            <div className='fs-16 text-gray-700 fw-normal sub-title-chart-loan'>Interest rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartLoanDetailsPortal
