import {FC, useEffect, useRef} from 'react'
import './style.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {formatMoney} from '@/app/utils'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

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

  const navigate = useNavigate()

  function goToLoanDetails(id: number) {
    Cookies.set('lastViewLoanId', id.toString())
    navigate(`/debt/loan-details/${id}`)
  }

  const lastView = +Cookies.get('lastViewLoanId') || 0

  const ref = useRef<HTMLDivElement>(null)

  console.log(ref.current)

  useEffect(() => {
    if (!lastView) return

    setTimeout(() => {
      ref.current.scrollIntoView({
        behavior: 'smooth',
      })
    }, 300)
  }, [lastView])
  return (
    <>
      {dataList.map((item, index) => (
        <div
          key={index}
          className={`card container p-4px mh-100px list-statistical ${classShared}`}
          style={{backgroundColor: '#f9f9f9', boxShadow: 'unset'}}
          {...rest}
          onClick={() => goToLoanDetails(item.id)}
          ref={lastView === item.id ? ref : (undefined as any)}
        >
          <div className='d-flex flex-row gap-12px'>
            <div className='h-100 square-id'>
              <div className='h-100 d-flex align-items-center justify-content-center fs-15 text-gray-900 fw-semibold '>
                <span className='text-gray-600'>#</span>
                {item.id}
              </div>
            </div>
            <div className='p-8px ps-4px cursor-pointer' style={{width: '86%'}}>
              <div className='d-flex flex-row align-items-center justify-content-between haithegioi pb-4px'>
                <div className='fs-15 fw-semibold text-gray-900'>{item.loan_no}</div>
                <div className='p-5px'>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
              <div className='d-flex gap-4px flex-column'>
                <div className='d-flex flex-row align-items-center justify-content-between pt-4px'>
                  <div className='fs-13 fw-normal text-gray-600'>Customer Name</div>
                  <div className='fs-13 fw-semibold text-252f4a'>{item.customer_name}</div>
                </div>
                <div className='d-flex flex-row align-items-center justify-content-between '>
                  <div className='fs-13 fw-normal text-gray-600'>Total Outstanding</div>
                  <div className='fs-13 fw-semibold text-252f4a'>
                    {formatMoney(item.total_outstanding)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ListStatistical
