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
