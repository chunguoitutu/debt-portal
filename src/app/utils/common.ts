import axios, {AxiosError} from 'axios'
import numeral from 'numeral'
import {ErrorResponse} from '../types/common'
import {DEFAULT_MESSAGE_ERROR_500} from '../constants'
import moment from 'moment'

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
  if (+sizeInBytes < MB) {
    return (+sizeInBytes / KB).toFixed(2) + ' KB'
  } else {
    return (+sizeInBytes / MB).toFixed(2) + ' MB'
  }
}

export function isObject(value: any) {
  if (typeof value === 'object' && !Number.isNaN(value) && !Array.isArray(value)) {
    return true
  } else {
    return false
  }
}

// Filter keys with value and format it.
export function handleFormatFilter<T = any>(config: {
  dataFilter: T
  keyNumber?: string[]
  keyDate?: string[]
}) {
  const {keyNumber = [], keyDate = [], dataFilter} = config

  if (!isObject(dataFilter)) return {}

  const newDataFilter = Object.keys(dataFilter || {})
    .filter((key) => dataFilter[key])
    .reduce((acc, key) => {
      /* handle for filter from to.
       * key after format should be type date or number
       */
      if (isObject(dataFilter[key])) {
        const keyHasValue = filterObjectKeyNotEmpty(dataFilter[key])

        if (!Object.keys(keyHasValue).length) return {...acc}

        // Format type date
        if (keyDate.includes(key)) {
          // add 1 days if key = lte
          const objectDate = Object.keys(keyHasValue).reduce(
            (acc, key) => ({
              ...acc,
              [key]: new Date(
                key === 'lte'
                  ? moment(keyHasValue[key], 'YYYY-MM-DD').add(1, 'days')
                  : keyHasValue[key]
              ),
            }),
            {}
          )

          return {...acc, [key]: objectDate}
        } else {
          const newObject = Object.keys(keyHasValue).reduce(
            (acc, key) => ({
              ...acc,
              [key]: +keyHasValue[key],
            }),
            {}
          )
          return {...acc, [key]: newObject}
        }
      }

      const value = dataFilter[key]

      return {...acc, [key]: keyNumber.includes(key) ? +value : value}
    }, {})

  return newDataFilter
}
