import request from '@/app/axios'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import {swalToast} from '@/app/swal-notification'
import {convertSize} from '@/app/utils'
import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import Tippy from '@tippyjs/react'
import {useEffect, useState} from 'react'

const UploadFileCasCheck = () => {
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [files, setFiles] = useState<any>({})
  const [loading, setLoading] = useState(false)
  console.log(selectedFiles)

  const handleFileChange = (event: any) => {
    const files: FileList | null = event.target.files
    if (files) {
      const pdfFiles = Array.from(files).filter((file) => file.type === 'application/pdf')
      const firstPdfFile = pdfFiles[0]

      if (firstPdfFile) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const base64Data = reader.result as string

          const fileData = {
            name: firstPdfFile.name,
            size: firstPdfFile.size,
            base64Data: base64Data,
          }

          setSelectedFiles([fileData])
        }

        reader.readAsDataURL(firstPdfFile)
      }
    }
    event.target.value = ''
  }

  useEffect(() => {
    request
      .post('/pdf/ca-check', {})
      .then((data) => {
        if (data?.data?.pdf) {
          setFiles({
            base64: data?.data?.pdf,
            size: data?.data?.size,
            name: data?.data?.name,
          })
        }
      })
      .catch((e) => {
        swalToast.fire({
          timer: 1500,
          icon: 'error',
          title: `System error, please try again in a few minutes`,
        })
      })
      .finally(() => {})
  }, [loading])

  return (
    <div className='card'>
      <h1
        style={{
          borderBottom: '1px solid #F1F1F2',
        }}
        className='p-30px fw-bold fs-20 mb-0'
      >
        Upload File
      </h1>
      <div className='d-flex justify-content-center align-items-center m-0 p-0'>
        <div className='p-30px '>
          <div className='d-flex justify-content-start align-items-center mb-16px p-0'>
            <Icons name={'Warning'} />
            <p className='m-0 ps-8px fs-14 fw-semibold'>
              You are only allowed to upload PDF files.
            </p>
          </div>
          <label className='border  border-dashed border-secondary  cursor-pointer position-relative rounded-1 p-30px align-items-center justify-content-center  mb-16px '>
            <div>
              <div className='cursor-position d-flex cursor-pointer justify-content-center align-items-center mb-16px flex-shrink-0'>
                <Icons name={'ImgUploadFile'} />
              </div>
              <div>
                <div className='d-flex cursor-pointer justify-content-center align-items-center'>
                  <h1 className='fw-semibold fs-14 text-gray-900 cursor-pointer text-capitalize p-0 m-0'>
                    Quick File Uploader
                  </h1>
                </div>
                <p className='m-0  fw-normal p-0 text-center cursor-position fs-14 text-B5B5C3 mt-4px'>
                  Choose files from compute (file upload maximum 200MB and only upload files in PDF
                  format).
                </p>
              </div>
            </div>
            <input className='opacity-0 ' hidden type={'file'} onChange={handleFileChange} />
          </label>
          <div className='w-100 p-0 m-0'>
            {selectedFiles.map((data, i) => (
              <div key={i}>
                {data?.base64Data && (
                  <div className='d-flex  render-file-cas-check justify-content-between align-items-center p-24px gap-24px'>
                    <Tippy className='cursor-pointer' key={i} content={<span>Open File</span>}>
                      <div
                        onClick={() => {
                          fetch(data?.base64Data)
                            .then((response) => response.blob())
                            .then((blob) => {
                              const blobUrl = URL.createObjectURL(blob)

                              window.open(blobUrl, '_blank')
                            })
                            .catch(() => {
                              swalToast.fire({
                                icon: 'error',
                                title: DEFAULT_MSG_ERROR,
                              })
                            })
                        }}
                        className='p-0 m-0 cursor-pointer'
                      >
                        <Icons name={'FolderPdf'} />
                      </div>
                    </Tippy>
                    <p className='w-100 p-0 m-0 fs-14 fw-semibold text-gray-800'>{data?.name}</p>
                    <div
                      onClick={() => {
                        setSelectedFiles([])
                      }}
                      className='p-0 m-0 cursor-pointer'
                    >
                      <Icons name={'Close'} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='mt-30px fw-semibold fs-14 text-gray-900 cursor-pointer text-capitalize p-0 '>
            Current File
          </div>
          <div className='w-100 p-0 mt-16px'>
            {files?.base64 && (
              <div className='d-flex  render-file-cas-check justify-content-between align-items-center p-24px gap-24px'>
                <Tippy className='cursor-pointer' content={<span>Open File</span>}>
                  <div
                    onClick={() => {
                      fetch(`data:application/pdf;base64,${files?.base64}`)
                        .then((response) => response.blob())
                        .then((blob) => {
                          const blobUrl = URL.createObjectURL(blob)

                          window.open(blobUrl, '_blank')
                        })
                        .catch(() => {
                          swalToast.fire({
                            icon: 'error',
                            title: DEFAULT_MSG_ERROR,
                          })
                        })
                    }}
                    className='p-0 m-0 cursor-pointer'
                  >
                    <Icons name={'FolderPdf'} />
                  </div>
                </Tippy>
                <p className='w-100 p-0 m-0 fs-14 fw-semibold text-gray-800'>{files?.name}</p>
                <div className='p-0 m-0 text-nowrap  fs-14 fw-semibold'>
                  {convertSize(Number(files?.size) || 0)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid #F1F1F2',
        }}
        className='d-flex flex-end p-30px'
      >
        <Button
          type='reset'
          disabled={selectedFiles.length === 0}
          onClick={() => {
            setSelectedFiles([])
          }}
          className='btn-lg btn-secondary align-self-center me-8px fs-6'
        >
          Discard
        </Button>

        <Button
          disabled={selectedFiles.length === 0 || loading}
          className='btn btn-primary'
          style={{fontSize: 14}}
          loading={loading}
          onClick={() => {
            setLoading(true)
            request
              .post('/pdf/ca-check/upload', {selectedFiles})
              .then((data) => {
                setSelectedFiles([])
                setLoading(false)
                swalToast.fire({
                  timer: 1500,
                  icon: 'success',
                  title: `Upload file "alert_list.pdf" successfully.`,
                })
              })
              .catch((e) => {
                setLoading(false)
                swalToast.fire({
                  timer: 1500,
                  icon: 'error',
                  title: `System error, please try again in a few minutes.`,
                })
              })
          }}
        >
          Update
        </Button>
      </div>
    </div>
  )
}

export default UploadFileCasCheck
