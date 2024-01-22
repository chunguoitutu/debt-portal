import {Dispatch, SetStateAction} from 'react'

export type LoanDetailsProps = {
  loanInfo: LoanInfo
  setLoanInfo: Dispatch<SetStateAction<LoanInfo | null>>
  customerInfo?: customerInfo
  setCustomerInfo?: Dispatch<SetStateAction<LoanInfo | null>>
}

export type LoanInfo = {
  loan_info: LoanInfoDB
  instalment_schedule: InstalmentSchedule[]
}

export type customerInfo = {
  customer_details: any
  full_settled_loan: any
  outstanding_loan: any
  overview: any
  unrecoverable_loan: any
}

export type LoanInfoDB = {
  id: number
  loan_no: string
  borrower_id: number
  application_id: number
  loan_type_id: number
  loan_amount: number
  loan_term: number
  term_unit: number
  interest: number
  approval_date: string
  status: number
  company_id: number
  loan_assignment: null | LoanAssignment
  application: {
    id: number
    application_no: string
    status: number
    borrower_id: number
    loan_type_id: number
    application_date: string
    loan_amount_requested: number
    application_notes: string
    company_id: number
    interest: number
    is_existing: string
    loan_reason: string
    loan_terms: number
    mlcb_count: number
    phone_verified: number
    crosscheck_count: number
    term_unit: number
  }
}

export type LoanPaymentInfo = {
  id: number
  loan_id: number
  due_date: string
  principal_amount: number
  interest_amount: number
  total_amount: number
  payment_status: string
}

export type LoanPaymentHistory = {
  id: number
  repayment_id: number
  repayment_date: string
  principal_paid: number
  interest_paid: number
  penalty_paid: number
}

export type LoanAssignment = {
  id: number
  loan_id: number
  officer_id: number
  assignment_date: string
}

export type TotalRepayment = {
  total_principal: number
  total_principal_balance: number
  total_interest: number
  total_interest_balance: number
  total_late_interest: number
  total_instalment: number
  total_instalment_balance: number
}

export type InstalmentSchedule = {
  date: string
  principal: number
  interest: number
  amount_emi: number
  principal_balance: number
  interest_balance: number
  late_interest: number
}
