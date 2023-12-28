import numeral from 'numeral'
type Props = {
  data?: any
}

const GrossMonthlyIncomeCompletion = ({data}: Props) => {
  return (
    <div>
      <p className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
        Last month: ${numeral(+data?.monthly_income_1).format('0,0.00')}
      </p>
      <p className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
        Last month -1: ${numeral(+data?.monthly_income_2).format('0,0.00')}
      </p>
      <p className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14  '>
        Last month -2: ${numeral(+data?.monthly_income_3).format('0,0.00')}
      </p>
    </div>
  )
}

export default GrossMonthlyIncomeCompletion
