import {FC} from 'react'
import './style.scss'

const DebtPage: FC = () => {
  return (
    <div className='debt-page d-flex flex-column flex-grow-1'>
      <nav className='debt__menu mt-auto bg-black'>
        <ul className='debt__menu-list d-flex list-style-none m-0 p-0 px-12px'>
          <li className='debt__menu-item py-8px active flex-grow-1 text-white d-flex justify-content-center align-items-center'>
            All
          </li>
          <li className='debt__menu-item py-8px flex-grow-1 text-white d-flex justify-content-center align-items-center'>
            All 1
          </li>
          <li className='debt__menu-item py-8px flex-grow-1 text-white d-flex justify-content-center align-items-center'>
            All 2
          </li>
          <li className='debt__menu-item py-8px flex-grow-1 text-white d-flex justify-content-center align-items-center'>
            All 3
          </li>
          <li className='debt__menu-item py-8px flex-grow-1 text-white d-flex justify-content-center align-items-center'>
            All 4
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default DebtPage
