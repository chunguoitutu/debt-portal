import Modal from '@/components/modal/Modal'
import {Dispatch, FC, SetStateAction} from 'react'
import ValidationPhoneNumber from './ValidationPhoneNumber'

type Props = {
  onClose: () => void
  payload: string | number
  toolsCheckCount?: {
    MLCB: number
    Cross: number
    validatePhone: number
  }
  setToolsCheckCount?: Dispatch<SetStateAction<any>>
}

const PopupValidationPhoneNumber: FC<Props> = ({
  onClose,
  payload,
  setToolsCheckCount,
  toolsCheckCount,
}) => {
  return (
    <Modal dialogClassName='mw-800px' show={true} onClose={onClose} title='Validation Phone Number'>
      <ValidationPhoneNumber
        toolsCheckCount={
          toolsCheckCount || {
            MLCB: 0,
            Cross: 0,
            validatePhone: 0,
          }
        }
        setToolsCheckCount={setToolsCheckCount}
        onClose={onClose}
        payload={payload}
      />
    </Modal>
  )
}

export default PopupValidationPhoneNumber
