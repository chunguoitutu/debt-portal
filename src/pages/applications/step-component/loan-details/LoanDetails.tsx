import clsx from 'clsx'
import {FC, Fragment, useEffect, useState} from 'react'
import ErrorMessage from '@/components/error/ErrorMessage'
import {ApplicationConfig, PropsStepApplication} from '@/app/types'
import request from '../../../../app/axios'

const LoanDetails: FC<PropsStepApplication> = ({config = [], formik}) => {
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

      results &&
        results.forEach((result) => {
          setDataLoanType({
            ...dataLoanType,
            [result.key]: result?.data,
          })
        })
    } catch (error) {
    } finally {
    }
  }

  const {values, touched, errors, handleChange, setFieldValue} = formik

  const handleAutoSelect = (key: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    if (key === 'loan_type_id') {
      const value = e.target.value
      if (value && dataLoanType[key]) {
        const {interest} = dataLoanType[key].find((el) => el.id == value)
        if (interest) setFieldValue('interest', +interest)
      } else {
        setFieldValue('interest', '')
      }
      handleChange(e)
    } else {
      handleChange(e)
    }
  }

  function renderComponent(item: ApplicationConfig) {
    const {
      key,
      data = [],
      noThereAreCommas,
      column,
      options,
      keyLabelOfOptions,
      keyValueOfOptions,
      typeInput,
      typeCheckbox,
      dependencyApi,
      typeComponent,
    } = item
    let Component: any = item?.component

    // nothing
    if (!Component) return
    const className = !column ? 'flex-grow-1' : 'input-wrap flex-shrink-0'

    if (typeComponent === 'Checkbox') {
      return data.map((item, i) => (
        <Fragment key={i}>
          <Component
            key={i}
            classNameLabel={clsx([values[key] === item.value ? 'text-gray-800' : 'text-dark'])}
            name={key}
            value={item.value}
            disabled={true}
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
          <span
            className='fw-semibold cursor-pointer fs-4'
            color='#071437'
            style={{marginLeft: '-15px'}}
          >
            Opt In Yes Consent to disclose information to MLCB and sMECB
          </span>
        </Fragment>
      ))
    }
    if (typeComponent === 'TextArea') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            classShared='flex-grow-1'
            value={values[key]}
            onChange={handleChange}
            name={key}
            touched={touched[key]}
            error={errors[key]}
          />
        </div>
      )
    }

    if (typeComponent === 'Input') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={handleChange}
            name={key}
            classShared={className}
            type={typeInput}
            noThereAreCommas={typeof noThereAreCommas === 'boolean' ? noThereAreCommas : true}
          />

          {errors[key] && touched[key] && <ErrorMessage message={errors[key] as string} />}
        </div>
      )
    }

    if (typeComponent === 'Select') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleAutoSelect(key, e)}
            name={key}
            classShared={className}
            keyValueOption={keyValueOfOptions}
            keyLabelOption={keyLabelOfOptions}
            options={!!dependencyApi ? dataLoanType[key] || [] : options}
            touched={touched}
            errors={errors}
          />
          {errors[key] && touched[key] && <ErrorMessage message={errors[key] as string} />}
        </div>
      )
    }

    return <Component />
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
              key={i}
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
