import NameOfApplication from '../../../components/applications/NameOfApplication'
import Checkbox from '../../../components/checkbox/Checkbox'
import InputAdvance from '../../../components/inputs/InputAdvance'
import {Input} from '../../../components/inputs/input'
import {InputTime} from '../../../components/inputs/inputTime'
import Radio from '../../../components/radio/Radio'
import Select from '../../../components/select/select'
import {YES_NO_OPTION} from '../../../utils/globalConfig'
import TextArea from '../../../components/textarea/TextArea'
import {ApplicationConfig} from '../../../modules/auth'
import {
  CUSTOMER_TYPE,
  EMPLOYMENT_STATUS,
  ID_TYPE,
  INCOME_DOCUMENT,
  LOAN_TYPE,
  MARKETING_TYPE,
  MLCB_CHECK,
  RESIDENTIAL_TYPE,
} from '../../../utils/globalConfig'
import {COUNTRY_LIST} from '../../../constants/countries'
import GrossMonthlyIncome from '../../../components/applications/GrossMonthlyIncome'

export const GENERAL_INFORMATION_CONFIG: ApplicationConfig[] = [
  {
    key: 'middlename',
    isHide: true,
  },
  {
    key: 'lastname',
    isHide: true,
    required: true,
    label: 'Last Name',
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
    key: 'firstname',
    component: NameOfApplication,
    label: 'Name Of Applicant',
    labelError: 'First Name',
    required: true,
  },
  {
    key: 'identification_type',
    component: Select,
    column: 6,
    label: 'ID Type',
    required: true,
    options: ID_TYPE,
  },
  {
    key: 'identification_no',
    component: InputAdvance,
    column: 6,
    label: 'NRIC No./FIN',
    className: 'justify-content-xl-end',
    required: true,
  },
  {
    key: 'residential_type',
    component: Select,
    column: 6,
    label: 'Residential Type',
    required: true,
    options: RESIDENTIAL_TYPE,
    dropDownGroup: true,
  },
  {
    key: 'marketing_type',
    component: Select,
    column: 6,
    label: 'Marketing Type',
    className: 'justify-content-xl-end',
    required: true,
    options: MARKETING_TYPE,
    keyLabelOfOptions: 'marketing_type_name',
    keyValueOfOptions: 'id',
    dependencyApi: 'config/marketing_type/listing',
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
    component: Checkbox,
    defaultValue: true,
    label: '',
    isFullLayout: true,
  },
  {
    key: 'loan_type_id',
    component: Select,
    label: 'Loan Type',
    isFullLayout: true,
    options: LOAN_TYPE,
    required: true,
    keyLabelOfOptions: 'type_name',
    keyValueOfOptions: 'id',
    dependencyApi: '/config/loan_type/listing',
  },
  {
    key: 'loan_amount_requested',
    component: InputAdvance,
    label: 'Loan Amount Required',
    isFullLayout: true,
    required: true,
    typeInputAdvanced: 'money',
    typeInput: 'number',
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
    key: 'mobilephone_1',
    component: InputAdvance,
    label: 'Mobile 1(NIL)',
    column: 6,
  },
  {
    key: 'mobilephone_2',
    component: InputAdvance,
    label: 'Mobile 2(NIL)',
    column: 6,
    className: 'justify-content-xl-end',
  },
  {
    key: 'mobilephone_3',
    component: InputAdvance,
    label: 'Mobile 3(NIL)',
    column: 6,
  },
  {
    key: 'homephone',
    component: Input,
    column: 6,
    label: 'Home Phone(NIL)',
    className: 'justify-content-xl-end',
  },
  {
    key: 'email_1',
    component: Input,
    column: 6,
    label: 'Email',
  },
  {
    key: 'email_2',
    component: Input,
    column: 6,
    label: 'Alternate Email',
    className: 'justify-content-xl-end',
  },
  // {
  //   key: 'spoken_language',
  //   component: Select,
  //   options: LANGUAGES,
  //   column: 6,
  //   label: 'Language Spoken',
  //   className: 'justify-content-xl-end',
  // },
]

export const BANK_INFO_CONFIG: ApplicationConfig[] = [
  {
    key: 'is_giro',
    data: YES_NO_OPTION,
    defaultValue: YES_NO_OPTION[0].value,
    component: Radio,
    label: 'Is it GIRO',
    className: 'no-center-label',
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
    label: 'Monthly Income 2',
  },
  {
    key: 'monthly_income_3',
    isHide: true,
    label: 'Monthly Income 3',
  },
  {
    key: 'employment_status',
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
    key: 'annual_income',
    component: InputAdvance,
    label: 'Annual Gross Income',
    typeInputAdvanced: 'money',
    typeInput: 'number',
    required: true,
    desc: 'include AWS and Bonus',
  },
  {
    key: 'monthly_income_1',
    component: GrossMonthlyIncome,
    label: 'Gross Monthly Income',
    labelError: 'Monthly Income 1',
  },
  {
    key: 'monthly_income',
    component: InputAdvance,
    label: 'Average Monthly Income',
    typeInputAdvanced: 'money',
    disabled: true,
    typeInput: 'number',
  },
  {
    key: '6_months_income',
    component: InputAdvance,
    label: 'Past 6 Month Gross Income',
    typeInputAdvanced: 'money',
    typeInput: 'number',
  },

  {
    key: 'income_document',
    data: INCOME_DOCUMENT,
    defaultValue: ['pay_slip'],
    component: Checkbox,
    label: 'Income Document',
    className: 'no-center-label',
    typeCheckbox: 'array',
  },
]

export const BLOCK_ADDRESS_CONFIG: ApplicationConfig[] = [
  {
    key: 'address_type_id',
    component: Select,
    label: 'Address Type',
    column: 6,
    dependencyApi: '/config/address_type/listing',
    keyLabelOfOptions: 'address_type_name',
    keyValueOfOptions: 'id',
    required: true,
  },
  {
    key: 'address_label',
    component: Input,
    label: 'Address Label',
    column: 6,
    className: 'justify-content-xl-end',
    required: true,
  },
  {
    key: 'street_1',
    component: Input,
    label: 'Street 1',
    column: 6,
    required: true,
  },
  {
    key: 'street_2',
    component: Input,
    label: 'Street 2',
    column: 6,
    className: 'justify-content-xl-end',
  },
  {
    key: 'city',
    component: Input,
    label: 'City',
    column: 6,
    required: true,
  },
  {
    key: 'state',
    component: Input,
    label: 'State',
    column: 6,
    className: 'justify-content-xl-end',
    required: true,
  },
  {
    key: 'postal_code',
    component: Input,
    label: 'Postal Code',
    column: 6,
    required: true,
  },
  {
    key: 'country',
    component: Select,
    label: 'Country',
    column: 6,
    className: 'justify-content-xl-end',
    options: COUNTRY_LIST,
    keyLabelOfOptions: 'name',
    keyValueOfOptions: 'code',
    required: true,
  },
]
