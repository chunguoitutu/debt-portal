import {Modal} from 'react-bootstrap'
import moment from 'moment'

import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import {KTIcon} from '@/_metronic/helpers'
import clsx from 'clsx'
import {formatDate} from '@/app/utils'
import {CompanyItem} from '@/app/types'

interface IProps {
  data: CompanyItem
  handleClose: () => void
  handleShowEdit: () => void
  sttTable?: number
}

const CompanyDetails = ({data, handleShowEdit, handleClose, sttTable}: IProps) => {
  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-modal-1000px '
      show={true}
      onHide={handleClose}
      animation={true}
    >
      <div className='modal-header padding-model-header'>
        <h2 className='m-0'>Business Unit Details</h2>
        <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
          <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <div
          style={{maxHeight: 'calc(100vh - 250px)'}}
          className='overflow-x-auto py-30px ps-30px pe-30px w-100'
        >
          <div className='d-flex justify-content-start p-0 m-0 mb-30px '>
            <div className='icons-company-detail p-12px m-0 gap-8 d-flex justify-content-center align-items-center flex-column bg-gray-100'>
              <Icons name={'Home'} />
            </div>
            <div className='ps-24px'>
              <div
                className={clsx([
                  'badge fs-7 fw-semibold',
                  data?.status === 1 ? 'badge-light-success' : 'badge-light-danger',
                ])}
              >
                {data?.status === 1 ? 'Active' : 'Disable'}
              </div>
              <div>
                <h1 className='text-capitalize fs-14 fw-semibold color-company-detail mt-4px mb-0'>
                  Business Unit Name
                </h1>
                <p className='p-0 m-0 fs-16 text-uppercase fw-bold text-gray-900'>
                  {data?.company_name}
                </p>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-start align-items-center p-0 m-0'>
            <KTIcon iconName='phone' className='fs-20' />
            {!!data?.telephone ? (
              <p className='ps-8px pe-0 pt-0 pb-0 m-0 fs-16 text-gray-800 fw-semibold text-lowercase'>
                +65{data?.telephone}
              </p>
            ) : (
              <p className='ps-8px text-capitalize none-company-detail m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                None
              </p>
            )}
          </div>

          <div className='d-flex justify-content-start align-items-center px-0 pt-8px m-0'>
            <KTIcon iconName='sms' className='fs-20' />
            {!!data?.email ? (
              <p className='ps-8px pe-0 pt-0 pb-0 m-0 fs-16 text-gray-800 fw-semibold text-lowercase'>
                {data?.email}
              </p>
            ) : (
              <p className='ps-8px text-capitalize none-company-detail  m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                None
              </p>
            )}
          </div>
          <div className='d-flex justify-content-start align-items-center px-0 pt-8px pb-30px m-0'>
            <KTIcon iconName='geolocation' className='fs-20' />

            {!!data?.address ? (
              <p className='ps-8px pe-0 pt-0 pb-0 m-0 fs-16 text-gray-800 fw-semibold  text-capitalize'>
                {data?.address}
              </p>
            ) : (
              <p className='ps-8px text-capitalize none-company-detail  m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                None
              </p>
            )}
          </div>
          <div className=' d-flex justify-content-between align-items-center p-0 gap-8px'>
            <div className='h-100 wrapper-company-detail d-flex flex-column gap-4 justify-content-center align-items-start'>
              <h1 className='text-capitalize fs-14  fw-semibold color-company-detail m-0 p-0'>
                ID
              </h1>
              <p className='p-0 m-0 fs-16 h-100  text-uppercase fw-semibold text-gray-800'>
                {sttTable}
              </p>
            </div>
            <div className=' h-100 wrapper-company-detail d-flex flex-column gap-4 justify-content-center align-items-start'>
              <h1 className='text-capitalize fs-14  fw-semibold color-company-detail m-0 p-0'>
                Business Unit Code
              </h1>
              <p className='p-0 m-0 h-100 fs-16 text-capitalize fw-semibold text-gray-800'>
                {data?.company_code}
              </p>
            </div>
            <div className='h-100 wrapper-company-detail d-flex flex-column gap-4 justify-content-center align-items-start'>
              <h1 className='text-capitalize fs-14  fw-semibold color-company-detail m-0 p-0'>
                Business Unit UEN
              </h1>
              <p className='p-0  h-100 m-0 fs-16 text-capitalize fw-semibold text-gray-800'>
                {data?.business_uen}
              </p>
            </div>
            <div className='h-100 wrapper-company-detail d-flex flex-column gap-4 justify-content-center align-items-start'>
              <h1 className='text-capitalize fs-14  fw-semibold color-company-detail m-0 p-0'>
                License Number
              </h1>
              <div className='p-0 h-100 m-0 fs-16 text-capitalize fw-semibold text-gray-800'>
                {!!data?.license_no ? (
                  <p className='p-0 h-100 m-0 fs-16 text-capitalize fw-semibold text-gray-800'>
                    {data?.license_no}
                  </p>
                ) : (
                  <p className='text-capitalize none-company-detail  m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                    None
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className=' d-flex justify-content-between align-items-center p-0 gap-8px mt-4'>
            <div className='h-100 wrapper-company-detail d-flex flex-column gap-4 justify-content-center align-items-start'>
              <h1 className='text-capitalize fs-14  fw-semibold color-company-detail m-0 p-0'>
                Contact Person
              </h1>
              {!!data?.contact_person ? (
                <p className='p-0 h-100 m-0 fs-16 text-capitalize fw-semibold text-gray-800'>
                  {data?.contact_person}
                </p>
              ) : (
                <p className='text-capitalize none-company-detail  m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                  None
                </p>
              )}
            </div>

            {/*  */}
            <div className=' h-100 wrapper-company-detail d-flex flex-column gap-4 justify-content-center align-items-start'>
              <h1 className='text-capitalize fs-14  fw-semibold color-company-detail m-0 p-0'>
                Open Date
              </h1>
              <p className='p-0 m-0 h-100 fs-16  fw-semibold text-gray-800'>
                {moment(data?.open_date).format('MMM DD, YYYY')}
              </p>
            </div>

            {/*  */}
            <div className='h-100 wrapper-company-detail d-flex flex-column gap-4 justify-content-center align-items-start'>
              <h1 className='text-capitalize fs-14  fw-semibold color-company-detail m-0 p-0'>
                License Expiry Date
              </h1>
              <p
                className={clsx([
                  'p-0 h-100 m-0 fs-16 text-capitalize fw-semibold text-gray-800',
                  !data?.license_expiry_date && 'none-company-detail font-italic',
                ])}
              >
                {data?.license_expiry_date
                  ? formatDate(data?.license_expiry_date, 'MMM DD, YYYY')
                  : 'None'}
              </p>
            </div>

            <div className='h-100 wrapper-company-detail d-flex flex-column gap-4 justify-content-center align-items-start'>
              <h1 className='text-capitalize fs-14  fw-semibold color-company-detail m-0 p-0'>
                Web Url
              </h1>
              {!!data?.web_url ? (
                <a
                  href={`https://${data.web_url}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='fs-16 fw-semibold text-gray-800 text-hover-primary text-truncate cursor-pointer mw-200px'
                >
                  {data?.web_url}
                </a>
              ) : (
                <p className='text-capitalize none-company-detail m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                  None
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className='d-flex flex-end py-30px ps-30px pe-30px border-top border-gray-200'>
        <Button
          type='reset'
          onClick={() => handleClose()}
          className='btn-lg btn-secondary fs-6 me-8px'
        >
          Cancel
        </Button>
        <Button className='btn-lg btn-primary fs-6' type='submit' onClick={handleShowEdit}>
          Edit Business Unit
        </Button>
      </div>
    </Modal>
  )
}
export default CompanyDetails
