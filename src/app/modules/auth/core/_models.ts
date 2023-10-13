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
}
