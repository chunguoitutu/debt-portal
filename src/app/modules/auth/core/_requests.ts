import {
  DataResponse,
  LoginInfo,
  LoginResponse,
  UpdatePasswordInfo,
  UserInfo,
  updateUserInfo,
} from './_models'
import request from '../../../axios'

export const LOGIN_URL = '/user/login'
export const CURRENT_INFO_URL = '/user/info'

const API_URL = process.env.REACT_APP_API_URL
export const REACT_APP_BASE_URL_API = process.env.REACT_APP_BASE_URL_API
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

export function login(loginInfo: LoginInfo) {
  return request.post<LoginResponse>(LOGIN_URL, loginInfo)
}
export function getCurrentUser() {
  return request.get<DataResponse<UserInfo>>(CURRENT_INFO_URL)
}

export function updateInfoUser(id: number, updateUserInfo: updateUserInfo) {
  const endPoint = `user/${id}`
  return request.put<updateUserInfo>(endPoint, updateUserInfo)
}

export function updatePasswordCurrentUser(updatePasswordInfo: UpdatePasswordInfo) {
  const endPoint = '/user/change-pass'
  return request.post(endPoint, updatePasswordInfo)
}
