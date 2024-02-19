import './style.scss'
import AvatarAndMenu from './AvatarAndMenu'
import {Fragment, useMemo, useState} from 'react'
import {PROFILE_MENU} from './config'
import TitleContainer from '@/components/title-container.tsx'

const profileBreadCrumbs = {
  title: 'My Profile',
  link: [
    {
      to: '/',
      titleLink: 'Home',
    },
  ],
  render: ['My Profile'],
}

const Profile = () => {
  const [activeId, setActiveId] = useState<number>(PROFILE_MENU.find((el) => el.default)?.id)

  const Component = useMemo(() => {
    return PROFILE_MENU.find((el) => el.id === activeId).component || Fragment
  }, [activeId])

  return (
    <div className='p-0 m-0'>
      <TitleContainer data={profileBreadCrumbs} />
      <div className='profile container padding-responsive py-20px py-md-40px'>
        <div className='row gy-24px gx-4px gx-md-16px'>
          <div className='col-12 col-md-4'>
            <AvatarAndMenu activeId={activeId} setActiveId={setActiveId} />
          </div>
          <div className='col-12 col-md-8'>
            <Component />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
