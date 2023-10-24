import {ReactNode, SelectHTMLAttributes} from 'react'
import ErrorMessage from '../error/ErrorMessage'

interface Props extends Omit< SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'name'> {
  label?: string
  name: string
  className?: string
  options?: {[key: string]: any}[]
  children?: ReactNode
  required?: boolean
  fieldValueOption?: string
  fieldLabelOption?: string
  shouldShowError?: boolean
  errorMessage?: string
  classShared?: string
}

const Select = ({
  label,
  options,
  children,
  fieldValueOption = 'value',
  fieldLabelOption = 'label',
  shouldShowError,
  errorMessage,
  name,
  className = '',
  required = false,
  classShared = 'row mb-6',
  ...rest
}: Props) => {
  return (
    <div className={`${classShared}`}>
      {label && (
        <label htmlFor={name} className='d-flex align-items-center fs-5 fw-semibold mb-2'>
          <span className={`${required ? 'required' : ''}`}>{label}</span>
        </label>
      )}

        <select id={name} className={`form-select form-select-solid form-select-lg fw-bold ${className}`} {...rest}>
          {options?.map((o, i) => {
            return (
              <option value={o[fieldValueOption]} key={i}>
                {o[fieldLabelOption]}
              </option>
            )
          })}
          {children}
        </select>
        {shouldShowError && (
          <ErrorMessage shouldShowMessage={shouldShowError} message={errorMessage} />
        )}
      </div>
  )
}
export default Select
