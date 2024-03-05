import {faClose, faDownload} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import {FC} from 'react'
import pdfIcon from '@/app/images/pdf-icon.png'
import {addMimeType, openFileBase64, removeMimeType} from '@/app/utils'
import Button from '@/components/button/Button'

type Props = {
  className?: string
  fileInfo: {
    base64: string
    name: string
  }
  isOpenBlob?: boolean
}
const FileItem: FC<Props> = ({fileInfo, className, isOpenBlob = true}) => {
  const fileType = removeMimeType(fileInfo.base64).startsWith('JVBER') ? 'pdf' : 'other'

  function openBlobFromBase64(base64String, fileName) {
    try {
      // Chuyển đổi chuỗi base64 thành dữ liệu nhị phân
      var byteCharacters = atob(base64String)
      var byteNumbers = new Array(byteCharacters.length)
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      var byteArray = new Uint8Array(byteNumbers)

      // Tạo blob từ dữ liệu nhị phân
      var blob = new Blob([byteArray], {type: 'application/octet-stream'})

      // Tạo một đường dẫn URL từ blob
      var url = window.URL.createObjectURL(blob)

      // Tạo một thẻ a để tạo một liên kết để tải xuống blob
      var a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = fileName

      // Thêm thẻ a vào DOM và kích hoạt sự kiện click trên nó
      document.body.appendChild(a)
      a.click()

      // Xóa thẻ a sau khi tải xuống hoàn tất
      document.body.removeChild(a)
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error)
    }
  }

  return (
    <div className={clsx(['d-flex align-items-center gap-12px', className])}>
      <FontAwesomeIcon icon={faClose} className='fs-20 cursor-pointer text-hover-danger' />

      <div
        className={clsx([
          'w-36px border border-gray-300 rounded-8px overflow-hidden bg-gray-200 flex-shrink-0',
          isOpenBlob && fileType === 'pdf' && 'cursor-pointer',
        ])}
        onClick={() =>
          isOpenBlob &&
          fileType === 'pdf' &&
          openFileBase64({
            base64: removeMimeType(fileInfo.base64),
            type: fileType === 'pdf' ? 'pdf' : 'jpeg',
          })
        }
      >
        <img
          src={fileType === 'pdf' ? pdfIcon : addMimeType(fileInfo.base64, 'jpeg')}
          className='w-100 aspect-ratio-1-1 object-fit-cover'
        />
      </div>

      <span className='fs-12 text-gray-700 align-self-start flex-grow-1'>{fileInfo.name}</span>

      <Button
        className='d-flex justify-content-center align-items-center btn-secondary w-36px aspect-ratio-1-1'
        onClick={() => openBlobFromBase64(removeMimeType(fileInfo.base64), fileInfo.name)}
      >
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    </div>
  )
}

export default FileItem
