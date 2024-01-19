import {KTIcon} from '@/_metronic/helpers'
import useClickOutside from '@/app/hooks/useClickOutside'
import {COUNTRY_PHONE_CODE} from '@/app/utils'
import {Select} from '@/components/select'
import Tippy from '@tippyjs/react'
import clsx from 'clsx'
import {useRef} from 'react'

interface Props {
  rows: any
  dataFilter: any
  handleChangeFilter: any
  dataOption: any
  handleResetFilter: () => void
  handleLoadApi: () => void
  onClose: () => void
}
/* eslint-disable jsx-a11y/anchor-is-valid */
export function FilterBorrower({
  rows,
  dataFilter,
  handleChangeFilter,
  handleLoadApi,
  handleResetFilter,
  dataOption,
  onClose,
}: Props) {
  const selectRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectRef, () => {
    onClose()
  })
  return (
    <div
      className='menu-filter-application card  w-xxl-400px w-300px'
      data-kt-menu='true'
      ref={selectRef}
    >
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
                      transparent={true}
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
                      transparent={true}
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
                    type={typeInput === 'phone' ? 'number' : typeInput || 'text'}
                    insertLeft={
                      typeInput === 'phone' ? (
                        <Tippy
                          offset={[120, 0]}
                          content='Please choose the phone number you prefer.'
                        >
                          {/* Wrapper with a span tag to show tooltip */}
                          <span>
                            <Select
                              isOptionDefault={false}
                              classShared='m-0'
                              className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                              name='country_phone_code'
                              options={COUNTRY_PHONE_CODE}
                            />
                          </span>
                        </Tippy>
                      ) : undefined
                    }
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
