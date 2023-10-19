export const COMPANY_MANAGEMENT_CONFIG = {
  endpoint: 'config/company/id/1/address/1',
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
      key: 'street_1',
      name: 'Street 1',
      type: 'text',
      require: true,
    },
    {
      key: 'street_2',
      type: 'text',
      name: 'Street 2',
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
      key: 'city',
      name: 'City',
      type: 'text',
      require: true,
    },
    {
      key: 'state',
      type: 'text',

      name: 'State',
      require: true,
    },
    {
      key: 'country',
      name: 'Country',
      type: 'text',

      require: true,
    },
    {
      key: 'zipcode',
      type: 'text',

      name: 'Zip Code',
      require: true,
    },
  ],
}
