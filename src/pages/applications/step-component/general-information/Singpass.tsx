import {useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import './style.scss'

type Props = {
  show?: boolean
  onClose: () => void
}

const Singpass = ({show, onClose}: Props) => {
  function hehe() {
    window.open(
      'http://localhost:3001/singPass.html',
      'sharer',
      'toolbar=0,status=0,width=900,height=600,align=center,menubar=no,location=no'
    )
    return <div>{hehe()}</div>
  }
  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      show={show}
      onHide={onClose}
      backdrop={true}
      scrollable={true}
    >
      {hehe()}
    </Modal>
  )
}

export default Singpass
