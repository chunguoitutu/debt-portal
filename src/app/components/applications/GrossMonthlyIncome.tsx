import React, {FC} from 'react'
import InputAdvance from '../inputs/InputAdvance'
import ErrorMessage from '../error/ErrorMessage'

type Props = {
  formData: any
  onChange: (e: React.ChangeEvent<any>) => void
  errors: any
  touched: any
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

const GrossMonthlyIncome: FC<Props> = ({errors = {}, touched = {}, formData = {}, onChange}) => {
  return (
    <div className='row w-100 gy-5'>
      {data.map(({key, placeholder, desc}, i) => (
        <div className='col-12 col-xl-4 d-flex flex-column' key={i}>
          <InputAdvance
            name={key}
            value={formData?.[key]}
            placeholder={placeholder}
            onChange={onChange}
            classShared='w-300px w-xl-unset'
            typeInput='money'
          />

          <span className='text-gray-600 mt-2 fs-sm'>{desc}</span>

          <ErrorMessage shouldShowMessage={errors[key] && touched[key]} message={errors[key]} />
        </div>
      ))}
    </div>
  )
}

export default GrossMonthlyIncome
