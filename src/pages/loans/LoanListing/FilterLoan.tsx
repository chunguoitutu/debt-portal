import {KTIcon} from '@/_metronic/helpers'
import clsx from 'clsx'

interface Props {
  rows?: any
  dataFilter?: any
  handleChangeFilter?: any
  dataOption: any
  handleResetFilter: () => void
  handleLoadApi: () => void
  onClose?: () => void
}
/* eslint-disable jsx-a11y/anchor-is-valid */
export function FilterLoan({
  rows,
  dataFilter,
  handleChangeFilter,
  handleLoadApi,
  handleResetFilter,
  dataOption,
  onClose,
}: Props) {
  return (
    <div className='menu-filter-application card  w-xxl-400px w-300px' data-kt-menu='true'>
      <div className='position-relative p-0'>
        <div className='p-30px d-flex w-full align-items-center justify-content-between'>
          <div className='fs-20 fw-bold text-dark text-gray-900'>Filter Options</div>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={onClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>

        <div className='separator p-0 border-gray-200'></div>

        <div
          style={{maxHeight: 'calc(100vh - 450px)', overflowY: 'auto'}}
          className='p-30px pt-8px pb-30px'
        >
          {rows.map((row, i) => {
            if (!row.infoFilter) return <div key={i}></div>
            const {infoFilter, key, options, name} = row || {}
            const {component, typeComponent, typeInput, isFromTo} = infoFilter || {}

            console.log(infoFilter, '123')

            const Component = component
            let props: {[key: string]: any} = {
              name: key,
              value: dataFilter[key] || '',
              onChange: handleChangeFilter,
            }

            if (typeComponent === 'select') {
              props = {
                ...props,
                options: options || dataOption[key],
                keyLabelOption: infoFilter?.keyLabelOption || 'label',
                keyValueOption: infoFilter?.keyValueOption || 'value',
              }
            } else {
              // type input
              props = {
                ...props,
                type: typeInput || 'text',
              }
            }

            return (
              <div key={i} className={clsx(['align-top mt-16px'])}>
                {isFromTo ? (
                  <div className='d-flex flex-column gap-3 w-full'>
                    <Component
                      label={name}
                      {...props}
                      placeholder='from'
                      value={dataFilter[key]?.['gte'] || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeFilter(e, 'gte')
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleLoadApi()
                        }
                      }}
                    />
                    <Component
                      {...props}
                      placeholder='to'
                      value={dataFilter[key]?.['lte'] || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeFilter(e, 'lte')
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleLoadApi()
                        }
                      }}
                    />
                  </div>
                ) : (
                  <Component
                    label={name}
                    classShared={''}
                    {...props}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLoadApi()
                      }
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className='d-flex justify-content-end p-30px gap-8px'>
          <button
            type='reset'
            onClick={() => handleResetFilter()}
            className='btn btn-lg btn-light btn-active-light-primary me-2 fs-6'
            data-kt-menu-dismiss='true'
          >
            Reset
          </button>

          <button
            type='submit'
            onClick={() => {
              handleLoadApi()
            }}
            className='btn btn-lg btn-primary fs-6'
            data-kt-menu-dismiss='true'
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
