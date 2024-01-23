import { Option } from '@/app/types'
import { CustomerCPF, CustomerEmployment, CustomerVehicle } from '@/app/types/customer'
import { POSITION } from '@/app/utils'
import Profile from './Profile'
import Employment from './Employment'
import Addresses from './Addresses'
import Vehicles from './Vehicles'
import CPF from './CPF'
import Status from './Status'

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

export type DataOverview = {
  data: {
    profile: {
      identification_no: string
      gender: string
      date_of_birth: string
      country_id: string
      company: string
      mobilephone_1: string
      email1: string
    }
    employment: {
      address: string
      annual_income: number
      bankrupt_plan: number
      bankrupted: number
      borrower_id: number
      company_name: string
      company_telephone: string
      employment_status: string
      employment_type: string
      id: number
      monthly_income: string
      monthly_income_1: number
      monthly_income_2: number
      monthly_income_3: number
      occupation: string
      pay_date: string
      portal_code: string
      position: string
      self_employed: number
      six_months_income: number
      specialization: string
    }
    status: {
      blacklisted: number
      exclusion_remarks: string
    }
    addresses: any[]
    cpf: any[]
    vehicle: any[]
  }
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

export const CONFIG_ADDRESS = [
  {
    key: 'unit',
    value: 'Unit',
  },
  {
    key: 'block',
    value: 'Block',
  },
  {
    key: 'building',
    value: 'Building',
  },
  {
    key: 'street',
    value: 'Street',
  },
  {
    key: 'postal_code',
    value: 'Postal',
  },
  {
    key: 'country',
    value: 'Country',
  },
  {
    key: 'address_label',
    value: 'Address Label',
  },
]

export const CONFIG_OVERVIEW = [
  {
    title: 'Profile',
    Comment: Profile,
  },
  {
    title: 'Addresses',
    Comment: Addresses,
  },
  {
    title: 'Employment',
    Comment: Employment,
  },
  {
    title: 'Vehicles',
    Comment: Vehicles,
  },
  {
    title: 'CPF',
    Comment: CPF,
  },
  {
    title: 'Status',
    Comment: Status,
  },
]

export const CONFIG_PROFILE = [
  {
    key: 'identification_no',
    value: 'NRIC No',
  },
  {
    key: 'gender',
    value: 'Gender',
  },
  {
    key: 'date_of_birth',
    value: 'Date of birth',
  },
  {
    key: 'country_id',
    value: 'Nationalities',
  },
  {
    key: 'company',
    value: 'Company',
  },
  {
    key: 'mobilephone_1',
    value: 'Phone',
  },
  {
    key: 'email1',
    value: 'Email',
  },
]

export const CONFIG_STATUS = [
  {
    key: 'blacklisted',
    value: 'Blacklisted',
  },
  {
    key: 'exclusion_remarks',
    value: 'Exclusion remarks',
  },
]

export const config_activeCustomer = [
  {
    value: 1,
    label: 'active',
    background: '#E8FFF3',
    color: '#50CD89',
  },
  {
    value: 2,
    label: 'In-Prison',
    background: '#FFE2E5',
    color: '#F64E60',
  },
  {
    value: 3,
    label: 'Decreased',
    background: '#FFE2E5',
    color: '#F64E60',
  },
  {
    value: 4,
    label: 'Bankrupt',
    background: '#FFE2E5',
    color: '#F64E60',
  },
  {
    value: 5,
    label: 'Missing',
    background: '#FFE2E5',
    color: '#F64E60',
  },
]
