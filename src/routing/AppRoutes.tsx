/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC, Suspense, lazy} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {ErrorsPage} from '../app/modules/errors/ErrorsPage'
import {App} from '../App'
import {AuthLayout} from '../layouts/auth-layout/AuthLayout'
import {Login} from '../pages/auth/login/Login'
import {ForgotPassword} from '../pages/auth/forgot-password/ForgotPassword'
// import {DashboardWrapper} from '../pages/dashboard-metronic/DashboardWrapper'
import {MasterLayout} from '../layouts/master-layout/MasterLayout'

import {WithChildren} from '../_metronic/helpers'
import {getCSSVariableValue} from '../_metronic/assets/ts/_utils'
import TopBarProgress from 'react-topbar-progress-indicator'
import SettingPageRouter from '../pages/settings/SettingPageRouter'
import {Applications} from '../pages/applications'
import Dashboard from '../pages/dashboard'
import Loans from '../pages/loans'
import Borrowers from '../pages/borrowers'
import Transactions from '../pages/transactions'
import MyTasks from '../pages/my-tasks'
import ApplicationListing from '../pages/applications/application-listing/ApplicationListing'
import {Logout} from '../pages/auth/logout/Logout'
import {useAuth} from '../app/context/AuthContext'

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
          <Route path='logout' element={<Logout />} />

          <Route element={<MasterLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='/application'>
              <Route index element={<ApplicationListing />} />
              <Route path='listing' element={<ApplicationListing />} />
              <Route path='create' element={<Applications />} />
              <Route path='edit/:applicationIdEdit' element={<Applications />} />
            </Route>
            <Route path='/loans' element={<Loans />} />
            <Route path='/borrowers' element={<Borrowers />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/my-tasks' element={<MyTasks />} />

            {/* <Route path='/guest' element={<Guest />} /> */}

            {/* Lazy Modules */}
            <Route
              path='settings/*'
              element={
                <SuspensedView>
                  <SettingPageRouter />
                </SuspensedView>
              }
            />
            <Route
              path='/account/*'
              element={
                <SuspensedView>
                  <AccountPage />
                </SuspensedView>
              }
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
          </Route>

          {/* Not match any router */}
          <Route path='/' element={<Navigate to={currentUser ? '/dashboard' : '/login'} />} />
          <Route path='*' element={<Navigate to={currentUser ? '/error/404' : '/login'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
