export type LoanDetailsProps = {
  loanInfo: LoanInfo
}

export type LoanInfo = {
  loan_payment: LoanPaymentInfo[]
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
