import {ForwardedRef, TextareaHTMLAttributes, forwardRef} from 'react'

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  className?: string
  classNameContainer?: string
  name: string
  title?: string
  isRequired?: boolean
}

const TextArea = (
  {
    name,
    title,
    className = '',
    classNameContainer = '',
    isRequired = false,
    ...rest
  }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  return (
    <div className={`d-flex flex-column gap-2 ${classNameContainer}`}>
      {title && (
        <label className='d-flex align-items-center fs-5 fw-semibold' htmlFor={name}>
          {title} {isRequired && <span className='text-danger'>*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        className='form-control form-control-lg form-control-solid form-control-flush min-h-100px'
        id={name}
        {...rest}
      />
    </div>
  )
}

export default forwardRef(TextArea)
