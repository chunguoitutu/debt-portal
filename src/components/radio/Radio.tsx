import {FC, InputHTMLAttributes, useId} from 'react'
import clsx from 'clsx'

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'id' | 'className'> {
  name: string
  label?: string
  desc?: string
  className?: string
  classNameLabel?: string
}

const Radio: FC<Props> = ({
  name,
  className,
  classNameLabel = 'text-gray-800',
  label,
  desc,
  ...rest
}) => {
  const id = useId()

  return (
    <div className='form-check form-check-custom form-check-solid'>
      <input
        className={clsx(['form-check-input me-3 cursor-pointer', className])}
        name={name}
        id={id}
        type='radio'
        {...rest}
      />

      {label && (
        <label className='form-check-label' htmlFor={id}>
          <div className={clsx(['cursor-pointer', classNameLabel])}>{label}</div>
          {desc && <div className='text-gray-600'>{desc}</div>}
        </label>
      )}
    </div>
  )
}

export default Radio
