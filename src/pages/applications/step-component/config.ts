import * as Yup from 'yup'
import NameOfApplication from '@/components/applications/NameOfApplication'
import {Input} from '@/components/input'
import Radio from '@/components/radio/Radio'
import {Select} from '@/components/select'
import {TextArea} from '@/components/textarea'
import GrossMonthlyIncome from '@/components/applications/GrossMonthlyIncome'
import FullName from './completion/FullName'
import Address from './completion/Address'
import GrossMonthlyIncomeCompletion from './completion/GrossMonthlyIncomeCompletion'
import LableOptions from './completion/LableOptions'
import SpecialZation from './completion/SpecialZation'
import RenderOptionsApi from './completion/RenderOptionsApi'
import RenderOptionsApiAddress from './completion/AddressType'
import MLCBCheck from './completion/MLCBCheck'
import EmploymentStatus from './completion/EmploymentStatus'
import FileDocument from './employment/FileDocument'
import RenderFileDocument from './completion/RenderFileDocument'
import {children_config_completion} from './completion'
import LableOptionsCountry from './completion/Country'
import {ApplicationConfig, TableConfig} from '@/app/types'
import {convertMessageErrorMaximum, convertMessageErrorRequired} from '@/app/utils'
import {
  CUSTOMER_TYPE,
  EMPLOYMENT_STATUS,
  GENDER,
  ID_TYPE,
  INCOME_DOCUMENT,
  LANGUAGES,
  LOAN_TYPE,
  MLCB_CHECK,
  POSITION,
  RESIDENTIAL_TYPE,
  SPECIALIZATION,
  YES_NO_OPTION,
} from '@/app/utils/global-config'
import PositionName from './completion/PositionName'
import {Checkbox} from '@/components/checkbox'

const GENERAL_INFORMATION_CONFIG: ApplicationConfig[] = [
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
    key: 'is_existing',
    data: CUSTOMER_TYPE,
    defaultValue: CUSTOMER_TYPE[0].value,
    component: Radio,
    typeComponent: 'Radio',
    label: ' ',
  },
  {
    key: 'firstname',
    component: NameOfApplication,
    typeComponent: 'NameOfApplication',
    label: 'Name Of Applicant',
    required: true,
    validationFormik: Yup.string()
      .max(255, convertMessageErrorMaximum(255))
      .required(convertMessageErrorRequired('First Name')),
  },
  {
    key: 'identification_type',
    component: Select,
    typeComponent: 'Select',
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
    typeComponent: 'Input',
    column: 6,
    label: 'NRIC No./FIN',
    className: 'justify-content-xxl-end',
    required: true,
    validationFormik: Yup.string()
      .max(64, convertMessageErrorMaximum(64))
      .required(convertMessageErrorRequired('NRIC No./FIN')),
  },
  {
    key: 'residential_type',
    component: Select,
    typeComponent: 'Select',
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
    typeComponent: 'Select',
    column: 6,
    label: 'Marketing Type',
    className: 'justify-content-xxl-end',
    required: true,
    keyLabelOfOptions: 'marketing_type_name',
    keyValueOfOptions: 'id',
    dependencyApi: 'config/marketing_type/listing',
    validationFormik: Yup.number().required(convertMessageErrorRequired('Marketing Type')),
  },
  {
    key: 'gender',
    component: Select,
    typeComponent: 'Select',
    column: 6,
    label: 'Gender',
    required: true,
    options: GENDER,
    validationFormik: Yup.string().required(convertMessageErrorRequired('Gender')),
  },
  {
    key: 'date_of_birth',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    label: 'Date of Birth',
    required: true,
    className: 'justify-content-xxl-end',
    typeInput: 'date',
    validationFormik: Yup.string().required(convertMessageErrorRequired('Date of Birth')),
  },
  {
    key: 'country_id',
    component: Select,
    typeComponent: 'Select',
    column: 6,
    label: 'Nationality',
    keyLabelOfOptions: 'nationality',
    defaultValue: 192, //default value country is SINGAPORE
    keyValueOfOptions: 'id',
    dependencyApi: 'config/country/listing',
    required: true,
    validationFormik: Yup.string().required(convertMessageErrorRequired('Nationality')),
  },
  {
    key: 'spoken_language',
    component: Select,
    typeComponent: 'Select',
    options: LANGUAGES,
    defaultValue: LANGUAGES[0].value,
    column: 6,
    label: 'Language Spoken',
    className: 'justify-content-xxl-end',
    required: true,
    validationFormik: Yup.string().required(convertMessageErrorRequired('Language Spoken')),
  },
]

