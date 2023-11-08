import {FC, Fragment, useState} from 'react'
import {ApplicationConfig, PropsStepApplication} from '../../../../modules/auth'
import clsx from 'clsx'

import ErrorMessage from '../../../../components/error/ErrorMessage'
import Tippy from '@tippyjs/react'
import Select from '../../../../components/select/select'
import {COUNTRY_PHONE_CODE} from '../../../../utils/globalConfig'

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
      column,
      options,
      disabled,
      typeInput,
      desc,
      typeCheckbox,
      typeComponent,
    } = item
    let Component: any = item?.component

    const className = !column
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
    if (typeComponent === 'Select') {
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
    if (typeComponent === 'Radio') {
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
    if (typeComponent === 'Checkbox') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([values[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          value={item.value}
          onChange={(e: any) => {
            if (typeCheckbox === 'array' && Array.isArray(values[key])) {
              const {value, checked} = e.target

              const _value = [...values[key]]
              const newValue = checked
                ? [..._value, value]
                : _value.filter((item) => item !== value)

              setFieldValue(key, newValue)
            } else {
              handleChange(e)
            }
          }}
          checked={
            typeCheckbox === 'array' && Array.isArray(values[key])
              ? values[key].includes(item.value)
              : values[key]
          }
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
            type={typeInput === 'phone' ? 'number' : typeInput || 'text'}
            classShared={className}
            disabled={disabled}
            onBlur={(e: any) => {
              if (key === 'annual_income') {
                setAnnualIncome({
                  monthly_income_1: +(Number(e.target.value) / 12).toFixed(2),
                  monthly_income_2: +(Number(e.target.value) / 12).toFixed(2),
                  monthly_income_3: +(Number(e.target.value) / 12).toFixed(2),
                })

                setFieldValue('six_months_income', +(Number(e.target.value) / 2).toFixed(2))
                setFieldValue('monthly_income', +(Number(e.target.value) / 12).toFixed(2))
                setFieldValue('monthly_income_1', +(Number(e.target.value) / 12).toFixed(2))
                setFieldValue('monthly_income_2', +(Number(e.target.value) / 12).toFixed(2))
                setFieldValue('monthly_income_3', +(Number(e.target.value) / 12).toFixed(2))
              }
            }}
            insertLeft={
              typeInput === 'phone' ? (
                <Tippy offset={[120, 0]} content='Please choose the phone number you prefer.'>
                  {/* Wrapper with a span tag to show tooltip */}
                  <span>
                    <Select
                      onChange={handleChange}
                      value={values[key]}
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
          />

          {desc && <span className='text-gray-600 mt-2 fs-sm'>{desc}</span>}

          {errors[key] && touched[key] && <ErrorMessage className='mt-2' message={errors[key]} />}
        </div>
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

export default Employment
