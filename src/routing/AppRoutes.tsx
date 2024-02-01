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
import SettingPageRouter from '../pages/settings/SettingPageRouter'
import {Applications} from '../pages/applications'
import Transactions from '../pages/transactions'
import MyTasks from '../pages/my-tasks'
import ApplicationListing from '../pages/applications/application-listing/ApplicationListing'
import {useAuth} from '../app/context/AuthContext'
import Guest from '@/pages/guest'
import LoanListing from '@/pages/loans/loan-listing/LoanListing'
import BorrowersListing from '@/pages/borrowers/borrwers-listing/BorrowerListing'
import LoanDetails from '@/pages/loans/loan-details'
import CaCheck from '@/pages/applications/background-check/ca-check'
import BorrowerDetail from '@/pages/borrowers/borrowers-details'
import DashBoardPortal from '@/pages/dashboard-portal'
import Home from '@/pages/home'
import {WithChildren} from '@/app/types'
import Profile from '@/pages/profile'

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
          <Route path='/transactions' element={<Transactions />} />

          <Route element={<MasterLayout />}>
            <Route index element={<Home />} />
            <Route path='/profile'>
              <Route index element={<Profile />} />
            </Route>
            <Route path='/application'>
              <Route index element={<ApplicationListing />} />
              <Route path='listing' element={<ApplicationListing />} />
              <Route path='create' element={<Applications />} />
              <Route path='edit/:applicationIdEdit' element={<Applications />} />
            </Route>
            <Route path='/loans'>
              <Route index element={<LoanListing />} />
              <Route path='listing' element={<LoanListing />} />
              <Route path='details/:loanId' element={<LoanDetails />} />
            </Route>
            <Route path='/customers'>
              <Route index element={<BorrowersListing />} />
              <Route path='listing' element={<BorrowersListing />} />
              <Route path='details/:customerId' element={<BorrowerDetail />} />
            </Route>
            <Route path='/portal' element={<DashBoardPortal />} />
            <Route path='/my-tasks' element={<MyTasks />} />
            <Route path='guest' element={<Guest />} />

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

          <Route path='cas_check_listing_pdf' element={<CaCheck />} />
          {/* Not match any router */}
          <Route path='/' element={<Navigate to={currentUser ? '/dashboard' : '/login'} />} />
          <Route path='*' element={<Navigate to={currentUser ? '/error/404' : '/login'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
