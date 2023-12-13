type Props = {
  data: any
  config?: any
}

const BankruptcyLabel = ({data, config}: Props) => {
  return (
    <div className='text-start fw-semibold p-0 m-0 min-h-20px td-completion fs-14 text-gray-900'>
      {data[config.key] === '0' && 'None'}
      {data[config.key] === '1' && 'Declared Bankrupt In The Last 5 Years'}
    </div>
  )
}

export default BankruptcyLabel
