export type GeneralResponse = {
  error: boolean
  message: string
}

export interface CreateSuccessResponse extends GeneralResponse {
  id: number
}
