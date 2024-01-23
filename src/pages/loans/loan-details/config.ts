import { TableConfig } from '@/app/types'
import { Input } from '@/components/input'

export const CONFIG_REPAYMENT_SCHEDULE: TableConfig = {
  settings: {
    endPointGetListing: '/',
  },
  rows: [
    {
      key: 'id',
      name: '#',
      classNameTableHead: 'repayment-id ps-1',
      classNameTableBody: 'ps-1',
    },
    {
      key: 'date',
      name: 'Date',
      classNameTableBody: 'text-end text-nowrap',
      classNameTableHead: 'fs-14 text-end',
      format: 'date',
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
      classNameTableHead: 'fs-14 text-end',
      format: 'money',
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
      classNameTableHead: 'fs-14 text-end',
      format: 'money',
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
      classNameTableHead: 'fs-14 text-end',
      format: 'money',
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
      classNameTableHead: 'fs-14 text-end',
      format: 'money',
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
      classNameTableHead: 'fs-14 text-end',
      format: 'money',
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'total',
      name: 'Instalment',
      classNameTableBody: 'text-end',
      classNameTableHead: 'fs-14 text-end',
      defaultShow: false,
      format: 'money',
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        component: Input,
      },
    },
    {
      key: 'total_balance',
      name: 'Instalment Balance',
      classNameTableBody: 'text-end',
      classNameTableHead: 'fs-14 text-end',
      defaultShow: false,
      format: 'money',
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
