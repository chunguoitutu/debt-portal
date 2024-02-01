import {MenuItem, TableConfig, TableRow} from '@/app/types'
import GeneralInformation from './GeneralInformation'
import Authentication from './Authentication'

export type Props = {
  key: string
  label: string
  format?: string
}

export const PROFILE_MENU: MenuItem[] = [
  {id: 1, label: 'General Information', default: true, component: GeneralInformation},
  {id: 2, label: 'Authentication', component: Authentication},
]

export const PROFILE_CONFIG: TableRow[] = [
  {
    key: 'name',
    name: 'Name',
    format: 'fullname',
  },
  {
    key: 'date_of_birth',
    name: 'Date Of Birth',
    format: 'date',
    formatDate: 'DD/MM/YYYY',
  },
  {
    key: 'email',
    name: 'Email',
    className: 'text-truncate',
    isEditField: true,
  },
  {
    key: 'phone',
    name: 'Phone Number',
    format: 'phone',
    isEditField: true,
  },
  {
    key: 'address',
    name: 'Address',
    className: 'six-line',
  },
]

// export const AUTHENTICATION_CONFIG: TableRow[] = [
//   {
//     key: 'name',
//     name: 'Name',
//     format: 'fullname',
//   },
//   {
//     key: 'date_confirm',
//     name: 'Email OTP',
//     format: 'date',
//     formatDate: 'DD/MM/YYYY',
//   },
// ]

export const currentUser = {
  firstname: 'Xiao Hui',
  lastname: 'Tan',
  date_of_birth: '2024-01-26',
  email: 'xiao@gmail.com',
  phone: '04651236978',
  address: '548, Any Building name, if applicable, 09, 128, North Avenue 1, 460548, Singapore',
}
