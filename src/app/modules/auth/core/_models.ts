import {Dispatch, FC, HTMLInputTypeAttribute, ReactNode, SetStateAction} from 'react'
import {DropDownGroup} from '../../../utils/globalConfig'

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
  component?: FC<any>
  config?: ApplicationConfig[]
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
  type?: 'datetime' | 'yes/no'
  isHide?: boolean
  isCreateEdit?: boolean
  informCreateEdit?: {
    type: 'input' | 'select' | 'textarea' | 'checkbox'
    typeInput?: HTMLInputTypeAttribute
    isRequired?: boolean
    fieldLabelOption?: string
    fieldValueOption?: string
  }
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
  defaultValue?: string | number | any[]
  component?: FC<any>
  label?: string
  isFullLayout?: boolean
  column?: 12 | 6
  isHide?: boolean
  typeInput?: HTMLInputTypeAttribute & 'money'
  dependencyApi?: string
  required?: boolean
  options?: {[key: string]: string | number}[] | DropDownGroup[]
  keyLabelOfOptions?: string
  keyValueOfOptions?: string
  desc?: string
  dropDownGroup?: boolean
  labelError?: string
}

export type PropsStepApplication = {
  config: ApplicationConfig[]
  formData: {[key: string]: string | any[]}
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: string | any[]
    }>
  >
  changeStep: number | undefined
  setChangeStep: Dispatch<SetStateAction<number | undefined>>
  onGoToStep: (a?: number) => void
}
