import {FC} from 'react'
import Badge from '@/components/badge/Badge'
import {formatMoney} from '@/app/utils'
import Icons from '../icons'

interface LoanData {
  id?: any
  loan_no: any
  customer_name: any
  address: any
  outstanding_amount: any
  status: any
}

interface Props {
  data: LoanData[] | LoanData
  classShared?: string
}

const ToDoList: FC<Props> = ({data, classShared, ...rest}) => {
  const dataList = Array.isArray(data) ? data : [data]

  return (
    <>
      {dataList.map((item, index) => (
        <div
          key={index}
          className={`card container mb-12px p-12px ${classShared}`}
          {...rest}
          style={{borderRadius: '0px'}}
        >
          <div
            className={`d-flex flex-row gap-8px ${
              item.status === 1
                ? 'text-primary'
                : item.status === 2
                ? 'text-danger'
                : 'text-gray-600'
            }`}
          >
            <Icons name={'Tags'} />

            <div className='d-flex flex-row gap-8px'>
              <div className='fs-16px fw-medium text-gray-900'>{item.loan_no}</div>
              <div>
                {item.status === 2 ? <Badge color='danger' title='Unsuccess Collection' /> : <></>}
              </div>
            </div>
          </div>
          <div
            className='d-flex flex-column ps-28px gap-8px pt-12px pb-12px'
            style={{borderBottom: '1px dashed #DBDFE9'}}
          >
            <div className='d-flex flex-column gap-4px'>
              <div className='fw-normal fs-13 text-gray-600'>Customer Name</div>
              <div className='fw-normal fs-14 text-gray-900'>{item.customer_name}</div>
            </div>
            <div className='d-flex flex-column gap-4px'>
              <div className='fw-normal fs-13 text-gray-600'>Address</div>
              <div className='fw-normal fs-14 text-gray-900'>{item.address}</div>
            </div>
          </div>
          <div className='d-flex flex-row pt-12px pe-0 pb-0 ps-24px align-items-center justify-content-between'>
            <div className='fs-13 fw-normal text-gray-900'>Total Outstanding Amount</div>
            <div className='fs-16 fw-bold text-gray-900'>
              {formatMoney(item.outstanding_amount)}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ToDoList
