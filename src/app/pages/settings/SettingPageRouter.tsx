import {Routes, Route, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {useAuth} from '../../modules/auth'
import SettingManagementLayout from '../../../layouts/setting-layout/SettingManagement'
import {ROUTER_SETTING} from '../../utils/globalConfig'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Setting',
    path: '/settings/company-management',
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

const SettingPageRouter = () => {
  const {priority} = useAuth()

  // If the current user is loading, nothing will be displayed
  if (!priority) return null

  return (
    <Routes>
      <Route element={<SettingManagementLayout />}>
        {ROUTER_SETTING.filter((item) => item.priority.includes(priority)).map(
          ({path, component, labelBreadCrumbs}, i) => {
            const Comp = component

            if (priority === 2) {
              profileBreadCrumbs[0]['path'] = '/settings/users'
            }

            return (
              <Route
                key={i}
                path={path}
                element={
                  <>
                    <PageTitle breadcrumbs={profileBreadCrumbs}>{labelBreadCrumbs}</PageTitle>
                    <Comp />
                  </>
                }
              />
            )
          }
        )}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export default SettingPageRouter
