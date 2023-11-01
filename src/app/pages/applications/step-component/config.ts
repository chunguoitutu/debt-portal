import NameOfApplication from '../../../components/applications/NameOfApplication'
import Checkbox from '../../../components/checkbox/Checkbox'
import InputAdvance from '../../../components/inputs/InputAdvance'
import {Input} from '../../../components/inputs/input'
import {InputTime} from '../../../components/inputs/inputTime'
import Radio from '../../../components/radio/Radio'
import Select from '../../../components/select/select'
import {YES_NO_OPTION} from '../../../constants/option'
import TextArea from '../../../components/textarea/TextArea'
import {COUNTRY_PHONE_CODE} from '../../../constants/option'
import {ApplicationConfig} from '../../../modules/auth'
import {CUSTOMER_TYPE, EMPLOYMENT_STATUS, MLCB_CHECK} from '../../../utils/globalConfig'
import {COUNTRY_LIST} from '../../../constants/countries'
import GrossMonthlyIncome from '../../../components/applications/GrossMonthlyIncome'

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
    component: Select,
    column: 6,
    label: 'Nationality',
    options: COUNTRY_LIST,
    keyLabelOfOptions: 'name',
    keyValueOfOptions: 'code',
    required: true,
  },
]

export const LOAN_DETAILS_CONFIG: ApplicationConfig[] = [
  {
    key: 'mlcb_check',
    data: MLCB_CHECK,
    defaultValue: MLCB_CHECK[0].value,
    component: Checkbox,
    label: '',
    isFullLayout: true,
  },
  {
    key: 'loan_type',
    component: Input,
    label: 'Loan Type',
    isFullLayout: true,
    required: true,
  },
  {
    key: 'loan_amount_required',
    component: Input,
    label: 'Loan Amount Required $',
    isFullLayout: true,
    required: true,
  },
  {
    key: 'reason_for_loan',
    component: TextArea,
    label: 'Reason For Loan',
    required: true,
  },
]

export const CONTRACT_INFORMATION: ApplicationConfig[] = [
  {
    key: 'address_full',
    component: Input,
    label: 'Address Full',
    isFullLayout: true,
  },
  {
    key: 'postal_code',
    component: Input,
    column: 6,
    label: 'Postal Code',
  },
  {
    key: 'block_no',
    component: Input,
    column: 6,
    label: 'Block/No',
  },
  {
    key: 'street',
    component: Input,
    column: 6,
    label: 'Street',
  },
  {
    key: 'building',
    component: Input,
    column: 6,
    label: 'Building',
  },
  {
    key: 'mailing_address',
    component: Input,
    column: 6,
    label: 'Mailing Address',
  },
  {
    key: 'address_foreign',
    component: Input,
    column: 6,
    label: 'Address (Foreign)',
  },
  {
    key: 'mobile_1_nil',
    component: InputAdvance,
    label: 'Mobile 1(NIL)',
    defaultValue: COUNTRY_PHONE_CODE[0].value,
    column: 6,
  },
  {
    key: 'mobile_2_nil',
    component: InputAdvance,
    label: 'Mobile 2(NIL)',
    defaultValue: COUNTRY_PHONE_CODE[0].value,
    column: 6,
  },
  {
    key: 'home_no_nil',
    component: Input,
    column: 6,
    label: 'Home No.(NIL)',
  },
  {
    key: 'language_spoken',
    component: Select,
    data: [{label: 'English', value: 'English'}],
    column: 6,
    label: 'Language Spoken',
  },
  {
    key: 'email',
    component: Input,
    column: 6,
    label: 'Email',
  },
  {
    key: 'alternate_email',
    component: Input,
    column: 6,
    label: 'Alternate Email',
  },
]

export const BANK_INFO_CONFIG = [
  {
    key: 'is_giro',
    data: YES_NO_OPTION,
    defaultValue: YES_NO_OPTION[0].value,
    component: Radio,
    label: 'Is it GIRO',
  },
  {
    key: 'bank_name_1',
    component: Input,
    column: 6,
    label: 'Bank Name 1',
  },
  {
    key: 'bank_name_2',
    component: Input,
    column: 6,
    label: 'Bank Name 2',
    className: 'justify-content-xl-end',
  },
  {
    key: 'account_number_1',
    component: Input,
    column: 6,
    label: 'Bank Acc 1',
  },
  {
    key: 'account_number_2',
    component: Input,
    column: 6,
    label: 'Bank Acc 2',
    className: 'justify-content-xl-end',
  },
  {
    key: 'bank_code_1',
    component: Input,
    column: 6,
    label: 'Bank Code 1',
  },
  {
    key: 'bank_code_2',
    component: Input,
    column: 6,
    label: 'Bank Code 2',
    className: 'justify-content-xl-end',
  },
]

export const EMPLOYMENT_CONFIG: ApplicationConfig[] = [
  {
    key: 'monthly_income_2',
    isHide: true,
    required: true,
  },
  {
    key: 'monthly_income_3',
    isHide: true,
    required: true,
  },
  {
    key: 'employment',
    data: EMPLOYMENT_STATUS,
    defaultValue: EMPLOYMENT_STATUS[0].value,
    component: Radio,
    label: ' ',
  },
  {
    key: 'company_name',
    component: Input,
    label: 'Company Name',
  },
  {
    key: 'address',
    component: Input,
    label: 'Address',
  },
  {
    key: 'office_no',
    component: Input,
    label: 'Office No.(NIL)',
    column: 6,
  },
  {
    key: 'portal_code',
    component: Input,
    label: 'Company	Postal Code',
    column: 6,
    className: 'justify-content-xl-end',
  },
  {
    key: 'specialization',
    component: Select,
    label: 'Specialization',
    options: YES_NO_OPTION,
  },
  {
    key: 'monthly_income_1',
    component: GrossMonthlyIncome,
    label: 'Gross Monthly Income',
    options: YES_NO_OPTION,
    required: true,
  },
  {
    key: 'avg_income',
    component: InputAdvance,
    label: 'Average Monthly Income',
    typeInput: 'money',
  },
  {
    key: '6_months_income',
    component: InputAdvance,
    label: 'Past 6 Month Gross Income',
    typeInput: 'money',
  },
  {
    key: 'annual_income',
    component: InputAdvance,
    label: 'Annual Gross Income',
    typeInput: 'money',
    desc: 'include AWS and Bonus',
  },
]
