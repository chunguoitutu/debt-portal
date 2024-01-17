import moment, {MomentInput} from 'moment'

export function getCurrentDate(): number {
  return new Date().getDate()
}

export function formatDate(date: MomentInput): string {
  return moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : ''
}
