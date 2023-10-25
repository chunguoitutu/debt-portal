import {MenuSettingItem} from '../modules/auth'
import AddressType from '../pages/settings/address-type/AddressType'
import {CompanyManagement} from '../pages/settings/company-management'
import CompanyListing from '../pages/settings/company/CompanyManagement'
import DocumentTypes from '../pages/settings/document-types/DocumentTypes'
import JobType from '../pages/settings/job-type/JobType'
import LoanTypes from '../pages/settings/loan-type/LoanType'
import MarkettingType from '../pages/settings/marketing-type/MarketingType'
import RejectionType from '../pages/settings/rejection-type/RejectionType'
import RolePage from '../pages/settings/role/RoleManagement'
import UserManagement from '../pages/settings/user/UserManagement'
import {v4 as uuidv4} from 'uuid'

type BaseConfig = {
  value: string | number
  label: string
}

export const ROLE_PRIORITY: BaseConfig[] = [
  {
    value: 1,
    label: 'Full-Access',
  },
  {
    value: 2,
    label: 'Branch Manager',
  },
  {
    value: 3,
    label: 'Finance',
  },
  {
    value: 4,
    label: 'Agent',
  },
  {
    value: 5,
    label: 'Debt Collect',
  },
]

export const ACCOUNT_DEPARTMENT: BaseConfig[] = [
  {
    value: 'assets',
    label: 'ASSETS',
  },
  {
    value: 'liabilities',
    label: 'LIABILITIES',
  },
  {
    value: 'equity',
    label: 'EQUITY',
  },
  {
    value: 'revenue',
    label: 'REVENUE',
  },
  {
    value: 'expense',
    label: 'EXPENSE',
  },
]

export const ACCOUNT_GROUP: BaseConfig[] = [
  {
    value: 'H',
    label: 'H',
  },
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'S',
    label: 'S',
  },
  {
    value: 'G',
    label: 'G',
  },
  {
    value: 'T',
    label: 'T',
  },
  {
    value: 'X',
    label: 'X',
  },
]

export const CUSTOMER_TYPE: BaseConfig[] = [
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'existing',
    label: 'Existing',
  },
]

export const EMPLOYMENT_STATUS: BaseConfig[] = [
  {
    value: 'EMP',
    label: 'Employed',
  },
  {
    value: 'UNEMPINC',
    label: 'Unemployed with income',
  },
  {
    value: 'UNEMP',
    label: 'Unemployed without income',
  },
]

export const LANGUAGES: BaseConfig[] = [
  {
    value: 'english',
    label: 'English',
  },
  {
    value: 'china',
    label: 'China',
  },
  {
    value: 'malaysia',
    label: 'Malaysia',
  },
]

export const PURPOSE_OF_LOAN: BaseConfig[] = [
  {
    value: 'others',
    label: 'Others',
  },
]

const nth = (d) => {
  const dString = String(d)
  const last = +dString.slice(-2)
  if (last > 3 && last < 21) return 'th'
  switch (last % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export const MONTHLY_DUE_DATE: any = Array.from({length: 31}).reduce(
  (a: any, _, i) => {
    const value = [
      ...a,
      {
        value: `${i + 1}`,
        label: `${i + 1}${nth(i + 1)}`,
      },
    ]
    return value
  },
  [
    {
      value: 'last_day',
      label: 'Last Day',
    },
  ]
)

interface AdvanceConfig extends BaseConfig {
  code: string
}

export const NATIONALITY: AdvanceConfig[] = [
  {
    value: 'singapore-citizen',
    label: 'Singapore Citizen',
    code: 'SGP',
  },
  {
    value: 'non-singapore-citizen',
    label: 'Non-S`pore Citizen',
    code: 'SGP',
  },
]

export const OBLIGATION: AdvanceConfig[] = [
  {
    value: 'main_borrower',
    label: 'Main Borrower',
    code: 'M',
  },
  {
    value: 'joint_borrower',
    label: 'Joint Borrower',
    code: 'J',
  },
  {
    value: 'guarantor',
    label: 'Guarantor',
    code: 'G',
  },
]

export const ROUTER_SETTING = [
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
    component: CompanyListing,
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
    labelBreadCrumbs: 'Roles',
    priority: [1, 2],
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

export const MENU_SETTING_LISTING: MenuSettingItem[] = [
  {
    activeKey: uuidv4(),
    title: 'Company Management',
    priority: [1],
    children: [
      {
        id: uuidv4(),
        to: '/settings/company-management',
        label: 'Company Information',
        priority: [1],
      },
      {
        id: uuidv4(),
        to: '/settings/companies',
        label: 'Companies',
        priority: [1],
      },
    ],
  },
  {
    activeKey: uuidv4(),
    title: 'User Management',
    priority: [1, 2],
    children: [
      {
        id: uuidv4(),
        to: '/settings/users',
        label: 'User Listing',
        priority: [1, 2],
      },
      {
        id: uuidv4(),
        to: '/settings/roles',
        label: 'Roles',
        priority: [1, 2],
      },
    ],
  },
  {
    activeKey: uuidv4(),
    title: 'Listing',
    priority: [1],
    children: [
      {
        id: uuidv4(),
        to: '/settings/document-type',
        label: 'Document Type',

        priority: [1],
      },
      {
        id: uuidv4(),
        to: '/settings/loan-type',
        label: 'Loan Type',
        priority: [1],
      },
      {
        id: uuidv4(),
        to: '/settings/job-type',
        label: 'Job Type',
        priority: [1],
      },
      {
        id: uuidv4(),
        to: '/settings/address-type',
        label: 'Address Type',
        priority: [1],
      },
      {
        id: uuidv4(),
        to: '/settings/marketing-type',
        label: 'Marketing Type',
        priority: [1],
      },
      {
        id: uuidv4(),
        to: '/settings/rejection-type',
        label: 'Rejection Type',
        priority: [1],
      },
    ],
  },
  {
    activeKey: uuidv4(),
    title: 'Settings',
    priority: [1],
    children: [
      {
        id: uuidv4(),
        to: '/settings/other',
        label: 'Config',
        priority: [1],
      },
    ],
  },
]
