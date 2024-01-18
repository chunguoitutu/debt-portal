import {Option} from '@/app/types'
import {CustomerEmployment, CustomerVehicle} from '@/app/types/customer'
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
