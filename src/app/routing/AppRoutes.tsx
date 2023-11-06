/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC, Suspense, lazy} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, useAuth} from '../modules/auth'
import {App} from '../App'
import {AuthLayout} from '../modules/auth/AuthLayout'
import {Login} from '../modules/auth/components/Login'
import {ForgotPassword} from '../modules/auth/components/ForgotPassword'
// import {DashboardWrapper} from '../pages/dashboard-metronic/DashboardWrapper'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {WithChildren} from '../../_metronic/helpers'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import TopBarProgress from 'react-topbar-progress-indicator'
import SettingPageRouter from '../pages/settings/SettingPageRouter'
import {Applications} from '../pages/applications'
import Dashboard from '../pages/dashboard'
import Loans from '../pages/loans'
import Borrowers from '../pages/borrowers'
import Transactions from '../pages/transactions'
import MyTasks from '../pages/my-tasks'

const AccountPage = lazy(() => import('../modules/profile/components/profile/AccountPage'))

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
            <Route path='/applications' element={<Applications />} />
            <Route path='/loans' element={<Loans />} />
            <Route path='/borrowers' element={<Borrowers />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/my-tasks' element={<MyTasks />} />

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
