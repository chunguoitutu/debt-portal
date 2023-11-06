import {FC} from 'react'
import {PropsStepApplication} from '../../modules/auth'
import Input from '../input'
import ErrorMessage from '../error/ErrorMessage'

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
    <div className='row w-100 gy-5'>
      {data.map(({key, placeholder}, i) => (
        <div className='col-12 col-xl-4 d-flex flex-column' key={i}>
          <Input
            name={key}
            value={values?.[key]}
            placeholder={placeholder}
            onChange={handleChange}
            classShared='w-300px w-xl-unset'
          />

          {errors[key] && touched[key] && <ErrorMessage message={errors[key] as string} />}
        </div>
      ))}
    </div>
  )
}

export default NameOfApplication
