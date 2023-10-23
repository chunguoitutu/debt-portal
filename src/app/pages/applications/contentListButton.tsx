interface row {
  value: string
  icon: any
  background: string
  onclick: any
}

interface config {
  classIcons?: string
  title: string
  row: row[]
}
type Props = {
  config: config
}

const ContentListButton = ({config}: Props) => {
  return (
    <div className='card'>
      <div style={{borderBottom: '1px solid  #f1f1f2', padding: '30px'}} className='modal-header '>
        <h2 style={{marginBottom: '0px'}}>{config?.title}</h2>
      </div>
      <div style={{padding: '16px 30px 16px 30px'}}>
        {config?.row.map((data) => (
          <button
            className='py-3'
            onClick={data.onclick}
            style={{
              width: '100%',
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
              }}
              className={`${config?.classIcons ? config.classIcons : 'h-45px w-45px me-5'}`}
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
