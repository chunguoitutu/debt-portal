import {
  DataResponse,
  LoginInfo,
  LoginResponse,
  UpdatePasswordInfo,
  UserInfo,
  updateUserInfo,
  UpdateUserResponse,
  RoleInfo,
  UpdateById,
  SearchCriteria,
} from './_models'
import request from '../../../axios'

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_LOCAL_BASE_URL
    : process.env.REACT_APP_API_URL
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

export function getRoleList() {
  const endPoint = '/config/role'
  return request.get<DataResponse<RoleInfo[]>>(endPoint)
}

export function deleteRoleById(id: number) {
  const endPoint = `/config/role/${id}`
  return request.delete(endPoint)
}

export function createNewRole(data: Omit<RoleInfo, 'id'>) {
  const endPoint = '/config/role'
  return request.post(endPoint, data)
}

export function updateRole({data, id}: UpdateById<Omit<RoleInfo, 'id'>>) {
  const endPoint = `/config/role/${id}`
  return request.post(endPoint, data)
}

export function getUserList(searchCriteria: SearchCriteria) {
  const endPoint = `/user`
  return request.post(endPoint, searchCriteria)
}
