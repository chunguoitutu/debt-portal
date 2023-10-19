export const ADDRESS_MANAGEMENT_CONFIG = {
  endpoint: 'config/address_type',
  swalToastTitle: 'Address type successfully',
  rows: [
    {
      key: 'address_type_name',
      name: 'Address Type Name',
      type: 'text',
      require: true,
    },
    {
      key: 'description',
      name: 'Description',
      type: 'text',
    },
  ],
}
