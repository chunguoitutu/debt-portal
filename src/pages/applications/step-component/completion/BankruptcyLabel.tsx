type Props = {
  data: any
  config?: any
}

const BankruptcyLabel = ({data, config}: Props) => {
  return (
    <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
      {data[config.key] === '0' && 'None'}
      {data[config.key] === '1' && 'Declared Bankrupt In The Last 5 Years'}
    </div>
  )
}

export default BankruptcyLabel
