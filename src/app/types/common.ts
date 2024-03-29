import {Dispatch, FC, HTMLInputTypeAttribute, ReactNode, SetStateAction} from 'react'
import {FormikProps} from 'formik'
import {ObjectSchema, Schema} from 'yup'
import {ApprovalInfo, RejectedInfo} from './response'

export type LoginInfo = {
  username: string
  password: string
}

export type UpdatePasswordInfo = {
  id: number
  old_password: string
  new_password: string
}

export type ErrorResponse = {
  error: boolean
  message: string
}

export type DataResponse<T> = {
  error: boolean
  message: string
  searchCriteria?: {[key: string]: string}
  data: T
}

export type LoginResponse = {
  error: boolean
  message: string
  token: string
  info: UserInfo
}

export type StepItem = {
  label: string
  desc?: string | ReactNode
  readonly component?: FC<any>
  readonly config?: ApplicationConfig[] | any
}

export type UserInfo = {
  username: string
  is_active: number | any
  company_id: number
  id: number
  firstname: string
  lastname: string
  telephone: string
  email: string
  status: number
  role_name: string
  permissions: any
  priority: number
  role_id: number
  last_login_date: any
  company_name?: string | null | undefined
}

export type updateUserInfo = {
  avatar?: string
  username?: string
  is_active?: number
  branch_id?: number
  firstname?: string
  lastname?: string
  telephone?: string
  email?: string
  status?: number
  role_name?: string
  role_permissions?: string
}

export type UpdateUserResponse = {
  error: boolean
  message: string
  token: string
}

export type UpdateById<T = any> = {
  id: number
  data: T
}

export type SearchCriteria<T = any> = {
  pageSize: number
  currentPage: number
  total: number
  company_id?: number
  filters?: T
  searchBar?: string
}

export type PaginationType = {
  pageSize: number
  currentPage: number
}

export type ResponseLookupListing = {
  id: number
  company_id: number
  customer_no: string
  identification_type: ID_TYPE_VALUE
  identification_no: string
  prefix: string | null
  firstname: string | null
  lastname: string | null
  telephone: string | null
  gender: string | null
  date_of_birth: Date
  country_id: number
  searchBar?: string
}

export type ResponseApplicationListing = {
  id: number
  application_number: number
  application_name: string
  id_type: string
  loan_type: string
  loan_amount_requested: number
  application_date: Date
  status: number
  searchBar?: string
}

export type ResponseLoanListing = {
  id: number
  loan_no: number
  identification_no: number
  fullname: string
  loan_amount_requested: number
}
export type ResponseBorrowerListing = {
  id: number
  customer_no: string
  id_type: string
  status: number
  searchBar?: string
}

export type FormatDate = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MMM DD, YYYY' | 'DD MMM, YYYY'

export type TableRow<T = string> = {
  key: T
  name: string
  color?: string
  classNameTableHead?: string
  classNameTableBody?: string
  className?: string
  component?: any
  typeValue?: string
  isHide?: boolean // hide io table listing
  defaultShow?: boolean
  options?: Option[]
  format?: 'money' | 'date' | 'option' | 'percent' | 'phone' | 'fullname'
  formatDate?: FormatDate
  isEditField?: boolean
  infoCreateEdit?: {
    className?: string
    type?: HTMLInputTypeAttribute
    required?: boolean
    keyLabelOption?: string
    keyValueOption?: string
    typeComponent?: 'select' | 'input' | 'checkbox-rounded' | 'select' | 'textarea'
    component?: FC<any> | JSX.Element
    dependencyApi?: string
    isHide?: boolean
    options?: Option[]
    column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 // column should be from 1 to 12 (column bootstrap)
    subTextWhenChecked?: string // using for checkbox rounded
    subTextWhenNoChecked?: string // using for checkbox rounded
    defaultValue?: any
    group?: 'account'
    columnMobile?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 // column should be from 1 to 12 (column bootstrap)
  }
  infoFilter?: {
    isFromTo?: boolean
    typeComponent?: 'select' | 'input'
    typeInput?: HTMLInputTypeAttribute
    component?: any
    keyLabelOption?: string
    keyValueOption?: string
    dependencyApi?: string
    noThereAreCommas?: boolean
    isSort?: boolean
  }
  isLink?: boolean
  linkUrl?: string
}

