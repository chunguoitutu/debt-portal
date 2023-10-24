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
    },
    {
      key: 'business_uen',
      name: 'Business UEN',
      type: 'text',
      require: true,
    },
    {
      key: 'telephone',
      name: 'Telephone',
      type: 'number',
      require: true,
    },

    {
      key: 'email',
      name: 'Email',
      type: 'text',
      require: true,
    },
    {
      key: 'open_date',
      name: 'Open Date',
      type: 'datetime',
      require: true,
    },

    {
      key: 'address',
      name: 'Address',
      type: 'text',
      require: true,
    },
  ],
}
