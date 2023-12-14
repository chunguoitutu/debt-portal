interface row {
  value: string
  icon: any
  background: string
  onclick: any
  show: boolean
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
    <div className='card  h-100 '>
      <div className='modal-header p-30px border-bottom border-gray-200'>
        <h2 className='mb-0 fs-20 text-capitalize fw-bold text-gray-900'>{config?.title}</h2>
      </div>
      <div
        style={{maxHeight: 'calc(100vh - 375px)', overflowY: 'auto'}}
        className={`${config?.classWrapper ? config.classWrapper : 'py-16px px-5'}`}
      >
        {config?.row.map((data, index) => (
          <div key={index}>
            {!!data?.show && (
              <button
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
                    backgroundColor: data?.background,
                  }}
                  className={`${
                    config?.classIcons ? config.classIcons : 'h-48px w-48px me-5'
                  } d-flex justify-content-center align-items-center flex-shrink-0`}
                >
                  {data.icon}
                </span>
                <span className='text-gray-700 text-start fw-semibold fs-14'>{data.value}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentListButton
