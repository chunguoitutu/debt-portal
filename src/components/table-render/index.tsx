import moment from 'moment'
import numeral from 'numeral'

export interface element_config {
  key: string
  value: string
  img?: boolean
  Component?: any
  dollars?: string
  elBehind?: string
  date?: boolean
  number?: boolean
}

type Props = {
  title?: string
  config?: any
  data?: any
}

function TableRender({title, config = [], data}: Props) {
  return (
    <div className='p-0 h-100' style={{border: '1px solid #D4D4D4'}}>
      {!!title && (
        <h1
          className='pt-8px pb-8px ps-24px pe-24px fw-semibold m-0 fs-14 text-gray-700'
          style={{
            background: '#D4D4D4',
          }}
        >
          {title}
        </h1>
      )}
      <div className='p-24px d-flex flex-column gap-16px'>
        {config?.map((children_config: element_config[], index: number) => {
          return (
            <div
              key={index}
              className='d-flex w-100 justify-content-between align-items-start gap-16px'
            >
              {children_config?.map((element_config: element_config, indx) => {
                const {Component} = element_config
                return (
                  <div key={indx} className='w-100'>
                    <div
                      className='d-flex flex-column p-0'
                      style={{
                        justifyContent: !!element_config.img ? 'center' : 'start',
                        alignItems: !!element_config.img ? 'center' : 'start',
                      }}
                    >
                      {!element_config.img && (
                        <h2
                          className='p-0 fs-12 fw-semibold text-B5B5C3 m-0 text-capitalize'
                          style={{
                            whiteSpace: 'nowrap',
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
                              className='mw-100px p-8px'
                              style={{
                                borderRadius: '5px',
                                border: '1px dashed #D4D4D4',
                                objectFit: 'cover',
                              }}
                              src={data[element_config.key] || ''}
                              alt={data[element_config.key] || ''}
                            />
                          )}
                          <p
                            className='pt-4px pt-0 px-0 m-0 fs-14 fw-semibold text-gray-900 text-break'
                            style={{
                              textAlign: !!element_config.img ? 'center' : 'start',
                            }}
                          >
                            {!!element_config?.dollars &&
                              !!data[element_config.key] &&
                              element_config?.dollars}
                            {element_config.key === 'bankrupted'
                              ? !!data[element_config.key] === false
                                ? 'No'
                                : 'Yes'
                              : element_config.key === 'bankrupt_plan'
                              ? !!data[element_config.key] === false
                                ? 'No'
                                : !!data[element_config.key] === true
                                ? 'Yes'
                                : ''
                              : element_config.date
                              ? moment(data[element_config.key]).isValid()
                                ? moment(data[element_config.key]).format('DD MMM, YYYY')
                                : ''
                              : !!element_config?.number
                              ? numeral(+data[element_config.key]).format('0,0.00')
                              : data[element_config.key]}{' '}
                            {!!element_config?.elBehind && element_config?.elBehind}
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
