import clsx from 'clsx'
import {FC} from 'react'

type Props = {
  required?: boolean
  htmlFor?: string
  label?: string
  className?: string
}

const Label: FC<Props> = ({htmlFor, label, required, className}) => {
  return (
    <label className={clsx('cursor-pointer', className)} htmlFor={htmlFor}>
      <span
        className={clsx([
          'text-gray-900 fs-16 text-capitalize fw-semibold',
          required && 'required',
        ])}
      >
        {label}
      </span>
    </label>
  )
}

export default Label
