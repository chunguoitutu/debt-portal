import {Option} from '@/app/types'
import {CustomerCPF, CustomerEmployment, CustomerVehicle} from '@/app/types/customer'
import {POSITION} from '@/app/utils'

type Config<T = any> = ConfigOne<T> | ConfigTwo<T>

type ConfigOne<T> = {
  format?: 'money' | 'date'
} & ConfigGeneral<T>

type ConfigTwo<T> = {
  format?: 'option'
  options: Option[]
} & ConfigGeneral<T>

type ConfigGeneral<T> = {
  key: T
  label: string
}

export const VEHICLE_CONFIG: Config<keyof CustomerVehicle>[] = [
  {
    key: 'number',
    label: 'Number',
  },
  {
    key: 'type',
    label: 'Type',
  },
  {
    key: 'model',
    label: 'Modal',
  },
  {
    key: 'coe_category',
    label: 'COE Category',
  },
  {
    key: 'coe_expiry_date',
    label: 'COE Category',
    format: 'date',
  },
  {
    key: 'open_maket_value',
    label: 'Open Market Value',
    format: 'money',
  },
  {
    key: 'effective_date',
    label: 'Effective Date',
    format: 'date',
  },
]

export const CUSTOMER_EMPLOYMENT_CONFIG: Config<keyof CustomerEmployment>[] = [
  {
    key: 'position',
    label: 'Employment Type',
    format: 'option',
    options: POSITION,
  },
  {
    key: 'employment_status',
    label: 'Self-Employed',
  },
  {
    key: 'company_name',
    label: 'Company Name',
  },
]

export const CPF_CONFIG: Config<keyof CustomerCPF>[] = [
  {
    key: 'date',
    label: 'Date',
  },
  {
    key: 'employer',
    label: 'Employer',
  },
  {
    key: 'amount',
    label: 'Amount',
  },
  {
    key: 'month',
    label: 'Month',
  },
]

export const CUSTOMER_INCOME_CONFIG: Config<keyof CustomerEmployment>[] = [
  {
    key: 'annual_income',
    label: 'Annual Gross Income',
    format: 'money',
  },
  {
    key: 'six_months_income',
    label: 'Past 6 Month Gross Income',
    format: 'money',
  },
  {
    key: 'monthly_income',
    label: 'Average Monthly Income',
    format: 'money',
  },
  {
    key: 'monthly_income_1',
    label: 'Gross Monthly Income (last month)',
    format: 'money',
  },
  {
    key: 'monthly_income_2',
    label: 'Gross Monthly Income (last month -1)',
    format: 'money',
  },
  {
    key: 'monthly_income_3',
    label: 'Gross Monthly Income (last month -2)',
    format: 'money',
  },
]
