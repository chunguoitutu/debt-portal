import { EmploymentStatus } from './common'

export type CustomerVehicle = {
  id: number
  borrower_id: number
  number: string
  model: string
  type: string
  maker: string
  coe_category: string
  coe_expiry_date: string
  open_maket_value: string
  effective_date: string
}

export type CustomerEmployment = {
  employment_status: EmploymentStatus
  employment_type: string
  self_employed: number
  annual_income: number
  company_name: string
  id: number
  borrower_id: string
  company_telephone: string
  specialization: string
  position: string
  occupation: string
  address: string
  portal_code: string
  monthly_income_1: number
  monthly_income_2: number
  monthly_income_3: number
  six_months_income: number
  pay_date: string
  bankrupted: number
  bankrupt_plan: number
}

export type CustomerCPF = {
  id: number
  borrower_id: number
  date: any
  employer: any
  amount: any
  month: any
}
