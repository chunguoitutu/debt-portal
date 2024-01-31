export type FileType = 'jpeg' | 'pdf' | 'png'

export type HelperOpenFile = {
  base64: string
  type: FileType
}

export type DashboardProps = {
  screenWidth: number
}
