import {FormikProps} from 'formik'
import {FC, useMemo} from 'react'

import {CreateEditUser} from './CreateEditUser'
import {Input} from '@/components/input'

type Props = {
  formik: FormikProps<CreateEditUser>
}

const FullNameUser: FC<Props> = ({formik}) => {
  const {values, errors, touched, handleBlur, handleChange} = formik

  const data = useMemo(
    () => [
      {name: 'firstname', label: 'First Name', type: 'text', required: true},
      {name: 'middlename', label: 'Middle Name', type: 'text'},
      {name: 'lastname', label: 'Last Name', type: 'text', required: true},
    ],
    []
  )
  return (
    <div className='row gy-16px'>
      {data.map((item, i) => {
        const {name, label, required, type} = item

        return (
          <div className='col-12 col-lg-4' key={i}>
            <Input
              type={type}
              label={label}
              required={required}
              name={name}
              value={values[name] || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors[name]}
              touched={touched[name]}
            />
          </div>
        )
      })}
    </div>
  )
}

export default FullNameUser
