import {DEFAULT_MESSAGE_ERROR_500} from '../constants/error-message'
import numeral from 'numeral'

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

export const formatNumber = (num: any) => {
  return numeral(num).format('0,0.00')
}

export function convertMessageErrorMaximum(maxChar: number) {
  return `Maximum ${maxChar} symbols.`
}

export function convertMessageErrorRequired(fieldLabel?: string) {
  return `${fieldLabel ? fieldLabel : 'This field'} is required.`
}
