import numeral from 'numeral'
type Props = {
  data?: any
}

const GrossMonthlyIncomeCompletion = ({data}: Props) => {
  return (
    <div>
      <p className='text-start p-0 m-0 fw-semibold text-gray-900 fs-14-line-19'>
        Last month: ${numeral(+data?.monthly_income_1).format('0,0.00')}
      </p>
      <p className='text-start p-0 m-0 fw-semibold text-gray-900 fs-14-line-19'>
        Last month -1: ${numeral(+data?.monthly_income_2).format('0,0.00')}
      </p>
      <p className='text-start p-0 m-0 fw-semibold text-gray-900 fs-14  '>
        Last month -2: ${numeral(+data?.monthly_income_3).format('0,0.00')}
      </p>
    </div>
  )
}

export default GrossMonthlyIncomeCompletion
