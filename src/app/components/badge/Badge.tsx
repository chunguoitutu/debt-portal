import {FC, useMemo} from 'react'

interface Props {
  color: 'primary' | 'success' | 'warning' | 'danger'
  title: string
}

const statusClass = {
  primary: 'badge-light-primary',
  success: 'badge-light-success',
  warning: 'badge-light-warning',
  danger: 'badge-light-danger',
}

const Badge: FC<Props> = ({color, title}) => {
  const statusClassName = useMemo(() => statusClass[color], [color])

  return <span className={`badge fs-7 fw-semibold ${statusClassName}`}>{title}</span>
}

export default Badge
