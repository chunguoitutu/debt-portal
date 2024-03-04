import {BadgeProps} from '@/app/types'
import {FC, useMemo} from 'react'

const statusClass = {
  primary: 'badge-light-primary',
  success: 'badge-light-success',
  warning: 'badge-light-warning',
  danger: 'badge-light-danger',
  info: 'badge-light-primary',
}

const Badge: FC<BadgeProps> = ({color, title}) => {
  const statusClassName = useMemo(() => statusClass[color], [color])

  return <span className={`badge fs-7 fw-semibold ${statusClassName}`}>{title}</span>
}

export default Badge
