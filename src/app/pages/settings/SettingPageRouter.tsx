import {Routes, Route, Navigate} from 'react-router-dom'
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
import {useMemo} from 'react'
import {useAuth} from '../../modules/auth'
import SettingManagementLayout from '../../../layouts/setting-layout/SettingManagement'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Setting',
    path: '/settings/companies',
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

  const router = useMemo(() => {
    if (priority > 2) return []

    const fullRouter = [
      {
        path: 'companies',
        labelBreadCrumbs: 'Companies',
        component: SettingCompanies,
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

    // priority = 2 means admin
    if (priority === 2)
      return fullRouter.filter((item) => ['Branches', 'Users'].includes(item.labelBreadCrumbs))

    return fullRouter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority])

  // If the current user is loading, nothing will be displayed
  if (!priority) return null

  return (
    <Routes>
      <Route element={<SettingManagementLayout />}>
        {router.map(({path, component, labelBreadCrumbs}, i) => {
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
        })}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export default SettingPageRouter
