import {Modal as ModalBootstrap} from 'react-bootstrap'
import {FC, ReactNode} from 'react'
import {KTIcon} from '../../_metronic/helpers'
import clsx from 'clsx'

interface Props {
  show: boolean
  title: string
  children: ReactNode
  className?: string
  dialogClassName?: string
  onClose: () => void
}

const Modal: FC<Props> = ({show, title, className = '', children, dialogClassName, onClose}) => {
  return (
    <ModalBootstrap
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName={clsx([
        'modal-dialog modal-dialog-centered',
        dialogClassName ? dialogClassName : 'mw-1000px',
      ])}
      show={show}
      onHide={onClose}
      animation
    >
      <div
        style={{
          padding: '30px 25px 30px 30px',
        }}
        className='modal-header d-flex align-items-center gap-3'
      >
        <h2 className='text-truncate m-0'>{title}</h2>

        <div className='cursor-pointer p-0 m-0' onClick={onClose}>
          <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
        </div>
      </div>

      <div
        className={`modal-body p-0
         overflow-y-auto ${className}`}
        style={{
          maxHeight: 'calc(100vh - 200px)',
        }}
      >
        {children}
      </div>
    </ModalBootstrap>
  )
}

export default Modal
