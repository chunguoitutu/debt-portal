/// <reference types="vite-plugin-svgr/client" />
import {convertErrorMessageResponse, formatValueTableRow} from '@/app/utils'
import {FAKE_FILE_LIST, LOAN_INFO_CONFIG} from './config'
import './style.scss'
import clsx from 'clsx'
import FileItem from './FileItem'
import {Fragment, useState} from 'react'
import Photo from '@/app/images/photo.svg?react'
import {Select} from '@/components/select'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {swalToast} from '@/app/swal-notification'

const LoanDetails = () => {
  const [cashNumber, setCashNumber] = useState<string>('')
  const fakeData = {
    loan_no: 'L-MC-2024-00123',
    customer_name: 'Park Huyn Woo',
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

  function handleChangeFile(e: any) {
    const selectedFile = e.target.files[0]

    e.target.value = ''
    alert('This feature is coming soon')
  }

  return (
    <div className='loan-details d-flex flex-column h-100 gap-24px mt-12px'>
      <div className='card py-12px mx-12'>
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
              hidden
              accept='.pdf, .png, .jpg'
              onChange={handleChangeFile}
            />
          </label>
        </div>

        <div className='d-flex align-items-center justify-content-between gap-16px p-12px'>
          <Input
            value={cashNumber}
            onChange={(e) => setCashNumber(e.target.value)}
            type='number'
            color='transparent'
            placeholder='Enter cash collected'
            classShared='flex-grow-1'
            classInputWrap='border-0'
            className='h-unset border-0 fs-14 fw-normal debt-input fs-14'
          />

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
