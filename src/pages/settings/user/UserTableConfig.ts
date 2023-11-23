// import {regexPassword} from '../../../app/constants'
import {TableConfig} from '../../../app/types/common'
import {convertMessageErrorMaximum, convertMessageErrorPassword} from '../../../app/utils'
import Badge from '../../../components/badge/Badge'
import * as Yup from 'yup'
import FullNameUser from './FullNameUser'
import Input from 'src/components/input'
import InputCheck from 'src/components/input/InputCheckRounded'
import Select from 'src/components/select/select'

const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi

const validate = {
  firstname: Yup.string()
    .required('First name is required')
    .max(255, convertMessageErrorMaximum(255)),
  middlename: Yup.string().max(255, convertMessageErrorMaximum(255)),
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
    messageDeleteSuccess: 'User /%/ successfully deleted',
    messageEditSuccess: 'User /%/ successfully updated',
    messageCreateSuccess: 'User /%/ successfully created',
    buttonAddNew: 'New User',
    showMessageTitle: 'username',
    validationEdit: validate,
    validationCreate: {
      ...validate,
      password: Yup.string()
        .required('Password is required')
        .matches(regexPassword, convertMessageErrorPassword('Password')),
    },
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'username',
      name: 'Username',
      color: '#252F4A',
      isCreateEdit: true,
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
      key: 'firstname',
      name: 'First Name',
      isCreateEdit: true,
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
        component: FullNameUser, // include first name, middle name and last name
      },
    },
    {
      key: 'middlename',
      name: 'Middle Name',
      isHide: true,
    },
    {
      key: 'lastname',
      name: 'Last Name',
    },
    {
      key: 'telephone',
      name: 'Telephone',
      isCreateEdit: true,
      infoCreateEdit: {
        type: 'input',
        typeInput: 'number',
        typeComponent: 'input',
        component: Input,
        column: 6,
      },
    },
    {
      key: 'email',
      name: 'Email',
      isCreateEdit: true,
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
      isCreateEdit: true,
      component: Badge,
      infoCreateEdit: {
        type: 'checkbox',
        typeComponent: 'checkbox-rounded',
        component: InputCheck,
        isLastChild: true, // last of group information
      },
    },

    {
      isHide: true,
      key: 'password',
      name: 'Password',
      isCreateEdit: true,
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
      isCreateEdit: true,
      isHide: true,
      infoCreateEdit: {
        type: 'select',
        isRequired: true,
        fieldLabelOption: 'role_name',
        typeComponent: 'select',
        component: Select,
        dependencyApi: 'config/role/listing',
        isLastChild: true, // last of group account
      },
    },
  ],
}
