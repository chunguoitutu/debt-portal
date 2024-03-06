import {WithChildren} from '@/app/types'
import clsx from 'clsx'
import {FC} from 'react'
import './style.scss'

type Props = {
  className?: string
  type?: 'primary' | 'secondary' | 'danger'
} & WithChildren

const Alert: FC<Props> = ({className, type = 'primary', children}) => {
  return <div className={clsx(['alert-custom', className, type])}>{children}</div>
}

export default Alert
