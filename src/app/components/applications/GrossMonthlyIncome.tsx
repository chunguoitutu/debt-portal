import React, {FC} from 'react'
import InputAdvance from '../inputs/InputAdvance'
import ErrorMessage from '../error/ErrorMessage'
import {PropsStepApplication} from '../../modules/auth'

interface Props extends PropsStepApplication {
  annualIncome: any
  setAnnualIncome: any
}

const data = [
  {
    key: 'monthly_income_1',
    placeholder: 'Monthly Income 1',
    desc: 'Last Month',
  },
  {
    key: 'monthly_income_2',
    placeholder: 'Monthly Income 2',
    desc: 'Last Month - 1',
  },
  {
    key: 'monthly_income_3',
    placeholder: 'Monthly Income 3',
    desc: 'Last Month - 2',
  },
]

const GrossMonthlyIncome: FC<Props> = ({formik, setAnnualIncome, annualIncome}) => {
  const {values, setFieldValue, handleChange, errors, touched} = formik

  return (
    <div className='row w-100 gy-5'>
      {data.map(({key, placeholder, desc}, i) => (
        <div className='col-12 col-xl-4 d-flex flex-column' key={i}>
          <InputAdvance
            name={key}
            value={values?.[key]}
            placeholder={placeholder}
            onBlur={(e) => {
              if (+Number(e.target.value).toFixed(2) !== +Number(annualIncome[key]).toFixed(2)) {
                const sum_annual_income =
                  (Number(values.monthly_income_1) +
                    Number(values.monthly_income_2) +
                    Number(values.monthly_income_3)) *
                  4
                setAnnualIncome({...annualIncome, [key]: +e.target.value})
                setFieldValue('annual_income', +sum_annual_income.toFixed(2))
                setFieldValue('6_months_income', (Number(sum_annual_income) / 2).toFixed(2))
                setFieldValue('monthly_income', (Number(sum_annual_income) / 12).toFixed(2))
              }
            }}
            onChange={(e) => {
              setFieldValue(key, +(Number(e.target.value) / 2))
              handleChange(e)
            }}
            classShared='w-300px w-xl-unset'
            typeInput='money'
            type='number'
            noThereAreCommas={false}
          />

          <span className='text-gray-600 mt-2 fs-sm'>{desc}</span>

          <ErrorMessage shouldShowMessage={errors[key] && touched[key]} message={errors[key]} />
        </div>
      ))}
    </div>
  )
}

export default GrossMonthlyIncome