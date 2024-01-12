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
    messageDeleteSuccess: 'Business Unit "/%/" successfully deleted',
    buttonAddNew: 'New Business Unit',
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
      name: 'Business Unit Name',
      color: '#252F4A',
    },
    {
      key: 'company_code',
      name: 'Business Unit Code',
      classNameTableHead: 'w-250px ps-10',
      classNameTableBody: 'ps-7',
    },
    {
      key: 'business_uen',
      name: 'Business Unit UEN',
      classNameTableHead: 'pe-30px',
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
      classNameTableHead: 'w-250px pe-3 text-end',
      classNameTableBody: 'text-end',
    },
    {
      key: 'status',
      name: 'Status',
      classNameTableHead: 'w-100px',
      component: Badge,
    },
  ],
}
