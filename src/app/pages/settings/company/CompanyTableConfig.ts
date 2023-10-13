import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const COMPANY_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    endPointDelete: '/config/company',
    endPointGetListing: '/config/company',
    messageDeleteSuccess: 'Company successfully deleted',
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
      key: 'telephone',
      name: 'Telephone',
    },
    {
      key: 'email',
      name: 'Email',
    },
    {
      key: 'website',
      name: 'Website',
    },
    {
      key: 'registration_date',
      name: 'Registation Date',
      type: 'datetime',
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
