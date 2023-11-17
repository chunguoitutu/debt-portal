type Props = {
  data: any
}

function FullName({data}: Props) {
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
      {data.lastname} {data.middlename} {data.firstname}
    </div>
  )
}

export default FullName
