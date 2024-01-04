import {TableConfig} from '@/app/types'
import {Input} from '@/components/input'

export const CONFIG_REPAYMENT_SCHEDULE: TableConfig = {
  settings: {
    endPointGetListing: '/',
  },
  rows: [
    {
      key: 'id',
      name: 'Count',
    },
    {
      key: 'due_date',
      name: 'Date',
      infoFilter: {
        isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'date',
        component: Input,
      },
    },
    {
      key: 'interest_amount',
      name: 'Interest',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'principal_amount',
      name: 'Amount',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
  ],
}

export const CONFIG_RECEIPT_HISTORY: TableConfig = {
  settings: {
    endPointGetListing: '/',
  },
  rows: [
    {
      key: 'id',
      name: 'Receipt Number',
    },
    {
      key: 'repayment_date',
      name: 'Date',
      infoFilter: {
        isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'date',
        component: Input,
      },
    },
    {
      key: 'principal_paid',
      name: 'Principal',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'interest_paid',
      name: 'Interest',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'penalty_paid',
      name: 'Penalty Paid',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      infoFilter: {
        isSort: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
  ],
}
