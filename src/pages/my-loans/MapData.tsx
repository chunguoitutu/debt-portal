import {formatDate, formatMoney} from '@/app/utils'
import Icons from '@/components/icons'
import {Link} from 'react-router-dom'

type Props = {
  data: any[]
}

const MapData = ({data}: Props) => {
  return (
    <div className='row gy-20px'>
      {data.map((el, i) => {
        return (
          <div key={i} className='col-12 col-xl-4 col-sm-6'>
            <div className='card w-100 loans-id-my-loans-portal cursor-pointer p-20px'>
              <div className='d-flex justify-content-between'>
                <div className=''>
                  <h1 className='fs-13 fw-normal test-gray-4b5675-style mb-4px p-0'> Loan ID</h1>
                  <p className='fs-16 fw-bold text-gray-900 mb-16px p-0'>{el?.loan_no}</p>
                </div>
                <div className='position-relative'>
                  <div className='position-absolute icons-active-my-tasks-portal'>
                    <Icons
                      name={Number(el.active) === 1 ? 'ActiveMyTasks' : 'ActiveMyTasksBlack'}
                    />
                  </div>
                  <p className='position-absolute active-my-tasks-portal-absolute'>Active</p>
                </div>
              </div>
              <div className=''>
                <h2 className='fs-13 fw-normal test-gray-4b5675-style mb-4px p-0'>Loan Amount</h2>
                <p className='fs-16 fw-bold text-gray-900 mb-20px p-0'>
                  {formatMoney(Number(el?.loan_amount))}
                </p>
                <div className='d-flex flex-row flex-md-row gap-8px gap-md-0 justify-content-between align-items-end align-items-md-center '>
                  <div className='d-flex flex-column flex-md-row gap-8px gap-xl-12px justify-content-center align-items-start align-items-md-center'>
                    <div className='d-flex justify-content-center ps-0 ps-md-0  align-items-center  gap-8px'>
                      <Icons name={'DatePortal'} />
                      <p className=' m-0 p-0 fs-13 fw-normal test-gray-900'>
                        {formatDate(el?.approval_date, 'DD MMM, YYYY')}
                      </p>
                    </div>
                    <div className='d-flex justify-content-center align-items-center gap-8px'>
                      <Icons name={'TimeMyTasks'} />
                      <p className=' m-0 p-0 fs-13 fw-normal test-gray-900'>
                        {`${el?.loan_terms} ${
                          [1, 0].includes(Number(el?.loan_terms)) ? 'month' : 'months'
                        }`}
                      </p>
                    </div>
                  </div>
                  <Link
                    className='d-flex justify-content-center wrapper-link-details-my-task ps-12px ps-md-0 align-items-center gap-8px'
                    to={'/my-loans/details/1'}
                  >
                    <p className='link-details-my-task p-0 m-0 fs-13'>Details</p>{' '}
                    <Icons name={'ArrowLeft'} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MapData
