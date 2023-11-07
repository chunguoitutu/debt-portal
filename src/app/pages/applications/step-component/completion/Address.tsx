type Props = {
  config?: any
  data?: any
}

const Address = ({config, data}: Props) => {
  return (
    <div style={{width: '100%', border: '1px solid #D4D4D4', padding: '0px'}}>
      <h1
        style={{
          padding: '8px 24px',
          alignItems: 'center',
          background: '#D4D4D4',
          lineHeight: '20px',
          fontWeight: '500px',
          fontStyle: 'normal',
          fontSize: '14px',
          color: '#4B5675',
          margin: '0px',
        }}
      >
        {config?.title}
      </h1>
      <div style={{display: 'flex', flexDirection: 'column', padding: '24px', width: '100%'}}>
        {data?.address_contact_info.map((e, i: number) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '24px',
              width: '100%',
              borderBottom: i < data?.address_contact_info.length - 1 ? '1px solid #D4D4D4' : '',
            }}
          >
            {config?.config?.map((children_config: any, index: number) => {
              return (
                <div
                  key={index}
                  style={{display: 'flex', flexDirection: 'column', gap: '16px', width: '100%'}}
                >
                  {children_config?.map((element_config: any) => {
                    const {Component} = element_config
                    return (
                      <div key={element_config.key}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: !!element_config.img ? 'center' : 'start',
                            alignItems: !!element_config.img ? 'center' : 'start',
                          }}
                        >
                          <h2
                            style={{
                              padding: '0px',
                              lineHeight: '16px',
                              fontWeight: '500px',
                              fontStyle: 'normal',
                              fontSize: '12px',
                              color: '#B5B5C3',
                              margin: '0px',
                              textTransform: 'capitalize',
                            }}
                          >
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
                              style={{
                                textAlign: !!element_config.img ? 'center' : 'start',
                                padding: '0px',
                                lineHeight: '20px',
                                minHeight: '20px',
                                fontWeight: '500px',
                                fontStyle: 'normal',
                                fontSize: '14px',
                                color: '#071437',
                                maxWidth: '200px',
                                margin: '0px',
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
