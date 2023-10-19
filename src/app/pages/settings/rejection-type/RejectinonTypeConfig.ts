import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const REJECTION_TYPE_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/rejection_type',
    endPointGetListing: '/config/rejection_type',
    messageDeleteSuccess: 'Rejection type successfully deleted',
    buttonAddNew: 'New Rejection Type',
    endpoint: 'config/rejection_type',
    swalToastTitle: 'Rejection type successfully',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'rejection_type_name',
      name: 'Rejection Type Name',
      informCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'rejection_type_code',
      name: 'Rejection Type Code',
      informCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'rejection_type_description',
      name: 'Rejection Type Description',
      informCreateEdit: {
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
