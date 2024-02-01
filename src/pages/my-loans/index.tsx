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
      <div className='container my-30px'>
        <HeaderMyLoan filter={filter} setFilter={setFilter} />
        <MapData data={fakeData} />
      </div>
    </div>
  )
}

export default MyLoans
