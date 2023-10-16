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
        <div className='fv-plugins-message-container'>
          <span className={`fv-help-block ${className}`}>{message}</span>
        </div>
      )}
    </>
  )
}

export default ErrorMessageFormik
