import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const MAKETTING_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/marketing_type',
    endPointGetListing: '/config/marketing_type',
    messageDeleteSuccess: 'Marketing Type successfully deleted',
    buttonAddNew: 'New Marketing Type',
    endpoint: 'config/marketing_type',
    swalToastTitle: 'Marketing type successfully',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'marketing_type_name',
      name: 'Marketing Type Name',
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
