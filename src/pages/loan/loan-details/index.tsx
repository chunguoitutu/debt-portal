/// <reference types="vite-plugin-svgr/client" />
import {
  convertErrorMessageResponse,
  convertFileToBase64,
  formatFileName,
  formatValueTableRow,
} from '@/app/utils'
import {FAKE_FILE_LIST, LOAN_INFO_CONFIG} from './config'
import './style.scss'
import clsx from 'clsx'
import FileItem from './FileItem'
import {ChangeEvent, Fragment, useState} from 'react'
import Photo from '@/app/images/photo.svg?react'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faChevronRight, faClose} from '@fortawesome/free-solid-svg-icons'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {FileInfo} from '@/app/types'
import TaggingOptions from './TaggingOptions'
import {Alert} from '@/components/alert'
import {useNavigate, useParams} from 'react-router-dom'
import {DetailsHeader} from './DetailsHeader'
import TagIcon from '@/app/images/tag.svg?react'
import EmailIcon from '@/app/images/email.svg?react'
import PhoneIcon from '@/app/images/phone-icon.svg?react'
import RemarkIcon from '@/app/images/remark-icon.svg?react'
import Remarks from '@/pages/job-remarks'

const LoanDetails = () => {
  const [cashNumber, setCashNumber] = useState<string>('')
  const [showTaggingOptions, setShowTaggingOptions] = useState<boolean>(false)
  const [showRemark, setShowRemark] = useState<boolean>(false)
  const [fileSelected, setFileSelected] = useState<FileInfo[]>([])
  const [remarkList, setRemarkList] = useState<any[]>([])

  const {loanId = 0} = useParams()
  const navigate = useNavigate()

  const fakeData = {
    loan_no: 'L-MC-2024-00123',
    firstname: 'Huyn Woo',
    lastname: 'Park',
    address:
      '548, Any Building name, if applicable, 09, 128, Dedok North Avenue 1, 460548, Singapore',
    mobiphone_1: '3655637895',
    total_outstanding: '26640',
  }

  async function handleUpdateData() {
    alert('This feature is coming soon')
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), 500)
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    }
  }

  async function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files)
    const fileTypeAccept = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    const fileConverted = []

    const isValidFile = files.some((el) => {
      return fileTypeAccept.includes(el.type) && el.size <= 200 * 1024 * 1024
    })

    if (!isValidFile) {
      return swalToast.fire({
        icon: 'error',
        title:
          'Invalid format file or file size exceeds 200MB. The file must be saved as JPG, PNG, WebP, or PDF.',
      })
    }

    const filesValid = files.filter(
      (f) => fileTypeAccept.includes(f.type) && f.size <= 200 * 1024 * 1024
    )

    for (const file of filesValid) {
      try {
        const fileBase64 = await convertFileToBase64(file)

        const newFile = {
          id: crypto.randomUUID(),
          name: file.name,
          base64: fileBase64,
        }
        fileConverted.push(newFile)
      } catch (err) {
        console.error(err)
      }
    }

    setFileSelected((prev) => [...prev, ...fileConverted])
    // Reset file values
    e.target.value = ''
  }

  async function handleShowConfirmDelete(file: FileInfo) {
    try {
      const {isConfirmed} = await swalConfirm.fire({
        title: 'Are You Sure?',
        text: `You Won't Be Able To Revert This.`,
      })

      isConfirmed && handleDeleteItem(file)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDeleteItem(file: FileInfo) {
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), 500)
      })
      swalToast.fire({
        icon: 'success',
        title: 'File successfully deleted',
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    }
  }

  function handleRemoveFileSelected(id: string) {
    setFileSelected((prev) => prev.filter((f) => f.id !== id))
  }

  function handleToggleTaggingOptions() {
    setShowTaggingOptions((prev) => !prev)
  }

  // do something
  function handleReloadApi() {}

  function handleToggleRemark() {
    setShowRemark(!showRemark)
  }

  function handleBackHistory() {
    navigate(-1)
  }

  return (
    <div className='loan-details d-flex flex-column gap-12px flex-grow-1 overflow-auto'>
      {/* Modal */}
      <TaggingOptions
        showTaggingOptions={showTaggingOptions}
        onToggle={handleToggleTaggingOptions}
        onReloadApi={handleReloadApi}
      />
      {showRemark && (
        <Remarks
          data={remarkList}
          onBack={handleToggleRemark}
          idUpdate={1}
          setRemarkList={setRemarkList}
        />
      )}
      {/* End Modal */}

      <DetailsHeader onBack={handleBackHistory}>
        <div className='d-flex flex-column flex-grow-1 gap-4px'>
          <div className='d-flex align-items-center gap-8px'>
            <div className={clsx(['d-flex align-items-center mw-20px text-gray-300'])}>
              <TagIcon />
            </div>

            <h3 className='m-0 fs-18 fw-bold'>{fakeData.loan_no}</h3>
          </div>

          <span className='opacity-60'>Task Details</span>
        </div>

        {/* Tools */}
        <div className='d-flex align-items-center gap-20px'>
          <a href='mailto:someone@example.com' className='cursor-pointer'>
            <EmailIcon />
          </a>

          <a href='tel:+84336950023' className='cursor-pointer'>
            <PhoneIcon />
          </a>

          <div className='cursor-pointer' onClick={handleToggleRemark}>
            <RemarkIcon />
          </div>
        </div>
      </DetailsHeader>

      {[1, 2].includes(+loanId) && (
        <Alert type={+loanId === 1 ? 'danger' : 'secondary'} className={clsx(['mx-12px'])}>
          <h3 className='mb-4px fw-semibold fs-14'>
            {+loanId === 1 ? 'Bankruptcy - Death' : 'Payment Appointment'}
          </h3>
          <span className='fs-12 text-gray-700'>
            {' '}
            {+loanId === 1
              ? 'The loan cannot be recovered.'
              : 'The customer promises to pay another day.'}
          </span>
        </Alert>
      )}

      <div className='card py-12px mx-12px'>
        <div className='loan-info grid-2-columns px-12px'>
          {LOAN_INFO_CONFIG.map((el) => {
            return (
              <Fragment key={el.key}>
                <span
                  className={clsx([
                    'w-fit-content fs-14 text-gray-600 pe-16px',
                    el.key === 'total_outstanding' && 'add-border',
                  ])}
                >
                  {el.name}
                </span>
                <span
                  className={clsx([
                    'fs-14 fw-semibold text-end',
                    el.key === 'total_outstanding' && 'add-border',
                    el.className,
                  ])}
                >
                  {formatValueTableRow(el, fakeData)}
                </span>
              </Fragment>
            )
          })}
        </div>

        {FAKE_FILE_LIST.map((f) => (
          <FileItem
            key={f.name}
            fileInfo={f}
            className='p-12px pb-0 mt-12px w-100 border-top border-2 border-gray-200'
            onDeleteItem={handleShowConfirmDelete}
          />
        ))}
      </div>
      {/* control */}
      <div className='debt-control card mt-auto mt-auto'>
        <div className='d-flex align-items-center justify-content-between p-12px border-bottom border-gray-300'>
          <label
            className='mw-20px text-gray-700 text-hover-primary cursor-pointer'
            htmlFor='debt-file'
          >
            <Photo />
            <input
              id='debt-file'
              type='file'
              multiple
              hidden
              accept='.pdf, .png, .jpg'
              onChange={handleChangeFile}
            />
          </label>

          <div
            className='text-gray-700 cursor-pointer text-hover-primary'
            onClick={handleToggleTaggingOptions}
          >
            Tagging Options <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

        <div className='d-flex align-items-center justify-content-between gap-16px p-12px'>
          <div className='d-flex flex-column gap-4px'>
            {!!fileSelected.length && (
              <div className='d-flex align-items-center gap-24px'>
                <div className='d-flex flex-wrap gap-8px w-fit-content'>
                  {fileSelected.map((f) => {
                    return (
                      <span
                        className='d-flex align-items-center gap-6px bg-secondary py-4px px-12px rounded-pill'
                        key={f.id}
                      >
                        {formatFileName(f?.name)}

                        <FontAwesomeIcon
                          icon={faClose}
                          className='text-hover-danger cursor-pointer'
                          onClick={() => handleRemoveFileSelected(f?.id as string)}
                        />
                      </span>
                    )
                  })}
                </div>

                {/* <div>
                  <FontAwesomeIcon
                    icon={faClose}
                    className='close-files-selected-icon fs-20 text-hover-danger cursor-pointer'
                    onClick={() => {}}
                  />
                </div> */}
              </div>
            )}

            <Input
              value={cashNumber}
              onChange={(e) => setCashNumber(e.target.value)}
              type='number'
              color='transparent'
              placeholder='Enter cash collected'
              classShared='flex-grow-1'
              classInputWrap='border-0'
              className='h-unset border-0 fs-14 fw-normal debt-input fs-14'
              autoComplete='off'
            />
          </div>

          <Button
            className='d-flex justify-content-center align-items-center btn-primary w-36px h-36px aspect-ratio-1-1'
            onClick={handleUpdateData}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoanDetails
