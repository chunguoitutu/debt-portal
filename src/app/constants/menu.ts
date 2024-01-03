import RepaymentSchedule from '@/pages/loans/loan-details/RepaymentSchedule'
import {LoanDetailsProps, MenuProps} from '../types'

export const LOAN_DETAILS_MENU: MenuProps<LoanDetailsProps>[] = [
  {
    label: 'Repayment Schedule',
    value: '1',
    component: RepaymentSchedule,
  },
  {
    label: 'Loan Payment History',
    value: '2',
  },
  {
    label: 'Bad Debt',
    value: '3',
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
