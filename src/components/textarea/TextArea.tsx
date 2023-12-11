import {FC, TextareaHTMLAttributes, useId} from 'react'
import Label from '../label'
import ErrorMessage from '../error/ErrorMessage'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  classShared?: string
  label?: string
  error?: string
  touched?: boolean
}

const TextArea: FC<TextAreaProps> = ({
  id,
  name,
  label,
  className = '',
  classShared = '',
  required = false,
  error,
  touched,
  ...rest
}) => {
  const defaultId = useId()

  return (
    <div className={`${classShared}`}>
      {label && (
        <Label
          className='d-flex align-items-center fs-5 fw-semibold mb-8px'
          required={required}
          label={label}
          htmlFor={id || defaultId || name}
        />
      )}

      <textarea
        className='form-control p-12px form-control-lg form-control-solid fs-4 min-h-120px rounded-8'
        id={id || defaultId || name}
        name={name}
        {...rest}
      />

      {error && touched && <ErrorMessage className='mt-2' message={error} />}
    </div>
  )
}

export default TextArea
