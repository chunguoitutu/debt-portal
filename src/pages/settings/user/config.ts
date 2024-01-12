import * as Yup from 'yup'
import {TableConfig} from '@/app/types'
import {Select} from '@/components/select'
import {convertMessageErrorMaximum, convertMessageErrorPassword} from '@/app/utils'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'
import {Input} from '@/components/input'

const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi

const validate = {
  firstname: Yup.string()
    .required('First name is required')
    .max(255, convertMessageErrorMaximum(255)),
  lastname: Yup.string()
    .required('Last name is required')
    .max(255, convertMessageErrorMaximum(255)),
  telephone: Yup.string().min(6, 'Minimum 6 symbols').max(11, convertMessageErrorMaximum(11)),
  email: Yup.string()
    .email('Email is not in valid format')
    .max(255, convertMessageErrorMaximum(255)),
  username: Yup.string().required('Username is required').max(64, convertMessageErrorMaximum(64)),
  password: Yup.string().matches(regexPassword, convertMessageErrorPassword('Password')),
  role_id: Yup.string().required('Role is required'),
}

export const USER_TABLE_CONFIG: TableConfig = {
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
    endPointGetListing: '/user',
    messageDeleteSuccess: 'User "/%/" successfully deleted',
    messageEditSuccess: 'User "/%/" successfully updated',
    messageCreateSuccess: 'User "/%/" successfully created',
    buttonAddNew: 'New User',
    showMessageTitle: 'username',
    validationEdit: Yup.object().shape(validate),
    validationCreateEdit: Yup.object().shape({
      ...validate,
      password: Yup.string()
        .required('Password is required')
        .matches(regexPassword, convertMessageErrorPassword('Password')),
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
        type: 'input',
        typeInput: 'text',
        isRequired: true,
        typeComponent: 'input',
        component: Input,
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
        type: 'input',
        typeInput: 'text',
        typeComponent: 'input',
        component: Input,
        column: 6,
      },
    },

    {
      key: 'lastname',
      name: 'Last Name',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        typeComponent: 'input',
        component: Input,
        column: 6,
      },
    },
    {
      key: 'telephone',
      name: 'Telephone',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'phone',
        typeComponent: 'input',
        component: Input,
        column: 6,
      },
    },
    {
      key: 'email',
      name: 'Email',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'string',
        typeComponent: 'input',
        component: Input,
        column: 6,
      },
    },
    {
      key: 'is_active',
      name: 'Status',
      component: Badge,
      infoCreateEdit: {
        type: 'checkbox',
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        isLastChild: true, // last of group information
      },
    },

    {
      isHide: true,
      key: 'password',
      name: 'Password',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'password',
        isRequired: true,
        typeComponent: 'input',
        component: Input,
      },
    },
    {
      key: 'role_id',
      name: 'Role',
      isHide: true,
      infoCreateEdit: {
        type: 'select',
        isRequired: true,
        keyLabelOption: 'role_name',
        typeComponent: 'select',
        component: Select,
        dependencyApi: 'config/role/listing',
        isLastChild: true, // last of group account
      },
    },
  ],
}
