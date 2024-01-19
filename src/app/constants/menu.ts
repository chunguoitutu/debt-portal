import RepaymentSchedule from '@/pages/loans/loan-details/RepaymentSchedule'
import Receipt from '@/pages/loans/loan-details/Receipt'
import {LoanDetailsProps, MenuProps} from '../types'
import BadDebt from '@/pages/loans/loan-details/BadDebt'
import LoanAssignmentAndActionLog from '@/pages/loans/loan-details/LoanAssignmentAndActionLog'
import OutstandingLoan from '@/pages/borrowers/borrowers-details/details/OutstandingLoan'
import FullSettledLoan from '@/pages/borrowers/borrowers-details/details/FullSettledLoan'
import UnrecoverableLoan from '@/pages/borrowers/borrowers-details/details/UnrecoverableLoan'

export function getMenuHorizontalLoanDetails(isAdminOrSuperAdmin: boolean) {
  let LOAN_DETAILS_MENU: MenuProps<LoanDetailsProps>[] = [
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

  if (isAdminOrSuperAdmin) {
    LOAN_DETAILS_MENU = [
      ...LOAN_DETAILS_MENU,
      {
        label: 'Assignment & Action Log',
        value: '6',
        component: LoanAssignmentAndActionLog,
      },
    ]
  }

  return LOAN_DETAILS_MENU
}

export function getMenuHorizontalCustomerDetails(isAdminOrSuperAdmin: boolean) {
  let CUSTOMER_DETAILS_MENU: MenuProps<LoanDetailsProps>[] = [
    {
      label: 'Outstanding Loan',
      value: '1',
      component: OutstandingLoan,
    },
    {
      label: 'Full Settled Loan',
      value: '2',
      component: FullSettledLoan,
    },
    {
      label: 'Unrecoverable Loan',
      value: '3',
      component: UnrecoverableLoan,
    },
    {
      label: 'Supporting Attachment',
      value: '4',
    },
    {
      label: 'Remark',
      value: '5',
    },
  ]

  return CUSTOMER_DETAILS_MENU
}
