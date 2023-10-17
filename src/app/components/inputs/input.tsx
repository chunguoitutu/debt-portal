import React, {InputHTMLAttributes} from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string
  error?: any
  errorTitle?: any
  touched?: any
  required?: boolean
  name?: string
  classShared?: string
}

export const Input: React.FC<IProps> = ({
  error = false,
  id,
  title,
  touched,
  errorTitle,
  required = false,
  name,
  classShared = 'fv-row mb-8',
  ...rest
}) => {
  return (
    <div>
      <div className={`${classShared}`}>
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2' htmlFor={id}>
          <span className={`${required ? 'required' : ''}`}>{title}</span>
        </label>
        <input
          id={id}
          {...rest}
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
