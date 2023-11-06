import {FC, Fragment, useState} from 'react'
import {ApplicationConfig, PropsStepApplication} from '../../../../modules/auth'
import clsx from 'clsx'

import ErrorMessage from '../../../../components/error/ErrorMessage'

const Employment: FC<PropsStepApplication> = (props) => {
  const {config = [], formik} = props
  const [annualIncome, setAnnualIncome] = useState({
    monthly_income_1: 0,
    monthly_income_2: 0,
    monthly_income_3: 0,
  })

  const {values, touched, setFieldValue, errors, handleChange} = formik

  function renderComponent(item: ApplicationConfig) {
    const {
      key,
      data = [],
      isFullLayout,
      column,
      options,
      disabled,
      typeInput,
      typeInputAdvanced,
      desc,
      typeCheckbox,
    } = item
    let Component: any = item?.component

    const className =
      isFullLayout || !column
        ? 'flex-grow-1 w-300px w-lg-unset'
        : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

    // nothing
    if (!Component) return

    // Special cases should be checked in advance
    if (key === 'monthly_income_1') {
      return <Component {...props} annualIncome={annualIncome} setAnnualIncome={setAnnualIncome} />
    }
    // End special cases

    // handle for select
    if (Component.name === 'Select') {
      return (
        <Component
          value={values[key]}
          onChange={handleChange}
          name={key}
          classShared={className}
          options={options}
        />
      )
    }

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

    // handle for checkbox
    if (Component.name === 'Checkbox') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([values[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          value={item.value}
          onChange={(e) => {
            if (typeCheckbox === 'array') {
              const {value, checked} = e.target

              const _value = [...values[key]]
              checked ? _value.push(value) : _value.filter((item) => item !== values)
              setFieldValue(key, _value)
            } else {
              handleChange(e)
            }
          }}
          checked={typeCheckbox === 'array' ? undefined : values[key]}
        />
      ))
    }

    // handle for Input Advanced type input is money
    if (Component.name === 'InputAdvance' && key === 'annual_income') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onBlur={(e: any) => {
              setAnnualIncome({
                monthly_income_1: +(Number(e.target.value) / 12).toFixed(2),
                monthly_income_2: +(Number(e.target.value) / 12).toFixed(2),
                monthly_income_3: +(Number(e.target.value) / 12).toFixed(2),
              })

              setFieldValue('6_months_income', +(Number(e.target.value) / 2).toFixed(2))
              setFieldValue('monthly_income', +(Number(e.target.value) / 12).toFixed(2))
              setFieldValue('monthly_income_1', +(Number(e.target.value) / 12).toFixed(2))
              setFieldValue('monthly_income_2', +(Number(e.target.value) / 12).toFixed(2))
              setFieldValue('monthly_income_3', +(Number(e.target.value) / 12).toFixed(2))
            }}
            onChange={(e) => {
              setFieldValue('annual_income', +e.target.value)
              handleChange(e)
            }}
            name={key}
            classShared={className}
            typeInput={typeInputAdvanced}
            type={typeInput}
            noThereAreCommas={false}
          />

          {desc && <span className='text-gray-600 mt-2 fs-sm'>{desc}</span>}
          <ErrorMessage shouldShowMessage={!!touched[key] && !!errors[key]} message={errors[key]} />
        </div>
      )
    }

    if (Component.name === 'InputAdvance') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={handleChange}
            name={key}
            classShared={className}
            typeInput={typeInputAdvanced}
            disabled={disabled ? true : false}
            type={typeInput}
            noThereAreCommas={false}
          />

          {desc && <span className='text-gray-600 mt-2 fs-sm'>{desc}</span>}
        </div>
      )
    }

    if (Component.name === 'Input' || Component.name === 'InputTime') {
      return (
        <Component value={values[key]} onChange={handleChange} name={key} classShared={className} />
      )
    }

    // unexpected
    return <Component />
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, isFullLayout, column, isHide, className, required} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={clsx([
              'd-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8',
              isFullLayout || !column ? 'full' : '',
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

export default Employment