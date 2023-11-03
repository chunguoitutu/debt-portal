import {Modal} from 'react-bootstrap'

import {KTIcon} from '../../../../../_metronic/helpers'
import Table from '../../../../components/table/Table'
import {TABLE_LOOKUP_CUSTOMER} from '../config'
import Button from '../../../../components/button/Button'
import {useState} from 'react'

type Props = {
  show?: boolean
  onClose: () => void
}

const LookupCustomer = ({show, onClose}: Props) => {
  const [showInput, setShowInput] = useState<boolean>(false)

  function showInputFilter() {
    setShowInput(!showInput)
  }
  console.log({
    ...TABLE_LOOKUP_CUSTOMER,
    rows: TABLE_LOOKUP_CUSTOMER.rows.map((row) => ({...row, isShowInput: showInput})),
  })
  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      show={show}
      onHide={onClose}
      //  onEntered={loadStepper}
      backdrop={true}
    >
      <>
        <div className='modal-header'>
          <h2>Lookup Customer</h2>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={() => onClose()}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <div className='flex-row-fluid' style={{padding: 23}}>
          <div className='d-flex flex-row'>
            <div className='d-flex align-items-center position-relative my-1 flex-grow-1 mw-1000px'>
              <i className='ki-duotone ki-magnifier fs-1 position-absolute ms-6'>
                <span className='path1'></span>
                <span className='path2'></span>
              </i>
              <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid ps-14 w-100'
                placeholder='Search Customer'
              />
            </div>
            <div className='d-flex flex-end'>
              <Button
                onClick={showInputFilter}
                className='btn-secondary align-self-center m-2 fs-6'
                style={{color: '#3E97FF', background: ''}}
                disabled={false}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                  fill='none'
                  style={{marginRight: '8px'}}
                >
                  <path
                    d='M2.33333 1.5H15.6667C15.8877 1.5 16.0996 1.5878 16.2559 1.74408C16.4122 1.90036 16.5 2.11232 16.5 2.33333V3.655C16.5 3.876 16.4121 4.08792 16.2558 4.24417L10.91 9.58917C10.754 9.74555 10.6665 9.95746 10.6667 10.1783V15.4325C10.6667 15.5592 10.6378 15.6842 10.5822 15.798C10.5267 15.9118 10.4459 16.0115 10.346 16.0894C10.2461 16.1674 10.1298 16.2215 10.0059 16.2477C9.88198 16.274 9.75371 16.2716 9.63083 16.2408L7.96417 15.8242C7.78396 15.779 7.62401 15.675 7.50971 15.5285C7.39542 15.3821 7.33334 15.2016 7.33333 15.0158V10.1783C7.33329 9.95734 7.24546 9.74541 7.08917 9.58917L1.74333 4.24417C1.58735 4.08779 1.49983 3.87588 1.5 3.655V2.33333C1.5 2.11232 1.5878 1.90036 1.74408 1.74408C1.90036 1.5878 2.11232 1.5 2.33333 1.5Z'
                    stroke='#3E97FF'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Filter
              </Button>
            </div>
          </div>

          <div className='mt-6'>
            <Table
              config={{
                ...TABLE_LOOKUP_CUSTOMER,
                rows: TABLE_LOOKUP_CUSTOMER.rows.map((row) => ({...row, isShowInput: showInput})),
              }}
              handleAddNew={() => {}}
              isShowFilter={true}
            />
          </div>
          <div className='d-flex flex-end mt-10 full'>
            <Button
              onClick={onClose}
              className='btn-secondary align-self-center me-3'
              disabled={false}
            >
              Cancel
            </Button>
            <Button type='submit' loading={false} disabled={false} onClick={() => {}}>
              Lookup
            </Button>
          </div>
        </div>
      </>
    </Modal>
  )
}

export default LookupCustomer



