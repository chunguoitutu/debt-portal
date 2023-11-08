type Props = {
  data: any
  config?: any
}

const MLCBCheck = ({data, config}: Props) => {
  return (
    <div
      style={{
        textAlign: 'start',
        padding: '0px',
        lineHeight: '18px',
        minHeight: '56px',
        fontWeight: '500px',
        fontStyle: 'normal',
        fontSize: '14px',
        color: '#071437',
        margin: '0px',
      }}
    >
      {!!data[config.key] ? 'Opt In consent to disclose information to MLCB and SMECB' : ''}
    </div>
  )
}

export default MLCBCheck
