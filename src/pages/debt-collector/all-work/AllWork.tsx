import {FC} from 'react'
import ToDoList from '@/components/to-do-list'
import DebtTile from '@/components/debt-title'

const DebtAllWork: FC = () => {
  //fake data
  const data = [
    {
      id: 1,
      loan_no: 'L-A2024-123',
      customer_name: 'Ronaldo',
      address:
        '548, Any Building name, if applicable, 09, 128, Dedok North Avenue 1, 460548, Singapore',
      outstanding_amount: '5000',
      status: 2,
    },
    {
      id: 2,
      loan_no: 'L-A2024-123',
      customer_name: 'Ronaldo',
      address:
        '548, Any Building name, if applicable, 09, 128, Dedok North Avenue 1, 460548, Singapore',
      outstanding_amount: '5000',
      status: 1,
    },
    {
      id: 3,
      loan_no: 'L-A2024-123',
      customer_name: 'Ronaldo',
      address:
        '548, Any Building name, if applicable, 09, 128, Dedok North Avenue 1, 460548, Singapore',
      outstanding_amount: '5000',
      status: 0,
    },
  ]

  return (
    <>
      <DebtTile title='All' />
      <div className='debt-page d-flex flex-column flex-grow-1'>
        <ToDoList data={data} classShared='' />
      </div>
    </>
  )
}

export default DebtAllWork
