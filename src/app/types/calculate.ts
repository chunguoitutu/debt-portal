export type RepaymentSchedule = {
  instalment_schedule: InstalmentSchedule[]
  amount_emi: number
}

export type InstalmentSchedule = {
  date_repayment: string
  principle_repayment: number
  interest_repayment: number
  balance_principal: number
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
