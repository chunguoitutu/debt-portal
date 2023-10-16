import React from 'react'

interface IProps {
  onChange?: any
  value: any
  placeholder?: string
  id?: string
  title: string
  onBlur?: any
  error?: any
  errorTitle?: any
  touched?: any
  classCSS?: string
}

export const InputTime: React.FC<IProps> = ({
  value,
  errorTitle,
  onChange,
  placeholder,
  error = false,
  id,
  title,
  onBlur,
  touched,
}) => {
  return (
    <div>
      <div className='fv-row mb-10'>
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
          <span>{title}</span>
        </label>
        <input
          type='datetime-local'
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
          onBlur={onBlur}
          className='form-control form-control-lg form-control-solid'
        />
        {touched && error && (
          <div className='fv-plugins-message-container'>
            <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
              {errorTitle}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}