export type TableConfig<T = string> = {
  settings: {
    showAction?: boolean
    saveSESSION_NAME?: string
    showEditButton?: boolean
    showDeleteButton?: boolean
    showViewButton?: boolean
    showAddNewButton?: boolean
    textConfirmDelete?: string
    endPointDelete?: string
    endPointGetListing?: string
    fieldDelete?: string
    messageDeleteError?: string
    messageDeleteSuccess?: string
    messageEditError?: string
    messageEditSuccess?: string
    messageCreateError?: string
    messageCreateSuccess?: string
    dependencies?: {[key: string]: string}
    buttonAddNew?: string
    showSearch?: boolean
    showMessageTitle?: string
    showFilter?: boolean
    endpoint?: string
    endpointNavigate?: string

    swalToastTitle?: string
    showRefresh?: boolean
    validation?: ObjectSchema<any>
    defaultSort?: string
  }
  rows: TableRow<T>[]
}

export type BranchItem = {
  id: number
  business_uen: string
  company_id: number
  branch_name: string
  address_id: number
  telephone?: string | null
  email?: string | null
  open_date: string
  status: number
}

export type MenuSettingItem = {
  activeKey: string
  title: string
  priority: number[]
  children: MenuChildren[]
}

type MenuChildren = {
  id: string
  to: string
  label: string
  priority: number[]
}

export type CheckboxTreeItem = {
  value: string
  label: string
  active?: boolean
  children?: CheckboxTreeItem[] & {[key: string]: any}
} & {[key: string]: any}

export type Option<T = any> = {
  label: string
  value: T
} & {[key: string]: any}

export type DropDownGroup = {
  name: string
  options: Option[]
}

export type ID_TYPE_VALUE = 'singapore_nric_no' | 'foreign_identification_number'

// type money use for input advanced
export type ApplicationConfig = {
  key: keyof ApplicationFormData | keyof BlockAddress // key identifies the field
  keyOfOptionFromApi?: string // key identifies the option
  data?: Option[]
  className?: string
  defaultValue?: string | number | any[] | boolean
  component?: FC<any>
  typeComponent?: string
  label?: string
  column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  isHide?: boolean
  typeInput?: HTMLInputTypeAttribute | 'money' | 'phone'
  typeCheckbox?: 'array'
  dependencyApi?: string
  required?: boolean
  options?: {[key: string]: string | number}[] | DropDownGroup[]
  keyLabelOfOptions?: string
  keyValueOfOptions?: string
  desc?: string
  dropDownGroup?: boolean
  disabled?: boolean
  validationFormik?: Schema
  noThereAreCommas?: boolean
}

export type PropsStepApplication = {
  setStepCompleted: Dispatch<SetStateAction<number>>
  config: ApplicationConfig[]
  formik: FormikProps<ApplicationFormData>
  setSingpass: Dispatch<SetStateAction<boolean>>
  singpass: boolean
  optionListing: {
    [key: string]: any[]
  }
  setOptionListing: Dispatch<
    SetStateAction<{
      [key: string]: any[]
    }>
  >
  // setIsMountedAddress: Dispatch<SetStateAction<boolean>>
  // isMountedAddress: boolean
  setTools?: Dispatch<SetStateAction<any>>
  setToolsCheckCount?: Dispatch<SetStateAction<any>>
  tools?: any
  toolsCheckCount?: {
    MLCB: number
    Cross: number
    validatePhone: number
  }
  borrower_id?: number
}

export type EmploymentStatus = 'EMP' | 'UNEMPINC' | 'UNEMP'

