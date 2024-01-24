import {KTIcon} from '@/_metronic/helpers'
import useClickOutside from '@/app/hooks/useClickOutside'
import {TableRow} from '@/app/types'
import clsx from 'clsx'
import {Fragment, useRef} from 'react'

interface Props {
  rows: TableRow[]
  dataFilter: {[key: string]: any}
  handleChangeFilter?: (e: React.ChangeEvent<HTMLInputElement>, key?: 'gte' | 'lte') => void
  dataOption: {[key: string]: any}
  handleResetFilter: () => void
  handleLoadApi: () => void
  onClose?: () => void
  className?: string
}
/* eslint-disable jsx-a11y/anchor-is-valid */
export function FilterPopup({
  rows,
  dataFilter,
  dataOption,
  className,
  handleChangeFilter = () => {},
  handleLoadApi,
  handleResetFilter,
  onClose,
}: Props) {
  const selectRef = useRef<HTMLDivElement>(null)

  useClickOutside(selectRef, () => {
    onClose()
  })
  return (
    <div
      className={clsx([
        'menu-filter-application card w-xxl-400px w-300px min-h-200px overflow-hidden d-flex flex-column',
        className,
      ])}
      style={{top: '30px'}}
      ref={selectRef}
      data-kt-menu='true'
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
          className='p-30px pt-8px pb-30px h-300px min-h-100px overflow-auto'
          style={{
            maxHeight: 'calc(100vh - 400px)',
          }}
        >
          {rows.map((row, i) => {
            const {infoFilter, key, options, name} = row || {}
            const {
              component,
              typeComponent,
              typeInput,
              isFromTo,
              noThereAreCommas = false,
            } = infoFilter || {}

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
                ...(typeInput === 'number' ? {noThereAreCommas} : {}),
              }
            }

            if (!row.infoFilter || !Component) return <Fragment key={i}></Fragment>

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
            onClick={handleLoadApi}
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
