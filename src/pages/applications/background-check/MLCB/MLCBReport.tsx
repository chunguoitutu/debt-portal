import request from '@/app/axios'
import {swalConfirm} from '@/app/swal-notification'
import {convertErrorMessageResponse} from '@/app/utils'
import Button from '@/components/button/Button'
import Modal from '@/components/modal/Modal'
import {FC, useState} from 'react'
import MLCB from './MLCB'

type Props = {
  onClose: () => void
}

const MLCBReport: FC<Props> = ({onClose}) => {
  return (
    <Modal dialogClassName='mw-800px' show={true} onClose={onClose} title='Validation MLCB'>
      <MLCB onClose={onClose} />
    </Modal>
  )
}

export default MLCBReport
