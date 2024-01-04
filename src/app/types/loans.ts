export type LoanDetailsProps = {
  loanInfo: LoanInfo
}

export type LoanInfo = {
  loan_payment: LoanPaymentInfo[]
  loan_payment_history: LoanPaymentHistory[]
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
