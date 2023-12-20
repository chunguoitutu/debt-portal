import {useEffect, useRef, useState} from 'react'
import nothingImg from '@/app/images/nothing.png'
import {useSocket} from '@/app/context/SocketContext'
import {PdfViewer} from './PdfViewer'
import Button from '@/components/button/Button'
import CreateSignatureModal from './CreateSignatureModal'

const Guest = () => {
  const [pdf, setPdf] = useState<string | null>(null)
  const [base64Pdf, setBase64Pdf] = useState<string | null>(null)
  const [popup, setPopup] = useState<boolean>(false)
  const [isSignature, setIsSignature] = useState<boolean>(false)

  const {socket} = useSocket()

  useEffect(() => {
    socket?.on('approval', (data) => {
      setPdf('1')
    })
    setTimeout(() => {
      setPdf('1')
    }, 1000)
  }, [socket])

  function handleTogglePopup() {
    setPopup(!popup)
  }

  return pdf ? (
    <div className='d-flex flex-column align-items-center flex-grow-1'>
      <div className='w-100 mw-1200px h-650px'>
        {popup && (
          <CreateSignatureModal
            onClose={handleTogglePopup}
            setBase64Pdf={setBase64Pdf}
            setIsSignature={setIsSignature}
          />
        )}
        <div className='d-flex align-items-center justify-content-end gap-16px'>
          <Button className='btn-light-primary mb-24px' onClick={handleTogglePopup}>
            Create Signature
          </Button>
          {isSignature && (
            <Button className='btn-primary mb-24px' onClick={handleTogglePopup}>
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
