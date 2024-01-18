import React, {useState} from 'react'

import SideBar from '@/components/sideBar.tsx'
import Profile from './Profile'
import Addresses from './Addresses'
import Employment from './Employment'
import CPF from './CPF'
import Status from './Status'
import Vehicles from './Vehicles'

type Props = {
  data: any
}

const Overviews = [
  {
    title: 'Profile',
    Comment: Profile,
  },
  {
    title: 'Addresses',
    Comment: Addresses,
  },
  {
    title: 'Employment',
    Comment: Employment,
  },
  {
    title: 'Vehicles',
    Comment: Vehicles,
  },
  {
    title: 'CPF',
    Comment: CPF,
  },
  {
    title: 'Status',
    Comment: Status,
  },
]

const Overview = ({data}: Props) => {
  const [title, setTitle] = useState(Overviews[2].title)
  return (
    <>
      <SideBar
        setTitle={setTitle}
        Overviews={Overviews}
        title={title}
        children={
          <>
            {Overviews.map((overview, idx) => {
              const Component: any = overview.Comment
              if (overview.title === title) {
                return (
                  <div key={idx}>
                    <Component data={data} />
                  </div>
                )
              }
              return null
            })}
          </>
        }
      />
    </>
  )
}

export default Overview
