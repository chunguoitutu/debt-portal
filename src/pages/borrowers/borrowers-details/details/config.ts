import {TableConfig} from '@/app/types'
import {Input} from '@/components/input'

export const CONFIG_OUTSTANDING_LOAN__HISTORY: TableConfig = {
  settings: {
    endPointGetListing: '/',
    endpointNavigate: '/loans/details/',
  },
  rows: [
    {
      key: 'id',
      name: '#',
    },
    {
      key: 'loan_no',
      name: 'Loan No',
      infoFilter: {
        isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'date',
        component: Input,
      },
    },
    {
      key: 'full_repayment_date',
      name: 'Full Repayment Date',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      typeValue: 'date',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'total_collection',
      name: 'Total Collection',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      typeValue: 'money',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'loan_amount',
      name: 'Loan Amount',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      typeValue: 'money',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'p&l',
      name: 'P&L',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      typeValue: 'money',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
  ],
}

export const CONFIG_FULL_SETTLED_LOAN__HISTORY: TableConfig = {
  settings: {
    endPointGetListing: '/',
    endpointNavigate: '/loans/details/',
  },
  rows: [
    {
      key: 'id',
      name: '#',
    },
    {
      key: 'loan_no',
      name: 'Loan No',
      infoFilter: {
        isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'date',
        component: Input,
      },
    },
    {
      key: 'loan_date',
      name: 'Loan Date',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      typeValue: 'date',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'settle_date',
      name: 'Settle Date',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      typeValue: 'date',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'total_collection',
      name: 'Total Collection',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      typeValue: 'money',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'loan_amount',
      name: 'Loan Amount',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      typeValue: 'money',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'p&l',
      name: 'P&L',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      typeValue: 'money',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
  ],
}
