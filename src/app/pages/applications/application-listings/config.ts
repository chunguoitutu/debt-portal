import Input from '../../../components/input'
import Select from '../../../components/select/select'
import {TableConfig} from '../../../modules/auth'
import {ID_TYPE, STATUS_APPLICATION_FILTER} from '../../../utils/globalConfig'

export const APPLICATION_LISTING_CONFIG: TableConfig = {
  endpoint: '',
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    endPointGetListing: '/application/listing',
    showFilter: true,
    showSearch: true,
  },
  rows: [
    {
      key: 'application_no',
      name: 'Application Number',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
      },
    },
    {
      key: 'fullname',
      name: 'APPLICATION NAME',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
      },
    },
    {
      key: 'identification_type',
      name: 'ID TYPE',
      options: ID_TYPE,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
      },
    },
    {
      key: 'identification_no',
      name: 'NRIC',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
      },
    },
    {
      key: 'loan_type_id',
      name: 'LOAN TYPE',
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        dependencyApi: '/config/loan_type/listing',
        fieldLabelOption: 'type_name',
        fieldValueOption: 'id',
      },
    },
    {
      key: 'loan_amount_requested',
      name: 'LOAN AMOUNT REQUIRED',
      type: 'money',
      classNameTableBody: 'text-end pe-0',
      classNameTableHead: 'text-end',
      infoFilter: {
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'application_date',
      name: 'APPLICATION DATE',
      type: 'date',
      classNameTableBody: 'text-end pe-0',
      classNameTableHead: 'text-end',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        typeInput: 'date',
      },
    },
    {
      key: 'status',
      name: 'STATUS',
      classNameTableBody: 'text-center',
      classNameTableHead: 'text-center',
      options: STATUS_APPLICATION_FILTER,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
      },
    },
  ],
}
