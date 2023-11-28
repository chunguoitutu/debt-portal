type Props = {
  data: any
  config?: any
}

const EmploymentStatus = ({data, config}: Props) => {
  return (
    <div className='text-start fw-semibold p-0 m-0 min-h-20px td-completion fs-14 text-gray-900'>
      {data[config.key] === 'EMP' && 'Employed'}
      {data[config.key] === 'UNEMPINC' && 'Unemployed with income'}
      {data[config.key] === 'UNEMP' && 'Unemployed without income'}
    </div>
  )
}

export default EmploymentStatus
