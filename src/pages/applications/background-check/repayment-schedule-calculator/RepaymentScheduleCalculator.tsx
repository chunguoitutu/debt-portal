import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import './style.scss'

import {KTIcon} from '@/_metronic/helpers'
import Repayment from './Repayment'

type Props = {
  show: boolean
  handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body
const RepaymentScheduleCalculator = ({show, handleClose}: Props) => {
  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-modal'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div
        style={{
          padding: '30px',
        }}
        className='modal-header p-30px d-flex align-items-center justify-content-between'
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            fontStyle: 'normal',
            lineHeight: '24px',
            textTransform: 'capitalize',
            color: '#071437',
          }}
          className='mb-0px'
        >
          Repayment Schedule Calculator
        </h2>
        <div
          style={{width: '24px', height: '24px'}}
          className='btn btn-sm  btn-icon  btn-active-color-primary'
          onClick={handleClose}
        >
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>
      <Repayment handleClose={handleClose} />
    </Modal>,
    modalsRoot
  )
}
export default RepaymentScheduleCalculator
