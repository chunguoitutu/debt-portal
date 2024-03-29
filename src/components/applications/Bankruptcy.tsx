import {FC} from 'react'
import {PropsStepApplication} from '@/app/types'
import {Checkbox} from '@/components/checkbox'

const data = [
  {
    key: 'bankrupted',
    label: 'Declared bankrupt in the last 5 years',
  },
  {
    key: 'bankrupt_plan',
    label: 'Plan to declare bankrupt in the next 3 months',
  },
]

const Bankruptcy: FC<PropsStepApplication> = ({formik}) => {
  const {values, setFieldValue} = formik
  return (
    <div className='d-flex gap-3 gap-xxl-8 full flex-column flex-xxl-row align-items-start align-items-xxl-stretch no-center-label'>
      {data.map(({key, label}, i) => (
        <Checkbox
          key={i}
          name={key}
          checked={values[key]}
          label={label}
          disabled={values?.status === 2 || values?.status === 3 ? true : false}
          onChange={(e) => {
            setFieldValue(key, e.target.checked)
          }}
          classNameLabel={`cursor-pointer fs-4 fw-medium ${
            values && values[key] ? 'text-gray-900' : 'text-gray-600'
          } w-10`}
        />
      ))}
    </div>
  )
}

export default Bankruptcy
