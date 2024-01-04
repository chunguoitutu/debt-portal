import RepaymentSchedule from '@/pages/loans/loan-details/RepaymentSchedule'
import Receipt from '@/pages/loans/loan-details/Receipt'
import {LoanDetailsProps, MenuProps} from '../types'
import BadDebt from '@/pages/loans/loan-details/BadDebt'

export const LOAN_DETAILS_MENU: MenuProps<LoanDetailsProps>[] = [
  {
    label: 'Repayment Schedule',
    value: '1',
    component: RepaymentSchedule,
  },
  {
    label: 'Loan Payment History',
    value: '2',
    component: Receipt,
  },
  {
    label: 'Bad Debt',
    value: '3',
    component: BadDebt,
  },
  {
    label: 'Reject',
    value: '4',
  },
  {
    label: 'Payment Term & Supporting',
    value: '5',
  },
]
