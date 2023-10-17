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

export const MONTHLY_DUE_DATE = Array.from({length: 31}).reduce(
  (a: any, _, i) => {
    const value = [
      ...a,
      {
        value: `${i + 1}${nth(i + 1)}`,
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
