import {useEffect, useState} from 'react'

import {AiOutlineClose} from 'react-icons/ai'
import Icons from '../../../../components/icons'
import {swalConfirmDelete, swalToast} from '../../../../app/swal-notification'
import request from '../../../../app/axios'
import {convertSize} from '../../../../app/utils'

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
    <div style={{width: '100%'}}>
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        {formik?.values?.file_documents.map((data: file, index: number) => {
          return (
            <div key={index}>
              {!!data?.base64 && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '185px',
                    minWidth: '100px',
                    borderRadius: '5px',
                    border: '1px solid #B5B5C3',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '24px 0px 8px 0px',
                    }}
                  >
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        objectFit: 'cover',
                        flexShrink: '0',
                      }}
                    >
                      <Icons name={'ImgFoder'} />
                    </div>

                    <button
                      className='close'
                      style={{
                        cursor: 'position',
                        top: '16px',
                        right: '15.5px',
                        position: 'absolute',
                        outline: 'none',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#B5B5C3',
                        fontSize: '16px',
                      }}
                      onClick={() => {
                        if (!!data?.id) {
                          swalConfirmDelete
                            .fire({
                              title: 'Are you sure?',
                              text: `You won't be able to revert this.`,
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
                                      title: 'Something went wrong!',
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
                  <div
                    style={{
                      padding: '4px 16px 16px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <p
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        color: '#071437',
                        fontSize: '12px',
                        fontWeight: '500',
                        lineHeight: '16px',
                        padding: '0',
                        margin: '0',
                      }}
                    >
                      {data?.document_name}
                    </p>
                    <p
                      style={{
                        width: '100%',
                        textAlign: 'center',
                        color: '#B5B5C3',
                        fontSize: '12px',
                        fontWeight: '500',
                        lineHeight: '16px',
                        padding: '0',
                        margin: '0',
                      }}
                    >
                      {convertSize(Number(data.size) || 0)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <label
        style={{
          border: '1px dashed #0D6EFD',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '360px',
          height: '140px',
          padding: '24px',
          background: '#F1FAFF',
          boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.03)',
          borderRadius: '8px',
          position: 'relative',
        }}
        className='flex h-full w-full cursor-pointer flex-col items-center justify-center '
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            cursor: 'pointer',
            padding: '24px',
            position: 'absolute',
          }}
        >
          <div style={{cursor: 'pointer', width: '40px', height: '40px', flexShrink: '0'}}>
            <Icons name={'ImgUploadFile'} />
          </div>
          <div style={{cursor: 'pointer'}}>
            <h1
              style={{
                color: '#071437',
                fontWeight: '500',
                lineHeight: '20px',
                textTransform: 'capitalize',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '0',
                margin: '0',
              }}
            >
              Quick File Uploader
            </h1>
            <p
              style={{
                color: '#B5B5C3',
                fontWeight: '400',
                lineHeight: '16px',
                textTransform: 'capitalize',
                fontSize: '12px',
                padding: '0',
                cursor: 'pointer',
                margin: '0',
              }}
            >
              Drag & Drop and choose files from compute (File upload maximum 200MB and only upload
              files in .PDF format).
            </p>
          </div>
        </div>
        <input
          style={{
            opacity: '0',
          }}
          type={'file'}
          multiple
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}

export default FileInput
