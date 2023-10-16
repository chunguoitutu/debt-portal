import {DEFAULT_MSG_ERROR} from '../constants/error-message'

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

export const convertErrorMessageResponse = (error: any) => {
  const message = error?.response?.data?.message || DEFAULT_MSG_ERROR
  return message
}
