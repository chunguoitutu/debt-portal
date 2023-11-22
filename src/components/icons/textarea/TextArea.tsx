import {FC, TextareaHTMLAttributes} from 'react'

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  className?: string
  classShared?: string
  name: string
  title?: string
  isRequired?: boolean
}

const TextArea: FC<TextAreaProps> = ({
  name,
  title,
  className = '',
  classShared = '',
  isRequired = false,
  ...rest
}) => {
  return (
    <div className={`d-flex flex-column gap-2 ${classShared}`}>
      {title && (
        <label
          style={{fontSize: '16px'}}
          className='d-flex align-items-center  fw-semibold'
          htmlFor={name}
        >
          {title} {isRequired && <span className='text-danger'>*</span>}
        </label>
      )}

      <textarea
        style={{
          borderRadius: '8px',
        }}
        className='form-control p-12px form-control-lg form-control-solid form-control-flush min-h-120px'
        id={name}
        name={name}
        {...rest}
      />
    </div>
  )
}

export default TextArea
