type Props = {
  data: any
  config?: any
}

const PositionName = ({data, config}: Props) => {
  return (
    <div className='text-start fw-semibold p-0 m-0 min-h-20px td-completion text-gray-900'>
      {data[config.key] === 'director/gm' && 'Director / GM'}
      {data[config.key] === 'senior-manager' && 'Senior Manager'}
      {data[config.key] === 'manager/assistant' && 'Manager / Assitant Manager'}
      {data[config.key] === 'supervisor' && 'Supervisor'}
      {data[config.key] === 'senior-executive' && 'Senior Executive'}
      {data[config.key] === 'junior-executive' && 'Junior Manager'}
      {data[config.key] === 'non-executive' && 'Non Executive'}
      {data[config.key] === 'professional' && 'Professional'}
      {data[config.key] === 'self-employed' && 'Self Employed'}
      {data[config.key] === 'others' && 'Others'}
    </div>
  )
}

export default PositionName
