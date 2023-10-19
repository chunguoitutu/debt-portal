import {TableConfig} from '../../../modules/auth'
import Priority from './Priority'

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
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
        isRequired: true,
      },
    },
    {
      key: 'description',
      name: 'Description',
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
      },
    },
    {
      key: 'priority',
      name: 'Priority',
      component: Priority,
      isCreateEdit: true,
      informCreateEdit: {
        type: 'select',
        isRequired: true,
      },
    },
    {
      key: 'permissions',
      name: 'Permissions',
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
      },
    },
  ],
}
