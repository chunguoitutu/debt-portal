import {Modal} from 'react-bootstrap'
import {KTIcon} from '../../../../_metronic/helpers'
import moment from 'moment'
import {useEffect, useState} from 'react'
import request from '../../../axios'
interface IProps {
  show: boolean
  data: any
  handleClose: () => void
  id: Number
}
export const BRANCH_TABLE_CONFIG_DETAIL = {
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'business_uen',
      name: 'Business Uen',
    },
    {
      key: 'branch_name',
      name: 'Branch Name',
    },
    {
      key: 'telephone',
      name: 'Telephone',
    },
    {
      key: 'email',
      name: 'Email',
    },
    {
      key: 'open_date',
      name: 'Open date',
    },
    {
      key: 'company_name',
      name: 'Company Name',
    },
    {
      key: 'company_code',
      name: 'Company Code',
    },
    {
      key: 'website',
      name: 'Website',
    },
    {
      key: 'status',
      name: 'Status',
    },
  ],
}

const ADDRESS_TABLE_CONFIG_DETAIL = {
  rows: [
    {
      key: 'street_1',
      name: 'Street 1',
    },
    {
      key: 'street_2',
      name: 'Street 2',
    },
    {
      key: 'city',
      name: 'city',
    },
    {
      key: 'state',
      name: 'State',
    },
    {
      key: 'zipcode',
      name: 'Zip Code',
    },
    {
      key: 'country',
      name: 'Country',
    },
  ],
}

const BranchDetail = ({data = {}, handleClose, show, id}: IProps) => {
  const [dataAdress, setDataAdress] = useState<any>({})
  const [dataCompanies, setDataCompany] = useState<any>({})

  useEffect(() => {
    request
      .get(`config/branch/id/${data?.id}/address/${data?.address_id}`)
      .then((response) => {
        setDataAdress(response.data.data)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
    request
      .get(`config/branch/id/${data?.id}/company/${data?.company_id}`)
      .then((response) => {
        setDataCompany(response.data.data)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
        <h2>Branch</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>
      <div style={{maxHeight: '500px', overflowY: 'auto'}} className='py-10 px-10'>
        {BRANCH_TABLE_CONFIG_DETAIL.rows.map((row, index) => (
          <>
            {row.key === 'open_date' || row.key === 'id' || row.key === 'status' ? (
              <>
                {row.key === 'open_date' && (
                  <div
                    key={index}
                    className='d-flex  content-center item-center gap-5 fw-bold fs-6'
                  >
                    <span
                      style={{width: '150px', paddingBottom: '13px'}}
                      className='card-label fw-bold fs-3   flex'
                    >
                      {row.name}:
                    </span>
                    <p className='text-gray-600 card-label fw-bold fs-3  flex'>
                      {moment(dataCompanies[row.key]).format('YYYY-MM-DD')}
                    </p>
                  </div>
                )}
                {row.key === 'status' && (
                  <div
                    key={index}
                    className='d-flex  content-center item-center gap-5 fw-bold fs-6'
                  >
                    <span
                      style={{width: '150px', paddingBottom: '13px'}}
                      className='card-label fw-bold fs-3   flex'
                    >
                      {row.name}:
                    </span>
                    <p className='text-gray-600 card-label fw-bold fs-3  flex'>
                      {Number(dataCompanies[row.key]) === 0 ? 'Disabled' : 'Active'}
                    </p>
                  </div>
                )}
                {row.key === 'id' && (
                  <div
                    key={index}
                    className='d-flex  content-center item-center gap-5 fw-bold fs-6'
                  >
                    <span
                      style={{width: '150px', paddingBottom: '13px'}}
                      className='card-label fw-bold fs-3   flex'
                    >
                      {row.name}:
                    </span>
                    <p className='text-gray-600 card-label fw-bold fs-3  flex'>
                      {JSON.stringify(id)}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {row.key !== 'action' && row.key !== 'address_id' && row.key !== 'company_id' ? (
                  <div
                    key={index}
                    className='d-flex  content-center item-center gap-5 fw-bold fs-6'
                  >
                    <span
                      style={{width: '150px', paddingBottom: '13px'}}
                      className='card-label fw-bold fs-3   flex'
                    >
                      {row.name}:
                    </span>
                    <p className='text-gray-600 card-label fw-bold fs-3  flex'>
                      {dataCompanies[row.key]}
                    </p>
                  </div>
                ) : null}
              </>
            )}
          </>
        ))}
        {ADDRESS_TABLE_CONFIG_DETAIL.rows.map((d: any) => (
          <div className='d-flex  content-center item-center gap-5 fw-bold fs-6'>
            <span
              style={{width: '150px', paddingBottom: '13px'}}
              className='card-label fw-bold fs-3    flex'
            >
              {d.name}:
            </span>
            <p className='text-gray-600 card-label fw-bold fs-3  flex'> {dataAdress[d.key]}</p>
          </div>
        ))}
      </div>
    </Modal>
  )
}
export default BranchDetail
