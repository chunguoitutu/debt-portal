import Badge from 'src/components/badge/Badge'
import {TableConfig} from '../../../app/types/common'
import {DropDownRole} from '../../../components/DropDownRole'
import Select from '../../../components/select/select'
import Priority from './Priority'
import InputCheck from 'src/components/input/InputCheckRounded'

export const ROLE_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/role',
    endPointGetListing: '/config/role',
    messageDeleteSuccess: 'Role /%/ successfully deleted',
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
      color: '#252F4A',
      infoCreateEdit: {
        type: 'input',
        isRequired: true,
      },
    },
    {
      classNameTableHead: 'w-50 min-w-200px',
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
      component: DropDownRole,
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
