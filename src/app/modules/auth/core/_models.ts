import {FC, HTMLInputTypeAttribute, ReactNode} from 'react'
import {DropDownGroup} from '../../../utils/globalConfig'
import {FormikProps} from 'formik'
import {Schema} from 'yup'

export type LoginInfo = {
  username: string
  password: string
}

export type UpdatePasswordInfo = {
  username: string
  old_password: string
  new_password: string
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
  readonly config?: ApplicationConfig[]
}

export type UserInfo = {
  username: string
  is_active: number | any
  company_id: number
  id: number
  firstname: string
  middlename: string | null
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
  middlename?: string | null
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

export type RoleInfo = {
  id: number
  role_name: string
  description?: string | null
  permissions?: string | null
  priority: number
}

export type UpdateById<T = any> = {
  id: number
  data: T
}

export type SearchCriteria = {
  pageSize: number
  currentPage: number
  total: number
  company_id?: string
}

export type TableRow = {
  key: string
  name: string
  classNameTableHead?: string
  classNameTableBody?: string
  component?: any
  componentCreateEdit?: any
  type?: string
  isHide?: boolean
  isCreateEdit?: boolean
  informCreateEdit?: {
    type: string
    typeInput?: HTMLInputTypeAttribute
    isRequired?: boolean
    fieldLabelOption?: string
    fieldValueOption?: string
  }
  isShowInput?: boolean
}

export type TableConfig = {
  settings: {
    showAction?: boolean
    showEditButton?: boolean
    showDeleteButton?: boolean
    showViewButton?: boolean
    showAddNewButton?: boolean
    textConfirmDelete?: string
    endPointDelete?: string
    endPointGetListing: string
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
    showFilter?: boolean
    endpoint?: string
    swalToastTitle?: string
  }
  endpoint?: string

  rows: TableRow[]
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

export type Option = {
  label: string
  value: string | number
}

// type money use for input advanced
export type ApplicationConfig = {
  key: string
  data?: Option[]
  className?: string
  defaultValue?: string | number | any[] | boolean
  component?: FC<any>
  label?: string
  isFullLayout?: boolean
  column?: 12 | 6
  isHide?: boolean
  typeInput?: HTMLInputTypeAttribute
  typeInputAdvanced?: 'money'
  typeCheckbox?: 'array'
  dependencyApi?: string
  required?: boolean
  options?: {[key: string]: string | number}[] | DropDownGroup[]
  keyLabelOfOptions?: string
  keyValueOfOptions?: string
  desc?: string
  dropDownGroup?: boolean
  labelError?: string
  disabled?: boolean
  validationFormik?: Schema
}

export type PropsStepApplication = {
  config: ApplicationConfig[]
  formik: FormikProps<ApplicationFormData>
}

export type ApplicationPayload = {
  customer: {
    id?: number
    company_id: number
    customer_no: string
    identification_type: string
    identification_no: string
    gender: string
    date_of_birth: any
    country_id: number
    firstname: string
    lastname: string
    prefix?: string
    middlename?: string
    telephone?: string
    email?: string
    username?: string
    password?: string
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
    job_type_id?: number
    employment_status?: string
    monthly_income?: number
    credit_score?: string
    residential_type_id?: string
    spoken_language?: string
  }
  application: {
    id?: number
    application_no?: string
    status?: number
    borrower_id?: string
    loan_type_id?: string | number
    application_date?: any
    loan_amount_requested: number
    application_notes?: string
    loan_terms: number
    is_draft: 1 | 0
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
  }
  address: any
}

export type ApplicationFormData = {
  middlename: string
  lastname: string
  customer_type: string
  firstname: string
  identification_type: string
  identification_no: string
  residential_type_id: string
  marketing_type: string
  gender: string
  date_of_birth: string
  nationality: string
  mlcb_check: string[]
  loan_type_id: string
  loan_amount_requested: string
  reason_for_loan: string
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
  employment_status: string
  company_name: string
  address: string
  office_no: string
  portal_code: string
  specialization: string
  monthly_income_1: string | number
  monthly_income: string | number | any
  six_months_income: string | number
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
  country: string
  mobilephone_3: string
  address_contact_info: BlockAddress[]
}

export type BlockAddress = {
  address_type_id: string | number
  address_label: string
  street_1: string
  street_2: string
  city: string
  state: string
  postal_code: string
  country: string
}
