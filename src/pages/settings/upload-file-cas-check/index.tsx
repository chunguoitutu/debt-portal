import {ChangeEvent, useEffect, useState} from 'react'
import Tippy from '@tippyjs/react'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {convertSize, openFileBase64, removeMimeType} from '@/app/utils'
import Button from '@/components/button/Button'
import Icons from '@/components/icons'

const UploadFileCAS = () => {
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [file, setFile] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function handleUpload() {
    setLoading(true)
    try {
      await request.post('/pdf/ca-check/upload', {selectedFiles})
      await fetchData()

      setSelectedFiles([])
      swalToast.fire({
        icon: 'success',
        title: `Upload file "alert_list.pdf" successfully`,
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: `System error, please try again in a few minutes.`,
      })
    } finally {
      setLoading(false)
    }
  }

  async function fetchData() {
    try {
      const data = await request.post('/pdf/ca-check', {})

      if (data?.data?.pdf) {
        setFile({
          base64: data?.data?.pdf,
          size: data?.data?.size,
          name: data?.data?.name,
        })
      }
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: `System error, please try again in a few minutes`,
      })
    } finally {
      // Code to execute regardless of success or failure
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = event.target.files

    if (!files || files.length === 0) {
      return
    }

    const pdfFiles: File[] = Array.from(files).filter(
      (file: File) => file.type === 'application/pdf'
    )

    if (pdfFiles.length === 0) {
      return
    }

    const firstPdfFile: File = pdfFiles[0]
    const reader: FileReader = new FileReader()

    reader.onloadend = () => {
      const base64Data: string = reader.result as string

      const fileData = {
        name: firstPdfFile.name,
        size: firstPdfFile.size,
        base64Data: base64Data,
      }

      setSelectedFiles([fileData])
    }

    reader.readAsDataURL(firstPdfFile)

    // Clear the input value to allow selecting the same file again
    event.target.value = ''
  }

  return (
    <div className='card'>
      <h1 className='p-30px fw-bold fs-20 mb-0 border-bottom border-gray-200'>Upload File</h1>
      <div className='d-flex justify-content-center align-items-center m-0 p-0'>
        <div className='p-30px'>
          <div className='d-flex justify-content-start align-items-center mb-16px p-0'>
            <Icons name={'Warning'} />
            <p className='m-0 ps-8px fs-14 fw-semibold'>
              You are only allowed to upload PDF files.
            </p>
          </div>
          <label className='border border-dashed border-secondary cursor-pointer position-relative rounded-1 p-30px align-items-center justify-content-center mb-16px'>
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
                <p className='m-0 fw-normal p-0 text-center cursor-position fs-14 text-B5B5C3 mt-4px'>
                  Choose files from the computer (file upload maximum 200MB and only upload files in
                  PDF format).
                </p>
              </div>
            </div>
            <input className='opacity-0' hidden type={'file'} onChange={handleFileChange} />
          </label>
          <div className='w-100 p-0 m-0'>
            {selectedFiles.map((data, i) => (
              <div key={i}>
                {data?.base64Data && (
                  <div className='d-flex render-file-cas-check justify-content-between align-items-center p-24px gap-24px'>
                    <Tippy className='cursor-pointer' key={i} content={<span>Open File</span>}>
                      <div
                        onClick={() => {
                          openFileBase64({
                            base64: removeMimeType(data?.base64Data),
                            type: 'pdf',
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
          <div className='mt-30px fw-semibold fs-14 text-gray-900 cursor-pointer text-capitalize p-0'>
            Current File
          </div>
          <div className='w-100 p-0 mt-16px'>
            {file?.base64 && (
              <div className='d-flex render-file-cas-check justify-content-between align-items-center p-24px gap-24px'>
                <Tippy className='cursor-pointer' content={<span>Open File</span>}>
                  <div
                    onClick={() =>
                      openFileBase64({
                        base64: file?.base64,
                        type: 'pdf',
                      })
                    }
                    className='p-0 m-0 cursor-pointer'
                  >
                    <Icons name={'FolderPdf'} />
                  </div>
                </Tippy>
                <p className='w-100 p-0 m-0 fs-14 fw-semibold text-gray-800'>{file?.name}</p>
                <div className='p-0 m-0 text-nowrap fs-14 fw-semibold'>
                  {convertSize(Number(file?.size) || 0)}
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
          onClick={handleUpload}
        >
          Update
        </Button>
      </div>
    </div>
  )
}

export default UploadFileCAS
