export const REJECTION_MANAGEMENT_CONFIG = {
  endpoint: 'config/rejection_type',
  swalToastTitle: 'Rejection type successfully',
  rows: [
    {
      key: 'rejection_type_name',
      name: 'Rejection Type Name',
      type: 'text',
      require: true,
    },
    {
      key: 'rejection_type_code',
      name: 'Rejection Type Code',
      type: 'text',
      require: true,
    },
    {
      key: 'rejection_type_description',
      name: 'Rejection Type Description',
      type: 'text',
    },
  ],
}
