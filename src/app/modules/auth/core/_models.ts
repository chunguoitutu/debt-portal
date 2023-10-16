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
  branch_id: number
  user_id: number
  firstname: string
  middlename: string | null
  lastname: string
  telephone: string
  email: string
  status: number
  role_name: string
  permissions: any
  role_id: number
  last_login_date: any
  branch_name?: string | null | undefined
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
    textConfirmRemove?: string
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
    showfilter?: boolean
  }
  rows: TableRow[]
}
