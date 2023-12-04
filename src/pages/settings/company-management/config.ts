export const COMPANY_MANAGEMENT_CONFIG = {
  endpoint: 'config/company/1',
  rows: [
    {
      key: 'company_name',
      name: 'Company Name',
      type: 'text',
      required: true,
    },
    {
      key: 'company_code',
      type: 'text',
      name: 'Company Code',
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
