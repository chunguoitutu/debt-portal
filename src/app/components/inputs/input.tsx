import React, {InputHTMLAttributes} from 'react'
import {handleKeyPress, handlePaste} from '../enter-numbers-only'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string
  error?: any
  errorTitle?: any
  touched?: any
  required?: boolean
  name?: string
  classShared?: string
  type?: string
  noThereAreCommas?: boolean
}

export const Input: React.FC<IProps> = ({
  id,
  title,
  error = false,
  touched,
  errorTitle,
  required = false,
  noThereAreCommas = true,
  name,
  classShared = 'fv-row mb-16px',
  type = 'text',
  ...rest
}) => {
  return (
    <div className={`${classShared}`}>
      {title && (
        <label
          className='d-flex align-items-center fs-5 fw-semibold mb-8px cursor-pointer'
          htmlFor={id}
        >
          <span
            style={{
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '24px',
              color: '#071437',
              textTransform: 'capitalize',
            }}
            className={`${required ? 'required' : ''} `}
          >
            {title}
          </span>
        </label>
      )}
      <input
        type={type}
        onKeyPressCapture={(e) => {
          if (type === 'number') {
            handleKeyPress({e: e, noThereAreCommas: noThereAreCommas})
          }
        }}
        onPaste={(e) => {
          if (type === 'number') {
            handlePaste({e: e, noThereAreCommas: noThereAreCommas})
          }
        }}
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
  )
}
