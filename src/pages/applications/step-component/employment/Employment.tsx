import {FC, Fragment, useEffect, useState} from 'react'
import clsx from 'clsx'
import Tippy from '@tippyjs/react'

import request from '@/app/axios'
import {Select} from '@/components/select'
import {COUNTRY_PHONE_CODE} from '@/app/utils'
import ErrorMessage from '@/components/error/ErrorMessage'
import {ApplicationConfig, PropsStepApplication} from '@/app/types'

const Employment: FC<PropsStepApplication> = (props) => {
  const {config = [], formik} = props

  const [annualIncome, setAnnualIncome] = useState({
    monthly_income_1: 0,
    monthly_income_2: 0,
    monthly_income_3: 0,
  })

  const [dataLoanType, setDataLoanType] = useState({})

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function onFetchDataList() {
    try {
      const endpoints = config.filter((data) => !!data.dependencyApi)

      const results = await Promise.all(
        endpoints.map(async (d) => {
          const res = await request.post(d.dependencyApi || '', {status: true})
          return {key: d.key, data: res?.data?.data}
        })
      )

      const newDataLoanType = {}
      results.forEach((result) => {
        newDataLoanType[result.key] = result.data
      })
      setDataLoanType({...dataLoanType, ...newDataLoanType})
    } catch (error) {
    } finally {
    }
  }

  const {values, touched, setFieldValue, errors, handleChange, handleBlur} = formik

  function renderComponent(item: ApplicationConfig) {
    const {
      key,
      data = [],
      column,
      options,
      keyLabelOfOptions,
      keyValueOfOptions,
      dependencyApi,
      disabled,
      typeInput,
      desc,
      typeCheckbox,
      typeComponent,
    } = item

    let Component: any = item?.component

    const className = !column
      ? 'flex-grow-1 w-300px w-lg-unset'
      : 'input-wrap flex-shrink-0 w-100 w-xxl-200px'

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
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={handleChange}
            name={key}
            classShared={className}
            keyValueOption={keyValueOfOptions}
            keyLabelOption={keyLabelOfOptions}
            options={!!dependencyApi ? dataLoanType[key] || [] : options}
            touched={touched}
            onBlur={handleBlur}
          />
          {errors[key] && touched[key] && <ErrorMessage className='mt-2' message={errors[key]} />}
        </div>
      )
    }

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

    // handle for checkbox
    if (typeComponent === 'Checkbox') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([
            values[key].includes(item.value)
              ? 'fs-4 text-071437 fw-semibold'
              : 'text-gray-600 fs-4 fw-semibold',
          ])}
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
    return <Component props={{...props}} />
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, column, isHide, className, required} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={clsx([
              'd-flex flex-column flex-xxl-row align-items-start align-items-xxl-stretch gap-3 gap-xxl-8',
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
