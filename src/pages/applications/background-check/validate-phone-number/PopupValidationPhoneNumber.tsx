import Modal from '@/components/modal/Modal'
import {FC} from 'react'
import ValidationPhoneNumber from './validationPhoneNumber'

type Props = {
  onClose: () => void
}

const PopupValidationPhoneNumber: FC<Props> = ({onClose}) => {
  return (
    <Modal dialogClassName='mw-800px' show={true} onClose={onClose} title='Validation Phone Number'>
      <ValidationPhoneNumber onClose={onClose} />
    </Modal>
  )
}

export default PopupValidationPhoneNumber
