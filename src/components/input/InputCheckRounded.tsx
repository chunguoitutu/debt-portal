import React, {InputHTMLAttributes, useId} from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  showLabelCheck?: boolean
  request_info?: boolean //just apply for table Job Type
}

const InputCheck = ({
  title = '',
  checked = false,
  showLabelCheck = true,
  onChange,
  request_info = false,
  ...rest
}: Props) => {
  const id = useId()

  return (
    <div>
      <div className='form-check form-check-custom form-check-solid form-switch'>
        {title !== '' && (
          <label
            htmlFor={id}
            className='d-flex fw-semibold'
            style={{fontSize: 16, cursor: 'pointer'}}
          >
            {title}
          </label>
        )}

        <div className='fv-row'>
          <div className='form-check form-check-custom form-check-solid form-switch'>
            <input
              className='form-check-input cursor-pointer'
              type='checkbox'
              checked={checked}
              style={{width: 40, height: 25, marginLeft: '8px'}}
              onChange={onChange}
              {...rest}
              id={id}
            />
          </div>
        </div>
        {showLabelCheck && request_info && (
          <div
            style={{
              color: '#99A1B7',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '24px',
              marginLeft: '8px',
            }}
          >
            {checked ? 'Yes' : 'No'}
          </div>
        )}

        {showLabelCheck && !request_info && (
          <div
            style={{
              color: '#99A1B7',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '24px',
              marginLeft: '8px',
            }}
          >
            {checked ? 'Active' : 'Disable'}
          </div>
        )}
      </div>
    </div>
  )
}

export default InputCheck
