import clsx from 'clsx'
import {FC, Fragment, useEffect, useState} from 'react'
import ErrorMessage from '../../../../components/error/ErrorMessage'
import {PropsStepApplication, ApplicationConfig} from '../../../../modules/auth'
import request from '../../../../axios'

const LoanDetails: FC<PropsStepApplication> = ({config = [], formik}) => {
  const [dataLoanType, setDataLoanType] = useState({})

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function onFetchDataList() {
    try {
      const endpoint = config.filter((data) => !!data.dependencyApi)
      endpoint.forEach((d) => {
        request.post(d.dependencyApi || '', {status: true}).then((res) => {
          setDataLoanType({...dataLoanType, [d.key]: res?.data?.data})
        })
      })
    } catch (error) {
    } finally {
    }
  }

  const {values, touched, errors, handleChange, setFieldValue} = formik

  function renderComponent(item: ApplicationConfig) {
    const {
      key,
      data = [],

      column,
      options,
      keyLabelOfOptions,
      keyValueOfOptions,
      typeInput,
      typeInputAdvanced,
      typeCheckbox,
      dependencyApi,
    } = item
    let Component: any = item?.component

    // nothing
    if (!Component) return

    if (Component.name === 'Checkbox') {
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
              checked ? _value.push(value) : _value.filter((item) => item !== values)
              setFieldValue(key, _value)
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
    if (Component.name === 'TextArea') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            classShared='flex-grow-1'
            value={values[key]}
            onChange={handleChange}
            name={key}
            touched={touched}
            errors={errors}
          />
          <ErrorMessage
            shouldShowMessage={!!errors[key] && !!touched[key]}
            message={errors[key] as string}
          />
        </div>
      )
    }

    const className = !column ? 'flex-grow-1' : 'input-wrap flex-shrink-0'

    if (Component.name === 'InputAdvance') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={handleChange}
            name={key}
            classShared={className}
            typeInput={typeInputAdvanced}
            type={typeInput}
            noThereAreCommas={false}
          />
          <ErrorMessage
            shouldShowMessage={!!errors[key] && !!touched[key]}
            message={errors[key] as string}
          />
        </div>
      )
    }

    if (Component.name === 'Select') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={handleChange}
            name={key}
            classShared={className}
            fieldValueOption={keyValueOfOptions}
            fieldLabelOption={keyLabelOfOptions}
            options={!!dependencyApi ? dataLoanType[key] || [] : options}
            touched={touched}
            errors={errors}
          />
          <ErrorMessage
            shouldShowMessage={!!errors[key] && !!touched[key]}
            message={errors[key] as string}
          />
        </div>
      )
    }

    return (
      <div className='d-flex flex-column w-100'>
        <Component
          value={values[key]}
          onChange={handleChange}
          name={key}
          classShared={className}
          error={errors[key]}
          touched={touched[key]}
          errorTitle={errors[key]}
          type={typeInput || 'text'}
          noThereAreCommas={false}
        />
      </div>
    )
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, column, isHide, required, className} = item

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
                'input-title-application-step2 left fs-4 text-start text-lg-end',
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
export default LoanDetails
