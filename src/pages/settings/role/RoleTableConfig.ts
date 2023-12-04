import {TableConfig} from '@/app/types'
import Priority from './Priority'
import {Select} from '@/components/select'
import Badge from '@/components/badge/Badge'
import InputCheck from '@/components/input/InputCheckRounded'
import {SelectRolePermission} from '@/components/select'

export const ROLE_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/role',
    endPointGetListing: '/config/role',
    messageDeleteSuccess: 'Role "/%/" successfully deleted',
    buttonAddNew: 'New Role',
    showMessageTitle: 'role_name',
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
      classNameTableHead: ' min-w-150px',
      classNameTableBody: 'text-break',
      color: '#252F4A',
      infoCreateEdit: {
        type: 'input',
        isRequired: true,
      },
    },
    {
      classNameTableHead: 'w-600px min-w-150px',
      classNameTableBody: 'four-line',
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
      infoCreateEdit: {
        type: 'input',
        isRequired: true,
      },
    },
    {
      key: 'permissions',
      name: 'Permissions',
      classNameTableHead: 'w-300px min-w-150px',
      component: SelectRolePermission,
      isCreateEdit: true,
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
      componentCreateEdit: InputCheck,
      isCreateEdit: true,
    },
  ],
}
