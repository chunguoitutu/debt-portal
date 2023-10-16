import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const MAKETTING_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    endPointDelete: '/config/marketing_type',
    endPointGetListing: '/config/marketing_type',
    messageDeleteSuccess: 'Marketing Type successfully deleted',
    buttonAddNew: 'New Marketing Type',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'marketing_type_name',
      name: 'Marketing Type Name',
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
