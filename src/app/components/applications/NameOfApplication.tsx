import React, {FC} from 'react'
import {Input} from '../inputs/input'

type Props = {
  formData: any
  onChange: (e: React.ChangeEvent<any>) => void
  errors: any
  touched: any
}

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

const NameOfApplication: FC<Props> = ({errors = {}, touched = {}, formData = {}, onChange}) => {
  return (
    <div className='row w-100 gy-5'>
      {data.map(({key, placeholder}, i) => (
        <div className='col-12 col-xl-4' key={i}>
          <Input
            name={key}
            value={formData?.[key]}
            placeholder={placeholder}
            onChange={onChange}
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
