import React, {FC} from 'react'
import {Input} from '../inputs/input'
import {PropsStepApplication} from '../../modules/auth'

// type Props = {
//   formData: any
//   onChange: (e: React.ChangeEvent<any>) => void
//   errors: any
//   touched: any
// }

// interface Props extends PropsStepApplication {
//   errors: any
//   touched: any
// }

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
        <div className='col-12 col-xl-4' key={i}>
          <Input
            name={key}
            value={values?.[key]}
            placeholder={placeholder}
            onChange={handleChange}
            classShared='w-300px w-xl-unset'
            error={errors[key]}
            touched={touched[key]}
            errorTitle={errors[key]}
          />
        </div>
      ))}
    </div>
  )
}

export default NameOfApplication
