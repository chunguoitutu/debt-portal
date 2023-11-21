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
    messageDeleteSuccess: 'Loan Type /%/ successfully deleted',
    buttonAddNew: 'New Loan Type',
    showMessageTitle: 'type_name',
  },
  rows: [
    {
      classNameTableHead: 'min-w-50px',
      key: 'id',
      name: 'ID',
    },
    {
      classNameTableHead: 'min-w-200px',
      key: 'type_name',
      color: '#252F4A',
      name: 'Loan Type',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      classNameTableHead: 'w-50 min-w-200px',
      classNameTableBody: 'four-line',
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
