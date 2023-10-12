import {FC} from 'react'

type Props = {
  shouldShowMessage?: boolean
  message?: string
  className?: string
}

const ErrorMessageFormik: FC<Props> = ({shouldShowMessage = false, message, className = ''}) => {
  return (
    <>
      {shouldShowMessage && (
        <span className={`d-inline-block text-danger ${className}`}>{message}</span>
      )}
    </>
  )
}

export default ErrorMessageFormik
