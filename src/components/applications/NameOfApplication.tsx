import {FC} from 'react'
import Input from '../input'
import ErrorMessage from '../error/ErrorMessage'
import {PropsStepApplication} from '@/app/types'

const data = [
  {
    key: 'firstname',
    placeholder: 'First Name',
  },
  {
    key: 'middlename',
    placeholder: 'Middle Name',
  },
  {
    key: 'lastname',
    placeholder: 'Last Name',
  },
]

const NameOfApplication: FC<PropsStepApplication> = ({formik}) => {
  const {values, handleChange, errors, touched} = formik

  return (
    <div className='row w-100 gy-5 gx-0 gx-lg-5 align-items-start'>
      {data.map(({key, placeholder}, i) => (
        <div className='col-12 col-lg-4 d-flex flex-column' key={i}>
          <Input
            name={key}
            value={values?.[key]}
            placeholder={placeholder}
            onChange={handleChange}
            classShared='flex-grow-1 w-xl-unset'
          />

          {errors[key] && touched[key] && <ErrorMessage message={errors[key] as string} />}
        </div>
      ))}
    </div>
  )
}

export default NameOfApplication
