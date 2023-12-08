import React, {FC, InputHTMLAttributes, useId} from 'react'
import Label from '../label'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  showLabelCheck?: boolean
  request_info?: boolean //just apply for table Job Type
  subTextWhenChecked?: string
  subTextWhenNoChecked?: string
}

const CheckboxRounded: FC<Props> = ({
  id,
  label,
  checked = false,
  showLabelCheck = true,
  request_info = false,
  name,
  required,
  subTextWhenChecked,
  subTextWhenNoChecked,
  onChange,
  ...rest
}: Props) => {
  const defaultId = useId()

  return (
    <div>
      <div className='form-check form-check-custom form-check-solid form-switch'>
        {label && (
          <Label
            htmlFor={id || defaultId || name}
            className='d-flex align-items-center fs-16 fw-semibold'
            label={label}
            required={required}
          />
        )}

        <div className='fv-row'>
          <div className='form-check form-check-custom form-check-solid form-switch'>
            <input
              className='form-check-input cursor-pointer ms-8px w-40px h-25px'
              type='checkbox'
              checked={checked}
              onChange={onChange}
              id={id || defaultId || name}
              {...rest}
            />
          </div>
        </div>
        {showLabelCheck && request_info && (
          <div className='text-gray-500 ms-8px fs-16 fw-semibold'>{checked ? 'Yes' : 'No'}</div>
        )}

        {showLabelCheck && !request_info && (
          <div className='text-gray-500 ms-8px fs-16 fw-semibold'>
            {checked ? subTextWhenChecked || 'Active' : subTextWhenNoChecked || 'Disable'}
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckboxRounded
