import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

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
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },

    {
      key: 'address_type_name',
      name: 'Address Type Name',
    },
    {
      key: 'description',
      name: 'Description',
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