const LOAN_DETAILS_CONFIG: ApplicationConfig[] = [
  {
    key: 'mlcb_check',
    data: MLCB_CHECK,
    component: Checkbox,
    typeComponent: 'Checkbox',
    defaultValue: true,
    label: '',
  },
  {
    key: 'loan_type_id',
    component: Select,
    typeComponent: 'Select',
    label: 'Loan Type',
    options: LOAN_TYPE,
    required: true,
    keyLabelOfOptions: 'type_name',
    keyValueOfOptions: 'id',
    dependencyApi: '/config/loan_type/listing',
    validationFormik: Yup.number().required(convertMessageErrorRequired('Loan Type')),
  },
  {
    key: 'interest',
    component: Input,
    typeComponent: 'Input',
    label: 'Interest (%)',
    typeInput: 'number',
    required: true,
    noThereAreCommas: false,
    validationFormik: Yup.number().required(convertMessageErrorRequired('Interest')),
  },
  {
    key: 'loan_amount_requested',
    component: Input,
    typeComponent: 'Input',
    label: 'Loan Amount',
    required: true,
    typeInput: 'money',
    noThereAreCommas: false,
    validationFormik: Yup.number()
      .required(convertMessageErrorRequired('Loan Amount'))
      .max(5000, 'Loan Amount must be less than or equal to 5000$'),
  },
  {
    key: 'loan_terms',
    component: Input,
    typeComponent: 'Input',
    label: 'Loan Terms (months)',
    required: true,
    typeInput: 'number',
    defaultValue: '12',
    validationFormik: Yup.number()
      .required(convertMessageErrorRequired('Loan Terms'))
      .max(1000, convertMessageErrorMaximum(100, true)),
  },
  {
    key: 'loan_reason',
    component: TextArea,
    typeComponent: 'TextArea',
    label: 'Reason For Loan',
  },
]

// Yup string will not validate (because typeInput phone === type number)
const CONTACT_INFORMATION: ApplicationConfig[] = [
  {
    key: 'mobilephone_1',
    component: Input,
    typeComponent: 'Input',
    label: 'Mobile 1(NIL)',
    column: 6,
    typeInput: 'phone',
    validationFormik: Yup.string()
      .max(64, convertMessageErrorMaximum(64))
      .required(convertMessageErrorRequired('Mobile 1(NIL)')),
    required: true,
  },
  {
    key: 'mobilephone_2',
    component: Input,
    typeComponent: 'Input',
    label: 'Mobile 2(NIL)',
    column: 6,
    typeInput: 'phone',
    className: 'justify-content-xxl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'mobilephone_3',
    component: Input,
    typeComponent: 'Input',
    label: 'Mobile 3(NIL)',
    column: 6,
    typeInput: 'phone',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'homephone',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    typeInput: 'phone',
    label: 'Home Phone(NIL)',
    className: 'justify-content-xxl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'email_1',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    label: 'Email',
    validationFormik: Yup.string()
      .email('Email invalid.')
      .max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'email_2',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    label: 'Alternate Email',
    className: 'justify-content-xxl-end',
    validationFormik: Yup.string()
      .email('Alternate Email invalid.')
      .max(255, convertMessageErrorMaximum(255)),
  },
]

const BANK_INFO_CONFIG: ApplicationConfig[] = [
  {
    key: 'is_giro',
    data: YES_NO_OPTION,
    defaultValue: YES_NO_OPTION[1].value,
    component: Radio,
    typeComponent: 'Radio',
    label: 'Is it GIRO',
    className: 'no-center-label',
  },
  {
    key: 'bank_name_1',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    label: 'Bank Name 1',
    validationFormik: Yup.string().max(1024, convertMessageErrorMaximum(1024)),
  },
  {
    key: 'bank_name_2',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    label: 'Bank Name 2',
    className: 'justify-content-xxl-end',
    validationFormik: Yup.string().max(1024, convertMessageErrorMaximum(1024)),
  },
  {
    key: 'account_number_1',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    label: 'Bank Acc 1',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'account_number_2',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    label: 'Bank Acc 2',
    className: 'justify-content-xxl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'bank_code_1',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    label: 'Bank Code 1',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'bank_code_2',
    component: Input,
    typeComponent: 'Input',
    column: 6,
    label: 'Bank Code 2',
    className: 'justify-content-xxl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
]

const EMPLOYMENT_CONFIG: ApplicationConfig[] = [
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
    typeComponent: 'Radio',
    label: ' ',
  },
  {
    key: 'company_name',
    component: Input,
    typeComponent: 'Input',
    label: 'Company Name',
    validationFormik: Yup.string().max(100, convertMessageErrorMaximum(100)),
  },
  {
    key: 'address',
    component: Input,
    typeComponent: 'Input',
    label: 'Address',
    validationFormik: Yup.string().max(1024, convertMessageErrorMaximum(1024)),
  },
  {
    key: 'company_telephone',
    component: Input,
    typeComponent: 'Input',
    label: 'Telephone',
    column: 6,
    typeInput: 'phone',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'portal_code',
    component: Input,
    typeComponent: 'Input',
    label: 'Postal Code',
    column: 6,
    className: 'justify-content-xxl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'position',
    component: Select,
    typeComponent: 'Select',
    options: POSITION,
    label: 'Position',
    column: 6,
    validationFormik: Yup.string().max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'occupation',
    component: Input,
    typeComponent: 'Input',
    label: 'Occupation',
    column: 6,
    className: 'justify-content-xxl-end',
    validationFormik: Yup.string().max(64, convertMessageErrorMaximum(64)),
  },
  {
    key: 'job_type_id',
    component: Select,
    typeComponent: 'Select',
    label: 'Job Type',
    options: SPECIALIZATION,
    keyLabelOfOptions: 'job_type_name',
    keyValueOfOptions: 'id',
    dependencyApi: '/config/job_type/listing',
    validationFormik: Yup.number().required(convertMessageErrorRequired('Job Type')),
    required: true,
  },
  {
    key: 'annual_income',
    component: Input,
    typeComponent: 'Input',
    label: 'Annual Gross Income',
    typeInput: 'money',
    required: true,
    desc: 'include AWS and Bonus',
    validationFormik: Yup.number().required(convertMessageErrorRequired('Annual Gross Income')),
  },
  {
    key: 'monthly_income_1',
    component: GrossMonthlyIncome,
    typeComponent: 'GrossMonthlyIncome',
    label: 'Gross Monthly Income',
  },
  {
    key: 'monthly_income',
    component: Input,
    typeComponent: 'Input',
    label: 'Average Monthly Income',
    typeInput: 'money',
    disabled: true,
  },
  {
    key: 'six_months_income',
    component: Input,
    typeComponent: 'Input',
    label: 'Past 6 Month Gross Income',
    typeInput: 'money',
  },

  {
    key: 'income_document',
    data: INCOME_DOCUMENT,
    defaultValue: [],
    component: Checkbox,
    typeComponent: 'Checkbox',
    label: 'Income Document',
    className: 'no-center-label',
    typeCheckbox: 'array',
  },
  {
    key: 'file_documents',
    component: FileDocument,
    defaultValue: [],
  },
]

const BLOCK_ADDRESS_CONFIG: ApplicationConfig[] = [
  {
    key: 'address_type_id',
    component: Select,
    typeComponent: 'Select',
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
    typeComponent: 'Input',
    label: 'Address Label',
    column: 6,
    className: 'justify-content-xxl-end',
    required: true,
    validationFormik: Yup.string()
      .required(convertMessageErrorRequired('Address Label'))
      .max(1024, convertMessageErrorMaximum(1024)),
  },
  {
    key: 'street_1',
    component: Input,
    typeComponent: 'Input',
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
    typeComponent: 'Input',
    label: 'Street 2',
    column: 6,
    className: 'justify-content-xxl-end',
    validationFormik: Yup.string().max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'city',
    component: Input,
    typeComponent: 'Input',
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
    typeComponent: 'Input',
    label: 'State',
    column: 6,
    className: 'justify-content-xxl-end',
    required: true,
    validationFormik: Yup.string()
      .required(convertMessageErrorRequired('State'))
      .max(255, convertMessageErrorMaximum(255)),
  },
  {
    key: 'postal_code',
    component: Input,
    typeComponent: 'Input',
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
    typeComponent: 'Select',
    label: 'Country',
    column: 6,
    className: 'justify-content-xxl-end',
    keyLabelOfOptions: 'nicename',
    keyValueOfOptions: 'id',
    defaultValue: 192, //default value country is SINGAPORE
    dependencyApi: 'config/country/listing',
    required: true,
    validationFormik: Yup.string()
      .required(convertMessageErrorRequired('Country'))
      .max(255, convertMessageErrorMaximum(255)),
  },
]

