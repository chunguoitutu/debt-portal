import {Option, RoleItem, TableConfig} from '@/app/types'
import {Select} from '@/components/select'
import Badge from '@/components/badge/Badge'
import * as Yup from 'yup'

export const ROLE_PRIORITY: Option[] = [
  {
    value: 1,
    label: 'Full-Access',
  },
  {
    value: 2,
    label: 'Branch Manager',
  },
  {
    value: 3,
    label: 'Finance',
  },
  {
    value: 4,
    label: 'Agent',
  },
  {
    value: 5,
    label: 'Debt Collect',
  },
]

export const ROLE_TABLE_CONFIG: TableConfig<keyof RoleItem> = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/role',
    endPointGetListing: '/config/role',
    endpoint: '/config/role',
    messageDeleteSuccess: 'Role "/%/" successfully deleted',
    buttonAddNew: 'New Role',
    showMessageTitle: 'role_name',
    validation: Yup.object().shape({
      role_name: Yup.string().trim().required('Role name is required'),
      priority: Yup.number().required('Priority is required'),
    }),
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
        typeComponent: 'input',
        required: true,
      },
    },
    {
      key: 'priority',
      name: 'Priority',
      format: 'option',
      options: ROLE_PRIORITY,
      infoCreateEdit: {
        typeComponent: 'select',
        required: true,
        component: Select,
        options: ROLE_PRIORITY,
      },
    },
    {
      classNameTableHead: 'w-600px min-w-150px',
      classNameTableBody: 'four-line',
      key: 'description',
      name: 'Description',
      infoCreateEdit: {
        typeComponent: 'textarea',
      },
    },
    /**
     * use it after have feature permissions
     */
    // {
    //   key: 'permissions',
    //   name: 'Permissions',
    //   classNameTableHead: 'w-300px min-w-150px',
    //   component: SelectRolePermission,
    // },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        defaultValue: 1,
      },
    },
  ],
}
