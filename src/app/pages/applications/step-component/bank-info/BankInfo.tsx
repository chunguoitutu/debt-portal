import {FC, Fragment} from 'react'
import {ApplicationConfig, PropsStepApplication} from '../../../../modules/auth'
import clsx from 'clsx'

const BankInfo: FC<PropsStepApplication> = ({config = [], formik}) => {
  const {handleChange, values} = formik

  const {touched, errors} = formik

  function renderComponent(item: ApplicationConfig) {
    const {key, data = [], column} = item
    let Component: any = item?.component

    const className = !column
      ? 'flex-grow-1 w-300px w-lg-unset'
      : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

    // nothing
    if (!Component) return

    // handle for radio
    if (Component.name === 'Radio') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([values[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          checked={values[key] === item.value}
          value={item.value}
          onChange={handleChange}
        />
      ))
    }

    if (Component.name === 'Input') {
      return (
        <Component
          value={values[key]}
          onChange={handleChange}
          name={key}
          classShared={className}
          error={errors[key]}
          touched={touched[key]}
          errorTitle={errors[key]}
        />
      )
    }

    // unexpected
    return <Component />
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, column, isHide, className, required} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={clsx([
              'd-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8',
              !column ? 'full' : '',
              className,
            ])}
            key={i}
          >
            <div
              className={clsx([
                'input-title-application left fs-4 text-start text-lg-end',
                required && 'required',
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
