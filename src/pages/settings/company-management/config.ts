import * as Yup from 'yup'

export const COMPANY_MANAGEMENT_CONFIG = {
  settings: {
    endpoint: 'config/company/1',
    validationFormik: Yup.object().shape({
      company_name: Yup.string()
        .required('Organization Name is required')
        .max(255, 'Organization Name must be at most 255 characters'),
      company_code: Yup.string()
        .required('Organization Code is required')
        .max(64, 'Organization Code must be at most 64 characters'),
      business_uen: Yup.string()
        .required('Business UEN is required')
        .max(64, 'Business UEN must be at most 64 characters'),
      telephone: Yup.string().max(64, 'Telephone must be at most 64 characters'),
      email: Yup.string()
        .email('Email is not in valid format')
        .max(255, 'Email must be at most 255 characters'),
      open_date: Yup.string().required('Open Date is required'),
      address: Yup.string().max(255, 'Address must be at most 255 characters'),
      contact_person: Yup.string().min(0).max(255, 'Contact Person must be at most 255 characters'),
    }),
  },
  rows: [
    {
      key: 'company_name',
      name: 'Organization Name',
      type: 'text',
      required: true,
    },
    {
      key: 'company_code',
      type: 'text',
      name: 'Organization Code',
      required: true,
    },
    {
      key: 'business_uen',
      name: 'Business UEN',
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
  ],
}
