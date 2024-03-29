import axios, {AxiosError} from 'axios'
import numeral from 'numeral'
import {ApplicationConfig, ErrorResponse, Option, TableRow} from '../types/common'
import {DEFAULT_MESSAGE_ERROR_500} from '../constants'
import moment from 'moment'
import {TermUnit} from '../types/enum'
import {formatDate} from './date'

export const COUNTRY_PHONE_CODE: Option[] = [{label: '+65', value: '+65'}]

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
  const err = error

  if (axios.isAxiosError(err)) {
    const message = err?.response?.data?.message || err.message || DEFAULT_MESSAGE_ERROR_500
    return message
  } else {
    return err?.message || DEFAULT_MESSAGE_ERROR_500
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

export function parseJson(str: string) {
  try {
    return JSON.parse(str)
  } catch (error) {}
}

export const formatNumber = (num: any) => {
  return numeral(num).format('0,0.00')
}

export function convertFieldMaximum(maxChar: number, isNumber?: boolean) {
  return `Maximum ${maxChar}` + (isNumber ? ' for this field' : ' symbols')
}

export function convertFieldRequired(fieldLabel?: string) {
  return `${fieldLabel ? fieldLabel : 'This field'} is required`
}

export function convertFieldPassword(label: string) {
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
        if (key === 'status') {
          if (dataFilter[key]?.in.length > 0) {
            return {...acc, status: dataFilter[key]}
          } else {
            return {...acc, status: {}}
          }
        }
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

export function convertResidentialTypeSingPass(residentialType: string) {
  switch (residentialType) {
    case '1-ROOM FLAT (HDB)':
      return '1 Room'

    case '2-ROOM FLAT (HDB)':
      return '2 Room'

    case '3-ROOM FLAT (HDB)':
      return '3 Room'

    case '4-ROOM FLAT (HDB)':
      return '4 Room'

    case '5-ROOM FLAT (HDB)':
      return '5 Room'

    case 'STUDIO APARTMENT (HDB)':
      return 'STUDIO APARTMENT (HDB)'

    case 'EXECUTIVE FLAT (HDB)':
      return 'Exec'

    case 'apartment':
      return 'apartment'

    case 'CONDOMINIUM':
      return 'Condo'

    case 'Landed':
      return 'Landed'

    case 'TERRACE HOUSE':
      return 'TERRACE HOUSE'

    case 'SEMI-DETACHED HOUSE':
      return 'SEMI-DETACHED HOUSE'

    case 'DETACHED HOUSE':
      return 'DETACHED HOUSE'

    case 'not_own':
      return 'Does not own any property'

    default:
      return 'Does not own any property'
  }
}

export function capitalizeFirstText(text: string) {
  if (!text || typeof text !== 'string') return ''

  return text
    .split(' ')
    .filter(Boolean)
    .map((text) => `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`)
    .join(' ')
}

export function convertFileToBase64(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(null)
      }
    }
    reader.onerror = (error) => {
      console.error('Error: ', error)
      reject(null)
    }
  })
}

export function formatMoney(value: number) {
  let newValue = +value || 0

  return numeral(newValue).format('$0,0.00')
}

export function getIdDefault(data: any[], keyDefault: string = 'is_default') {
  if (!Array.isArray(data) || !data?.length) return ''

  const itemDefault = data?.find((el: any) => el[keyDefault]) || data?.[0]
  return itemDefault.id || ''
}

export function isFirstGetStepApplication({
  optionListing,
  config,
}: {
  optionListing: {[key: string]: any[]}
  config: ApplicationConfig[]
}) {
  const keyOptionListing = Object.keys(optionListing)
  const endpoint = config.filter((data) => !!data.dependencyApi)
  return !endpoint.some((el) => keyOptionListing.includes(el.keyOfOptionFromApi || el.key))
}

export function getFullName(info?: {[key: string]: any}) {
  return [info?.lastname, info?.firstname].filter(Boolean).join(' ')
}

export function splitFullName(fullname: string) {
  let defaultResult = {
    firstname: '',
    lastname: '',
  }

  const arrayName = fullname?.trim()?.split(' ')?.filter(Boolean) || []
  const isHasFullName = typeof fullname === 'string' && arrayName?.length

  if (!isHasFullName) return defaultResult

  const [lastname, ...firstname] = arrayName

  return {
    ...defaultResult,
    firstname: capitalizeFirstText(firstname?.join(' ') || ''),
    lastname: capitalizeFirstText(lastname || ''),
  }
}

export function convertInterestApplication(amountInterest: number, termUnit: string) {
  const amount = +amountInterest || 0

  const dailyInterest = amount / 31 // divide by 31 days

  switch (termUnit.toString()) {
    case TermUnit.DAILY:
      return +dailyInterest.toFixed(2)
    case TermUnit.WEEKLY:
      return +(dailyInterest * 7).toFixed(2)
    case TermUnit['BI-WEEKLY']:
      return +(dailyInterest * 14).toFixed(2)
    case TermUnit.MONTHLY:
      return +amount.toFixed(2)
    default:
      return 0
  }
}

export const Sum = (key: string, data = [], format = true) => {
  const total = data.reduce((sum, loan) => {
    return sum + Number(loan[key] || 0)
  }, 0)
  return format ? formatMoney(total) : total
}

export function getAbbreviation(name: string) {
  const words = name.split(' ')
  let abbreviation = ''

  words.forEach((word) => {
    abbreviation += word.charAt(0).toUpperCase()
  })

  return abbreviation
}

export const capitalizeFirstLetter = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatData(row: TableRow, data: any) {
  const {key, format, formatDate: formatDateType, options} = row
  let value = data?.[key] || ''

  switch (format) {
    case 'fullname':
      value = getFullName(data)
      break
    case 'date':
      value = formatDate(value, formatDateType || 'DD MMM, YYYY')
      break
    case 'money':
      value = formatMoney(+value)
      break
    case 'option':
      const label = options?.find((o) => o?.value === value)?.label || ''
      value = label
      break
    case 'percent':
      value = value ? `${value}%` : ''
      break
    case 'phone':
      value = value ? `+65${value}` : ''
      break
    default:
      break
  }

  return value
}

export const getTheBeginningAndEndOfTheName = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${
    str.length > 1 && str.charAt(str.length - 1).toUpperCase()
  }`
}

export function formatValueTableRow(config: TableRow, currentData: any): string {
  const value = currentData?.[config.key] || ''

  switch (config.format) {
    case 'fullname':
      return getFullName(currentData) || ''
    case 'money':
      return formatMoney(+value || 0)
    case 'phone':
      return value ? `+64 ${value}` : ''
    case 'option':
      const currentOptions = config?.options || []
      const label = currentOptions.find((o) => o.value === value)?.label || ''

      return label
    default:
      return value
  }
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}
