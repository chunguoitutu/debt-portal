import {FC, Fragment} from 'react'
import clsx from 'clsx'

import ErrorMessage from '@/components/error/ErrorMessage'
import {ApplicationConfig, PropsStepApplication} from '@/app/types'

const BankInfo: FC<PropsStepApplication> = ({config = [], formik}) => {
  const {handleChange, values} = formik

  const {touched, errors} = formik

  function renderComponent(item: ApplicationConfig) {
    const {key, data = [], column, typeComponent} = item
    let Component: any = item?.component

    const className = !column
      ? 'flex-grow-1'
      : 'input-wrap flex-shrink-0 flex-grow-1 flex-grow-xxl-0 w-100 w-xxl-200px'

    // nothing
    if (!Component) return

    // handle for radio
    if (typeComponent === 'Radio') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([
            values[key] === item.value ? 'fs-4 fw-medium' : 'text-gray-600 fs-4 fw-medium',
          ])}
          name={key}
          label={item.label}
          checked={values[key] === item.value}
          value={item.value}
          onChange={handleChange}
        />
      ))
    }

    if (typeComponent === 'Input') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={handleChange}
            name={key}
            classShared={className}
          />
          {errors[key] && touched[key] && <ErrorMessage message={errors[key]} />}
        </div>
      )
    }

    // unexpected
    return <Component />
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, column, isHide, className, required, typeComponent} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={clsx([
              'd-flex gap-3 gap-xxl-8',
              !column ? 'full' : '',
              typeComponent === 'Radio'
                ? 'align-items-center gap-5'
                : 'flex-column flex-xxl-row align-items-start align-items-xxl-stretch',
              className,
            ])}
            key={i}
          >
            <div
              className={clsx([
                'input-title-application left fs-4 text-start text-lg-end',
                required && 'required',
                typeComponent === 'Radio' && 'd-none d-xxl-block',
              ])}
            >
              {label}
            </div>

            {renderComponent(item)}
          </div>
        )
      })}
    </>
  )
}

export default BankInfo