export type ApplicationPayload = {
  customer: {
    id?: number
    company_id: number
    customer_no?: string
    identification_type: ID_TYPE_VALUE
    identification_expiry: string | Date | null
    identification_no: string
    gender: string
    date_of_birth: any
    country_id: number
    firstname: string
    lastname: string
    prefix?: string
    telephone?: string
    email?: string
    username?: string
    password?: string
    status?: number
  }
  borrower: {
    id?: number
    customer_id?: number
    homephone?: string
    mobilephone_1?: string
    mobilephone_2?: string
    mobilephone_3?: string
    email_1?: string
    email_2?: string
    job_type_id?: number | null
    employment_status: EmploymentStatus
    monthly_income?: number
    credit_score?: string
    residential_type?: string
    spoken_language?: string
    marketing_type_id: number | null
  }
  application: {
    id?: number
    application_no?: string
    status?: number
    borrower_id?: string
    loan_type_id: number | null
    application_date?: any
    loan_amount_requested: number
    application_notes?: string
    loan_terms: number
    term_unit?: any
    is_existing: string
    company_id: number
    loan_reason?: string
    phone_verified?: number
    mlcb_count?: number
    crosscheck_count?: number
    interest: string | number
    first_repayment_date: Date | string
    monthly_due_date: number
    amount_of_acceptance: number
    monthly_late_fee: number
    late_interest_per_month_percent: number
  }
  bank_account: {
    id?: number
    borrower_id?: number
    bank_name_1?: string
    bank_code_1?: string
    account_number_1?: string
    bank_name_2?: string
    bank_code_2?: string
    account_number_2?: string
  }
  employment: {
    id?: number
    borrower_id?: number
    company_name?: string
    company_telephone?: string
    specialization?: string
    position?: string
    occupation?: string
    address?: string
    portal_code?: string
    monthly_income_1?: number
    monthly_income_2?: number
    monthly_income_3?: number
    six_months_income?: number
    annual_income?: string | number | any
    pay_date?: string
    bankrupted?: string | any
    bankrupt_plan?: string | any
  }
  cpf?: {
    id?: any
    date?: string | any
    employer?: string | any
    amount?: string | any
    month?: string | any
  }
  // vehicle?: {
  //   id?: any
  //   vehicle_no?: string | any
  //   vehicle_model?: string | any
  //   vehicle_type?: string | any
  //   vehicle_maker?: string | any
  //   vehicle_coe_category?: string | any
  //   vehicle_coe_expiry_date?: string | any
  //   vehicle_open_maket_value?: string | any
  //   vehicle_effective_date?: string
  // }
  address: BlockAddress[]
  customerId?: number
  borrowerId?: number
  file_documents?: any
  tools?: ToolApplication
}

export type ToolApplication = {
  Google: string
  UN: string
  CAS: string
}

export type ApplicationFormData = {
  first_repayment_date: string | Date
  monthly_due_date: number
  amount_of_acceptance: number
  monthly_late_fee: number
  late_interest_per_month_percent: number
  bankrupted_key?: any
  singpass?: any
  identification_no_confirm: string
  identification_expiry: string
  job_type_id: number | null
  country_id: number
  lastname: string
  is_existing: string
  firstname: string
  identification_type: ID_TYPE_VALUE
  identification_no: string
  residential_type: string
  marketing_type: string
  gender: string
  date_of_birth: string
  nationality: string
  mlcb_check: string[]
  loan_type_id: number | null
  loan_amount_requested: string | any
  loan_reason: string
  address_full: string
  block_no: string
  street: string
  building: string
  mailing_address: string
  address_foreign: string
  mobilephone_1: string
  mobilephone_2: string
  homephone: string
  spoken_language: string
  email_1: string
  email_2: string
  monthly_income_2: string | number
  monthly_income_3: string | number
  employment_status: EmploymentStatus
  company_name: string
  address: string
  office_no: string
  application_no: string
  portal_code: string
  specialization: string
  monthly_income_1: string | number
  monthly_income: string | number | any
  six_months_income: number
  annual_income: string | number
  income_document: string[]
  is_giro: string
  bank_name_1: string
  bank_name_2: string
  account_number_1: string
  account_number_2: string
  bank_code_1: string
  bank_code_2: string
  address_type_id: number
  address_label: string
  street_1: string
  street_2: string
  city: string
  state: string
  postal_code: string
  country: string | number
  mobilephone_3: string
  address_contact_info: BlockAddress[]
  loan_terms: number
  term_unit: any
  marketing_type_id: number | null
  company_telephone: string
  position: string
  occupation: string
  customer_no?: string
  application_date?: any
  file_documents?: any
  interest: number | string
  status?: number
  bankrupted?: string | any
  bankrupt_plan?: string | any
  date?: string | any
  employer?: string | any
  amount?: string | any
  month?: string | any
  vehicle_no?: string | any
  vehicle_model?: string | any
  vehicle_type?: string | any
  vehicle_maker?: string | any
  vehicle_coe_category?: string | any
  vehicle_coe_expiry_date?: string | any
  vehicle_open_maket_value?: string | any
  vehicle_effective_date?: string
  approval?: ApprovalInfo
  rejection?: RejectedInfo
}

