import axios, {AxiosError} from 'axios'
import {DEFAULT_MESSAGE_ERROR_500} from '../constants/error-message'
import numeral from 'numeral'
import {ErrorResponse} from '../types/common'

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
  const err = error as AxiosError<ErrorResponse>

  if (axios.isAxiosError(err)) {
    const message = err?.response?.data?.message || err.message || DEFAULT_MESSAGE_ERROR_500
    return message
  } else {
    return DEFAULT_MESSAGE_ERROR_500
  }
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

export function convertMessageErrorMaximum(maxChar: number, isNumber?: boolean) {
  return `Maximum ${maxChar}` + (isNumber ? ' for this field.' : ' symbols.')
}

export function convertMessageErrorRequired(fieldLabel?: string) {
  return `${fieldLabel ? fieldLabel : 'This field'} is required.`
}

export function filterObjectKeyNotEmpty(object: {[key: string]: any}) {
  const keys = Object.keys(object)
  return keys
    .filter((key) => !!object[key] === true)
    .reduce((acc, key) => ({...acc, [key]: object[key]}), {})
}

export function convertSize(sizeInBytes) {
  const KB = 1024
  const MB = KB ** 2
  if (sizeInBytes < MB) {
    return (sizeInBytes / KB).toFixed(2) + ' KB'
  } else {
    return (sizeInBytes / MB).toFixed(2) + ' MB'
  }
}
