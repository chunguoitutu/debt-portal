import {TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'

export const COMPANY_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: false,
    showViewButton: true,
    endPointDelete: '/config/company',
    endPointGetListing: '/config/company',
    messageDeleteSuccess: 'Company "/%/" successfully deleted',
    buttonAddNew: 'New Company',
    showMessageTitle: 'company_name',
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
      color: '#252F4A',
    },
    {
      key: 'company_code',
      name: 'Company Code',
      isHide: true,
    },
    {
      key: 'business_uen',
      name: 'Business UEN',
    },
    {
      key: 'contact_person',
      isHide: true,
      name: 'Contact Person',
    },
    {
      key: 'address',
      name: 'Address',
      classNameTableHead: 'w-400px min-w-150px',
    },
    {
      key: 'telephone',
      isHide: true,
      name: 'Telephone',
    },
    {
      key: 'email',
      name: 'Email',
      isHide: true,
    },

    {
      key: 'open_date',
      name: 'Open Date',
    },
    {
      key: 'status',
      name: 'Status',
      classNameTableHead: 'w-100px',
      component: Badge,
    },
  ],
}
