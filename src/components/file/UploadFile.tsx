import Icons from '@/components/icons'
import clsx from 'clsx'

type Props = {
  disabled?: boolean
  handleFileChange: (e) => void
  className?: string
}

const UploadFile = ({disabled = false, className, handleFileChange}: Props) => {
  return (
    <label
      className={clsx([
        'border border-dashed border-primary d-flex position-relative rounded-3 bg-primary-light align-items-center h-100px justify-content-center padding-24px',
        className,
      ])}
    >
      <div className='d-flex cursor-pointer gap-16px ps-24px pe-24px align-items-center justify-content-center'>
        <div className='cursor-position w-40px h-40px flex-shrink-0'>
          <Icons name={'ImgUploadFile'} />
        </div>
        <div className='cursor-pointer'>
          <h1 className='fw-semibold fs-13 text-gray-900 cursor-position text-capitalize p-0 m-0'>
            Quick File Uploader
          </h1>
          <p
            className='m-0 fw-normal p-0 cursor-position fs-12 text-B5B5C3'
            style={{
              fontSize: '12px',
            }}
          >
            Choose files from the computer (file upload maximum 200MB and only upload files in PDF
            format).
          </p>
        </div>
      </div>
      <input
        className='opacity-0 '
        disabled={disabled}
        hidden
        type={'file'}
        multiple
        onChange={handleFileChange}
      />
    </label>
  )
}

export default UploadFile
