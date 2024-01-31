import {Dispatch} from 'react'
import StatusMyTasks from './StatusMyTask'

type Props = {
  filter: number[]
  setFilter: Dispatch<any | null>
}

const HeaderMyTask = ({filter, setFilter}: Props) => {
  return (
    <div className='card'>
      <div className='p-20px  border-b-1px'>
        <h1 className='fs-20 fw-bold text-gray-900 p-0 mb-8px'>All Active Loans</h1>
        <p className='fs-14 text-gray-400 fw-normal p-0 m-0'>{`You have ${1} active ${
          [1, 0].includes(1) ? 'loan' : 'loans'
        } `}</p>
      </div>
      <div className='p-20px flex-column flex-md-row d-flex justify-content-between align-items-md-center '>
        <div className='d-flex  justify-content-start h-100 align-items-center gap-16px'>
          <h1 className='fw-fw-semibold fs-14 text-gray-600 m-0 p-0'>Filter:</h1>
          <StatusMyTasks
            value={filter}
            onChange={(e) => {
              console.log(e?.target?.value)
              if (!filter.includes(Number(e?.target?.value))) {
                setFilter([...filter, Number(e?.target?.value)])
              } else {
                const newFilter = filter.filter((el) => Number(el) !== Number(e?.target?.value))
                setFilter(newFilter)
              }
            }}
          />
        </div>
        <div className='d-flex flex-column flex-md-row justify-content-start mt-20px mt-md-0 align-items-start gap-16px'>
          <div className='d-flex align-items-center justify-content-start gap-8px'>
            <div className='bg-primary w-10px h-10px flex-shrink-0 rounded-circle'></div>
            <span className='fs-14 fw-semibold text-gray-600'>Outstanding Loan</span>
          </div>

          <div className='d-flex align-items-center gap-8px'>
            <div
              style={{
                backgroundColor: '#071437',
              }}
              className=' w-10px h-10px flex-shrink-0 rounded-circle'
            ></div>
            <span className='fs-14 fw-semibold text-gray-600'>Not Paid Yet</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderMyTask
