import NameOfApplication from '../../../components/applications/NameOfApplication'
import Checkbox from '../../../components/checkbox/Checkbox'
import Input from '../../../components/input'
import Radio from '../../../components/radio/Radio'
import Select from '../../../components/select/select'
import {GENDER, LANGUAGES, SPECIALIZATION, YES_NO_OPTION} from '../../../utils/globalConfig'
import TextArea from '../../../components/textarea/TextArea'
import {ApplicationConfig, TableConfig} from '../../../modules/auth'
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
  },
  {
    key: 'firstname',
    component: NameOfApplication,
    label: 'Name Of Applicant',
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
    component: Input,
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
    key: 'marketing_type_id',
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
    component: Input,
    column: 6,
    label: 'Date of Birth',
    required: true,
    className: 'justify-content-xl-end',
    typeInput: 'date',
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
  {
    key: 'spoken_language',
    component: Select,
    options: LANGUAGES,
    column: 6,
    label: 'Language Spoken',
    className: 'justify-content-xl-end',
    required: true,
    validationFormik: Yup.string().required(convertMessageErrorRequired('Language Spoken')),
  },
]

export const LOAN_DETAILS_CONFIG: ApplicationConfig[] = [
  {
    key: 'mlcb_check',
    data: MLCB_CHECK,
    component: Checkbox,
    defaultValue: true,
    label: '',
  },
  {
    key: 'loan_type_id',
    component: Select,
    label: 'Loan Type',
    options: LOAN_TYPE,
    required: true,
    keyLabelOfOptions: 'type_name',
    keyValueOfOptions: 'id',
    dependencyApi: '/config/loan_type/listing',
    validationFormik: Yup.number().required(convertMessageErrorRequired('Loan Type')),
  },
  {
    key: 'loan_amount_requested',
    component: Input,
    label: 'Loan Amount',
    required: true,
    typeInput: 'money',
    noThereAreCommas: false,
    validationFormik: Yup.number().required(convertMessageErrorRequired('Loan Amount')),
  },
  {
    key: 'loan_terms',
    component: Input,
    label: 'Loan Terms (months)',
    required: true,
    typeInput: 'number',
    validationFormik: Yup.number()
      .required(convertMessageErrorRequired('Loan Terms'))
      .max(100, convertMessageErrorMaximum(100, true)),
  },
  {
    key: 'reason_for_loan',
    component: TextArea,
    label: 'Reason For Loan',
    required: true,
    validationFormik: Yup.string().required(convertMessageErrorRequired('Reason For Loan')),
  },
]

// Yup string will not validate (because typeInput phone === type number)
export const CONTACT_INFORMATION: ApplicationConfig[] = [
  {
    key: 'mobilephone_1',
    component: Input,
    label: 'Mobile 1(NIL)',
    column: 6,
    typeInput: 'phone',
    validationFormik: Yup.number().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'mobilephone_2',
    component: Input,
    label: 'Mobile 2(NIL)',
    column: 6,
    typeInput: 'phone',
    className: 'justify-content-xl-end',
    validationFormik: Yup.number().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'mobilephone_3',
    component: Input,
    label: 'Mobile 3(NIL)',
    column: 6,
    typeInput: 'phone',
    validationFormik: Yup.number().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'homephone',
    component: Input,
    column: 6,
    typeInput: 'phone',
    label: 'Home Phone(NIL)',
    className: 'justify-content-xl-end',
    validationFormik: Yup.number().max(64, convertMessageErrorMaximum(64)),
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
  {
    key: 'company_telephone',
    component: Input,
    label: 'Company Telephone',
    column: 6,
    typeInput: 'phone',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'portal_code',
    component: Input,
    label: 'Company	Postal Code',
    column: 6,
    className: 'justify-content-xl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'position',
    component: Input,
    label: 'Position',
    column: 6,
    validationFormik: Yup.string().max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'occupation',
    component: Input,
    label: 'Occupation',
    column: 6,
    className: 'justify-content-xl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'specialization',
    component: Select,
    label: 'Specialization',
    options: SPECIALIZATION,
  },
  {
    key: 'annual_income',
    component: Input,
    label: 'Annual Gross Income',
    typeInput: 'money',
    required: true,
    desc: 'include AWS and Bonus',
    validationFormik: Yup.number().required(convertMessageErrorRequired('Annual Gross Income')),
  },
  {
    key: 'monthly_income_1',
    component: GrossMonthlyIncome,
    label: 'Gross Monthly Income',
  },
  {
    key: 'monthly_income',
    component: Input,
    label: 'Average Monthly Income',
    typeInput: 'money',
    disabled: true,
  },
  {
    key: 'six_months_income',
    component: Input,
    label: 'Past 6 Month Gross Income',
    typeInput: 'money',
  },

  {
    key: 'income_document',
    data: INCOME_DOCUMENT,
    defaultValue: [],
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
  settings: {
    endPointGetListing: '/application/lookup',
    showViewButton: true,
    showAddNewButton: false,
    showAction: true,
    showRefresh: true,
  },
  rows: [
    {
      key: 'id',
      name: 'LN',
      isShowInput: false,
    },
    {
      key: 'identification_no',
      name: 'NRIC',
      isShowInput: false,
    },
    {
      key: 'firstname',
      name: 'First Name',
      isShowInput: false,
    },
    {
      key: 'lastname',
      name: 'Last Name',
    },
  ],
}
