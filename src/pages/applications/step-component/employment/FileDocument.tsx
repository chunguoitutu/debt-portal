import {useEffect, useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import './style.scss'

import Icons from '@/components/icons'
import {swalConfirmDelete, swalToast} from '../../../../app/swal-notification'
import request from '../../../../app/axios'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import {convertSize} from '@/app/utils'

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
      <div className='d-flex flex-wrap mb-24px gap-24px'>
        {formik?.values?.file_documents.map((data: file, index: number) => {
          return (
            <div key={index} className='file-document-style'>
              {!!data?.base64 && (
                <div className='d-flex  min-w-100px flex-column w-185px position-relative h-100 rounded-5 hover-document'>
                  <div className='d-flex justify-content-center align-items-center pt-24px pb-8px'>
                    <div className='d-flex justify-content-center align-items-center flex-shrink-0 w-60px h-60px'>
                      <Icons name={'ImgFoder'} />
                    </div>

                    <button
                      className='close text-16px button-file cursor-position position-absolute border-0 bg-transparent'
                      onClick={() => {
                        if (!!data?.id) {
                          swalConfirmDelete
                            .fire({
                              title: 'Are You Sure?',
                              text: `You Won't Be Able To Revert This.`,
                            })
                            .then((result) => {
                              if (result.isConfirmed) {
                                request
                                  .delete('/borrower-document/' + data?.id)
                                  .then((res) => {
                                    const updatedFiles = [...formik?.values?.file_documents]
                                    updatedFiles.splice(index, 1)
                                    formik.setFieldValue('file_documents', updatedFiles)
                                    swalToast.fire({
                                      icon: 'success',
                                      title: 'Deleted success!',
                                    })
                                  })
                                  .catch(() => {
                                    swalToast.fire({
                                      icon: 'error',
                                      title: DEFAULT_MSG_ERROR,
                                    })
                                  })
                              }
                            })
                        } else {
                          const updatedFiles = [...formik?.values?.file_documents]
                          updatedFiles.splice(index, 1)
                          formik.setFieldValue('file_documents', updatedFiles)
                        }
                      }}
                    >
                      <AiOutlineClose className='icon' />
                    </button>
                  </div>
                  <div className='pt-4px pb-4px ps-16px pe-16px d-flex justify-content-center align-items-center flex-column'>
                    <p className='p-0 m-0 w-100 text-center fw-semibold fs-12 text-gray-900'>
                      {data?.document_name}
                    </p>
                    <p className='w-100 text-B5B5C3 text-center fw-semibold fs-12 p-0 m-0 '>
                      {convertSize(Number(data.size) || 0)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <label className='border border-dashed border-primary d-flex position-relative rounded-3 bg-primary-light align-items-center w-360px h-100px justify-content-center padding-24px '>
        <div className='d-flex cursor-pointer gap-16px ps-24px pe-24px align-items-center justify-content-center'>
          <div className='cursor-position w-40px h-40px flex-shrink-0'>
            <Icons name={'ImgUploadFile'} />
          </div>
          <div className='cursor-pointer'>
            <h1 className='fw-semibold fs-13 text-gray-900 cursor-position text-capitalize p-0 m-0'>
              Quick File Uploader
            </h1>
            <p
              className='m-0 text-capitalize fw-normal p-0 cursor-position fs-12 text-B5B5C3'
              style={{
                fontSize: '12px',
              }}
            >
              Drag & Drop and choose files from compute (File upload maximum 200MB and only upload
              files in .PDF format).
            </p>
          </div>
        </div>
        <input className='opacity-0 ' hidden type={'file'} multiple onChange={handleFileChange} />
      </label>
    </div>
  )
}

export default FileInput
