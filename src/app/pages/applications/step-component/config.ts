import InputAdvance from '../../../components/inputs/InputAdvance'
import {Input} from '../../../components/inputs/input'
import Radio from '../../../components/radio/Radio'
import {SALUTATION_OPTION} from '../../../constants/option'
import {ApplicationConfig} from '../../../modules/auth'
import {CUSTOMER_TYPE} from '../../../utils/globalConfig'

export const GENERAL_INFORMATION_CONFIG: ApplicationConfig[] = [
  {
    key: 'salutation',
    isHide: true,
    defaultValue: SALUTATION_OPTION[0].value,
  },
  {
    key: 'customer_type',
    data: CUSTOMER_TYPE,
    defaultValue: CUSTOMER_TYPE[0].value,
    component: Radio,
    label: ' ',
    isFullLayout: true,
  },
  {
    key: 'name',
    component: InputAdvance,
    label: 'Application Name',
  },
  {
    key: 'application',
    component: Input,
    column: 6,
    label: 'Application',
  },
  {
    key: 'address',
    component: Input,
    column: 6,
    label: 'Address',
  },
]

export const LOAN_DETAILS_CONFIG: ApplicationConfig[] = [
  {
    key: 'n_ric',
    component: Input,
    label: 'Nric',
  },
  {
    key: 'telephone',
    component: Input,
    column: 6,
    label: 'Telephone',
  },
  {
    key: 'address',
    component: Input,
    column: 6,
    label: 'Address',
  },
]
