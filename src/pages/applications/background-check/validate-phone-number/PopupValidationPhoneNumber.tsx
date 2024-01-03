import Modal from '@/components/modal/Modal'
import {FC} from 'react'
import ValidationPhoneNumber from './ValidationPhoneNumber'

type Props = {
  onClose: () => void
  payload: string | number
}

const PopupValidationPhoneNumber: FC<Props> = ({onClose, payload}) => {
  return (
    <Modal dialogClassName='mw-800px' show={true} onClose={onClose} title='Validation Phone Number'>
      <ValidationPhoneNumber onClose={onClose} payload={payload} />
    </Modal>
  )
}

export default PopupValidationPhoneNumber
