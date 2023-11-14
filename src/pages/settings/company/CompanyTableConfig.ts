import {TableConfig} from '../../../app/types/common'
import Badge from '../../../components/badge/Badge'

export const COMPANY_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: false,
    showViewButton: true,
    endPointDelete: '/config/company',
    endPointGetListing: '/config/company',
    messageDeleteSuccess: 'Company successfully deleted',
    buttonAddNew: 'New Company',
    showAddNewButton: true,
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'company_name',
      name: 'Company Name',
    },
    {
      key: 'company_code',
      name: 'Company Code',
    },
    {
      key: 'business_uen',
      name: 'Business UEN',
    },
    {
      key: 'address',
      name: 'Address',
    },
    {
      key: 'telephone',
      name: 'Telephone',
    },
    {
      key: 'email',
      name: 'Email',
    },

    {
      key: 'open_date',
      name: 'Open Date',
      type: 'date',
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
