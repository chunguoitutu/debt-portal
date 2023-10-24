import React, {InputHTMLAttributes} from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  title: string
  error?: any
  errorTitle?: any
  touched?: any
  required?: boolean
  classShared?: string
  type?: string
}

export const InputTime: React.FC<IProps> = ({
  errorTitle,
  error = false,
  title,
  touched,
  required = false,
  classShared = 'fv-row mb-10',
  type = 'datetime-local',
  ...reset
}) => {
  return (
    <div className={`${classShared}`}>
      {title && (
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
          <span className={`${required ? 'required' : ''}`}>{title}</span>
        </label>
      )}
      <input type={type} {...reset} className='form-control form-control-lg form-control-solid' />
      {touched && error && (
        <div className='fv-plugins-message-container'>
          <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
            {errorTitle}
          </div>
        </div>
      )}
    </div>
  )
}
