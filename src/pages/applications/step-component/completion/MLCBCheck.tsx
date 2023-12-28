type Props = {
  data: any
  config?: any
}

const MLCBCheck = ({data, config}: Props) => {
  return (
    <div>
      <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
        {!!data[config.key] ? 'Opt-in consent to disclose information to MLCB and SMECB ' : ''}
      </div>
    </div>
  )
}

export default MLCBCheck
