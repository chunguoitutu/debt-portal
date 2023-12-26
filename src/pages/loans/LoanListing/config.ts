import {TableConfig} from '@/app/types'
import {ID_TYPE, STATUS_APPLICATION_FILTER} from '@/app/utils'
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
      classNameTableHead: 'ps-5 w-50px',
      classNameTableBody: 'mw-50px ps-5',
    },
    {
      key: 'loan_no',
      name: 'Loan No',
      classNameTableBody: 'mw-250px ps-5',
      classNameTableHead: 'ps-5 w-220px',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'fullname',
      name: 'Name of Borrower',
      classNameTableHead: 'ps-5 mw-400px pe-0',
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
      classNameTableHead: 'ps-5 mw-250px pe-0',
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
      classNameTableHead: 'ps-5 mw-100px pe-0',
      classNameTableBody: 'pe-0',
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },
    {
      key: 'loan_amount',
      name: 'Loan Amount',
      classNameTableHead: 'ps-0 mw-250px pe-5 text-end',
      classNameTableBody: 'pe-8  text-end',
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },
    {
      key: 'monthly_due_date',
      name: 'Monthly Due Date',
      classNameTableHead: 'ps-8 mw-200px pe-8 text-end',
      classNameTableBody: 'pe-8 text-end',
      infoFilter: {
        isFromTo: true,
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
  ],
}
