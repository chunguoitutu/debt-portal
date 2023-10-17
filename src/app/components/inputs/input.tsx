import React from 'react'

interface IProps {
  onChange?: any
  value: any
  placeholder?: string
  type?: string
  id?: string
  title: string
  onBlur?: any
  error?: any
  errorTitle?: any
  touched?: any
  classCSS?: string
  required?: boolean
  onPaste?: any
  onKeyPressCapture?: any
  name?: string
}

export const Input: React.FC<IProps> = ({
  onKeyPressCapture,
  onPaste,
  value,
  errorTitle,
  onChange,
  placeholder,
  type = 'text',
  error = false,
  id,
  title,
  onBlur,
  touched,
  required = false,
  name,
}) => {
  return (
    <div>
      <div className='fv-row mb-8'>
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2' htmlFor={id}>
          <span className={`${required ? 'required' : ''}`}>{title}</span>
        </label>
        <input
          onKeyPressCapture={onKeyPressCapture}
          onPaste={onPaste}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
          onBlur={onBlur}
          name={name}
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
