type Props = {
  config?: any
  data?: any
}

const Address = ({config, data}: Props) => {
  return (
    <div className='w-100 p-0' style={{border: '1px solid #D4D4D4'}}>
      <h1
        className='pt-8px pb-8px ps-24px pe-24px   fw-semibold m-0 fs-14 text-gray-700'
        style={{
          background: '#D4D4D4',
        }}
      >
        {config?.title}
      </h1>
      <div className='d-flex flex-column w-100'>
        {data?.address_contact_info.map((e, i: number) => (
          <div
            key={i}
            className='d-flex justify-content-between w-100 gap-16px p-24px'
            style={{
              borderBottom: i < data?.address_contact_info.length - 1 ? '1px solid #D4D4D4' : '',
            }}
          >
            {config?.config?.map((children_config: any, index: number) => {
              return (
                <div key={index} className='d-flex flex-column gap-16px w-100'>
                  {children_config?.map((element_config: any) => {
                    const {Component} = element_config
                    return (
                      <div key={element_config.key}>
                        <div
                          className='d-flex flex-column'
                          style={{
                            justifyContent: !!element_config.img ? 'center' : 'start',
                            alignItems: !!element_config.img ? 'center' : 'start',
                          }}
                        >
                          <h2 className='p-0 m-0 text-capitalize fw-semibold fs-12 text-B5B5C3'>
                            {element_config.value}
                          </h2>
                          {!!Component ? (
                            <Component
                              data={data}
                              config={element_config}
                              keyData={e[element_config.key]}
                            />
                          ) : (
                            <p
                              className='fw-semibold p-0 m-0 min-h-20px text-gray-900 fs-14'
                              style={{
                                textAlign: !!element_config.img ? 'center' : 'start',
                              }}
                            >
                              {e[element_config.key]}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Address
