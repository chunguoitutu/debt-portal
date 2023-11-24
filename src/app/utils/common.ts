import axios, {AxiosError} from 'axios'
import numeral from 'numeral'
import {ErrorResponse} from '../types/common'
import {DEFAULT_MESSAGE_ERROR_500} from '../constants'

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
  return `Maximum ${maxChar}` + (isNumber ? ' for this field' : ' symbols')
}

export function convertMessageErrorRequired(fieldLabel?: string) {
  return `${fieldLabel ? fieldLabel : 'This field'} is required`
}

export function convertMessageErrorPassword(label: string) {
  return `${label} must be at least 8 characters including at least one letter, one number, and one special character`
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
///convert to string all
export function stringifyObject(obj: object) {
  const result = {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = String(obj[key])
    }
  }

  return result
}
//compare object
export function areObjectsEqual(obj1: any, obj2: any, excludedFields: any) {
  const obj1Copy = {...obj1}
  const obj2Copy = {...obj2}

  excludedFields.forEach((field: any) => {
    delete obj1Copy[field]
    delete obj2Copy[field]
  })
  return JSON.stringify(obj1Copy) === JSON.stringify(obj2Copy)
}
