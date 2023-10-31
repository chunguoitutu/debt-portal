import NameOfApplication from '../../../components/applications/NameOfApplication'
import InputAdvance from '../../../components/inputs/InputAdvance'
import {Input} from '../../../components/inputs/input'
import {InputTime} from '../../../components/inputs/inputTime'
import Radio from '../../../components/radio/Radio'
import Select from '../../../components/select/select'
import {ApplicationConfig} from '../../../modules/auth'
import {CUSTOMER_TYPE} from '../../../utils/globalConfig'

export const GENERAL_INFORMATION_CONFIG: ApplicationConfig[] = [
  {
    key: 'middle_name',
    isHide: true,
  },
  {
    key: 'last_name',
    isHide: true,
    required: true,
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
    key: 'first_name',
    component: NameOfApplication,
    label: 'Name Of Applicant',
    required: true,
  },
  {
    key: 'id_type',
    component: Input,
    column: 6,
    label: 'ID Type',
    required: true,
  },
  {
    key: 'nric_no',
    component: InputAdvance,
    column: 6,
    label: 'NRIC No./FIN',
    className: 'justify-content-xl-end',
    required: true,
  },
  {
    key: 'residential_type',
    component: Input,
    column: 6,
    label: 'Residential Type',
    required: true,
  },
  {
    key: 'marketing_type',
    component: Select,
    column: 6,
    label: 'Marketing Type',
    className: 'justify-content-xl-end',
    required: true,
  },
  {
    key: 'gender',
    component: Select,
    column: 6,
    label: 'Gender',
    required: true,
    options: [
      {
        label: 'Male',
        value: 'male',
      },
      {
        label: 'Female',
        value: 'female',
      },
    ],
  },
  {
    key: 'date_of_birth',
    component: InputTime,
    column: 6,
    label: 'Date of Birth',
    required: true,
    className: 'justify-content-xl-end',
  },
  {
    key: 'nationality',
    component: Input,
    column: 6,
    label: 'Nationality',
    required: true,
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
