import {TableConfig} from '@/app/types'
import {ID_TYPE, LOAN_U_F_0, STATUS_APPLICATION_FILTER} from '@/app/utils'
import {Input} from '@/components/input'
import {Select} from '@/components/select'

export const LOAN_LISTING_CONFIG: TableConfig = {
  endpoint: '',
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    endPointGetListing: '/loan/listing',
    showFilter: true,
    showSearch: true,
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
      classNameTableHead: 'ps-5 min-w-30px',
      classNameTableBody: 'w-50px ps-5',
    },
    {
      key: 'loan_no',
      name: 'Loan No',
      classNameTableHead: 'ps-5 min-w-175px',
      classNameTableBody: 'min-w-175px',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'fullname',
      name: 'Name of Borrower',
      classNameTableHead: 'ps-5',
      classNameTableBody: 'pe-0',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'identification_no',
      name: 'NRIC No',
      classNameTableHead: 'ps-5',
      classNameTableBody: 'pe-0',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'status',
      name: 'UFO',
      classNameTableHead: 'ps-5',
      classNameTableBody: 'pe-0',
      options: LOAN_U_F_0,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },
    {
      key: 'loan_amount',
      name: 'Loan Amount',
      classNameTableBody: 'text-end pe-0',
      classNameTableHead: 'text-end',
      infoFilter: {
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'approval_date',
      name: 'Monthly Due Date',
      classNameTableHead: 'ps-8 pe-8 text-end',
      classNameTableBody: 'pe-8 text-end',
      infoFilter: {
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'date',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'loan_term',
      name: 'No. Of Instalment',
      classNameTableHead: 'ps-8 pe-8 text-end',
      classNameTableBody: 'pe-8 text-end',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
  ],
}