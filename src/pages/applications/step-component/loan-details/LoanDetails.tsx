import {FC, Fragment, useEffect, useState} from 'react'
import clsx from 'clsx'

import ErrorMessage from '@/components/error/ErrorMessage'
import {ApplicationConfig, PropsStepApplication} from '@/app/types'
import request from '../../../../app/axios'
import {useParams} from 'react-router-dom'
import {formatNumber, getIdDefault, isFirstGetStepApplication} from '@/app/utils'
import {useAuth} from '@/app/context/AuthContext'

const LoanDetails: FC<PropsStepApplication> = ({
  config = [],
  formik,
  optionListing,
  setOptionListing,
}) => {
  const {applicationIdEdit} = useParams()
  const {company_id} = useAuth()

  const [errorMessages, setErrorMessages] = useState<any>({})

  useEffect(() => {
    const isFirstGet = isFirstGetStepApplication({
      optionListing,
      config,
    })
    isFirstGet && onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {values, touched, errors, handleChange, setFieldValue, setFieldError, setFieldTouched} =
    formik

  useEffect(() => {
    if (!optionListing.loan_type) return
    const currentItem = optionListing.loan_type.find(
      (el: any) => el.id === +formik.values.loan_type_id
    )

    const interestByDay = formatNumber(currentItem?.interest / 31)

    const interestByYear = currentItem?.interest * 12

    if (formik.values.term_unit.toString() === '0') {
      setFieldValue('interest', interestByDay || '')
    } else if (formik.values.term_unit.toString() === '1') {
      setFieldValue('interest', +currentItem?.interest || '')
    } else if (formik.values.term_unit.toString() === '2') {
      setFieldValue('interest', interestByYear || '')
    }
  }, [formik.values.term_unit])

  async function onFetchDataList() {
    try {
      const endpoint = config.filter((data) => !!data.dependencyApi)
      const requests = endpoint.map((d) =>
        request.post(d.dependencyApi || '', {
          status: true,
          pageSize: 99999,
          currentPage: 1,
          company_id,
        })
      )

      if (!requests?.length) return

      const responses = await Promise.all(requests)

      const newOption: {[key: string]: any[]} = {}

      responses.forEach((res, index) => {
        const config = endpoint[index]

        const data = res?.data?.data || []

        if (!Array.isArray(data) || !data?.length) return

        // Change options listing
        newOption[config.keyOfOptionFromApi || config.key] = data

        !applicationIdEdit && setFieldValue(config.key, getIdDefault(data))

        let itemDefault = data?.find((el: any) => +el.is_default === 1) || data?.[0]

        const isDraftOrCreate = [0, undefined].includes(values.status || 0)

        if (isDraftOrCreate) {
          setFieldValue(`${config.key}`, itemDefault.id)
          setFieldValue(`interest`, itemDefault.interest || '')
          setFieldValue('term_unit', 1)
        }
      })

      setOptionListing((prev) => ({...prev, ...newOption}))
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    if (!optionListing.loan_type) return

    const currentItem = optionListing.loan_type.find(
      (el: any) => el.id === +formik.values.loan_type_id
    )

    const loanAmountRequested = +formik.values.loan_amount_requested
    const identification_type = formik.values.identification_type

    if (formik.values.is_existing === 'existing') {
      const quotaExisting = currentItem?.quota_existing
      if (quotaExisting < loanAmountRequested) {
        setErrorMessages({
          ...errorMessages,
          loan_amount_requested: `Loan Amount should not exceed ${quotaExisting}$`,
        })
      } else {
        setErrorMessages({
          ...errorMessages,
          loan_amount_requested: undefined,
        })
      }
    }

    if (formik.values.is_existing === 'new') {
      const quotaNew = currentItem?.quota_new
      if (quotaNew < loanAmountRequested) {
        setErrorMessages({
          ...errorMessages,
          loan_amount_requested: `Loan Amount should not exceed ${quotaNew}$`,
        })
      } else {
        setErrorMessages({
          ...errorMessages,
          loan_amount_requested: undefined,
        })
      }
    }

    if (
      identification_type === 'foreign_identification_number' &&
      formik.values.is_existing === 'existing'
    ) {
      const quotaExisting = currentItem?.quota_existing
      if (quotaExisting < loanAmountRequested) {
        setErrorMessages({
          ...errorMessages,
          loan_amount_requested: `Loan Amount should not exceed ${quotaExisting}$`,
        })
      } else {
        setErrorMessages({
          ...errorMessages,
          loan_amount_requested: undefined,
        })
      }
    }

    if (
      identification_type === 'foreign_identification_number' &&
      formik.values.is_existing === 'new'
    ) {
      const quotaNew = currentItem?.quota_new
      if (quotaNew < loanAmountRequested) {
        setErrorMessages({
          ...errorMessages,
          loan_amount_requested: `Loan Amount should not exceed ${quotaNew}$`,
        })
      } else {
        setErrorMessages({
          ...errorMessages,
          loan_amount_requested: undefined,
        })
      }
    }
  }, [formik.values.loan_amount_requested])

  const handleAutoSelect = (key: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    if (key === 'loan_type_id') {
      const value = e.target.value
      if (value && optionListing[key]) {
        const {interest} = optionListing[key].find((el) => el.id == value)
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
      keyOfOptionFromApi,
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
          <span className='fw-semibold cursor-pointer fs-4 text-gray-900'>
            Opt-in consent to disclose information to MLCB and SMECB
          </span>
        </Fragment>
      ))
    }
    if (typeComponent === 'TextArea') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            classShared='flex-grow-1'
            disabled={values.status === 3 || values.status === 2 ? true : false}
            value={values[key]}
            onChange={handleChange}
            name={key}
            touched={touched[key]}
            error={errors[key]}
          />
        </div>
      )
    }

    if (key === 'loan_amount_requested' && typeComponent === 'Input') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={handleChange}
            name={key}
            transparent={true}
            classShared={className}
            disabled={values.status === 3 || values.status === 2 ? true : false}
            type={typeInput}
            noThereAreCommas={typeof noThereAreCommas === 'boolean' ? noThereAreCommas : true}
          />

          {errors[key] && touched[key] && <ErrorMessage message={errors[key] as string} />}
          {errorMessages.loan_amount_requested && (
            <ErrorMessage message={errorMessages.loan_amount_requested} />
          )}
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
            disabled={values.status === 3 || values.status === 2 ? true : false}
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
            disabled={values.status === 3 || values.status === 2 ? true : false}
            value={values[key]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleAutoSelect(key, e)}
            name={key}
            classShared={className}
            keyValueOption={keyValueOfOptions}
            keyLabelOption={keyLabelOfOptions}
            options={!!dependencyApi ? optionListing[keyOfOptionFromApi || key] || [] : options}
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
        const {label, column, isHide, required, className, typeComponent} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={clsx([
              'd-flex gap-3 gap-xxl-8',
              !column ? 'full' : '',
              typeComponent === 'Checkbox'
                ? 'align-items-center gap-5'
                : 'flex-column flex-xxl-row align-items-start align-items-xxl-stretch',
              className,
            ])}
            key={i}
          >
            <div
              className={clsx([
                'input-title-application-step2 left fs-4 text-start text-lg-end',
                required && 'required',
                typeComponent === 'Checkbox' && 'd-none d-xxl-block',
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
