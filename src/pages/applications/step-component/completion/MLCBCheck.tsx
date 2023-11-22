type Props = {
  data: any
  config?: any
}

const MLCBCheck = ({data, config}: Props) => {
  return (
    <div>
      <div
        className='text-start p-0 m-0 fw-semibold text-gray-900 '
        style={{
          fontSize: '13px',
        }}
      >
        {!!data[config.key] ? 'Opt In consent to disclose information to MLCB and SMECB' : ''}
      </div>
      <div className='h-18px'></div>
    </div>
  )
}

export default MLCBCheck