const TABLE_LOOKUP_CUSTOMER: TableConfig = {
  settings: {
    endPointGetListing: '/application/lookup',
    showViewButton: true,
    showAddNewButton: false,
    showAction: true,
    showRefresh: true,
    defaultSort: 'customer_no',
  },
  rows: [
    {
      key: 'customer_no',
      name: 'Customer No',
      infoFilter: {
        isSort: true,
      },
    },
    {
      key: 'identification_no',
      name: 'NRIC',
      infoFilter: {
        isSort: true,
      },
    },
    {
      key: 'firstname',
      name: 'First Name',
      infoFilter: {
        isSort: true,
      },
    },
    {
      key: 'lastname',
      name: 'Last Name',
      infoFilter: {
        isSort: true,
      },
    },
  ],
}

const COMPLETION_CONFIG: children_config_completion[] = [
  {
    col: 'col-xl-12',
    title: 'Personal Information',
    config: [
      [
        {
          key: 'name_of_applicant',
          value: 'Name of applicant',
          Component: FullName,
        },
        {
          key: 'identification_no',
          value: 'NRIC No./FIN',
        },
        {
          key: 'date_of_birth',
          value: 'Date of Birth',
          date: true,
        },
      ],
      [
        {
          key: 'gender',
          value: 'Gender',
          options: GENDER,
          Component: LableOptions,
          keyFilter: 'value',
        },
        {
          key: 'country_id',
          value: 'nationality',
          dependencyApi: 'config/country/listing',
          Component: RenderOptionsApi,
          keyFilter: 'id',
          lable: 'name',
        },
        {
          key: 'identification_type',
          value: 'ID Type',
          options: ID_TYPE,
          Component: LableOptions,
          keyFilter: 'value',
        },
      ],
      [
        {
          key: 'is_existing',
          value: 'Customer Type',
          options: CUSTOMER_TYPE,
          Component: LableOptions,
          keyFilter: 'value',
        },
        {
          key: 'residential_type',
          value: 'Residential Type',
          options: RESIDENTIAL_TYPE,
          Component: SpecialZation,
          keyFilter: 'value',
        },
        {
          key: 'marketing_type_id',
          value: 'Marketing type',
          dependencyApi: '/config/marketing_type/listing',
          Component: RenderOptionsApi,
          keyFilter: 'id',
          lable: 'marketing_type_name',
        },
      ],
      [
        {
          key: 'spoken_language',
          value: 'Language Spoken',
          options: LANGUAGES,
          Component: LableOptions,
          keyFilter: 'value',
        },
      ],
    ],
  },
  {
    col: 'col-xl-6',
    title: 'Loan Details',
    config: [
      [
        {
          key: 'mlcb_check',
          value: 'Consent',
          Component: MLCBCheck,
        },
        {
          key: 'loan_type_id',
          value: 'Loan type',
          dependencyApi: '/config/loan_type/listing',
          Component: RenderOptionsApi,
          keyFilter: 'id',
          lable: 'type_name',
        },
        {
          key: 'interest',
          value: 'Interest (%)',
        },
      ],
      [
        {
          key: 'loan_amount_requested',
          value: 'Loan amount',
          number: true,
        },
        {
          key: 'loan_terms',
          value: 'Loan Terms (months)',
          elBehind: 'Months',
        },
        {
          key: 'reason_for_loan',
          value: 'Reason For Loan',
        },
      ],
    ],
  },
  {
    col: 'col-xl-6',
    title: 'Contact Information',
    config: [
      [
        {
          key: 'mobilephone_1',
          value: 'Mobile 1 (NIL)',
          dollars: '+65',
        },
        {
          key: 'mobilephone_2',
          value: 'Mobile 2 (NIL)',
          dollars: '+65',
        },
        {
          key: 'mobilephone_3',
          value: 'Mobile 1 (NIL)',
          dollars: '+65',
        },
      ],
      [
        {
          key: 'homephone',
          value: 'Home Phone (NIL)',
          dollars: '+65',
        },
        {
          key: 'email_1',
          value: 'Email',
        },
        {
          key: 'email_2',
          value: 'Alternate Email',
        },
      ],
    ],
  },
  {
    col: 'col-xl-6',
    title: 'Address',
    Component: Address,
    config: [
      [
        {
          key: 'address_type_id',
          value: 'Address Type',
          dependencyApi: '/config/address_type/listing',
          Component: RenderOptionsApiAddress,
          keyFilter: 'id',
          lable: 'address_type_name',
        },
        {
          key: 'street_1',
          value: 'Street 1',
        },
        {
          key: 'city',
          value: 'City',
        },
        {
          key: 'postal_code',
          value: 'Postal Code',
        },
      ],
      [
        {
          key: 'address_label',
          value: 'Address Label',
        },
        {
          key: 'street_2',
          value: 'Street 2',
        },
        {
          key: 'state',
          value: 'State',
        },
        {
          key: 'country',
          value: 'Country',
          dependencyApi: 'config/country/listing',
          Component: LableOptionsCountry,
          keyFilter: 'id',
          lable: 'name',
        },
      ],
    ],
  },
  {
    col: 'col-xxl-8',
    title: 'Workplace',
    config: [
      [
        {
          key: 'employment_status',
          value: 'Employment Status',
          Component: EmploymentStatus,
        },
        {
          key: 'company_name',
          value: 'Company Name',
        },
        {
          key: 'company_telephone',
          value: 'Company Telephone',
          dollars: '+65',
        },
        {
          key: 'portal_code',
          value: 'Company Postal Code',
        },
      ],
      [
        {
          key: 'address',
          value: 'Address',
        },
        {
          key: 'position',
          value: 'Position',
          Component: PositionName,
        },
        {
          key: 'occupation',
          value: 'Occupation',
        },
        {
          key: 'specialization',
          value: 'Specialization',
          options: SPECIALIZATION,
          Component: LableOptions,
          keyFilter: 'value',
        },
      ],
      [
        {
          key: 'monthly_income_1',
          value: 'Gross Monthly Income',
          Component: GrossMonthlyIncomeCompletion,
        },
        {
          key: 'monthly_income',
          value: 'Average Monthly Income',
          dollars: '$',
          number: true,
        },
        {
          key: 'six_months_income',
          value: 'Past 6 Month Gross Income',
          dollars: '$',
          number: true,
        },
        {
          key: 'annual_income',
          value: 'Annual Gross Income',
          dollars: '$',
          number: true,
        },
      ],
    ],
  },
  {
    col: 'col-xxl-4',
    title: 'Bank Information',
    config: [
      [
        {
          key: 'is_giro',
          value: 'Is It GIRO',
          options: YES_NO_OPTION,
          Component: LableOptions,
          keyFilter: 'value',
        },
        {
          key: 'bank_name_1',
          value: 'Bank Name 1',
        },
        {
          key: 'account_number_1',
          value: 'Bank Acc 1',
        },
        {
          key: 'bank_code_1',
          value: 'Bank Code 1',
        },
      ],
      [
        {
          key: 'bank_name_2',
          value: 'Bank Name 2',
        },
        {
          key: 'account_number_2',
          value: 'Bank Acc 2',
        },
        {
          key: 'bank_code_2',
          value: 'Bank Code 2',
        },
      ],
    ],
  },
  {
    col: 'col-xl-12',
    title: 'Income Document',
    Component: RenderFileDocument,
  },
]

export {
  GENERAL_INFORMATION_CONFIG,
  LOAN_DETAILS_CONFIG,
  CONTACT_INFORMATION,
  BANK_INFO_CONFIG,
  EMPLOYMENT_CONFIG,
  BLOCK_ADDRESS_CONFIG,
  TABLE_LOOKUP_CUSTOMER,
  COMPLETION_CONFIG,
}
