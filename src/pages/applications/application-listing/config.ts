import {TableConfig} from '@/app/types'
import {ID_TYPE, STATUS_APPLICATION_FILTER} from '@/app/utils'
import Input from '@/components/input'
import Select from '@/components/select/select'

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
      key: 'id',
      name: 'ID',
      classNameTableBody: 'w-50px',
      isSort: true,
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        typeInput: 'number',
      },
    },
    {
      key: 'application_no',
      name: 'APPLICATION NO',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
      },
      isSort: true,
    },
    {
      key: 'fullname',
      name: 'NAME OF BORROWER',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
      },
      isSort: true,
    },
    {
      key: 'identification_type',
      name: 'IDENTITY CARD TYPE',
      options: ID_TYPE,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
      },
      isSort: true,
    },
    {
      key: 'identification_no',
      name: 'NRIC NO',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
      },
      isSort: true,
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
      isSort: true,
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
      isSort: true,
    },
    {
      key: 'application_date',
      name: 'APPLICATION DATE',
      type: 'date',
      classNameTableBody: 'text-end pe-0',
      classNameTableHead: 'text-end',
      infoFilter: {
        isFromTo: true,
        typeComponent: 'input',
        component: Input,
        typeInput: 'date',
      },
      isSort: true,
    },
    {
      key: 'status',
      name: 'STATUS',
      classNameTableBody: 'text-center',
      classNameTableHead: 'text-center pe-3',
      options: STATUS_APPLICATION_FILTER,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
      },
      isSort: true,
    },
  ],
}