import { TableConfig } from '@/app/types'
import { ID_TYPE, STATUS_APPLICATION_FILTER } from '@/app/utils'
import { Input } from '@/components/input'
import { Select } from '@/components/select'

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
      classNameTableHead: 'ps-5',
      classNameTableBody: 'w-50px ps-3',
    },
    {
      key: 'application_no',
      name: 'Application No',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'fullname',
      name: 'Name of Borrower',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'identification_type',
      name: 'Identity Card Type',

      options: ID_TYPE,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },
    {
      key: 'identification_no',
      name: 'NRIC No',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'loan_type_id',
      name: 'Loan Type',
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        dependencyApi: '/config/loan_type/listing',
        keyLabelOption: 'type_name',
        keyValueOption: 'id',
        isSort: true,
      },
    },
    {
      key: 'loan_amount_requested',
      name: 'Loan Amount',
      classNameTableBody: 'text-end pe-0',
      classNameTableHead: 'text-end',
      infoFilter: {
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'money',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'loan_terms',
      name: 'Loan Terms',
      classNameTableBody: 'text-end',
      classNameTableHead: 'text-end pe-3',
      infoFilter: {
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'application_date',
      name: 'Application Date',
      classNameTableBody: 'text-end pe-0',
      classNameTableHead: 'text-end pe-0',
      infoFilter: {
        isFromTo: true,
        typeComponent: 'input',
        component: Input,
        typeInput: 'date',
        isSort: true,
      },
    },
    {
      key: 'status',
      name: 'Status',
      classNameTableBody: 'text-center',
      classNameTableHead: 'text-center pe-3',
      options: STATUS_APPLICATION_FILTER,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },
  ],
}
