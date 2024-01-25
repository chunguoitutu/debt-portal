import {useState} from 'react'

import SideBar from '@/components/sideBar.tsx'
import {CONFIG_OVERVIEW} from './config'

type Props = {
  data: any
}

const Overview = ({data}: Props) => {
  const [title, setTitle] = useState(CONFIG_OVERVIEW[0].title)
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
