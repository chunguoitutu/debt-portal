import {Modal} from 'react-bootstrap'
import {KTIcon} from '../../../../_metronic/helpers'
import moment from 'moment'
import {showLable} from '../../../components/inputs/showLable'
import {COMPANY_TABLE_CONFIG} from './CompanyTableConfig'

interface IProps {
  show: boolean
  data: any
  handleClose: () => void
  id: Number
}

const CompanyDetail = ({data = {}, handleClose, show, id}: IProps) => {
  const {rows} = COMPANY_TABLE_CONFIG

  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      animation={true}
    >
      <div className='modal-header'>
        <h2>Company</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-center '>
        <div
          style={{maxHeight: 'calc(100vh - 200px)', maxWidth: '900px', overflowY: 'auto'}}
          className='card-body row gx-10 p-30px'
        >
          {rows.map((row, index) => (
            <div key={row.key} style={{flex: '0 0 50%'}}>
              {row.key === 'open_date' || row.key === 'id' || row.key === 'status' ? (
                <>
                  {row.key === 'open_date' && (
                    <div key={index}>
                      {showLable({
                        title: row.name,
                        value: moment(data[row.key]).format('YYYY-MM-DD'),
                      })}
                    </div>
                  )}
                  {row.key === 'status' && (
                    <div key={index}>
                      {showLable({
                        title: row.name,
                        value: Number(data[row.key]) === 0 ? 'Disabled' : 'Active',
                      })}
                    </div>
                  )}
                  {row.key === 'id' && (
                    <div key={index}>
                      {showLable({
                        title: row.name,
                        value: JSON.stringify(id),
                      })}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {row.key !== 'action' && (
                    <div key={index}>
                      {showLable({
                        title: row.name,
                        value: data[row.key],
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
export default CompanyDetail
