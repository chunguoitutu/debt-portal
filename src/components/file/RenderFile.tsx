import {convertSize} from '@/app/utils'
import Icons from '@/components/icons'
import {AiOutlineClose} from 'react-icons/ai'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import request from '@/app/axios'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import {file} from '@/pages/applications/step-component/employment/FileDocument'

type Props = {
  arrayMap: []
  url: string
  setUploadFile: (e) => void
}

const RenderFile = ({arrayMap, setUploadFile, url}: Props) => {
  return (
    <div className='d-flex flex-wrap mb-24px gap-24px'>
      {arrayMap.map((data: file, index: number) => {
        return (
          <div key={index} className='file-document-style'>
            {!!data?.base64 && (
              <div className='d-flex  min-w-100px flex-column w-185px position-relative h-100 rounded-5 hover-document'>
                <div className='d-flex justify-content-center align-items-center pt-24px pb-8px'>
                  <div className='d-flex justify-content-center align-items-center flex-shrink-0 w-60px h-60px'>
                    <Icons name={'ImgFoder'} />
                  </div>
                  <button
                    className='close text-16px button-file cursor-position position-absolute border-0 bg-transparent'
                    onClick={() => {
                      if (!!data?.id) {
                        swalConfirm
                          .fire({
                            title: 'Are You Sure?',
                            text: `You Won't Be Able To Revert This.`,
                          })
                          .then((result) => {
                            if (result.isConfirmed) {
                              request
                                .delete(url + data?.id)
                                .then((res) => {
                                  setUploadFile(index)
                                  swalToast.fire({
                                    icon: 'success',
                                    title: 'Deleted success!',
                                  })
                                })
                                .catch(() => {
                                  swalToast.fire({
                                    icon: 'error',
                                    title: DEFAULT_MSG_ERROR,
                                  })
                                })
                            }
                          })
                      } else {
                        setUploadFile(index)
                      }
                    }}
                  >
                    <AiOutlineClose className='icon' />
                  </button>
                </div>
                <div className='pt-4px pb-4px ps-16px pe-16px d-flex justify-content-center align-items-center flex-column'>
                  <p className='p-0 m-0 w-100 text-center fw-semibold fs-12 text-gray-900'>
                    {data?.document_name}
                  </p>
                  <p className='w-100 text-B5B5C3 text-center fw-semibold fs-12 p-0 m-0 '>
                    {convertSize(Number(data.size) || 0)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default RenderFile
