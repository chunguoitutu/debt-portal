import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const USER_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/user',
    dependencies: {
      apiGetCompanyList: 'config/company/listing',
      apiGetRoleList: 'config/role/listing',
      apiCreateUser: 'config/user',
      apiUpdateUser: 'config/user',
    },
    endPointGetListing: '/user',
    messageDeleteSuccess: 'User successfully deleted',
    messageEditSuccess: 'User successfully updated',
    messageCreateSuccess: 'User successfully created',
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
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'password',
      name: 'Password',
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
        typeInput: 'password',
        isRequired: true,
      },
    },
    {
      key: 'role_name',
      name: 'Role Name',
    },
    {
      key: 'role_id',
      name: 'Role',
      isCreateEdit: true,
      isHide: true,
      informCreateEdit: {
        type: 'select',
        isRequired: true,
        fieldLabelOption: 'role_name',
      },
    },
    {
      key: 'firstname',
      name: 'First Name',
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'middlename',
      name: 'Middle Name',
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
        typeInput: 'text',
      },
    },
    {
      key: 'lastname',
      name: 'Last Name',
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'telephone',
      name: 'Telephone',
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
        typeInput: 'number',
        isRequired: true,
      },
    },
    {
      key: 'email',
      name: 'Email',
      isCreateEdit: true,
      informCreateEdit: {
        type: 'input',
        typeInput: 'email',
        isRequired: true,
      },
    },
    {
      key: 'company_id',
      name: 'Company',
      isHide: true,
      isCreateEdit: true,
      informCreateEdit: {
        type: 'select',
        fieldLabelOption: 'company_name',
        isRequired: true,
      },
    },
    {
      key: 'is_active',
      name: 'Status',
      isCreateEdit: true,
      component: Badge,
      informCreateEdit: {
        type: 'checkbox',
      },
    },
  ],
}
