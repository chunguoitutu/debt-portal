import NameOfApplication from '../../../components/applications/NameOfApplication'
import Checkbox from '../../../components/checkbox/Checkbox'
import InputAdvance from '../../../components/inputs/InputAdvance'
import {Input} from '../../../components/inputs/input'
import {InputTime} from '../../../components/inputs/inputTime'
import Radio from '../../../components/radio/Radio'
import Select from '../../../components/select/select'
import {GENDER, YES_NO_OPTION} from '../../../utils/globalConfig'
import TextArea from '../../../components/textarea/TextArea'
import {ApplicationConfig, TableConfig} from '../../../modules/auth'
import {Filter} from '../../../components/filter/Filter'
import * as Yup from 'yup'

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
import {convertMessageErrorMaximum, convertMessageErrorRequired} from '../../../utils'

export const GENERAL_INFORMATION_CONFIG: ApplicationConfig[] = [
  {
    key: 'middlename',
    isHide: true,
    validationFormik: Yup.string().max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'lastname',
    isHide: true,
    required: true,
    label: 'Last Name',
    validationFormik: Yup.string()
      .max(255, convertMessageErrorMaximum(255))
      .required(convertMessageErrorRequired('Last Name')),
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
    validationFormik: Yup.string()
      .max(255, convertMessageErrorMaximum(255))
      .required(convertMessageErrorRequired('First Name')),
  },
  {
    key: 'identification_type',
    component: Select,
    column: 6,
    label: 'ID Type',
    required: true,
    options: ID_TYPE,
    validationFormik: Yup.string()
      .max(255, convertMessageErrorMaximum(255))
      .required(convertMessageErrorRequired('ID Type')),
  },
  {
    key: 'identification_no',
    component: InputAdvance,
    column: 6,
    label: 'NRIC No./FIN',
    className: 'justify-content-xl-end',
    required: true,
    validationFormik: Yup.string()
      .max(64, convertMessageErrorMaximum(64))
      .required(convertMessageErrorRequired('ID Type')),
  },
  {
    key: 'residential_type_id',
    component: Select,
    column: 6,
    label: 'Residential Type',
    required: true,
    options: RESIDENTIAL_TYPE,
    dropDownGroup: true,
    validationFormik: Yup.string().required(convertMessageErrorRequired('Residential Type')),
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
    validationFormik: Yup.number().required(convertMessageErrorRequired('Marketing Type')),
  },
  {
    key: 'gender',
    component: Select,
    column: 6,
    label: 'Gender',
    required: true,
    options: GENDER,
    validationFormik: Yup.string().required(convertMessageErrorRequired('Gender')),
  },
  {
    key: 'date_of_birth',
    component: InputTime,
    column: 6,
    label: 'Date of Birth',
    required: true,
    className: 'justify-content-xl-end',
    validationFormik: Yup.string().required(convertMessageErrorRequired('Date of Birth')),
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
    validationFormik: Yup.string().required(convertMessageErrorRequired('Nationality')),
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
    validationFormik: Yup.number().required(convertMessageErrorRequired('Loan Type')),
  },
  {
    key: 'loan_amount_requested',
    component: InputAdvance,
    label: 'Loan Amount',
    isFullLayout: true,
    required: true,
    typeInputAdvanced: 'money',
    typeInput: 'number',
    validationFormik: Yup.number().required(convertMessageErrorRequired('Loan Amount')),
  },
  {
    key: 'loan_terms',
    component: InputAdvance,
    label: 'Loan Terms',
    isFullLayout: true,
    required: true,
    typeInput: 'number',
  },
  {
    key: 'reason_for_loan',
    component: TextArea,
    label: 'Reason For Loan',
    required: true,
    validationFormik: Yup.string().required(convertMessageErrorRequired('Reason For Loan')),
  },
]

