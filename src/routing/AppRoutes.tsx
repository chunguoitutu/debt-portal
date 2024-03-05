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

import DashBoardPortal from '@/pages/dashboard-portal'
import Home from '@/pages/home'
import {WithChildren} from '@/app/types'
import Profile from '@/pages/profile'
import MyLoans from '@/pages/my-loans'
import LoanDetailsPortal from '@/pages/loan-portal'
import NewApplicationPortal from '@/pages/application/NewApplicationPortal'
import DebtLayout from '@/layouts/debt-layout'
import {useAuth} from '@/app/context/AuthContext'
import {AuthLayout} from '@/components/auth-layout/AuthLayout'

const AccountPage = lazy(() => import('../app/modules/profile/components/profile/AccountPage'))
import DebtAllWork from '@/pages/debt-collector/all-work/AllWork'
import DebtListToDo from '@/pages/debt-collector/to-do/ToDoList'
import Statistical from '../pages/debt-collector/statistical/Statistical'
import Done from '@/pages/done'

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
            <Route path='/profile'>
              <Route index element={<Profile />} />
            </Route>
            <Route path='/application'>
              <Route index element={<NewApplicationPortal />} />
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

          <Route path='/debt' element={<DebtLayout />}>
            <Route index element={<DebtAllWork />} />
            <Route path='todo' element={<DebtListToDo />} />
            <Route path='done' element={<>Done Page</>} />
            <Route path='statistical' element={<Statistical />} />
            <Route path='done' element={<Done />} />
            <Route path='statistical' element={<>Statistical Page</>} />
            <Route path='task-details/:id' element={<LoanDetailsPortal />} />
            <Route path='profile' element={<Profile />} />
            <Route path='*' element={<Navigate to={'/debt'} />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='login' element={<Home />} />
          </Route>
          {/* Not match any router */}
          <Route path='/' element={<Navigate to={currentUser ? '/debt' : '/login'} />} />
          <Route path='*' element={<Navigate to={currentUser ? '/error/404' : '/login'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
