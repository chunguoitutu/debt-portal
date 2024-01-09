import RejectionType from '../../pages/settings/rejection-type/RejectionType'
import RolePage from '../../pages/settings/role/RoleManagement'
import UserManagement from '../../pages/settings/user/UserManagement'
import { v4 as uuidv4 } from 'uuid'
import { DropDownGroup, MenuSettingItem, Option } from '../types/common'
import { CompanyManagement } from '../../pages/settings/company-management'
import CompanyListing from '../../pages/settings/company/CompanyManagement'
import DocumentTypes from '../../pages/settings/document-types/DocumentTypes'
import JobType from '../../pages/settings/job-type/JobType'
import AddressType from '../../pages/settings/address-type/AddressType'
import MarkettingType from '../../pages/settings/marketing-type/MarketingType'
import UploadFileCasCheck from '@/pages/settings/UploadFileCasCheck'
import LoanTypes from './../../pages/settings/loan-type/LoanType';

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
    label: 'PaySlip',
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

export const BANKRUPTCY: Option[] = [
  {
    value: 'declared_bankrupt_in_last_5_years',
    label: 'Declared bankrupt in the last 5 years',
  },
  {
    value: 'plan_to_declare_bankrupt_in_the_next_3_months',
    label: 'Plan to declare bankrupt in the next 3 months',
  },
]

export const GENDER: Option[] = [
  {
    label: 'Male',
    value: 'MALE',
  },
  {
    label: 'Female',
    value: 'FEMALE',
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

export const PROPERTY_TYPE: Option[] = [
  {
    value: 'HDB',
    label: 'HDB',
  },
  {
    value: 'Private Residential',
    label: 'Private Residential',
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

export const TERM_UNIT: Option[] = [
  {
    value: '0',
    label: 'By Day',
  },
  {
    value: '1',
    label: 'By Month',
  },
  {
    value: '2',
    label: 'By Year',
  },
]

export const LOAN_TERM: Option[] = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '12',
    label: '12',
  },
  {
    value: '18',
    label: '18',
  },
  {
    value: '24',
    label: '24',
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
    value: '0',
    label: 'Draft',
  },
  {
    value: '1',
    label: 'Awaiting Approval',
  },
  {
    value: '2',
    label: 'Rejected',
  },
  {
    value: '3',
    label: 'Approved',
  },
]

export const LOAN_U_F_0: Option[] = [
  {
    value: '0',
    label: 'F',
  },
  {
    value: '1',
    label: 'U',
  },
  {
    value: '2',
    label: 'O',
  },
]

export const STATUS_OF_LOAN: Option[] = [
  {
    value: '0',
    label: 'Pending',
  },
  {
    value: '1',
    label: 'Active',
  },
  {
    value: '2',
    label: 'Close',
  },
  {
    value: '3',
    label: 'Cancelled',
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
        value: '1 Room',
        label: '1 Room',
      },
      {
        value: '2 Room',
        label: '2 Room',
      },
      {
        value: '3 Room',
        label: '3 Room',
      },
      {
        value: '4 Room',
        label: '4 Room',
      },
      {
        value: '5 Room',
        label: '5 Room',
      },
      {
        value: 'STUDIO APARTMENT (HDB)',
        label: 'Studio Apartment',
      },
    ],
  },
  {
    name: 'EXECUTIVE',
    options: [
      {
        value: 'Exec',
        label: 'Exec',
      },
    ],
  },
  {
    name: 'PRIVATE',
    options: [
      {
        value: 'Apartment',
        label: 'Apartment',
      },
      {
        value: 'Condo',
        label: 'Condo',
      },
      {
        value: 'Landed',
        label: 'Landed',
      },
      {
        value: 'TERRACE HOUSE',
        label: 'Terrace House',
      },
      {
        value: 'SEMI-DETACHED HOUSE',
        label: 'Semi-Detached House',
      },
      {
        value: 'DETACHED HOUSE',
        label: 'Bungalow',
      },
    ],
  },

  {
    name: 'NONE',
    options: [
      {
        value: 'Does not own any property',
        label: 'Does not own any property',
      },
    ],
  },
]

export const HOUSING_HDB_TYPE: Option[] = [
  { label: '1-Room Flat (HDB)', value: '111' },
  { label: '2-Room Flat (HDB)', value: '112' },
  { label: '3-Room Flat (HDB)', value: '113' },
  { label: '4-Room Flat (HDB)', value: '114' },
  { label: '5-Room Flat (HDB)', value: '115' },
  { label: 'Executive Flat (HDB)', value: '116' },
  {
    label: 'Housing and Urban Development Company (HUDC) Flat (excluding those privatized)',
    value: '117',
  },
  { label: 'Studio Apartment (HDB)', value: '118' },
]

