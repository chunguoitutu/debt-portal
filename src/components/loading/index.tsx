import {Spinner} from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='d-flex flex-column align-items-center gap-24px'>
      <Spinner className='w-40px h-40px' animation='border' variant='primary' />
      <span className='fs-6 fw-semibold'>Loading... Please wait</span>
    </div>
  )
}

export default Loading
