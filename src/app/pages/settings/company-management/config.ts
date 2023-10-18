export const COMPANY_MANAGEMENT_CONFIG = {
  endpoint: 'config/company/id/1/address/1',
  rows: [
    {
      key: 'company_name',
      name: 'Company Name',
      require: true,
    },
    {
      key: 'company_code',
      name: 'Company Code',
    },
    {
      key: 'business_uen',
      name: 'Business UEN',
      require: true,
    },
    {
      key: 'telephone',
      name: 'Telephone',
      require: true,
    },
    {
      key: 'street_1',
      name: 'Street 1',
      require: true,
    },
    {
      key: 'street_2',
      name: 'Street 2',
    },
    {
      key: 'email',
      name: 'Email',
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
      require: true,
    },
    {
      key: 'state',
      name: 'State',
      require: true,
    },
    {
      key: 'country',
      name: 'Country',
      require: true,
    },
    {
      key: 'zipcode',
      name: 'Zip Code',
      require: true,
    },
  ],
}