export type BlockAddress = {
  id?: number
  address_type_id: string | number
  address_label?: string
  city?: string
  state?: string
  postal_code: string
  country: string
  housing_type?: string
  property_type?: string
  existing_staying?: number
  home_ownership?: string
  staying_condition?: string
  is_default?: number
  unit: string
  block: string
  building: string
  street: String
}

export type BadgeProps = {
  color: 'primary' | 'success' | 'warning' | 'danger'
  title: string
}

export type ApplicationItem = {
  id: number
  application_no: null | string
  status: number
  borrower_id: number
  loan_type_id: number
  application_date: string
  loan_amount_requested: string
  loan_terms: number
  term_unit: any
  identification_type: ID_TYPE_VALUE
  identification_no: string
  fullname: string
  loan_type: string
  customer_no: any
}

export type LoanItem = {
  id: number
  loan_no: null | string
  status: number
  borrower_id: number
  loan_type_id: number
  application_id: string
  loan_amount: string
  loan_terms: number
  term_unit: any
  interest_rate: string
  approval_date: string
  identification_no: string
  fullname: string
  loan_type: string
  borrower: any
  application: any
}

export type BorrowerItem = {
  id: number
  customer_no: null | string
  date_of_birth: string
  identification_type: ID_TYPE_VALUE
  identification_no: string
  application_no: string
  firstname: string
  lastname: string
  loan_type: string
  company_id: string
  borrower: any
  blacklisted: any
}

export type RemarkItem = {
  id: string
  message: string
  time: number
  user: string
}

export type JwtDecode = {
  iat: number
  exp?: string
}

export type OrderBy = 'desc' | 'asc'

export type MenuProps<T = any> = {
  label: string
  value: string
  component?: FC<T>
}

export type Base64Item = {
  document_name: string
  base64: string
  size: number
  type: string
}

export type MyTaskConfig = {
  key: any
  keyOfOptionFromApi?: string // key identifies the option
  data?: Option[]
  className?: string
  defaultValue?: string | number | any[] | boolean
  component?: FC<any>
  typeComponent?: string
  label?: string
  column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  isHide?: boolean
  typeCheckbox?: 'array'
  dependencyApi?: string
  required?: boolean
  options?: {[key: string]: string | number}[] | DropDownGroup[]
  keyLabelOfOptions?: string
  keyValueOfOptions?: string
  desc?: string
  dropDownGroup?: boolean
  disabled?: boolean
  validationFormik?: Schema
  noThereAreCommas?: boolean
}

export type TypeFormControl = 'checkbox-rounded' | 'input'

export type WithChildren = {
  children?: ReactNode
}

export type MenuItem<T = any> = {
  id: number
  label: string
  to?: string
  default?: boolean
  component?: FC<T>
  className?: string
}

// customer portal
export type CreateApplicationPortal = {
  id: number
  fullname: string
  identification_no: string | any
}

export type AvatarProps = {
  type: string
  base64: string
}

export type FileInfo = {
  base64: string
  name: string
  id?: number | string
}
