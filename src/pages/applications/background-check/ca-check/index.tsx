import {useEffect, useMemo, useState} from 'react'
import {Viewer, Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import {searchPlugin} from '@react-pdf-viewer/search'
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/search/lib/styles/index.css'
// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import {swalToast} from '@/app/swal-notification'
import request from '@/app/axios'
import SearchSidebar from './SearchSidebar'

type Props = {}
function base64ToUint8Array(base64String) {
  const binaryString = atob(base64String)
  const len = binaryString.length
  const bytes = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes
}
const CaCheck = (props: Props) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [base64, setBase64] = useState('')

  useEffect(() => {
    request
      .post('/pdf/ca-check', {})
      .then((datas) => {
        if (datas?.data?.pdf) {
          setBase64(datas?.data?.pdf)
          const data = base64ToUint8Array(datas?.data?.pdf)
          const url = URL.createObjectURL(new Blob([data], {type: 'application/pdf'}))
          setPdfUrl(url)
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
  }, [base64])
  const searchPluginInstance = searchPlugin({
    keyword: '',
  })
  const layoutPlugin = defaultLayoutPlugin()

  return (
    <div className='w-100vw d-flex justify-content-center p-30px'>
      <div className='w-100 mw-1200px h-100'>
        <Worker workerUrl='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'>
          {pdfUrl && (
            <div>
              <SearchSidebar searchPluginInstance={searchPluginInstance} />
              <div className='pt-30px'>
                <Viewer
                  fileUrl={pdfUrl}
                  defaultScale={1.5}
                  plugins={[layoutPlugin, searchPluginInstance]}
                />
              </div>
            </div>
          )}
        </Worker>
      </div>
    </div>
  )
}

export default CaCheck
