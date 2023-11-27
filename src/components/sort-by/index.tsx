import {OrderBy} from '@/app/types'
import {faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import {FC} from 'react'

type Props = {
  orderBy?: OrderBy
  isActive?: boolean
}

const SortBy: FC<Props> = ({orderBy, isActive = false}) => {
  return (
    <div
      className={clsx([
        'sort-by-icon d-inline-flex flex-column justify-content-center ms-16px',
        isActive && orderBy,
      ])}
    >
      <FontAwesomeIcon icon={faSortUp} className='d-inline-block up-icon' />
      <FontAwesomeIcon icon={faSortDown} className='d-inline-block down-icon' />
    </div>
  )
}

export default SortBy
