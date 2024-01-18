import {TableConfig} from '@/app/types'
import {Input} from '@/components/input'

export const CONFIG_REPAYMENT_SCHEDULE_CUSTOMER: TableConfig = {
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
      name: 'Loan No',
      classNameTableBody: 'text-end text-nowrap',
      classNameTableHead: 'text-end',
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
      name: 'Full Repayment Date',
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
      name: 'Total Collection',
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
      name: 'Loan Amount',
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
      name: 'P&L',
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
      key: 'actions',
      name: 'Actions',
      classNameTableBody: 'text-end',
      classNameTableHead: 'text-end',
      defaultShow: false,
      infoFilter: {
        // isSort: true,
        isFromTo: true,
        typeComponent: 'input',
        typeInput: 'number',
        // component: Input,
      },
    },
  ],
}
