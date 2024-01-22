import {TableConfig} from '@/app/types'
import {Input} from '@/components/input'

export const CONFIG_OUTSTANDING_LOAN__HISTORY: TableConfig = {
  settings: {
    endPointGetListing: '/',
    endpointNavigate: '/loans/details/',
    saveSESSION_NAME: 'recentlyViewedLoanId',
  },
  rows: [
    {
      key: 'id',
      name: '#',
    },
    {
      key: 'loan_no',
      name: 'Loan No',
    },
    {
      key: 'full_repayment_date',
      name: 'Full Repayment Date',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      format: 'date',
    },
    {
      key: 'total_collection',
      name: 'Total Collection',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      format: 'money',
    },
    {
      key: 'loan_amount',
      name: 'Loan Amount',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      format: 'money',
    },
    {
      key: 'p&l',
      name: 'P&L',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      format: 'money',
    },
  ],
}

export const CONFIG_FULL_SETTLED_LOAN__HISTORY: TableConfig = {
  settings: {
    endPointGetListing: '/',
    endpointNavigate: '/loans/details/',
    saveSESSION_NAME: 'recentlyViewedLoanId',
  },
  rows: [
    {
      key: 'id',
      name: '#',
    },
    {
      key: 'loan_no',
      name: 'Loan No',
    },
    {
      key: 'loan_date',
      name: 'Loan Date',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      format: 'date',
    },
    {
      key: 'settle_date',
      name: 'Settle Date',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      format: 'date',
    },
    {
      key: 'total_collection',
      name: 'Total Collection',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      format: 'money',
    },
    {
      key: 'loan_amount',
      name: 'Loan Amount',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      format: 'money',
    },
    {
      key: 'p&l',
      name: 'P&L',
      classNameTableHead: 'text-end',
      classNameTableBody: 'text-end',
      format: 'money',
    },
  ],
}
