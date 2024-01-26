export type AddressTypeItem = {
  id: number
  address_type_name: string
  description: string
  status: number
  delete_at: string | null
  deleted: number
  is_default: number
}

export type CompanyItem = {
  id: number
  company_name: string
  company_code: string
  business_uen: string
  telephone: string
  email: string
  status: number
  address: string
  delete_at: string
  deleted: number
  open_date: string
  parent_id: number
  contact_person: string
  license_no: string
  license_expiry_date: string
  web_url: string
}

export type DocumentTypeItem = {
  id: number
  type_name: string
  description: string
  status: number
  created_date: string
  updated_date: string
  delete_at: string
  deleted: number
  is_default: number
}

export type JobTypeItem = {
  id: number
  job_type_name: string
  description: string
  request_more_information: number
  status: number
  delete_at: null
  deleted: number
  is_default: number
}

export type LoanTypeItem = {
  id: number
  company_id: number
  type_name: string
  description: string
  interest: number
  quota_new: number
  quota_existing: number
  quota_foreigner: number
  is_default: number
  deleted: number
  delete_at: null
  status: number
  late_fee: number
  late_interest: number
}

export type MarketingTypeItem = {
  id: number
  marketing_type_name: string
  status: number
  deleted: number
  delete_at: string
  is_default: number
}

export type RejectionTypeItem = {
  id: number
  rejection_type_name: string
  rejection_type_code: string
  rejection_type_description: string
  status: number
  deleted: number
  delete_at: string
  is_default: number
}

export type UserItem = {
  id: number
  role_id: number
  username: string
  last_login_date: null
  is_active: number
  company_id: number
  email: string
  firstname: string
  lastname: string
  telephone: string
  company_name: string
  role_name: string
  priority: number
  password?: string
}

export type RoleItem = {
  id: number
  role_name: string
  description: string
  permissions: string
  priority: number
  status: number
}
