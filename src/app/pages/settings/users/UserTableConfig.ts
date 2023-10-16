import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const USER_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/loan_officer',
    endPointGetListing: '/config/loan_officer',
    messageDeleteSuccess: 'User successfully deleted',
    buttonAddNew: 'New User',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'username',
      name: 'User Name',
    },
    {
      key: 'firstname',
      name: 'First Name',
    },
    {
      key: 'middlename',
      name: 'Middle Name',
    },
    {
      key: 'lastname',
      name: 'Last Name',
    },
    {
      key: 'role_name',
      name: 'Role Name',
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
      key: 'is_active',
      name: 'Status',
      component: Badge,
    },
  ],
}
