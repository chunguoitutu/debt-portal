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
    <label
      className={clsx(
        'cursor-pointer text-gray-900 text-capitalize fw-semibold',
        required && 'required',
        className
      )}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  )
}

export default Label
