import {convertSize} from '@/app/utils'
import Icons from '@/components/icons'
import {file} from '../employment/FileDocument'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import {swalToast} from '@/app/swal-notification'
import {DEFAULT_MSG_ERROR} from '@/app/constants'

type Props = {
  config?: any
  data?: any
}

const RenderFileDocument = ({config, data}: Props) => {
  return (
    <div className='w-100 p-0' style={{border: '1px solid #D4D4D4'}}>
      <h1
        className='pt-8px pb-8px ps-24px pe-24px   fw-semibold m-0 fs-14 text-gray-700'
        style={{
          background: '#D4D4D4',
        }}
      >
        {config?.title}
      </h1>
      <div className='p-24px d-flex flex-wrap gap-50px '>
        {data?.file_documents.map((e: file, i: number) => (
          <>
            {!!e?.base64 && (
              <Tippy className='cursor-pointer' key={i} content={<span>Open File</span>}>
                <div
                  onClick={() => {
                    fetch(e.base64)
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
                  key={i}
                  className='d-flex flex-column justify-content-start align-items-center min-w-100px w-170px cursor-pointer position-relative'
                  style={{
                    borderRadius: '5px',
                    outline: 'none',
                  }}
                >
                  <div className='d-flex justify-content-center align-items-center p-8px w-100px h-100px border border-gray-200'>
                    <Icons name={'ImgFoder'} />
                  </div>
                  <div className='pt-4px pb-16px ps-16px pe-16px d-flex justify-content-center flex-column'>
                    <p className='mw-180px text-center fw-semibold p-0 m-0 fs-14 text-gray-900'>
                      {e?.document_name}- {convertSize(Number(e.size) || 0)}
                    </p>
                  </div>
                </div>
              </Tippy>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

export default RenderFileDocument
