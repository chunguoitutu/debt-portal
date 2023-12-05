import {TableConfig} from '@/app/types'
import Priority from './Priority'
import {Select} from '@/components/select'
import Badge from '@/components/badge/Badge'
import {SelectRolePermission} from '@/components/select'
import {CheckboxRounded} from '@/components/checkbox'
import * as Yup from 'yup'

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
    validationCreateEdit: {
      role_name: Yup.string().required('Role name is required'),
      priority: Yup.number().min(1, 'Priority is required').required('Priority is required'),
    },
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'role_name',
      name: 'Role Name',
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
      infoCreateEdit: {
        type: 'textarea',
      },
    },
    {
      key: 'priority',
      name: 'Priority',
      component: Priority,
      infoCreateEdit: {
        type: 'input',
        isRequired: true,
        component: Select,
      },
    },
    {
      key: 'permissions',
      name: 'Permissions',
      classNameTableHead: 'w-300px min-w-150px',
      component: SelectRolePermission,
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
      infoCreateEdit: {
        type: 'input',
        component: CheckboxRounded,
      },
    },
  ],
}
