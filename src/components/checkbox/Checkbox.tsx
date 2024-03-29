import {FC, InputHTMLAttributes, useId} from 'react'
import clsx from 'clsx'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  name: string
  label?: string
  desc?: string
  className?: string
  classNameLabel?: string
}

const Checkbox: FC<Props> = ({name, className, classNameLabel = '', label, desc, ...rest}) => {
  const id = useId()

  return (
    <div className='form-check form-check-custom form-check-solid'>
      <input
        className={clsx(['d-inline-block form-check-input cursor-pointer ', className])}
        name={name}
        id={id}
        type='checkbox'
        {...rest}
      />

      {label && (
        <label className='form-check-label' htmlFor={id}>
          <div className={clsx(['cursor-pointer', classNameLabel])} style={{color: '#071437'}}>
            {label}
          </div>
          {desc && <div className='text-gray-600'>{desc}</div>}
        </label>
      )}
    </div>
  )
}

export default Checkbox
