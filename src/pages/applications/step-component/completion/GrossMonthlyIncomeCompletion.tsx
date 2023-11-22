type Props = {
  data?: any
}

const GrossMonthlyIncomeCompletion = ({data}: Props) => {
  return (
    <div>
      <p className='text-start p-0 m-0 fw-semibold text-gray-900 fs-13-line-19'>
        Last month: ${data?.monthly_income_1}
      </p>
      <p className='text-start p-0 m-0 fw-semibold text-gray-900 fs-13-line-19'>
        Last month -1: ${data?.monthly_income_2}
      </p>
      <p
        className='text-start p-0 m-0 fw-semibold text-gray-900  line-18'
        style={{
          fontSize: '13px',
        }}
      >
        Last month -2: ${data?.monthly_income_3}
      </p>
    </div>
  )
}

export default GrossMonthlyIncomeCompletion
