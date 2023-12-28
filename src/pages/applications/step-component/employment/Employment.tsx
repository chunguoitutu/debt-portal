import {FC, Fragment, useEffect, useRef, useState} from 'react'
import clsx from 'clsx'
import Tippy from '@tippyjs/react'
import {useParams} from 'react-router-dom'

import request from '@/app/axios'
import {Select} from '@/components/select'
import {COUNTRY_PHONE_CODE} from '@/app/utils'
import ErrorMessage from '@/components/error/ErrorMessage'
import {ApplicationConfig, PropsStepApplication} from '@/app/types'

const Employment: FC<PropsStepApplication> = (props) => {
  const {config = [], formik} = props
  const {applicationIdEdit} = useParams()
  const errorContainerRef = useRef<HTMLDivElement | null>(null)

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
          const res = await request.post(d.dependencyApi || '', {
            status: true,
            pageSize: 99999,
            currentPage: 1,
          })

          return {key: d.key, data: res?.data?.data}
        })
      )

      const newDataLoanType = {}
      results &&
        results.forEach((result) => {
          newDataLoanType[result.key] = result?.data
          !applicationIdEdit &&
            setFieldValue(
              `${result.key}`,
              result?.data.length > 0
                ? result?.data.filter((el: any) => +el.is_default === 1).length > 0
                  ? result?.data.filter((el: any) => +el.is_default === 1)[0].id
                  : result?.data[0].id
                : ''
            )
          !applicationIdEdit &&
            setFieldValue(
              `job_type_name`,
              result?.data.length > 0
                ? result?.data.filter((el: any) => +el.is_default === 1).length > 0
                  ? result?.data.filter((el: any) => +el.is_default === 1)[0].job_type_name
                  : result?.data[0].job_type_name
                : ''
            )
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

    const className = !column ? 'flex-grow-1' : 'input-wrap flex-shrink-0 w-100 w-xxl-250px'

    useEffect(() => {
      if (errors[key] && touched[key]) {
        errorContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }, [errors[key], touched[key]])

    // nothing
    if (!Component) return

    // Special cases should be checked in advance
    if (key === 'monthly_income_1') {
      return <Component {...props} annualIncome={annualIncome} setAnnualIncome={setAnnualIncome} />
    }
    if (key === 'bankrupted_key') {
      return <Component {...props} key={key} />
    }
    // End special cases

    // handle for select
    if (typeComponent === 'Select') {
      return (
        <div className={clsx(['d-flex flex-column w-100', column && 'w-xxl-unset'])}>
          <Component
            disabled={values.status === 3 || values.status === 2 ? true : false}
            value={values[key] || ''}
            onChange={handleChange}
            name={key}
            classShared={className}
            keyValueOption={keyValueOfOptions}
            keyLabelOption={keyLabelOfOptions}
            options={!!dependencyApi ? dataLoanType[key] || [] : options}
            touched={touched}
            onBlur={handleBlur}
          />
          {errors[key] && touched[key] && (
            <ErrorMessage className='mt-2' message={errors[key]} containerRef={errorContainerRef} />
          )}
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
          disabled={values.status === 3 || values.status === 2 ? true : false}
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
          disabled={values.status === 3 || values.status === 2 ? true : false}
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
        <div className={clsx(['d-flex flex-column w-100', column && 'w-xxl-unset'])}>
          <Component
            value={values[key]}
            onChange={handleChange}
            name={key}
            type={typeInput === 'phone' ? 'number' : typeInput || 'text'}
            classShared={className}
            disabled={disabled || values.status === 3 || values.status === 2 ? true : false}
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
                      value={values[key] || ''}
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
          {errors[key] && touched[key] && (
            <ErrorMessage className='mt-2' message={errors[key]} containerRef={errorContainerRef} />
          )}
        </div>
      )
    }

    // unexpected
    return <Component props={{...props}} />
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
                'input-title-application left fs-4 text-start text-lg-end ',
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

export default Employment
