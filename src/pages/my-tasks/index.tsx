import {useState} from 'react'
import HeaderMyTask from './HeaderMyTask'
import './styles.scss'
import MapData from './MapData'
import {fakeData} from './fakeData'
import TitleContainer from '@/components/title-container.tsx'

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

function MyTasks() {
  const [filter, setFilter] = useState<number[]>([])
  return (
    <div className=' my-task-wrapper'>
      <TitleContainer data={profileBreadCrumbs} />
      <div className='container my-30px'>
        <HeaderMyTask filter={filter} setFilter={setFilter} />
        <MapData data={fakeData} />
      </div>
    </div>
  )
}

export default MyTasks
