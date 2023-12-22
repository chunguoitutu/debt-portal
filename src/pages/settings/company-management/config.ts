import * as Yup from 'yup'

export function CREATE_COMPANY_CONFIG(type: 'Organization' | 'Business Unit') {
  return {
    settings: {
      endpoint: 'config/company/1',
      validationFormik: Yup.object().shape({
        company_name: Yup.string()
          .required(`${type} Name is required`)
          .max(255, `${type} Name must be at most 255 characters`),
        company_code: Yup.string()
          .required(`${type} Code is required`)
          .max(64, `${type} Code must be at most 64 characters`),
        business_uen: Yup.string()
          .required('Business UEN is required')
          .max(64, 'Business UEN must be at most 64 characters'),
        telephone: Yup.string().max(64, 'Telephone must be at most 64 characters'),
        email: Yup.string()
          .email('Email is not in valid format')
          .max(255, 'Email must be at most 255 characters'),
        address: Yup.string().max(255, 'Address must be at most 255 characters'),
        contact_person: Yup.string()
          .min(0)
          .max(255, 'Contact Person must be at most 255 characters'),
        license_no: Yup.string().required(`License Number is required`),
        license_expiry_date: Yup.date()
          .nullable()
          .typeError('License Expiry Date must be a valid date')
          .when(['open_date'], (openDate, schema) => {
            return openDate
              ? schema.min(openDate, 'License Expiry Date must be greater than Open Date')
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
      },
      {
        key: 'company_code',
        type: 'text',
        name: `${type} Code`,
        required: true,
      },
      {
        key: 'business_uen',
        name: `${type} UEN`,
        type: 'text',
        required: true,
      },
      {
        key: 'license_no',
        name: 'License Number',
        type: 'text',
        required: true,
      },
      {
        key: 'contact_person',
        name: 'Contact Person',
        type: 'text',
      },
      {
        key: 'address',
        name: 'Address',
        type: 'text',
      },
      {
        key: 'telephone',
        name: 'Telephone',
        type: 'number',
      },
      {
        key: 'email',
        name: 'Email',
        type: 'text',
      },
      {
        key: 'open_date',
        name: 'Open Date',
        type: 'date',
        required: true,
      },
      {
        key: 'license_expiry_date',
        name: 'License Expiry Date',
        type: 'date',
      },
      {
        key: 'web_url',
        name: 'Web Url',
        type: 'web_url',
      },
    ],
  }
}
