import {TableConfig} from '../../../modules/auth'

export const ROLE_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/role',
    endPointGetListing: '/config/role',
    messageDeleteSuccess: 'Role successfully deleted',
    buttonAddNew: 'New Role',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'role_name',
      name: 'Role Name',
    },
    {
      key: 'description',
      name: 'Description',
    },
    {
      key: 'permissions',
      name: 'Permissions',
    },
  ],
}