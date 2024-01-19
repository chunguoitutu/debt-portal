import moment, {MomentInput} from 'moment'

export function getDaysOfCurrentDate(): number {
  return new Date().getDate()
}

export function formatDate(
  date: MomentInput,
  typeFormat: 'YYYY-MM-DD' | 'MMM DD, YYYY' = 'YYYY-MM-DD'
): string {
  return moment(date).isValid() ? moment(date).format(typeFormat) : ''
}
