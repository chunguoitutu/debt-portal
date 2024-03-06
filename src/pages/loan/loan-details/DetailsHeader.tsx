import BackIcon from '@/app/images/back.svg?react'
import {WithChildren} from '@/app/types'
import {FC} from 'react'

type Props = {
  onBack: () => void
  title?: string
} & WithChildren

export const DetailsHeader: FC<Props> = ({title, children, onBack}) => {
  return (
    <div className='details-header d-flex align-items-center gap-16px p-12px border-bottom border-gray-300'>
      <div className='cursor-pointer text-hover-primary flex-shrink-0' onClick={onBack}>
        <BackIcon />
      </div>

      {title && <h3 className='m-0 fs-16 fw-bold'>{title}</h3>}

      {children}
    </div>
  )
}
