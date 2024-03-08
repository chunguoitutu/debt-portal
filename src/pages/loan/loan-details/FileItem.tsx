import {faClose, faDownload} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import {FC} from 'react'
import pdfIcon from '@/app/images/pdf-icon.png'
import {addMimeType, downloadFileFromBase64, openFileBase64, removeMimeType} from '@/app/utils'
import Button from '@/components/button/Button'
import {FileInfo} from '@/app/types'

type Props = {
  className?: string
  fileInfo: FileInfo
  isOpenBlob?: boolean
  onDeleteItem?: (fileInfo: FileInfo) => void
  isShowRemoveIcon?: boolean
}
const FileItem: FC<Props> = ({
  fileInfo,
  className,
  isOpenBlob = true,
  isShowRemoveIcon = true,
  onDeleteItem,
}) => {
  const fileType = removeMimeType(fileInfo.base64).startsWith('JVBER') ? 'pdf' : 'other'

  return (
    <div className={clsx(['d-flex align-items-center gap-12px', className])}>
      {isShowRemoveIcon && (
        <FontAwesomeIcon
          icon={faClose}
          className='fs-18 p-4px cursor-pointer text-gray-700 text-hover-danger'
          onClick={() => onDeleteItem && onDeleteItem(fileInfo)}
        />
      )}

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
        className='d-flex justify-content-center align-items-center btn-secondary w-36px flex-shrink-0 p-0 aspect-ratio-1-1'
        onClick={() => downloadFileFromBase64(removeMimeType(fileInfo.base64), fileInfo.name)}
      >
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    </div>
  )
}

export default FileItem
