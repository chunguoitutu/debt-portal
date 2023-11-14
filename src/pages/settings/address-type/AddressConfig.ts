import {TableConfig} from '../../../app/types/common'
import Badge from '../../../components/badge/Badge'

export const ADDRESS_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/address_type',
    endPointGetListing: '/config/address_type',
    messageDeleteSuccess: 'Address successfully deleted',
    buttonAddNew: 'New Address',
    endpoint: 'config/address_type',
    swalToastTitle: 'Address type successfully',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },

    {
      key: 'address_type_name',
      name: 'Address Type',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'description',
      name: 'Description',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
      },
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}