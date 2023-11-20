interface row {
  value: string
  icon: any
  background: string
  onclick: any
}

interface config {
  classButton?: string
  classIcons?: string
  classWrapper?: string
  title: string
  row: row[]
}
type Props = {
  config: config
}

const ContentListButton = ({config}: Props) => {
  return (
    <div className='card'>
      <div
        style={{borderBottom: '1px solid  #f1f1f2', padding: '30px'}}
        className='modal-header p-5'
      >
        <h2
          style={{
            marginBottom: '0px',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '24px',
            textTransform: 'capitalize',
            color: '#071437',
          }}
        >
          {config?.title}
        </h2>
      </div>
      <div className={`${config?.classWrapper ? config.classWrapper : 'py-16px px-5'}`}>
        {config?.row.map((data, index) => (
          <button
            key={index}
            className={`${config?.classButton ? config.classButton : 'py-12px px-4px'}`}
            onClick={data.onclick}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                display: 'flex',
                borderRadius: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                background: data?.background,
                flexShrink: '0',
              }}
              className={`${config?.classIcons ? config.classIcons : 'h-48px w-48px me-5'}`}
            >
              {data.icon}
            </span>
            <span
              style={{
                color: '#4B5675',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '500px',
                lineHeight: '20px',
                textAlign: 'start',
              }}
            >
              {data.value}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ContentListButton
