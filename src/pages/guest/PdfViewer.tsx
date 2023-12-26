import {useEffect, useMemo, useState} from 'react'
import {Viewer, Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

function base64ToUint8Array(base64String) {
  const binaryString = atob(base64String)
  const len = binaryString.length
  const bytes = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return bytes
}

export const PdfViewer = ({base64}: any) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    const data = base64ToUint8Array(base64)
    const url = URL.createObjectURL(new Blob([data], {type: 'application/pdf'}))
    setPdfUrl(url)
  }, [base64])

  const layoutPlugin = defaultLayoutPlugin()

  if (!base64) {
    return <div>Please wait...</div>
  }

  return (
    <Worker workerUrl='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'>
      {pdfUrl && <Viewer fileUrl={pdfUrl} defaultScale={1} plugins={[layoutPlugin]} />}
    </Worker>
  )
}
