type Props = {
  titleFather?: string
  titleChild?: string
}

const TitleComponent = ({titleFather, titleChild}: Props) => {
  return (
    <div>
      {!!titleFather && (
        <h1
          style={{
            padding: '0px',
            alignItems: 'center',
            lineHeight: '24px',
            fontWeight: '600px',
            fontStyle: 'normal',
            fontSize: '20px',
            color: '#071437',
            margin: '0px',
            transform: 'capitalize',
          }}
        >
          {titleFather}
        </h1>
      )}
      {!!titleChild && (
        <p
          style={{
            padding: '0px',
            alignItems: 'center',
            lineHeight: '24px',
            fontWeight: '500px',
            fontStyle: 'normal',
            fontSize: '14px',
            color: '#4B5675',
            margin: '0px',
          }}
        >
          {titleChild}
        </p>
      )}
    </div>
  )
}

export default TitleComponent
