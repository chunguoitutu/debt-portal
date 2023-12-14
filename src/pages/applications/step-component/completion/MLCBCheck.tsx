type Props = {
  data: any
  config?: any
}

const MLCBCheck = ({data, config}: Props) => {
  return (
    <div>
      <div className='text-start pt-4px pt-0 px-0 m-0 fw-semibold fs-14 text-gray-900 '>
        {!!data[config.key] ? 'Opt In consent to disclose information to MLCB and SMECB' : ''}
      </div>
    </div>
  )
}

export default MLCBCheck
