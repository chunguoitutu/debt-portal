type Props = {
  data: any
  config?: any
}

const EmploymentStatus = ({data, config}: Props) => {
  return (
    <div
      style={{
        textAlign: 'start',
        padding: '0px',
        lineHeight: '20px',
        minHeight: '20px',
        fontWeight: '500px',
        fontStyle: 'normal',
        fontSize: '14px',
        color: '#071437',
        margin: '0px',
      }}
    >
      {data[config.key] === 'EMP' && 'Employed'}
      {data[config.key] === 'UNEMPINC' && 'Unemployed with income'}
      {data[config.key] === 'UNEMP' && 'Unemployed without income'}
    </div>
  )
}

export default EmploymentStatus
