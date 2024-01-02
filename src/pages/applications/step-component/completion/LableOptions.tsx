type Props = {config?: any; data?: any; options?: any}

const LableOptions = ({config, data}: Props) => {
  const lable = config?.options.filter((d: any) => d[config.keyFilter] === data[config.key])

  return (
    <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}

export default LableOptions
