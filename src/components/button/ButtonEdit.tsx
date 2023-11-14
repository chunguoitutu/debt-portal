import {ButtonHTMLAttributes, ForwardedRef, forwardRef} from 'react'
import {KTIcon} from '../../_metronic/helpers'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonEdit = ({...rest}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
      {...rest}
    >
      <KTIcon iconName='pencil' className='fs-3' />
    </button>
  )
}

export default forwardRef(ButtonEdit)
