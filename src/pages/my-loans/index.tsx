import {useState} from 'react'
import './styles.scss'
import MapData from './MapData'
import {fakeData} from './fakeData'
import TitleContainer from '@/components/title-container.tsx'
import HeaderMyLoan from './HeaderMyLoan'

const profileBreadCrumbs = {
  title: 'My Loans',
  link: [
    {
      to: '/',
      titleLink: 'Home',
    },
  ],
  render: ['My Loans'],
}

function MyLoans() {
  const [filter, setFilter] = useState<number[]>([])
  return (
    <div className=' my-task-wrapper'>
      <TitleContainer data={profileBreadCrumbs} />
      <div className='px-20px'>
        <div className='container my-20px p-0 '>
          <HeaderMyLoan filter={filter} setFilter={setFilter} />
          <MapData data={fakeData} />
        </div>
      </div>
    </div>
  )
}

export default MyLoans
