import {
  DataResponse,
  LoginInfo,
  LoginResponse,
  UpdatePasswordInfo,
  UserInfo,
  updateUserInfo,
  UpdateUserResponse,
} from './_models'
import request from '../../../axios'

const API_URL = process.env.REACT_APP_API_URL
export const REACT_APP_BASE_URL_API = process.env.REACT_APP_BASE_URL_API
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

export function login(loginInfo: LoginInfo) {
  const endPoint = '/user/login'
  return request.post<LoginResponse>(endPoint, loginInfo)
}
export function getCurrentUser() {
  const endPoint = '/user/info'
  return request.get<DataResponse<UserInfo>>(endPoint)
}

export function updateInfoUser(id: number, updateUserInfo: updateUserInfo) {
  const endPoint = `user/${id}`
  return request.put<UpdateUserResponse>(endPoint, updateUserInfo)
}

export function updatePasswordCurrentUser(updatePasswordInfo: UpdatePasswordInfo) {
  const endPoint = '/user/change-pass'
  return request.post(endPoint, updatePasswordInfo)
}

export function getDataCompany() {
  const endPoint = '/user/change-pass'
  return request.post(endPoint)
}
