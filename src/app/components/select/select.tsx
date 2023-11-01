import {FC, ReactNode, SelectHTMLAttributes} from 'react'
import ErrorMessage from '../error/ErrorMessage'

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'name'> {
  label?: string
  name: string
  className?: string
  options?: {[key: string]: any}[]
  children?: ReactNode
  required?: boolean
  fieldValueOption?: string
  fieldLabelOption?: string
  error?: boolean
  touched?: boolean
  errorTitle?: string
  classShared?: string
  isOptionDefault?: boolean
  dropDownGroup?: boolean | undefined
}

const Select: FC<Props> = ({
  label,
  options,
  children,
  fieldValueOption = 'value',
  fieldLabelOption = 'label',
  error = false,
  touched,
  errorTitle,
  name,
  className = '',
  isOptionDefault = true,
  required = false,
  classShared = 'row mb-6',
  dropDownGroup,
  ...rest
}) => {
  return (
    <div className={`${classShared}`}>
      {label && (
        <label htmlFor={name} className='d-flex align-items-center fs-5 fw-semibold mb-2'>
          <span className={`${required ? 'required' : ''}`}>{label}</span>
        </label>
      )}

      <div className='fv-row'>
        <select
          id={name}
          name={name}
          className={`form-select form-select-solid form-select-lg text-gray-700 ${className}`}
          {...rest}
        >
          {isOptionDefault && <option value=''></option>}
          {dropDownGroup
            ? options?.map((o, i) => {
                return (
                  <optgroup label={o.name} key={i}>
                    {o.options.map((op) => (
                      <option value={op.value} key={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </optgroup>
                )
              })
            : options?.map((o, i) => {
                return (
                  <option value={o[fieldValueOption]} key={i}>
                    {o[fieldLabelOption]}
                  </option>
                )
              })}
          {children}
        </select>
        {error && touched && (
          <ErrorMessage shouldShowMessage={error && touched} message={errorTitle} />
        )}
      </div>
    </div>
  )
}
export default Select
