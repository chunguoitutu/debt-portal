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
    messageDeleteSuccess: 'Address Type /%/ successfully deleted',
    buttonAddNew: 'New Address',
    endpoint: 'config/address_type',
    showMessageTitle: 'address_type_name',
    swalToastTitle: 'Address Type /%/ successfully',
  },
  rows: [
    {
      classNameTableHead: 'min-w-20px',
      key: 'id',
      name: 'ID',
    },

    {
      key: 'address_type_name',
      name: 'Address Type',
      color: '#252F4A',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'description',
      name: 'Description',
      classNameTableHead: 'w-600px min-w-150px',
      classNameTableBody: 'four-line',
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
