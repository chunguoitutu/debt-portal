import {ObjectSchema} from 'yup'
import {TableRow} from './common'

export type EditModalProps = {
  onClose: () => void
  config: EditProfile
  currentUser: any
}

export type EditProfile = {
  label: string
  note?: string
  validation?: ObjectSchema<any>
  rows: TableRow[]
  isSendOtp?: boolean
  messageSuccess: string
  otpInfo?: {
    label: string
    messageNotMatch: string
  }
}

export type EditProfileList = {
  key: 'email' | 'phone_number' | 'address'
  config: EditProfile
}
