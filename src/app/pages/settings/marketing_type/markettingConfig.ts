import Badge from '../../../components/badge/Badge'

export const MAKETTING_TABLE_CONFIG = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    endPointDelete: '/config/marketing_type',
    endPointGetListing: '/config/marketing_type',
    messageDeleteSuccess: 'Marketing Type successfully deleted',
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
