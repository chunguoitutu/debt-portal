import {FC} from 'react'

type Props = {
  message?: string
  className?: string
}

const ErrorMessage: FC<Props> = ({message, className = ''}) => {
  return (
    <div className='fv-plugins-message-container'>
      <span className={`fv-help-block ${className}`}>{message}</span>
    </div>
  )
}

export default ErrorMessage