export const HOUSING_PRIVATE_RESIDENTIAL: Option[] = [
  { label: 'Bungalow', value: '121' },
  { label: 'Semi-Detached House', value: '122' },
  { label: 'Terrace House', value: '123' },
  { label: 'Condominium', value: '131' },
  { label: 'Executive Condominium', value: '132' },
  { label: 'Other Apartments nec', value: '139' },
  { label: 'Shophouse', value: '141' },
  { label: 'Other Housing Units nec', value: '149' },
]

export const HOME_OWNERSHIP: Option[] = [
  { label: 'Self-Owned', value: 'Self-Owned' },
  { label: 'Rental', value: 'Rental' },
]

export const STAYING_CONDITION: Option[] = [
  { label: 'Alone', value: 'Alone' },
  { label: 'Family Members', value: 'Family Members' },
]

export const SALUTATION_OPTION: Option[] = [
  { label: 'Mr', value: 'mr' },
  { label: 'Ms', value: 'ms' },
  { label: 'Mrs', value: 'mrs' },
  { label: 'Mdm', value: 'mdm' },
  { label: 'Dr', value: 'dr' },
]

export const YES_NO_OPTION: Option[] = [
  { label: 'Yes', value: '1' },
  { label: 'No', value: '0' },
]

export const REASON_BAD_DEBT: Option[] = [
  { label: 'In-Prison', value: 'In-Prison' },
  { label: 'Deceased', value: 'Deceased' },
  { label: 'Bankrupt', value: 'Bankrupt' },
  { label: 'MIA', value: 'MIA' },
]

export const COUNTRY_PHONE_CODE: Option[] = [{ label: '+65', value: '+65' }]

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

export const MONTHLY_DUE_DATE: any = Array.from({ length: 31 }).reduce((a: any, _, i) => {
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

export const POSITION: Option[] = [
  {
    value: 'director/gm',
    label: 'Director / GM',
  },
  {
    value: 'senior-manager',
    label: 'Senior Manager',
  },
  {
    value: 'manager/assistant',
    label: 'Manager / Assitant Manager',
  },
  {
    value: 'supervisor',
    label: 'Supervisor',
  },
  {
    value: 'senior-executive',
    label: 'Senior Executive',
  },
  {
    value: 'junior-executive',
    label: 'Junior Manager',
  },
  {
    value: 'non-executive',
    label: 'Non-Executive',
  },
  {
    value: 'professional',
    label: 'Professional',
  },
  {
    value: 'self-employed',
    label: 'Self Employed',
  },
  {
    value: 'others',
    label: 'Others',
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
  // {
  //   path: 'company-management',
  //   labelBreadCrumbs: 'Organization Information',
  //   component: CompanyManagement,
  //   priority: [1],
  // },
  {
    path: 'business-units',
    labelBreadCrumbs: 'Business Units',
    priority: [1],
    component: CompanyListing,
  },
  {
    path: 'manager-users',
    labelBreadCrumbs: 'Manager Users',
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
    priority: [1, 2],
    component: LoanTypes,
  },
  {
    path: 'manager-roles',
    labelBreadCrumbs: 'Manager Roles',
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
  {
    path: 'cas-listing',
    labelBreadCrumbs: 'CAs Listing',
    priority: [1],
    component: UploadFileCasCheck,
  },
]

export const MENU_SETTING_LISTING: MenuSettingItem[] = [
  {
    activeKey: uuidv4(),
    title: 'Organization',
    priority: [1, 2],
    children: [
      // {
      //   id: uuidv4(),
      //   to: '/settings/company-management',
      //   label: 'Organization Information',
      //   priority: [1],
      // },
      {
        id: uuidv4(),
        to: '/settings/business-units',
        label: 'Business Units',
        priority: [1],
      },
      {
        id: uuidv4(),
        to: '/settings/manager-users',
        label: 'Manager  Users',
        priority: [1, 2],
      },
      {
        id: uuidv4(),
        to: '/settings/manager-roles',
        label: 'Manager Roles',
        priority: [1, 2],
      },
    ],
  },

  {
    activeKey: uuidv4(),
    title: 'Business Listing',
    priority: [1, 2],
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
        priority: [1, 2],
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
      {
        id: uuidv4(),
        to: '/settings/cas-listing',
        label: 'CAs Listing',
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
        label: 'Configurations',
        priority: [1],
      },
    ],
  },
]
