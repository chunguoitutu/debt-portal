import {Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import LoanTypes from './loan_type/LoanType'
import SettingCompanies from './company/CompanyManagement'
import SettingBranch from './branch/BranchManagement'
import JobType from './job_type/JobType'
import AddressType from './address_type/AddressType'
import UserManagement from './users/UserManagement'
import DocumentTypes from './document_types/DocumentTypes'
import RolePage from './role/RoleManagement'
import MarkettingType from './marketing_type/MarketingType'
import RejectionType from './rejection-type/RejectionType'
import {MenuSetting} from './MenuSetting'
import {useMemo} from 'react'
import {useAuth} from '../../modules/auth'

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

const MenuRouter = () => {
  const {priority} = useAuth()
  const router = useMemo(() => {
    return [
      {
        path: 'companies',
        labelBreadCrumbs: 'Companies',
        component: SettingCompanies,
      },
      {
        path: 'branches',
        labelBreadCrumbs: 'Branches',
        component: SettingBranch,
      },
      {
        path: 'users',
        labelBreadCrumbs: 'Users',
        component: UserManagement,
      },
      {
        path: 'document-type',
        labelBreadCrumbs: 'Document Type',
        component: DocumentTypes,
      },
      {
        path: 'loan-type',
        labelBreadCrumbs: 'Loan Type',
        component: LoanTypes,
      },
      {
        path: 'roles',
        labelBreadCrumbs: 'Loan Type',
        component: RolePage,
      },
      {
        path: 'job-type',
        labelBreadCrumbs: 'Job Type',
        component: JobType,
      },
      {
        path: 'address-type',
        labelBreadCrumbs: 'Address Type',
        component: AddressType,
      },
      {
        path: 'marketing-type',
        labelBreadCrumbs: 'Marketing Type',
        component: MarkettingType,
      },
      {
        path: 'rejection-type',
        labelBreadCrumbs: 'Rejection Type',
        component: RejectionType,
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority])
  return (
    <Routes>
      <Route
        element={
          <>
            <MenuSetting />
            <Outlet />
          </>
        }
      >
        {router.map(({path, component, labelBreadCrumbs}, i) => {
          const Comp = component
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
        })}
      </Route>
    </Routes>
  )
}

export default MenuRouter
