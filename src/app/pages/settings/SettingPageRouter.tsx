import {Routes, Route, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import LoanTypes from './loan-type/LoanType'
import SettingCompanies from './company/CompanyManagement'
import JobType from './job-type/JobType'
import AddressType from './address-type/AddressType'
import UserManagement from './user/UserManagement'
import DocumentTypes from './document-types/DocumentTypes'
import RolePage from './role/RoleManagement'
import MarkettingType from './marketing-type/MarketingType'
import RejectionType from './rejection-type/RejectionType'
import {useMemo} from 'react'
import {useAuth} from '../../modules/auth'
import SettingManagementLayout from '../../../layouts/setting-layout/SettingManagement'
import {CompanyManagement} from './company-management'

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
    return [
      {
        path: 'company-management',
        labelBreadCrumbs: 'Company Management',
        component: CompanyManagement,
        priority: [1],
      },
      {
        path: 'companies',
        labelBreadCrumbs: 'Companies',
        priority: [1],
        component: SettingCompanies,
      },
      {
        path: 'users',
        labelBreadCrumbs: 'Users',
        priority: [1, 2],
        component: UserManagement,
      },
      {
        path: 'document-type',
        labelBreadCrumbs: 'Document Type',
        priority: [1],
        component: DocumentTypes,
      },
      {
        path: 'loan-type',
        labelBreadCrumbs: 'Loan Type',
        priority: [1],
        component: LoanTypes,
      },
      {
        path: 'roles',
        labelBreadCrumbs: 'Loan Type',
        priority: [1],
        component: RolePage,
      },
      {
        path: 'job-type',
        labelBreadCrumbs: 'Job Type',
        priority: [1],
        component: JobType,
      },
      {
        path: 'address-type',
        labelBreadCrumbs: 'Address Type',
        priority: [1],
        component: AddressType,
      },
      {
        path: 'marketing-type',
        labelBreadCrumbs: 'Marketing Type',
        priority: [1],
        component: MarkettingType,
      },
      {
        path: 'rejection-type',
        labelBreadCrumbs: 'Rejection Type',
        priority: [1],
        component: RejectionType,
      },
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority])

  // If the current user is loading, nothing will be displayed
  if (!priority) return null

  return (
    <Routes>
      <Route element={<SettingManagementLayout />}>
        {router
          .filter((item) => item.priority.includes(priority))
          .map(({path, component, labelBreadCrumbs}, i) => {
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
