import React, {useState} from 'react'

import SideBar from '@/components/sideBar.tsx'
import Profile from './Profile'
import Addresses from './Addresses'
import Employment from './Employment'
import Vehicle from './Vehicle'
import CPF from './CPF'
import Status from './Status'

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
    title: 'Vehicle',
    Comment: Vehicle,
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
  const [title, setTitle] = useState('Profile')
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
