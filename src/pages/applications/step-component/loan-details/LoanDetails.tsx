import {FC, Fragment, useEffect, useState} from 'react'
import clsx from 'clsx'

import ErrorMessage from '@/components/error/ErrorMessage'
import {ApplicationConfig, PropsStepApplication} from '@/app/types'
import request from '../../../../app/axios'
import {useParams} from 'react-router-dom'
import {
  convertInterestApplication,
  formatNumber,
  getIdDefault,
  isFirstGetStepApplication,
} from '@/app/utils'
import {useAuth} from '@/app/context/AuthContext'
import {ApplicationStatus, TermUnit} from '@/app/types/enum'
import {error} from 'console'

const LoanDetails: FC<PropsStepApplication> = ({
  config = [],
  formik,
  optionListing,
  setOptionListing,
}) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    registerField,
    unregisterField,
  } = formik
  const {applicationIdEdit} = useParams()
  const {company_id, priority} = useAuth()

  const [errorMessages, setErrorMessages] = useState<any>({})

  useEffect(() => {
    const isFirstGet = isFirstGetStepApplication({
      optionListing,
      config,
    })

    isFirstGet && onFetchDataList()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!optionListing.loan_type) return
    const currentItem = optionListing.loan_type.find(
      (el: any) => el.id === Number(values?.loan_type_id)
    )

    const interest = convertInterestApplication(+currentItem.interest, values.term_unit)
    setFieldValue('interest', interest || '')
  }, [values.term_unit, optionListing.loan_type_id])

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
          setFieldValue('term_unit', TermUnit.MONTHLY)
          setFieldValue('monthly_late_fee', itemDefault.late_fee || '')
          setFieldValue('late_interest_per_month_percent', itemDefault.late_interest || '')
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
      (el: any) => el.id === Number(formik.values?.loan_type_id)
    )

    const identification_type = formik.values.identification_type

    const isExisting = formik.values.is_existing
    const isForeignIdentification = identification_type === 'foreign_identification_number'
    let quota

    if (isExisting === 'existing' && isForeignIdentification) {
      quota = Math.min(
        currentItem?.quota_existing,
        currentItem?.quota_new,
        currentItem?.quota_foreigner
      )
    } else if (isExisting === 'existing') {
      quota = currentItem?.quota_existing
    } else if (isExisting === 'new' && isForeignIdentification) {
      quota = Math.min(currentItem?.quota_new, currentItem?.quota_foreigner)
    } else if (isExisting === 'new') {
      quota = currentItem?.quota_new
    }

    if (quota !== undefined) {
      registerField('loan_amount_requested', {
        validate(value) {
          return quota < +value ? `Loan Amount should not exceed ${quota}$` : ''
        },
      })
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

    const isDisableForce =
      priority > 2 &&
      [
        'interest',
        'amount_of_acceptance',
        'monthly_late_fee',
        'late_interest_per_month_percent',
      ].includes(key)
    const isApprovedOrRejected = [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED].includes(
      values.status
    )

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
            disabled={isDisableForce || isApprovedOrRejected}
            value={values[key]}
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={(e) => {
              key === 'loan_amount_requested' &&
                setFieldValue('amount_of_acceptance', +(+e.target.value / 10).toFixed(2) || '')
              handleBlur(e)
            }}
            transparent={key === 'loan_amount_requested' ? true : false}
            name={key}
            classShared={className}
            disabled={isDisableForce || isApprovedOrRejected}
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
            disabled={isDisableForce || isApprovedOrRejected}
            value={values[key]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleAutoSelect(key, e)}
            onBlur={handleBlur}
            name={key}
            classShared={className}
            keyValueOption={keyValueOfOptions}
            keyLabelOption={keyLabelOfOptions}
            options={!!dependencyApi ? optionListing[keyOfOptionFromApi || key] || [] : options}
            touched={touched[key]}
            error={errors[key]}
          />
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
