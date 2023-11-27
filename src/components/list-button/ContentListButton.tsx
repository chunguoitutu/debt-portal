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
      <div className='modal-header p-30px border-bottom border-gray-200'>
        <h2 className='mb-0 fs-20 text-capitalize fw-bold text-gray-900'>{config?.title}</h2>
      </div>
      <div className={`${config?.classWrapper ? config.classWrapper : 'py-16px px-5'}`}>
        {config?.row.map((data, index) => (
          <button
            key={index}
            className={`${
              config?.classButton ? config.classButton : 'py-12px px-4px'
            } bg-transparent d-flex justify-content-center align-items-center`}
            onClick={data.onclick}
            style={{
              border: 'none',
            }}
          >
            <span
              style={{
                border: 'none',
                borderRadius: '8px',
                background: data?.background,
              }}
              className={`${
                config?.classIcons ? config.classIcons : 'h-48px w-48px me-5'
              } bg-transparent d-flex justify-content-center align-items-center flex-shrink-0`}
            >
              {data.icon}
            </span>
            <span className='text-gray-700 text-start fw-semibold fs-14'>{data.value}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ContentListButton
