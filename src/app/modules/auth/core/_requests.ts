import {DataResponse, LoginInfo, LoginResponse, UserInfo} from './_models'
import request from '../../../axios'

export const LOGIN_URL = '/user/login'
export const CURRENT_INFO_URL = '/user/info'

export function login(loginInfo: LoginInfo) {
  return request.post<LoginResponse>(LOGIN_URL, loginInfo)
}

export function getCurrentUser() {
  return request.get<DataResponse<UserInfo>>(CURRENT_INFO_URL)
}
