type Props = {
  data?: any
}

const GrossMonthlyIncomeCompletion = ({data}: Props) => {
  return (
    <div>
      <p
        style={{
          textAlign: 'start',
          padding: '0px',
          lineHeight: '20px',
          minHeight: '20px',
          fontWeight: '500px',
          fontStyle: 'normal',
          fontSize: '14px',
          color: '#071437',
          maxWidth: '200px',
          margin: '0px',
        }}
      >
        Last month -: ${data?.monthly_income_1}
      </p>
      <p
        style={{
          textAlign: 'start',
          padding: '0px',
          lineHeight: '20px',
          minHeight: '20px',
          fontWeight: '500px',
          fontStyle: 'normal',
          fontSize: '14px',
          color: '#071437',
          maxWidth: '200px',
          margin: '0px',
        }}
      >
        Last month -1: ${data?.monthly_income_2}
      </p>
      <p
        style={{
          textAlign: 'start',
          padding: '0px',
          lineHeight: '20px',
          minHeight: '20px',
          fontWeight: '500px',
          fontStyle: 'normal',
          fontSize: '14px',
          color: '#071437',
          maxWidth: '200px',
          margin: '0px',
        }}
      >
        Last month -2: ${data?.monthly_income_3}
      </p>
    </div>
  )
}

export default GrossMonthlyIncomeCompletion
