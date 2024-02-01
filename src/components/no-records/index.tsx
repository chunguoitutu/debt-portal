import {FC} from 'react'
import noRecordImg from '@/app/images/no-record.jpg'

type Props = {
  text?: string
}

const NoRecord: FC<Props> = ({text}) => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <img src={noRecordImg} alt='no record' className='w-200px h-200px object-fit-cover mw-100' />
      <span className='fs-14 fw-semibold text-gray-600'>{text || 'No matching records found'}</span>
    </div>
  )
}

export default NoRecord
