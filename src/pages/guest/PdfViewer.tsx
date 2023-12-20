import {useEffect, useMemo, useState} from 'react'
import {Viewer, Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import {PDFDocument} from 'pdf-lib'

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

export const PdfViewer = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [base64, setBase64] = useState<string>(
    'JVBERi0xLjcKJYGBgYEKCjcgMCBvYmoKPDwKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL0xlbmd0aCAxMzEKPj4Kc3RyZWFtCnicHco9CsJQEEXhflYxtZA4/+MDERRjZSWzAQsVA1HQ/YOJzS3u+Q4FhNS7zpOMnwes6zndvt3lPV1fnZqiEtYdxLDOwDhrZHTCFO43DWuCrWlKeHBatBgihZzMLFKFlkfI9nONYNdYbEtKW9pfcGZ4apziGC68wxqhVjAU/ADa3SIcCmVuZHN0cmVhbQplbmRvYmoKCjggMCBvYmoKPDwKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL1R5cGUgL09ialN0bQovTiA2Ci9GaXJzdCAzMgovTGVuZ3RoIDM4Mgo+PgpzdHJlYW0KeJzVU1tLwzAUfs+vOI/6sOXSphcZg21tEWQoU1AUH7I2jMqWSC+i/96TttvcgwwfpXwk55zvXJJ+4cBAgO+DB2EEPkhPgISABxBAxDlMJoQ+fL1roHdqo2tCb8qihhfkMFjBK6EL25oGOJlOyZG7UI3a2g3pk4A78p5xV9mizXUFkyzNMsZCxljgIwLGRILrAhEjBNoYExHuEaE/AH2hx5g3w1jWIwj7HBfvuHLIT3FFbuA4Sc/1o94+9HW90r6GODdPPCV0aYtENRoukivBhMeFC3DpyedLvI5Kq8b+38N185fW/HrCk/+cWdMQet+um850Tk7oXNXaRdBR7nQ9WtmdMoSmJrdFaTZAH0szM3W5d5zWdJJxwqm001WnHLrStW2rHKXkeF1tt7nW2w/dlLkaCRFHqNiO/KPpyPM9FHXnPpKlDMVAxs706Xb9pvOuIprOs9RFqeb2E3XO8JOxHIsIIp+Po7jXvGlwOvcOwuEd/OlaDqOcuZRvlhvl/QplbmRzdHJlYW0KZW5kb2JqCgo5IDAgb2JqCjw8Ci9TaXplIDEwCi9Sb290IDIgMCBSCi9JbmZvIDMgMCBSCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9UeXBlIC9YUmVmCi9MZW5ndGggNDMKL1cgWyAxIDIgMiBdCi9JbmRleCBbIDAgMTAgXQo+PgpzdHJlYW0KeJwVxLERACAMA7G3gTvK7D8Ng7BLwCoEdJsNSclppJmWKBD35wMPb30D+wplbmRzdHJlYW0KZW5kb2JqCgpzdGFydHhyZWYKNzA0CiUlRU9G'
  )
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null)
  const [modifiedBase64PDF, setModifiedBase64PDF] = useState('')

  useEffect(() => {
    setPdfData(base64ToUint8Array(base64))
  }, [])

  const layoutPlugin = defaultLayoutPlugin()

  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
      {pdfData && <Viewer fileUrl={pdfData} defaultScale={1} plugins={[layoutPlugin]} />}
    </Worker>
  )
}
