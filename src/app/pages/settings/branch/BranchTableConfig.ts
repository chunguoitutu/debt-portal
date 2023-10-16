import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const BRANCH_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    endPointDelete: '/config/branch',
    endPointGetListing: '/config/branch',
    messageDeleteSuccess: 'Branch successfully deleted',
    buttonAddNew: 'New Branch',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'business_uen',
      name: 'Business UEN',
    },
    {
      key: 'branch_name',
      name: 'Branch Name',
    },
    {
      key: 'address_id',
      name: 'Address ID',
      isHide: true,
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
      name: 'Open date',
      type: 'datetime',
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
