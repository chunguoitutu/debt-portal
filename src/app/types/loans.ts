import {Dispatch, SetStateAction} from 'react'

export type LoanDetailsProps = {
  loanInfo: LoanInfo
  setLoanInfo: Dispatch<SetStateAction<LoanInfo | null>>
}

export type LoanInfo = {
  loan_info: LoanInfoDB
  loan_details: LoanDetails
  loan_instalment_schedule: LoanInstalmentSchedule[]
  loan_payment_history: LoanReceiptInfo[]
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

export type LoanDetails = {
  //* Reference number -------------------------------------------------------
  loan_acc_no: string
  application_no: string
  receipt_no: string
  application_id: number
  //* Dates related to loan repayment ----------------------------------------
  first_repayment_date: string
  loan_date: string
  //* Repayment factors ------------------------------------------------------
  amount_of_loan: number
  amount_of_acceptance: number
  monthly_late_fee: number
  interest_per_month_percent: number
  late_interest_per_month_percent: number
  total_permitted_fees_charged: number
  total_permitted_fees_allowed: number
  //* Current payment detail -------------------------------------------------
  current_repayment_date: string
  current_in_amount: number
  //* Total ------------------------------------------------------------------
  total_late_fee: number
  total_late_interest: number
  total_interest: number
  total_principal: number
  //* Total balances before charged ------------------------------------------
  total_late_fee_balance_before_payment: number
  total_late_interest_balance_before_payment: number
  total_interest_balance_before_payment: number
  total_principal_balance_before_payment: number
  //* Total balances ---------------------------------------------------------
  total_late_fee_balance: number
  total_late_interest_balance: number
  total_interest_balance: number
  total_principal_balance: number
  //* Total paid -------------------------------------------------------------
  total_late_months_paid: number
  total_late_fee_paid: number
  total_late_interest_paid: number
  total_interest_paid: number
  total_permitted_fees_paid: number
  total_principal_paid: number
  //* Total Discount ---------------------------------------------------------
  total_late_fee_discount: number
  total_late_interest_discount: number
  total_interest_discount: number
  //* For late fee calculation -----------------------------------------------
  monthly_due_date: number
  last_late_fee_month: string
  //* Mode of value return ---------------------------------------------------
  recommend_to_pay: number
  get_repayment_schedule: number
  //* Calculation version ----------------------------------------------------
  old_version: null
}

export type LoanReceiptInfo = {
  in_amount_of_receipt: number
  late_fee_paid: number
  late_interest_paid: number
  interest_paid: number
  principal_paid: number
  in_amount_of_receipt_balance: number
  late_fee_paid_balance: number
  late_interest_paid_balance: number
  interest_paid_balance: number
  principal_paid_balance: number
  late_fee_recommended: number
  late_interest_recommended: number
  interest_recommended: number
  principal_recommended: number
  total_recommended: number
  most_late_no_of_days: number
  date_of_payment: string
  receipt_no: string
  instalments_snapshot: any[]
}

export type LoanInstalmentSchedule = {
  instalment_due_date: null | string
  date_of_payment: null | string
  late_fee: number
  late_interest: number
  interest: number
  principal: number
  additional_late_fee: number
  additional_late_interest: number
  additional_interest: number
  late_fee_balance: number
  late_interest_balance: number
  interest_balance: number
  principal_balance: number
  late_fee_paid: number
  late_interest_paid: number
  interest_paid: number
  principal_paid: number
  late_fee_discount: number
  late_interest_discount: number
  interest_discount: number
  no_of_late_day_since_last_payment: number
  last_late_fee_payment_date: null | string
  last_late_interest_payment_date: null | string
  last_interest_payment_date: null | string
  last_principal_payment_date: null | string
  late_fee_recommended: number
  late_interest_recommended: number
  interest_recommended: number
  principal_recommended: number
  late_fee_charged_details: any[]
  instalment_total: number
  instalment_total_balance: number
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
