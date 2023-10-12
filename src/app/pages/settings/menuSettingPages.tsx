import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Campaigns} from '../../modules/profile/components/Campaigns'
import {Documents} from '../../modules/profile/components/Documents'
import LoanTypes from './loanType/loanType'
import SettingCompanies from './company/settingCompanies'
import SettingBranch from './branch/SettingBranch'
import {MenuSetting} from './menuSetting'
import RolePage from './role/settingRole'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Setting',
    path: '/settings/company',
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

const MenuSettingPage = () => (
  <Routes>
    <Route
      element={
        <>
          <MenuSetting />
          <Outlet />
        </>
      }
    >
      <Route
        path='company'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Company</PageTitle>
            <SettingCompanies />
          </>
        }
      />

      <Route
        path='branch'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Branch</PageTitle>
            <SettingBranch />
          </>
        }
      />
      <Route
        path='campaigns'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Campaigns</PageTitle>
            <Campaigns />
          </>
        }
      />
      <Route
        path='documents'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Documents</PageTitle>
            <Documents />
          </>
        }
      />
      <Route
        path='loan-type'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Loan Type</PageTitle>
            <LoanTypes />
          </>
        }
      />
      <Route
        path='roles'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Roles</PageTitle>
            <RolePage />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/pages/profile/overview' />} />
    </Route>
  </Routes>
)

export default MenuSettingPage
