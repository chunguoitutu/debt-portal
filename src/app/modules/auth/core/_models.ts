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

export type GetCurrentUserResponse = {}

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
}

export type TableRow = {
  key: string
  name: string
  classNameTableHead?: string
  classNameTableBody?: string
  component?: any
  componentProps?: {[key: string]: string}
  type?: 'datetime' | 'yes/no'
  isHide?: boolean
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
    dependencies?: {[key: string]: string}
    buttonAddNew?: string
    showSearch?: boolean
    showFilter?: boolean
  }
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
}
