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
  const [imgBase64, setImgBase64] = useState('')
  const [base64data, setBase64data] = useState<string | null>(null)

  const [popup, setPopup] = useState<boolean>(false)
  const [isSignature, setIsSignature] = useState<boolean>(false)

  const {socket} = useSocket()
  const company_id = Cookies.get('company_id')
  useEffect(() => {
    socket?.on('newLoan', (loan_id) => {
      Cookies.set('approval_loan_id', loan_id)
      setLoadId(loan_id)
    })
  }, [socket])

  useEffect(() => {
    !!(!!loanId || !!imgBase64) &&
      request
        .post('/pdf/personal-loan-application/' + Number(loanId), {
          company_id: company_id,
          img_base64: imgBase64,
        })
        .then((data) => {
          setBase64data(data.data.file_base64)
        })
  }, [loanId, imgBase64])
  function handleTogglePopup() {
    setPopup(!popup)
  }

  async function handleSendMail() {
    let value = ''

    // while (!value) {
    //   value = prompt('Enter the email you want to send: ') || ''
    // }

    const payload = {
      loan_id: Number(loanId),
      contract_base64: '',
      email: value?.trim(),
    }

    try {
      await request.post('/application/send-mail', payload)

      swalToast.fire({
        icon: 'success',
        title: 'Email sent successfully, please check your email',
      })
      setLoadId(null)
      setBase64data('')
      setBase64Pdf(null)
      setIsSignature(false)
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
            setImgBase64={setImgBase64}
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

        <PdfViewer base64={base64data} />
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
