import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Campaigns} from '../../modules/profile/components/Campaigns'
import LoanTypes from './loan_type/LoanType'
import SettingCompanies from './company/CompanyManagement'
import SettingBranch from './branch/BranchManagement'
import {MenuSetting} from './menuSetting'
import JobType from './job_type/JobType'
import AddressType from './address_type/AddressType'
import UserManagement from './users/UserManagement'
import DocumentTypes from './document_types/DocumentTypes'
import RolePage from './role/RoleManagement'
import MarkettingType from './marketing_type/MarketingType'
import RejectionType from './rejection-type/RejectionType'

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
        path='companies'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Companies</PageTitle>
            <SettingCompanies />
          </>
        }
      />

      <Route
        path='branches'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Branches</PageTitle>
            <SettingBranch />
          </>
        }
      />
      <Route
        path='users'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Users</PageTitle>
            <UserManagement />
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
        path='documents-type'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Documents Types</PageTitle>
            <DocumentTypes />
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
      <Route
        path='job-type'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Job Type</PageTitle>
            <JobType />
          </>
        }
      />
      <Route
        path='address-type'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Address Type</PageTitle>
            <AddressType />
          </>
        }
      />
      <Route
        path='marketing-type'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Marketing Type</PageTitle>
            <MarkettingType />
          </>
        }
      />
      <Route
        path='rejection-type'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Rejection Type</PageTitle>
            <RejectionType />
          </>
        }
      />
      <Route index element={<Navigate to='/crafted/pages/profile/overview' />} />
    </Route>
  </Routes>
)

export default MenuSettingPage
