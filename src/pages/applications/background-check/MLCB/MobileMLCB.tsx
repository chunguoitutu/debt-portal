import {KTIcon} from '@/_metronic/helpers'
import MLCB from './MLCB'

type Props = {
  handleShow: () => void
  toolsCheckCount: {
    MLCB: number
    Cross: number
    validatePhone: number
  }
  setToolsCheckCount: any
}

const MobileMLCB = ({handleShow, setToolsCheckCount, toolsCheckCount}: Props) => {
  return (
    <div className='w-100'>
      <div
        className=' p-30px d-flex justify-content-between align-items-center'
        style={{
          borderBottom: '1px solid #F1F1F2',
          height: '98px',
        }}
      >
        <h5 className='font-bold fs-20 text-gray-900 m-0'>Validation MLCB</h5>
        <button
          type='button'
          className='btn btn-sm btn-icon explore-btn-dismiss '
          onClick={handleShow}
        >
          <KTIcon iconName='cross' className='fs-2' />
        </button>
      </div>
      <div style={{maxHeight: 'calc(100vh - 100px)', overflowY: 'auto'}}>
        <MLCB
          toolsCheckCount={toolsCheckCount}
          setToolsCheckCount={setToolsCheckCount}
          onClose={handleShow}
        />
      </div>
    </div>
  )
}

export default MobileMLCB
