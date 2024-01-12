import request from '@/app/axios'
import {swalConfirm} from '@/app/swal-notification'
import {convertErrorMessageResponse} from '@/app/utils'
import Button from '@/components/button/Button'
import Modal from '@/components/modal/Modal'
import {FC, useState} from 'react'
import MLCB from './MLCB'

type Props = {
  onClose: () => void
  toolsCheckCount: {
    MLCB: number
    Cross: number
    validatePhone: number
  }
  setToolsCheckCount: any
}

const MLCBReport: FC<Props> = ({onClose, setToolsCheckCount, toolsCheckCount}) => {
  return (
    <Modal dialogClassName='mw-800px' show={true} onClose={onClose} title='Validation MLCB'>
      <MLCB
        toolsCheckCount={toolsCheckCount}
        setToolsCheckCount={setToolsCheckCount}
        onClose={onClose}
      />
    </Modal>
  )
}

export default MLCBReport
