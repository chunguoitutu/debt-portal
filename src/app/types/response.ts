export type GeneralResponse = {
  error: boolean
  message: string
}

export interface CreateSuccessResponse extends GeneralResponse {
  id: number
}

export type ApprovalInfo = {
  id: number
  application_id: number
  approved_by: string
  approved_note: string
  created_at: Date
  updated_at: Date
}

export type AddressTypeItem = {
  id: number
  address_type_name: string
  description: string
  status: number
  delete_at: string | null
  deleted: number
  is_default: number
}
