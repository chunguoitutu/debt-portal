export const COMPANY_MANAGEMENT_CONFIG = {
  endpoint: 'config/company/1',
  rows: [
    {
      key: 'company_name',
      name: 'Company Name',
      type: 'text',
      require: true,
    },
    {
      key: 'company_code',
      type: 'text',
      name: 'Company Code',
      require: true,
    },
    {
      key: 'business_uen',
      name: 'Business UEN',
      type: 'text',
      require: true,
    },
    {
      key: 'contact_person',
      name: 'Contract Person',
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
      require: true,
    },
  ],
}
