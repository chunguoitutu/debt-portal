import {TableConfig} from '../../../app/types/common'
import Badge from '../../../components/badge/Badge'

export const REJECTION_TYPE_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/rejection_type',
    endPointGetListing: '/config/rejection_type',
    messageDeleteSuccess: 'Rejection type /%/ successfully deleted',
    buttonAddNew: 'New Rejection Type',
    endpoint: 'config/rejection_type',
    showMessageTitle: 'rejection_type_name',
    swalToastTitle: 'Rejection type /%/ successfully',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'rejection_type_name',
      name: 'Rejection Type',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'rejection_type_code',
      name: 'Code',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'rejection_type_description',
      name: 'Description',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
