import {Modal as ModalBootstrap} from 'react-bootstrap'
import {KTIcon} from '../../../_metronic/helpers'
import {FC, ReactNode} from 'react'

interface Props {
  show: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

const Modal: FC<Props> = ({show, title, onClose, children}) => {
  return (
    <ModalBootstrap
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={onClose}
      animation
    >
      <div className='modal-header d-flex align-items-center gap-3'>
        <h2 className='text-truncate'>{title}</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={onClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>

      <div
        className='modal-body py-lg-10 px-lg-10 overflow-auto max-height'
        style={{
          maxHeight: 'calc(100vh - 200px)',
          overflow: 'auto',
        }}
      >
        {children}
      </div>
    </ModalBootstrap>
  )
}

export default Modal
