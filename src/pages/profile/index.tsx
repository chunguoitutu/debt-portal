import './style.scss'
import AvatarAndMenu from './AvatarAndMenu'
import {Fragment, useMemo, useState} from 'react'
import {PROFILE_MENU} from './config'

const Profile = () => {
  const [activeId, setActiveId] = useState<number>(PROFILE_MENU.find((el) => el.default)?.id)

  const Component = useMemo(() => {
    return PROFILE_MENU.find((el) => el.id === activeId).component || Fragment
  }, [activeId])

  return (
    <div className='profile container py-30px'>
      <div className='row gy-24px gx-4px gx-sm-16px'>
        <div className='col-12 col-sm-4'>
          <AvatarAndMenu activeId={activeId} setActiveId={setActiveId} />
        </div>
        <div className='col-12 col-sm-8'>
          <Component />
        </div>
      </div>
    </div>
  )
}

export default Profile
