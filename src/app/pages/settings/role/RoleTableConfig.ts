import {DropDownRole} from '../../../components/DropDownRole'
import Select from '../../../components/select/select'
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
      infoCreateEdit: {
        type: 'input',
        isRequired: true,
      },
    },
    {
      key: 'description',
      name: 'Description',
      isCreateEdit: true,
      infoCreateEdit: {
        type: 'textarea',
      },
    },
    {
      key: 'priority',
      name: 'Priority',
      isCreateEdit: true,
      component: Priority,
      componentCreateEdit: Select,
    },
    {
      key: 'permissions',
      name: 'Permissions',
      component: DropDownRole,
      isCreateEdit: true,
    },
  ],
}
