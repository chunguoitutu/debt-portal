import React, {InputHTMLAttributes, useId} from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string
  label?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
}

const InputCheck = ({title = '', label, checked = false, onChange, ...rest}: Props) => {
  const id = useId()

  return (
    <div>
      <div className='form-check form-check-custom form-check-solid form-switch'>
        {title !== '' && (
          <label htmlFor={id} className='d-flex fw-semibold' style={{fontSize: 16}}>
            {title}
          </label>
        )}

        <div className='fv-row'>
          <div className=' form-check form-check-custom form-check-solid form-switch'>
            <input
              className='form-check-input'
              type='checkbox'
              checked={checked}
              style={{width: 45, height: 23, marginLeft: 20}}
              onChange={onChange}
              {...rest}
              id={id}
            />

            <label htmlFor={id} className='fw-bold ps-2 fs-6 cursor-grab'>
              {checked ? (
                <span className='text-gray-500'>Active</span>
              ) : (
                <span className='text-gray-500'>Disabled</span>
              )}
            </label>

            {label && (
              <label htmlFor={id} className='fw-bold ps-2 fs-6 cursor-grab'>
                {checked ? 'Active' : 'Disabled'}
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputCheck
