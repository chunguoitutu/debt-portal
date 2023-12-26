import {FC} from 'react'
import {Input} from '../input'
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
  const {values, errors, touched, handleChange, handleBlur} = formik

  return (
    <div className='grid-3-column w-100 gap-16px'>
      {data.map(({key, placeholder}, i) => (
        <Input
          key={i}
          name={key}
          value={values?.[key]}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={values.status == 3 ? true : false}
          classShared=''
          error={errors[key] as string}
          touched={!!touched[key]}
        />
      ))}
    </div>
  )
}

export default NameOfApplication
