import * as Yup from 'yup'
import {TableConfig, UserItem} from '@/app/types'
import {convertFieldMaximum} from '@/app/utils'
import Badge from '@/components/badge/Badge'

export const USER_TABLE_CONFIG: TableConfig<keyof UserItem> = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/user',
    dependencies: {
      apiCreateUser: 'config/user',
      apiUpdateUser: 'config/user',
    },
    endpoint: '/config/user',
    endPointGetListing: '/user',
    messageDeleteSuccess: 'User "/%/" successfully deleted',
    messageEditSuccess: 'User "/%/" successfully updated',
    messageCreateSuccess: 'User "/%/" successfully created',
    buttonAddNew: 'New User',
    showMessageTitle: 'username',
    validation: Yup.object().shape({
      firstname: Yup.string()
        .required('First name is required')
        .trim()
        .max(255, convertFieldMaximum(255)),
      lastname: Yup.string()
        .required('Last name is required')
        .trim()
        .max(255, convertFieldMaximum(255)),
      telephone: Yup.string().min(6, 'Minimum 6 symbols').max(11, convertFieldMaximum(11)),
      email: Yup.string()
        .trim()
        .email('Email is not in valid format')
        .max(255, convertFieldMaximum(255)),
      username: Yup.string()
        .trim()
        .min(3, 'Minimum 3 symbols')
        .required('Username is required')
        .max(64, convertFieldMaximum(64)),
      role_id: Yup.number().required('Role is required'),
    }),
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'company_name',
      name: 'Company Name',
    },
    {
      key: 'username',
      name: 'Username',
      color: '#252F4A',
      infoCreateEdit: {
        type: 'text',
        required: true,
        typeComponent: 'input',
        group: 'account',
      },
    },
    {
      key: 'role_name',
      name: 'Role',
    },
    {
      key: 'company_name',
      name: 'Company Name',
    },
    {
      key: 'firstname',
      name: 'First Name',
      infoCreateEdit: {
        type: 'text',
        typeComponent: 'input',
        column: 6,
        required: true,
      },
    },

    {
      key: 'lastname',
      name: 'Last Name',
      infoCreateEdit: {
        type: 'text',
        typeComponent: 'input',
        column: 6,
        required: true,
      },
    },
    {
      key: 'telephone',
      name: 'Telephone',
      infoCreateEdit: {
        type: 'phone',
        typeComponent: 'input',
        column: 6,
      },
    },
    {
      key: 'email',
      name: 'Email',
      infoCreateEdit: {
        type: 'string',
        typeComponent: 'input',
        column: 6,
      },
    },
    {
      key: 'is_active',
      name: 'Status',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        defaultValue: 1,
      },
    },

    {
      isHide: true,
      key: 'password',
      name: 'Password',
      infoCreateEdit: {
        type: 'password',
        typeComponent: 'input',
        group: 'account',
      },
    },
    {
      key: 'role_id',
      name: 'Role',
      isHide: true,
      infoCreateEdit: {
        required: true,
        keyLabelOption: 'role_name',
        typeComponent: 'select',
        dependencyApi: 'config/role/listing',
        group: 'account',
      },
    },
  ],
}
