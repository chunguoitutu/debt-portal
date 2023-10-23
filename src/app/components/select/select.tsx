import {ReactNode, SelectHTMLAttributes} from 'react'
import ErrorMessage from '../error/ErrorMessage'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
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
  id,
  required = false,
  classShared = 'row mb-6',
  ...rest
}: Props) => {
  return (
    <div className={`${classShared}`}>
      {label && (
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
          <span className={`${required ? 'required' : ''}`}>{label}</span>
        </label>
      )}

      <div className='fv-row'>
        <select id={id} className='form-select form-select-solid form-select-lg fw-bold' {...rest}>
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
    </div>
  )
}
export default Select
