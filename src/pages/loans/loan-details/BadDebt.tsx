import {swalToast} from '@/app/swal-notification'
import {Base64Item, LoanDetailsProps} from '@/app/types'
import {REASON_BAD_DEBT, convertFileToBase64} from '@/app/utils'
import RenderFile from '@/components/file/RenderFile'
import UploadFile from '@/components/file/UploadFile'
import Radio from '@/components/radio/Radio'
import {TextArea} from '@/components/textarea'
import clsx from 'clsx'
import {ChangeEvent, FC, useState} from 'react'

const BadDebt: FC<LoanDetailsProps> = ({loanInfo}) => {
  const [file, setFile] = useState<Base64Item[]>([])
  const [data, setData] = useState<{
    [key: string]: any
  }>({
    reason: REASON_BAD_DEBT[0].value,
    description: '',
  })

  async function handleFileChange(event: any) {
    const files: FileList | null = event.target.files

    const fileList = Array.from(files || []).filter((file) => {
      const fileSizeMB = file.size / (1024 * 1024)

      return fileSizeMB <= 200 && file.type === 'application/pdf'
    })

    if (!fileList.length) {
      event.target.value = ''
      return swalToast.fire({
        icon: 'error',
        title: 'Something went wrong. Please make sure your file is pdf and does not exceed 200MB',
      })
    }

    const fileBase64List: Base64Item[] = []

    try {
      for (const file of fileList) {
        const fileBase64 = await convertFileToBase64(file)

        if (!fileBase64) return

        const newFile: Base64Item = {
          document_name: file.name || '',
          base64: fileBase64,
          size: file.size,
          type: file.type,
        }
        fileBase64List.push(newFile)
      }
    } catch (error) {
      //   return swalToast.fire({
      //     icon: 'error',
      //     title: 'Something went wrong.',
      //   })
    }

    event.target.value = ''
    setFile([...file, ...fileBase64List])
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {value, name} = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  return (
    <div className='row pt-30px'>
      <div className='col-12 col-lg-4'>
        <div className='d-flex flex-column gap-24px'>
          {/* Reason */}
          <div className='d-flex flex-column gap-8px'>
            <h3 className='m-0 fs-16 fw-semibold'>Reason</h3>
            <div className='grid-2-column gap-16px'>
              {REASON_BAD_DEBT.map((item, i) => (
                <Radio
                  key={i}
                  classNameLabel={clsx([
                    data.reason === item.value ? 'fs-4 fw-medium' : 'text-gray-600 fs-4 fw-medium',
                  ])}
                  name='reason'
                  label={item.label}
                  checked={data.reason === item.value}
                  value={item.value}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          {/* Upload file */}
          <div className='d-flex flex-column gap-4 w-100'>
            <h3 className='m-0 fs-16 fw-semibold'>Upload Bad Debt Supporting Documents</h3>
            <UploadFile
              className='w-100'
              handleFileChange={(e) => {
                handleFileChange(e)
              }}
            />
          </div>
        </div>
      </div>

      <div className='col-12 col-lg-8 mt-24px mt-lg-0'>
        {/* Remark */}
        <div className='d-flex flex-column gap-8px h-100'>
          <h3 className='m-0 fs-16 fw-semibold'>Remark</h3>
          <TextArea
            classShared='d-flex flex-column flex-grow-1'
            className='flex-grow-1'
            name='description'
            onChange={handleChange}
          />
        </div>
      </div>

      {!!file.length && (
        <div className='col-12'>
          <RenderFile
            className='mt-30px pt-30px border-top border-gray-200'
            url='/borrower-document/'
            arrayMap={file || []}
            setUploadFile={(index) => {
              const updatedFiles = [...file]
              updatedFiles.splice(index, 1)
              setFile(updatedFiles)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default BadDebt
