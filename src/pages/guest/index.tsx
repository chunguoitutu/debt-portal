import {useEffect, useRef, useState} from 'react'
import nothingImg from '@/app/images/nothing.png'
import {useSocket} from '@/app/context/SocketContext'
import {PdfViewer} from './PdfViewer'
import Button from '@/components/button/Button'
import CreateSignatureModal from './CreateSignatureModal'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {convertErrorMessageResponse} from '@/app/utils'
import Cookies from 'js-cookie'

const Guest = () => {
  const [loanId, setLoadId] = useState<string | null>(Cookies.get('approval_loan_id') || null)
  const [loading, setLoading] = useState<boolean>(false)
  const [base64Pdf, setBase64Pdf] = useState<string | null>(null)
  const [popup, setPopup] = useState<boolean>(false)
  const [isSignature, setIsSignature] = useState<boolean>(false)

  const {socket} = useSocket()

  useEffect(() => {
    socket?.on('newLoan', (loan_id) => {
      Cookies.set('approval_loan_id', loan_id)
      setLoadId(loan_id)
    })
  }, [socket])

  function handleTogglePopup() {
    setPopup(!popup)
  }

  async function handleSendMail() {
    let value = ''

    while (!value) {
      value = prompt('Enter the email you want to send: ') || ''
    }

    const payload = {
      loan_id: 1,
      contract_base64:
        'JVBERi0xLjcKJYGBgYEKCjcgMCBvYmoKPDwKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL0xlbmd0aCAxMzEKPj4Kc3RyZWFtCnicHco9CsJQEEXhflYxtZA4/+MDERRjZSWzAQsVA1HQ/YOJzS3u+Q4FhNS7zpOMnwes6zndvt3lPV1fnZqiEtYdxLDOwDhrZHTCFO43DWuCrWlKeHBatBgihZzMLFKFlkfI9nONYNdYbEtKW9pfcGZ4apziGC68wxqhVjAU/ADa3SIcCmVuZHN0cmVhbQplbmRvYmoKCjggMCBvYmoKPDwKL0ZpbHRlciAvRmxhdGVEZWNvZGUKL1R5cGUgL09ialN0bQovTiA2Ci9GaXJzdCAzMgovTGVuZ3RoIDM4Mgo+PgpzdHJlYW0KeJzVU1tLwzAUfs+vOI/6sOXSphcZg21tEWQoU1AUH7I2jMqWSC+i/96TttvcgwwfpXwk55zvXJJ+4cBAgO+DB2EEPkhPgISABxBAxDlMJoQ+fL1roHdqo2tCb8qihhfkMFjBK6EL25oGOJlOyZG7UI3a2g3pk4A78p5xV9mizXUFkyzNMsZCxljgIwLGRILrAhEjBNoYExHuEaE/AH2hx5g3w1jWIwj7HBfvuHLIT3FFbuA4Sc/1o94+9HW90r6GODdPPCV0aYtENRoukivBhMeFC3DpyedLvI5Kq8b+38N185fW/HrCk/+cWdMQet+um850Tk7oXNXaRdBR7nQ9WtmdMoSmJrdFaTZAH0szM3W5d5zWdJJxwqm001WnHLrStW2rHKXkeF1tt7nW2w/dlLkaCRFHqNiO/KPpyPM9FHXnPpKlDMVAxs706Xb9pvOuIprOs9RFqeb2E3XO8JOxHIsIIp+Po7jXvGlwOvcOwuEd/OlaDqOcuZRvlhvl/QplbmRzdHJlYW0KZW5kb2JqCgo5IDAgb2JqCjw8Ci9TaXplIDEwCi9Sb290IDIgMCBSCi9JbmZvIDMgMCBSCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9UeXBlIC9YUmVmCi9MZW5ndGggNDMKL1cgWyAxIDIgMiBdCi9JbmRleCBbIDAgMTAgXQo+PgpzdHJlYW0KeJwVxLERACAMA7G3gTvK7D8Ng7BLwCoEdJsNSclppJmWKBD35wMPb30D+wplbmRzdHJlYW0KZW5kb2JqCgpzdGFydHhyZWYKNzA0CiUlRU9G',
      email: value?.trim(),
    }

    try {
      await request.post('/application/send-mail', payload)

      swalToast.fire({
        icon: 'success',
        title: 'Email sent successfully, please check your email',
      })
      setLoadId(null)
      setBase64Pdf(null)
      Cookies.remove('approval_loan_id')
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setLoading(false)
    }
  }

  return loanId ? (
    <div className='d-flex flex-column align-items-center flex-grow-1'>
      <div className='w-100 mw-1200px'>
        {popup && (
          <CreateSignatureModal
            onClose={handleTogglePopup}
            setBase64Pdf={setBase64Pdf}
            setIsSignature={setIsSignature}
          />
        )}
        <div className='d-flex align-items-center justify-content-end gap-16px'>
          <Button
            className='btn-light-primary mb-24px'
            disabled={loading}
            onClick={handleTogglePopup}
          >
            Create Signature
          </Button>
          {isSignature && (
            <Button
              className='btn-primary mb-24px'
              disabled={loading}
              loading={loading}
              onClick={handleSendMail}
            >
              Confirm Contract
            </Button>
          )}
        </div>

        <PdfViewer />
      </div>
    </div>
  ) : (
    <div className='d-flex align-items-center justify-content-center flex-grow-1'>
      <div className='d-flex flex-column align-items-center gap-16px'>
        <img src={nothingImg} alt='nothing' />
        <span className='fs-20 fw-medium'>Nothing show now. Please wait...</span>
      </div>
    </div>
  )
}

export default Guest
