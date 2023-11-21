import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import {ButtonHTMLAttributes, FC, ReactNode} from 'react'

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  className?: string
  classNameIcon?: string
  loading?: boolean
  textLoading?: string
  children?: ReactNode
  iconLeft?: IconProp
  iconRight?: IconProp
}

const Button: FC<Props> = ({
  className = 'btn-primary',
  classNameIcon = '',
  loading,
  textLoading,
  children,
  iconLeft,
  iconRight,
  ...rest
}) => {
  return (
    <button
      style={{
        fontSize: '16px',
        lineHeight: '22px',
      }}
      className={clsx(['btn-flex btn ', className])}
      {...rest}
    >
      {iconLeft && <FontAwesomeIcon icon={iconLeft} className={clsx(['me-2', classNameIcon])} />}
      {loading ? (textLoading ? textLoading : 'Please wait...') : children}
      {iconRight && <FontAwesomeIcon icon={iconRight} className={clsx(['ms-2', classNameIcon])} />}
      {loading && <span className='spinner-border spinner-border-sm align-middle ms-2'></span>}
    </button>
  )
}

export default Button
