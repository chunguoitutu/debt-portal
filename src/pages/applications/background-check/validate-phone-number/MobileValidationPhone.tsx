import {KTIcon} from '@/_metronic/helpers'
import ValidationPhoneNumber from './validationPhoneNumber'

type Props = {
  handleShow: () => void
}

const MobileValidationPhoneNumber = ({handleShow}: Props) => {
  return (
    <div className='w-100'>
      <div
        className=' p-30px d-flex justify-content-between align-items-center'
        style={{
          borderBottom: '1px solid #F1F1F2',
          height: '98px',
        }}
      >
        <h5 className='font-bold fs-20 text-gray-900 m-0'>Validation Phone Number</h5>
        <button
          type='button'
          className='btn btn-sm btn-icon explore-btn-dismiss '
          onClick={handleShow}
        >
          <KTIcon iconName='cross' className='fs-2' />
        </button>
      </div>
      <div style={{maxHeight: 'calc(100vh - 100px)', overflowY: 'auto'}}>
        <ValidationPhoneNumber onClose={handleShow} />
      </div>
    </div>
  )
}

export default MobileValidationPhoneNumber
