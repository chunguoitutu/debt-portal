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
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {WithChildren} from '../../_metronic/helpers'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import TopBarProgress from 'react-topbar-progress-indicator'
import SettingPageRouter from '../pages/settings/SettingPageRouter'

const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
const AccountPage = lazy(() => import('../modules/profile/components/profile/AccountPage'))
const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

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
            <Route path='dashboard' element={<DashboardWrapper />} />
            <Route path='/loans' element={<BuilderPageWrapper />} />
            <Route path='/borrowers' element={<MenuTestPage />} />
            <Route path='/transactions' element={<MenuTestPage />} />
            <Route path='/my-tasks' element={<MenuTestPage />} />

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
              path='crafted/pages/wizards/*'
              element={
                <SuspensedView>
                  <WizardsPage />
                </SuspensedView>
              }
            />
            <Route
              path='crafted/widgets/*'
              element={
                <SuspensedView>
                  <WidgetsPage />
                </SuspensedView>
              }
            />
            <Route
              path='crafted/account/*'
              element={
                <SuspensedView>
                  <AccountPage />
                </SuspensedView>
              }
            />
            <Route
              path='apps/chat/*'
              element={
                <SuspensedView>
                  <ChatPage />
                </SuspensedView>
              }
            />
            <Route
              path='apps/user-management/*'
              element={
                <SuspensedView>
                  <UsersPage />
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
