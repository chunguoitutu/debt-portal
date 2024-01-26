import {CheckboxRounded} from '@/components/checkbox'
import moment from 'moment'
import * as Yup from 'yup'

export function CREATE_COMPANY_CONFIG(type: 'Organization' | 'Business Unit') {
  const other =
    type === 'Organization'
      ? []
      : [
          {
            key: 'status',
            name: 'Status',
            typeComponent: 'checkbox-rounded',
            defaultValue: 1,
          },
        ]

  return {
    settings: {
      endPointGetListing: '/',
      endpoint: 'config/company/1',
      validation: Yup.object().shape({
        company_name: Yup.string()
          .trim()
          .required(`${type} Name is required`)
          .max(255, `${type} Name must be at most 255 characters`),
        company_code: Yup.string()
          .trim()
          .required(`${type} Code is required`)
          .max(64, `${type} Code must be at most 64 characters`),
        business_uen: Yup.string()
          .trim()
          .required('Business UEN is required')
          .max(64, 'Business UEN must be at most 64 characters'),
        telephone: Yup.string().max(64, 'Telephone must be at most 64 characters'),
        email: Yup.string()
          .trim()
          .email('Email is not in valid format')
          .max(255, 'Email must be at most 255 characters'),
        address: Yup.string().trim().max(255, 'Address must be at most 255 characters'),
        contact_person: Yup.string()
          .trim()
          .min(0)
          .max(255, 'Contact Person must be at most 255 characters'),
        license_no: Yup.string().trim().required(`License Number is required`),
        license_expiry_date: Yup.date()
          .nullable()
          .notRequired()
          .default(null)
          .transform((value) => {
            // Transform the value to a Date or null
            return value instanceof Date && !isNaN(value as any) ? value : null
          })
          .min(Yup.ref('open_date'), () => `License Expiry Date must be greater than Open Date`)
          .typeError('License Expiry Date must be a valid date')
          .when(['open_date'], (openDate, schema) => {
            return openDate[0] && moment(openDate[0]).isValid()
              ? schema?.min(openDate, 'License Expiry Date must be greater than Open Date')
              : schema
          }),

        open_date: Yup.date().required('Open Date is required'),
      }),
    },
    rows: [
      {
        key: 'company_name',
        name: `${type} Name`,
        type: 'text',
        required: true,
        typeComponent: 'input',
      },
      {
        key: 'company_code',
        type: 'text',
        name: `${type} Code`,
        required: true,
        typeComponent: 'input',
      },
      {
        key: 'business_uen',
        name: `${type} UEN`,
        type: 'text',
        required: true,
        typeComponent: 'input',
      },
      {
        key: 'license_no',
        name: 'License Number',
        type: 'text',
        required: true,
        typeComponent: 'input',
      },
      {
        key: 'contact_person',
        name: 'Contact Person',
        type: 'text',
        typeComponent: 'input',
      },
      {
        key: 'address',
        name: 'Address',
        type: 'text',
        typeComponent: 'input',
      },
      {
        key: 'telephone',
        name: 'Telephone',
        type: 'phone',
        typeComponent: 'input',
      },
      {
        key: 'email',
        name: 'Email',
        type: 'text',
        typeComponent: 'input',
      },
      {
        key: 'open_date',
        name: 'Open Date',
        type: 'date',
        required: true,
        typeComponent: 'input',
      },
      {
        key: 'license_expiry_date',
        name: 'License Expiry Date',
        type: 'date',
        typeComponent: 'input',
      },
      {
        key: 'web_url',
        name: 'Web Url',
        type: 'web_url',
        typeComponent: 'input',
      },
      ...(other as any),
    ],
  }
}
