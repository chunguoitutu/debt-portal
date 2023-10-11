import {LoginInfo, LoginResponse} from './_models'
import request from '../../../axios'

export const LOGIN_URL = 'user/login'

export function login(loginInfo: LoginInfo) {
  return request.post<LoginResponse>(LOGIN_URL, loginInfo)
}
