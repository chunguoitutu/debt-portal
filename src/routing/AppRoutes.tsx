/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC, Suspense, lazy} from 'react'
import {Routes, Route, BrowserRouter, Navigate, Outlet} from 'react-router-dom'
import {ErrorsPage} from '../app/modules/errors/ErrorsPage'
import {App} from '../App'
import {MasterLayout} from '../layouts/master-layout/MasterLayout'
import {getCSSVariableValue} from '../_metronic/assets/ts/_utils'
import TopBarProgress from 'react-topbar-progress-indicator'

import {useAuth} from '../app/context/AuthContext'

import DashBoardPortal from '@/pages/dashboard-portal'
import Home from '@/pages/home'
import {WithChildren} from '@/app/types'
import Profile from '@/pages/profile'
import MyLoans from '@/pages/my-loans'
import Application from '@/pages/application'
import LoanDetailsPortal from '@/pages/loan-portal'
import Cookies from 'js-cookie'

const AccountPage = lazy(() => import('../app/modules/profile/components/profile/AccountPage'))

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />

          <Route element={<MasterLayout />}>
            <Route index element={<Home />} />
            <Route path='/profile'>
              <Route index element={<Profile />} />
            </Route>
            <Route path='/application'>
              <Route index element={<Application />} />
            </Route>
            <Route path='/dashboard'>
              <Route index element={<DashBoardPortal />} />
            </Route>
            <Route path='/customers'></Route>
            <Route path='/portal' element={<DashBoardPortal />} />

            <Route path='/portal' element={<DashBoardPortal />} />

            <Route path='/my-loans'>
              <Route index element={<MyLoans />} />
              <Route path='details/:id' element={<LoanDetailsPortal />} />
            </Route>

            <Route
              path='/account/*'
              element={
                <SuspensedView>
                  <AccountPage />
                </SuspensedView>
              }
            />
          </Route>

          {/* Not match any router */}
          <Route path='/' element={<Navigate to={Cookies.get('token') ? '/dashboard' : '/'} />} />
          <Route path='*' element={<Navigate to={Cookies.get('token') ? '/error/404' : '/'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
