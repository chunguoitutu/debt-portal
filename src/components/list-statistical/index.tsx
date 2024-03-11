import {FC} from 'react'
import './style.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {formatMoney} from '@/app/utils'
import {Link} from 'react-router-dom'

interface LoanData {
  id?: any
  loan_no: any
  customer_name: any
  total_outstanding: any
  status: any
}

interface Props {
  data: LoanData[] | LoanData
  classShared?: string
}

const ListStatistical: FC<Props> = ({data, classShared, ...rest}) => {
  const dataList = Array.isArray(data) ? data : [data]
  return (
    <>
      {dataList.map((item, index) => (
        <Link
          key={index}
          className={`card container p-4px h-100 list-statistical ${classShared}`}
          style={{backgroundColor: '#f9f9f9', boxShadow: 'unset'}}
          {...rest}
          to={`/debt/loan-details/${Math.ceil(Math.random() * 3)}`}
        >
          <div className='d-flex flex-row gap-12px'>
            <div className='p-8px ps-4px cursor-pointer w-100'>
              <div className='d-flex flex-row align-items-center justify-content-between border-bottom-header pb-8px'>
                <div className='d-flex flex-row gap-12px'>
                  <div className='h-100 square-id'>
                    <div className='h-100 d-flex align-items-center justify-content-center fs-15 text-gray-900 fw-semibold p-4px'>
                      <span className='text-gray-600'>#</span>
                      {item.id}
                    </div>
                  </div>
                  <div className='fs-15 fw-semibold text-gray-900 align-self-center'>
                    {item.loan_no}
                  </div>
                </div>
                <div className='p-5px'>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
              <div className='d-flex gap-4px flex-column'>
                <div className='d-flex flex-row align-items-center justify-content-between pt-4px'>
                  <div className='fs-13 fw-normal text-gray-600'>Customer Name</div>
                  <div className='fs-13 fw-semibold text-252f4a text-end'>{item.customer_name}</div>
                </div>
                <div className='d-flex flex-row align-items-center justify-content-between'>
                  <div className='fs-13 fw-normal text-gray-600'>Total Outstanding</div>
                  <div className='fs-13 fw-semibold text-252f4a text-end'>
                    {formatMoney(item.total_outstanding)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default ListStatistical
