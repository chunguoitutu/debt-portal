// import {regexPassword} from '../../../app/constants'
import {TableConfig} from '../../../app/types/common'
import {convertMessageErrorMaximum} from '../../../app/utils'
import Badge from '../../../components/badge/Badge'
import * as Yup from 'yup'

const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi

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
      name: 'Username',
      isCreateEdit: true,
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
      validationFormik: Yup.string()
        .required('Username is required')
        .max(64, convertMessageErrorMaximum(64)),
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
      },
      validationFormik: Yup.string().matches(
        regexPassword,
        'Password must be at least 8 character. Include at least one letter, one number and one special character.'
      ),
    },
    {
      key: 'role_name',
      name: 'Role',
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
      },
      validationFormik: Yup.string().required('Role name is required'),
    },
    {
      key: 'firstname',
      name: 'First Name',
      isCreateEdit: true,
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
      validationFormik: Yup.string()
        .required('First name is required')
        .max(255, convertMessageErrorMaximum(255)),
    },
    {
      key: 'middlename',
      name: 'Middle Name',
      isCreateEdit: true,
      isHide: true,
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
      },
      validationFormik: Yup.string().max(255, convertMessageErrorMaximum(255)),
    },
    {
      key: 'lastname',
      name: 'Last Name',
      isCreateEdit: true,
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
      validationFormik: Yup.string()
        .required('Last name is required')
        .max(255, convertMessageErrorMaximum(255)),
    },
    {
      key: 'telephone',
      name: 'Telephone',
      isCreateEdit: true,
      infoCreateEdit: {
        type: 'input',
        typeInput: 'number',
      },
      validationFormik: Yup.string()
        .min(6, 'Minimum 6 symbols')
        .max(11, convertMessageErrorMaximum(11)),
    },
    {
      key: 'email',
      name: 'Email',
      isCreateEdit: true,
      infoCreateEdit: {
        type: 'input',
        typeInput: 'email',
      },
      validationFormik: Yup.string()
        .email('Email is not in valid format')
        .max(255, convertMessageErrorMaximum(255)),
    },
    {
      key: 'company_id',
      name: 'Company',
      isHide: true,
      isCreateEdit: true,
      infoCreateEdit: {
        type: 'select',
        fieldLabelOption: 'company_name',
        isRequired: true,
      },
      validationFormik: Yup.string().required('Company is required'),
    },
    {
      key: 'is_active',
      name: 'Status',
      isCreateEdit: true,
      component: Badge,
      infoCreateEdit: {
        type: 'checkbox',
      },
    },
  ],
}
