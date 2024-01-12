type Props = {
  data: any
  config?: any
}

const TermUnit = ({data, config}: Props) => {
  console.log(data[config.key], 'config')
  return (
    <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
      {data[config.key].toString() === '0' && 'By Day'}
      {data[config.key].toString() === '1' && 'By Month'}
      {data[config.key].toString() === '2' && 'By Year'}
    </div>
  )
}

export default TermUnit
