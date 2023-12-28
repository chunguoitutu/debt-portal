type Props = {
  data: any
  config?: any
}

const EmploymentStatus = ({data, config}: Props) => {
  return (
    <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
      {data[config.key] === 'EMP' && 'Employed'}
      {data[config.key] === 'UNEMPINC' && 'Unemployed with income'}
      {data[config.key] === 'UNEMP' && 'Unemployed without income'}
    </div>
  )
}

export default EmploymentStatus
