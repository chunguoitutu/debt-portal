export type LoginInfo = {
  username: string
  password: string
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
  is_active: number
  branch_id: number
  user_id: number
  firstname: string
  middlename: string | null
  lastname: string
  telephone: string
  email: string
  status: number
  role_name: string
}
