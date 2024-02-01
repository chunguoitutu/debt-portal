import moment, {MomentInput} from 'moment'
import {FormatDate} from '../types'

export function getDaysOfCurrentDate(): number {
  return new Date().getDate()
}

export function formatDate(date: MomentInput, typeFormat: FormatDate = 'YYYY-MM-DD'): string {
  return moment(date).isValid() ? moment(date).format(typeFormat) : ''
}
