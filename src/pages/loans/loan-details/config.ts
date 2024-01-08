import {TableConfig} from '@/app/types'
import {Input} from '@/components/input'

export const CONFIG_REPAYMENT_SCHEDULE: TableConfig = {
  settings: {
    endPointGetListing: '/',
  },
  rows: [
    {
      key: 'id',
      name: '#',
      classNameTableHead: 'repayment-id',
    },
    {
      key: 'instalment_due_date',
      name: 'Date',
      classNameTableBody: 'text-nowrap',
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'date',
        component: Input,
      },
    },
    {
      key: 'principal',
      name: 'Principal',
      classNameTableBody: 'text-end',
      classNameTableHead: 'text-end',
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'principal_balance',
      name: 'Principal Balance',
      classNameTableBody: 'text-end',
      classNameTableHead: 'text-end',
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'interest',
      name: 'Interest',
      classNameTableBody: 'text-end',
      classNameTableHead: 'text-end',
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'interest_balance',
      name: 'Interest Balance',
      classNameTableBody: 'text-end',
      classNameTableHead: 'text-end',
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'late_interest',
      name: 'Late Interest',
      classNameTableBody: 'text-end',
      classNameTableHead: 'text-end',
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'instalment_total',
      name: 'Instalment',
      classNameTableBody: 'text-end',
      classNameTableHead: 'text-end',
      defaultShow: false,
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'instalment_total_balance',
      name: 'Instalment Balance',
      classNameTableBody: 'text-end',
      classNameTableHead: 'text-end',
      defaultShow: false,
      infoFilter: {
        // isSort: true,
        isFromTo: true,
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
