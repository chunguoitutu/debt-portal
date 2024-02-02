import {MenuItem, EditProfile, TableRow, EditProfileList} from '@/app/types'
import GeneralInformation from './GeneralInformation'
import Authentication from './Authentication'
import * as Yup from 'yup'
import {convertFieldMaximum, convertFieldRequired} from '@/app/utils'

export type Props = {
  key: string
  label: string
  format?: string
}

export const PROFILE_MENU: MenuItem[] = [
  {id: 1, label: 'General Information', default: true, component: GeneralInformation},
  {id: 2, label: 'Authentication', component: Authentication},
]

export const PROFILE_CONFIG: TableRow[] = [
  {
    key: 'name',
    name: 'Name',
    format: 'fullname',
  },
  {
    key: 'date_of_birth',
    name: 'Date Of Birth',
    format: 'date',
    formatDate: 'DD/MM/YYYY',
  },
  {
    key: 'email',
    name: 'Email',
    className: 'text-truncate',
    isEditField: true,
  },
  {
    key: 'phone_number',
    name: 'Phone Number',
    format: 'phone',
    isEditField: true,
  },
  {
    key: 'address',
    name: 'Address',
    className: 'six-line',
    isEditField: true,
  },
]

export const MAIL_CONFIG: EditProfile = {
  label: 'Update Email',
  note: 'Please note that a valid email address is required to complete the email verification.',
  validation: Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Email invalid')
      .required(convertFieldRequired('Email'))
      .max(255, convertFieldMaximum(255)),
  }),
  isSendOtp: true,
  messageSuccess: 'Email successfully changed',
  otpInfo: {
    label: 'Verification Email',
    messageNotMatch: 'The email OTP is not match, please try again, or resend again.',
  },
  rows: [
    {
      key: 'email',
      name: 'Email',
      infoCreateEdit: {
        required: true,
        type: 'text',
        typeComponent: 'input',
      },
    },
  ],
}

export const PHONE_CONFIG: EditProfile = {
  label: 'Update Phone Number',
  note: 'Please note that a valid phone number is required to complete the phone number verification.',
  validation: Yup.object().shape({
    phone_number: Yup.string()
      .trim()
      .required(convertFieldRequired('Phone number'))
      .max(12, 'Phone number maximum 8 digits')
      .min(8, 'Phone number at least 8 digits'),
  }),
  isSendOtp: true,
  messageSuccess: 'Phone number successfully changed',
  otpInfo: {
    label: 'Verification Phone Number',
    messageNotMatch: 'The phone OTP is not match, please try again, or resend again.',
  },
  rows: [
    {
      key: 'phone_number',
      name: 'Phone Number',
      infoCreateEdit: {
        required: true,
        type: 'phone',
        typeComponent: 'input',
      },
    },
  ],
}

export const ADDRESS_CONFIG: EditProfile = {
  label: 'Update Address',
  validation: Yup.object().shape({
    address: Yup.string()
      .trim()
      .required(convertFieldRequired('Address'))
      .max(1024, convertFieldMaximum(1024)),
  }),
  messageSuccess: 'Address successfully changed',
  rows: [
    {
      key: 'address',
      name: 'Address',
      infoCreateEdit: {
        typeComponent: 'textarea',
      },
    },
  ],
}

export const EDIT_PROFILE_LIST: EditProfileList[] = [
  {
    key: 'email',
    config: MAIL_CONFIG,
  },
  {
    key: 'phone_number',
    config: PHONE_CONFIG,
  },
  {
    key: 'address',
    config: ADDRESS_CONFIG,
  },
]

export const currentUser = {
  firstname: 'Xiao Hui',
  lastname: 'Tan',
  date_of_birth: '2024-01-26',
  email: 'xiao@gmail.com',
  phone_number: '04651236978',
  address: '548, Any Building name, if applicable, 09, 128, North Avenue 1, 460548, Singapore',
}
