export interface element_config {
  key: string
  value: string
  img?: boolean
  Component?: any
  dollars?: string
}

type Props = {
  title?: string
  config?: any
  data?: any
}

function TableRender({title, config = [], data}: Props) {
  return (
    <div style={{width: '100%', border: '1px solid #D4D4D4'}}>
      {!!title && (
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
          {title}
        </h1>
      )}
      <div
        style={{display: 'flex', justifyContent: 'space-between', padding: '24px', width: '100%'}}
      >
        {config?.map((children_config: element_config[], index: number) => {
          return (
            <div
              key={index}
              style={{display: 'flex', flexDirection: 'column', gap: '16px', width: '100%'}}
            >
              {children_config?.map((element_config: element_config) => {
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
                      {!element_config.img && (
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
                      )}
                      {!!Component ? (
                        <Component data={data} config={element_config} />
                      ) : (
                        <>
                          {!!element_config.img && (
                            <img
                              style={{
                                maxWidth: '100px',
                                padding: '8px',
                                borderRadius: '5px',
                                border: '1px dashed #D4D4D4',
                                objectFit: 'cover',
                              }}
                              src={data[element_config.key] || ''}
                              alt={data[element_config.key] || ''}
                            />
                          )}
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
                            {!!element_config?.dollars && element_config?.dollars}{' '}
                            {data[element_config.key]}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TableRender
