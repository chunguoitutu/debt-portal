import {useState} from 'react'

import SideBar from '@/components/sideBar.tsx'
import Profile from './Profile'
import Addresses from './Addresses'
import Employment from './Employment'
import Vehicles from './Vehicles'
import CPF from './CPF'
import Status from './Status'
import {CONFIG_OVERVIEW} from './config'

type Props = {
  data: any
}

const Overview = ({data}: Props) => {
  const [title, setTitle] = useState(CONFIG_OVERVIEW[2].title)
  return (
    <>
      <SideBar
        setTitle={setTitle}
        Overviews={CONFIG_OVERVIEW}
        title={title}
        children={
          <>
            {CONFIG_OVERVIEW.map((overview, idx) => {
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
