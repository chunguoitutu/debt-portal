type Props = {config?: any; data?: any; options?: any; keyData?: string}

const LableOptionsCountry = ({config, keyData}: Props) => {
  const lable = config?.options.filter((d: any) => d[config.keyFilter] === keyData)

  return (
    <div
      style={{
        textAlign: 'start',
        padding: '0px',
        lineHeight: '20px',
        minHeight: '20px',
        fontWeight: '500px',
        fontStyle: 'normal',
        fontSize: '14px',
        color: '#071437',
        margin: '0px',
      }}
    >
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}

export default LableOptionsCountry
