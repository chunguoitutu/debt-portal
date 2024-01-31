import {Routes, Route, Outlet} from 'react-router-dom'
import {ProfileHeader} from './ProfileHeader'
import {PageLink, PageTitle} from '@/components/breadcrumbs'
import {Overview} from './components/profile/Overview'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/crafted/pages/profile/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          <ProfileHeader />
          <Outlet />
        </>
      }
    >
      <Route
        path='overview'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Account Overview</PageTitle>
            <Overview />
          </>
        }
      />
    </Route>
  </Routes>
)

export default ProfilePage
