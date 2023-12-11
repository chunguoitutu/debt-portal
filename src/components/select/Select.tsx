import {FC, SelectHTMLAttributes, useId} from 'react'
import ErrorMessage from '../error/ErrorMessage'
import Label from '../label'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options?: {[key: string]: any}[]
  keyValueOption?: string
  keyLabelOption?: string
  error?: string
  touched?: boolean
  classShared?: string
  isOptionDefault?: boolean
  dropDownGroup?: boolean | undefined
}

const Select: FC<Props> = ({
  label,
  options,
  error,
  touched,
  name,
  id,
  className = '',
  isOptionDefault = true,
  required = false,
  classShared = 'row mb-6',
  dropDownGroup,
  keyValueOption = 'value',
  keyLabelOption = 'label',
  ...rest
}) => {
  const defaultId = useId()

  return (
    <div className={`${classShared}`}>
      {label && (
        <Label
          htmlFor={id || defaultId || name}
          className='d-flex align-items-center fs-15 fw-semibold mb-8px'
          label={label}
          required={required}
        />
      )}

      <div className='fv-row'>
        <select
          id={name}
          name={name}
          className={`form-select form-select-solid form-select-lg text-gray-700 px-4 pe-9 text-truncate fs-4 ${className}`}
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
                  <option value={o[keyValueOption]} key={i}>
                    {o[keyLabelOption]}
                  </option>
                )
              })}
        </select>
        {error && touched && <ErrorMessage className='mt-2' message={error} />}
      </div>
    </div>
  )
}
export default Select
