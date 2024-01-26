import request from '.'
import {RoleItem} from '../types'
import {
  DataResponse,
  LoginInfo,
  LoginResponse,
  SearchCriteria,
  UpdatePasswordInfo,
  UpdateUserResponse,
  UserInfo,
  updateUserInfo,
} from '../types/common'

export const API_URL = import.meta.env.VITE_REACT_APP_API_URL
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
  const endPoint = `/user/change-pass/${updatePasswordInfo.id}`
  return request.put(endPoint, updatePasswordInfo)
}

export function getRoleList() {
  const endPoint = '/config/role'
  return request.get<DataResponse<RoleItem[]>>(endPoint)
}

export function deleteRoleById(id: number) {
  const endPoint = `/config/role/${id}`
  return request.delete(endPoint)
}

export function getUserList(searchCriteria: SearchCriteria) {
  const endPoint = `/user`
  return request.post(endPoint, searchCriteria)
}
