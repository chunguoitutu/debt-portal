import {TableConfig} from '../../../app/types/common'
import Badge from '../../../components/badge/Badge'

export const LOAN_TYPE_TABLE_CONFIG: TableConfig = {
  endpoint: 'config/loan_type',
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
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
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