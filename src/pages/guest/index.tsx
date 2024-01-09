import {useEffect, useRef, useState} from 'react'
import nothingImg from '@/app/images/nothing.png'
import {useSocket} from '@/app/context/SocketContext'
import {PdfViewer} from './PdfViewer'
import Button from '@/components/button/Button'
import CreateSignatureModal from './CreateSignatureModal'
import request from '@/app/axios'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {convertErrorMessageResponse} from '@/app/utils'
import Cookies from 'js-cookie'
import {Input} from '@/components/input'

const Guest = () => {
  const [loanId, setLoadId] = useState<string | null>(Cookies.get('approval_loan_id') || null)
  const [loading, setLoading] = useState<boolean>(false)
  const [base64Pdf, setBase64Pdf] = useState<string | null>(null)
  const [imgBase64, setImgBase64] = useState('')
  const [email, setEmail] = useState('')
  const [input, setInput] = useState('')
  const [errorMes, setErrorMes] = useState('')

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
    setInput('')
    !!loanId &&
      request
        .post('/pdf/personal-loan-application/' + Number(loanId), {
          company_id: company_id,
          img_base64: imgBase64,
        })
        .then((data) => {
          setInput('')
          setErrorMes('')
          setEmail(data?.data?.email)
          setBase64data(data?.data?.file_base64)
        })
  }, [loanId, imgBase64])

  function handleTogglePopup() {
    setPopup(!popup)
  }
  const isValidEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  async function handleSendMail() {
    if (!email && !input) {
      swalConfirm.fire({
        icon: 'error',
        title: 'You do not have an email, please enter your email',
        showCancelButton: false,
        confirmButtonText: 'OK',
        customClass: {
          popup: 'm-w-300px',
          htmlContainer: 'fs-3',
          cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
          confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
          actions: 'd-flex justify-content-center w-100 ',
        },
      })
    }

    if (!email && input !== null) {
      if (isValidEmail(input)) {
      } else {
        setErrorMes('Please enter a valid email.')
        return
      }
    }

    const payload = {
      loan_id: Number(loanId),
      contract_base64: base64data,
      email: !!email?.trim() ? email?.trim() : input,
    }

    if (!!email.trim() || !!input.trim()) {
      try {
        await request.post('/application/send-mail', payload)

        swalToast.fire({
          icon: 'success',
          title: 'Email successfully sent. Please check your email',
        })
        setLoadId(null)
        setBase64data('')
        setImgBase64('')
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
        <div className='d-flex align-items-center justify-content-between  gap-16px py-30px'>
          <div>
            {!email && !!isSignature && (
              <div className='p-24px card'>
                <p className='m-0 pb-8px fs-16 text-gray-900 fw-semibold'>
                  Please enter your email to revise the contract
                </p>
                <Input
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                  }}
                  error={errorMes}
                  touched={!!errorMes}
                />
              </div>
            )}
          </div>
          <div className=''>
            <Button
              className='btn-light-primary  me-24px'
              disabled={loading}
              onClick={handleTogglePopup}
            >
              Create Signature
            </Button>
            {isSignature && (
              <Button
                className='btn-primary'
                disabled={loading}
                loading={loading}
                onClick={handleSendMail}
              >
                Confirm Contract
              </Button>
            )}
          </div>
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
