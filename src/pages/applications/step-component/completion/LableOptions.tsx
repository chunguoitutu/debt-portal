type Props = {config?: any; data?: any; options?: any}

const LableOptions = ({config, data}: Props) => {
  const lable = config?.options.filter((d: any) => d[config.keyFilter] === data[config.key])

  return (
    <div className='text-start fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px td-completion fs-14 text-gray-900'>
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}

export default LableOptions