export const CONTACT_INFORMATION: ApplicationConfig[] = [
  {
    key: 'mobilephone_1',
    component: InputAdvance,
    label: 'Mobile 1(NIL)',
    column: 6,
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'mobilephone_2',
    component: InputAdvance,
    label: 'Mobile 2(NIL)',
    column: 6,
    className: 'justify-content-xl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'mobilephone_3',
    component: InputAdvance,
    label: 'Mobile 3(NIL)',
    column: 6,
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'homephone',
    component: Input,
    column: 6,
    label: 'Home Phone(NIL)',
    className: 'justify-content-xl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'email_1',
    component: Input,
    column: 6,
    label: 'Email',
    validationFormik: Yup.string()
      .email('Email invalid.')
      .max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'email_2',
    component: Input,
    column: 6,
    label: 'Alternate Email',
    className: 'justify-content-xl-end',
    validationFormik: Yup.string()
      .email('Alternate Email invalid.')
      .max(255, convertMessageErrorMaximum(255)),
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
    validationFormik: Yup.string().max(1024, convertMessageErrorMaximum(1024)),
  },
  {
    key: 'bank_name_2',
    component: Input,
    column: 6,
    label: 'Bank Name 2',
    className: 'justify-content-xl-end',
    validationFormik: Yup.string().max(1024, convertMessageErrorMaximum(1024)),
  },
  {
    key: 'account_number_1',
    component: Input,
    column: 6,
    label: 'Bank Acc 1',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'account_number_2',
    component: Input,
    column: 6,
    label: 'Bank Acc 2',
    className: 'justify-content-xl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'bank_code_1',
    component: Input,
    column: 6,
    label: 'Bank Code 1',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'bank_code_2',
    component: Input,
    column: 6,
    label: 'Bank Code 2',
    className: 'justify-content-xl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
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
    validationFormik: Yup.string().max(100, convertMessageErrorMaximum(100)),
  },
  {
    key: 'address',
    component: Input,
    label: 'Address',
    validationFormik: Yup.string().max(1024, convertMessageErrorMaximum(1024)),
  },
  // {
  //   key: 'office_no',
  //   component: Input,
  //   label: 'Office No.(NIL)',
  //   column: 6,
  // },
  {
    key: 'specialization',
    component: Select,
    label: 'Specialization',
    options: YES_NO_OPTION,
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
    key: 'annual_income',
    component: InputAdvance,
    label: 'Annual Gross Income',
    typeInputAdvanced: 'money',
    typeInput: 'number',
    required: true,
    desc: 'include AWS and Bonus',
    validationFormik: Yup.string().required(convertMessageErrorRequired('Annual Gross Income')),
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
    key: 'six_months_income',
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
    validationFormik: Yup.string().required(convertMessageErrorRequired('Address Type')),
  },
  {
    key: 'address_label',
    component: Input,
    label: 'Address Label',
    column: 6,
    className: 'justify-content-xl-end',
    required: true,
    validationFormik: Yup.string()
      .required(convertMessageErrorRequired('Address Label'))
      .max(1024, convertMessageErrorMaximum(1024)),
  },
  {
    key: 'street_1',
    component: Input,
    label: 'Street 1',
    column: 6,
    required: true,
    validationFormik: Yup.string()
      .required(convertMessageErrorRequired('Street 1'))
      .max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'street_2',
    component: Input,
    label: 'Street 2',
    column: 6,
    className: 'justify-content-xl-end',
    validationFormik: Yup.string().max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'city',
    component: Input,
    label: 'City',
    column: 6,
    required: true,
    validationFormik: Yup.string()
      .required(convertMessageErrorRequired('City'))
      .max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'state',
    component: Input,
    label: 'State',
    column: 6,
    className: 'justify-content-xl-end',
    required: true,
    validationFormik: Yup.string()
      .required(convertMessageErrorRequired('State'))
      .max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'postal_code',
    component: Input,
    label: 'Postal Code',
    column: 6,
    required: true,
    validationFormik: Yup.string()
      .required(convertMessageErrorRequired('Postal Code'))
      .max(64, convertMessageErrorMaximum(64)),
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
    validationFormik: Yup.string()
      .required(convertMessageErrorRequired('Country'))
      .max(255, convertMessageErrorMaximum(255)),
  },
]

export const TABLE_LOOKUP_CUSTOMER: TableConfig = {
  endpoint: '/ccc/ccc',
  settings: {
    endPointGetListing: '',
    showViewButton: true,
    showAddNewButton: false,
    showAction: true,
    showRefresh: true
  },
  rows: [
    {
      key: 'id',
      name: 'LN',
      component: Filter,
      isShowInput: false,
    },
    {
      key: 'nric_no',
      name: 'NRIC',
      component: Filter,
      isShowInput: false,
    },
    {
      key: 'name',
      name: 'Name',
      component: Filter,
      isShowInput: false,
    },
    {
      key: 'company_name',
      name: 'Company Name',
      component: Filter,
    },
  ],
}
