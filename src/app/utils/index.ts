import {DEFAULT_MESSAGE_ERROR_500} from '../constants/error-message'

export const convertRoleToNumber = (roleName: string) => {
  switch (roleName) {
    case 'SuperAdmin':
      return 99
    case 'Administrators':
      return 98
    case 'Officer':
      return 1
    default:
      return 0
  }
}

export function convertErrorMessageResponse(error: any) {
  return DEFAULT_MESSAGE_ERROR_500
}

export function isJson(str: string) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
