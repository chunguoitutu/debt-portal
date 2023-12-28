import {FC} from 'react'

type Props = {
  message?: string
  className?: string
  containerRef?: React.RefObject<HTMLDivElement> | null
}

const ErrorMessage: FC<Props> = ({message, className = '', containerRef}) => {
  return (
    <div className='fv-plugins-message-container' ref={containerRef}>
      <span className={`fv-help-block ${className}`}>{message}</span>
    </div>
  )
}

export default ErrorMessage
