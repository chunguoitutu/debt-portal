type Props = {config?: any; data?: any; options?: any}

const SpecialZation = ({config, data}: Props) => {
  const lable = config?.options
    .map((d: any) => d.options)
    .flat()
    .filter((d: any) => d[config.keyFilter] === data[config.key])

  return (
    <div className='text-start fw-semibold p-0 m-0 min-h-20px td-completion fs-14 text-gray-900'>
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}

export default SpecialZation
