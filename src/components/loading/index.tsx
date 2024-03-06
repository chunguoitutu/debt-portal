import {FC} from 'react'
import {Spinner} from 'react-bootstrap'

type Props = {
  showText?: boolean
  size?: string
}
const Loading: FC<Props> = ({showText = true, size = '40px'}) => {
  return (
    <div className='d-flex flex-column align-items-center gap-24px'>
      <Spinner className={`w-${size} h-${size}`} animation='border' variant='primary' />
      {showText && <span className='fs-6 fw-semibold'>Loading... Please wait</span>}
    </div>
  )
}

export default Loading
