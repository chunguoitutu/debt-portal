import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const LOAN_TYPE_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/loan_type',
    endPointGetListing: '/config/loan_type',
    messageDeleteSuccess: 'Loan Type successfully deleted',
    buttonAddNew: 'New Loan Type',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'type_name',
      name: 'Loan Type',
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
