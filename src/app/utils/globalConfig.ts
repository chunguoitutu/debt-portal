import RejectionType from '../../pages/settings/rejection-type/RejectionType'
import RolePage from '../../pages/settings/role/RoleManagement'
import UserManagement from '../../pages/settings/user/UserManagement'

import {v4 as uuidv4} from 'uuid'
import {DropDownGroup, MenuSettingItem, Option} from '../types/common'
import {CompanyManagement} from '../../pages/settings/company-management'
import CompanyListing from '../../pages/settings/company/CompanyManagement'
import DocumentTypes from '../../pages/settings/document-types/DocumentTypes'
import LoanTypes from '../../pages/settings/loan-type/LoanType'
import JobType from '../../pages/settings/job-type/JobType'
import AddressType from '../../pages/settings/address-type/AddressType'
import MarkettingType from '../../pages/settings/marketing-type/MarketingType'

export const ROLE_PRIORITY: Option[] = [
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

export const ACCOUNT_DEPARTMENT: Option[] = [
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

export const ACCOUNT_GROUP: Option[] = [
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

export const CUSTOMER_TYPE: Option[] = [
  {
    value: 'new',
    label: 'New',
  },
  {
    value: 'existing',
    label: 'Existing',
  },
]

export const MLCB_CHECK: Option[] = [
  {
    value: '1',
    label: 'Opt In Yes Consent to disclose information to MLCB and sMECB',
  },
]

export const LANGUAGES_SPOKEN: Option[] = [
  {
    value: 'english',
    label: 'English',
  },
]

export const INCOME_DOCUMENT: Option[] = [
  {
    value: 'pay_slip',
    label: 'Pay Slip',
  },
  {
    value: 'cpf',
    label: 'CPF',
  },
  {
    value: 'noa',
    label: 'NOA',
  },
  {
    value: 'others',
    label: 'Others',
  },
]

export const GENDER: Option[] = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
]

export const SPECIALIZATION: Option[] = [
  {
    value: 'AAF',
    label: 'Agriculture and Fishing',
  },
  {
    value: 'MAQ',
    label: 'Mining and Quarrying',
  },
  {
    value: 'MANUFACT',
    label: 'Manufacturing',
  },
  {
    value: 'EGSACP',
    label: 'Electricity, Gas, Steam and Air-Conditioning Suppl',
  },
  {
    value: 'WSWMRA',
    label: 'Water Supply; Sewerage, Waste Management and Remed',
  },
  {
    value: 'CONS',
    label: 'Construction',
  },
  {
    value: 'WRT',
    label: 'Wholesale and Retail Trade',
  },
  {
    value: 'TAS',
    label: 'Transportation and Storage',
  },
  {
    value: 'AFSA',
    label: 'Accommodation and Food Service Activities',
  },
  {
    value: 'ITCOM',
    label: 'Information and Communications',
  },
  {
    value: 'FININS',
    label: 'Financial and Insurance Activities',
  },
  {
    value: 'REA',
    label: 'Real Estate Activities',
  },
  {
    value: 'PSTA',
    label: 'Professional, Scientific and Technical Activities',
  },
  {
    value: 'ASSA',
    label: 'Administrative and Support Service Activities',
  },
  {
    value: 'PAD',
    label: 'Public Administration and Defence',
  },
  {
    value: 'EDU',
    label: 'Education',
  },
  {
    value: 'HSS',
    label: 'Health and Social Services',
  },
  {
    value: 'AER',
    label: 'Arts, Entertainment and Recreation',
  },
  {
    value: 'OTHERS',
    label: 'Other Service Activities',
  },
  {
    value: 'HEDP',
    label: 'Activities of Households as Employers of Domestic',
  },
  {
    value: 'ETOB',
    label: 'Activities of Extra-Territorial Organisations and',
  },
  {
    value: 'NAD',
    label: 'Activities Not Adequately Defined',
  },
]

export const EMPLOYMENT_STATUS: Option[] = [
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

export const LANGUAGES: Option[] = [
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

export const LOAN_TYPE: Option[] = [
  {
    value: 'personal',
    label: 'Personal Loan (PL)',
  },
  {
    value: 'foreigner',
    label: 'Foreigner Loan (FL)',
  },
  {
    value: 'renovation',
    label: 'Renovation Loan (RL)',
  },
  {
    value: 'wedding',
    label: 'Wedding Loan (WL)',
  },
  {
    value: 'hire_purchase',
    label: 'Hire Purchase Loan (HPL)',
  },
  {
    value: 'auto_vehicle',
    label: 'Auto Vehicle Loan (AVL)',
  },
  {
    value: 'debt_consolidation',
    label: 'Debt Consolidation (DCL)',
  },
  {
    value: 'mortgage',
    label: 'Mortgage Loan (ML)',
  },
  {
    value: 'business',
    label: 'Business Loan (BL)',
  },
]

export const PURPOSE_OF_LOAN: Option[] = [
  {
    value: 'others',
    label: 'Others',
  },
]

export const ID_TYPE: Option[] = [
  {
    value: 'singapore_nric_no',
    label: 'Singapore NRIC No',
  },
  {
    value: 'foreign_identification_number',
    label: 'Foreign Identification Number',
  },
]

export const STATUS_APPLICATION_FILTER: Option[] = [
  {
    value: '1',
    label: 'Awaiting Approval',
  },
  {
    value: '0',
    label: 'Rejected',
  },
  {
    value: '0',
    label: 'Approved',
  },
]

export const MARKETING_TYPE: Option[] = [
  {
    value: 'yellow_pages',
    label: 'Yellow Pages',
  },
  {
    value: 'walk_in',
    label: 'Walk-in',
  },
  {
    value: 'internet',
    label: 'Internet',
  },
  {
    value: 'adbrandz',
    label: 'Adbrandz',
  },
  {
    value: 'referral',
    label: 'Referral',
  },
  {
    value: 'kst',
    label: 'KST',
  },
  {
    value: 'volunteer_welfare',
    label: 'Volunteer Welfare Organisation',
  },
  {
    value: 'others',
    label: 'Others',
  },
]

export const RESIDENTIAL_TYPE: DropDownGroup[] = [
  {
    name: 'HDB',
    options: [
      {
        value: '1_Room',
        label: '1 Room',
      },
      {
        value: '2_Room',
        label: '2 Room',
      },
      {
        value: '3_Room',
        label: '3 Room',
      },
      {
        value: '4_Room',
        label: '4 Room',
      },
      {
        value: '5_Room',
        label: '5 Room',
      },
    ],
  },
  {
    name: 'EXECUTIVE',
    options: [
      {
        value: 'exec',
        label: 'Exec',
      },
    ],
  },
  {
    name: 'PRIVATE',
    options: [
      {
        value: 'apartment',
        label: 'Apartment',
      },
      {
        value: 'condo',
        label: 'Condo',
      },
      {
        value: 'landed',
        label: 'Landed',
      },
    ],
  },
  {
    name: 'NONE',
    options: [
      {
        value: 'not_own',
        label: 'Does not own any property',
      },
    ],
  },
]

export const SALUTATION_OPTION: Option[] = [
  {label: 'Mr', value: 'mr'},
  {label: 'Ms', value: 'ms'},
  {label: 'Mrs', value: 'mrs'},
  {label: 'Mdm', value: 'mdm'},
  {label: 'Dr', value: 'dr'},
]

export const YES_NO_OPTION: Option[] = [
  {label: 'Yes', value: '1'},
  {label: 'No', value: '0'},
]

export const COUNTRY_PHONE_CODE: Option[] = [{label: '+65', value: '+65'}]

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

export const MONTHLY_DUE_DATE: any = Array.from({length: 31}).reduce((a: any, _, i) => {
  const value = [
    ...a,
    {
      value: `${i + 1}`,
      label: `${i + 1}${nth(i + 1)}`,
    },
  ]
  return value
}, [])

interface AdvanceConfig extends Option {
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
        label: 'Companies Listing',
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
        label: 'Role Listing',
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
