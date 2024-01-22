export type InstalmentSchedule = {
  date: string
  principal: number
  interest: number
  amount_balance: number
  amount_emi: number
}

export type PayloadRepaymentSchedule = {
  loan_amount: string
  total_cycle: number
  interest_percent: number
  first_repayment_date: string
  term_unit: number
  monthly_due_date: number
  per_month_percent: number
}
