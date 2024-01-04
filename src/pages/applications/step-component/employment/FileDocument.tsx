import {useEffect, useState} from 'react'
import './style.scss'

import Icons from '@/components/icons'
import RenderFile from '@/components/file/RenderFile'
import UploadFile from '@/components/file/UploadFile'

export interface file {
  id?: Number
  borrower_id?: number
  document_name: string
  document_path: string
  description?: string
  base64: string
  size: string
  type: string
}

const FileInput = (props: any) => {
  const {formik} = props.props

  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const handleFileChange = (event: any) => {
    const files: FileList | null = event.target.files
    if (files) {
      const pdfFiles = Array.from(files).filter((file) => file.type === 'application/pdf')
      setSelectedFiles(pdfFiles)
    }
    event.target.value = ''
  }

  useEffect(() => {
    const base: any = []
    selectedFiles.forEach((file: any) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = function (e) {
        base.push({
          document_name: file.name || '',
          base64: e.target?.result,
          size: file.size,
          type: file.type,
        })
        formik.setFieldValue('file_documents', [...formik?.values?.file_documents, ...base])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles])

  return (
    <div className='w-100'>
      <RenderFile
        disabled={[2, 3].includes(formik?.values?.status || 0)}
        className='mb-24px'
        url='/borrower-document/'
        arrayMap={formik?.values?.file_documents || []}
        setUploadFile={(index) => {
          const updatedFiles = [...formik?.values?.file_documents]
          updatedFiles.splice(index, 1)
          formik.setFieldValue('file_documents', updatedFiles)
        }}
      />
      <UploadFile
        disabled={[2, 3].includes(formik?.values?.status || 0)}
        className='w-360px'
        handleFileChange={(e) => {
          handleFileChange(e)
        }}
      />
    </div>
  )
}

export default FileInput
