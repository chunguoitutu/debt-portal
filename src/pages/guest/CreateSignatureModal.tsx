import {swalToast} from '@/app/swal-notification'
import Button from '@/components/button/Button'
import Modal from '@/components/modal/Modal'
import {Dispatch, FC, SetStateAction, useRef, useState} from 'react'
import SignatureCanvas from 'react-signature-canvas'

type Props = {
  setImgBase64: any
  onClose: () => void
  setBase64Pdf: Dispatch<SetStateAction<string | null>>
  setIsSignature: Dispatch<SetStateAction<boolean>>
}

const CreateSignatureModal: FC<Props> = ({onClose, setBase64Pdf, setIsSignature, setImgBase64}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const signatureRef = useRef<any>({})

  function clearSignature() {
    signatureRef.current?.clear()
  }

  //   Send signature and contract
  async function handlePreviewContract() {
    if (signatureRef.current.isEmpty()) {
      return swalToast.fire({
        icon: 'error',
        title: 'Please create a signature',
      })
    }

    setLoading(true)
    const base64Signature = signatureRef.current.getTrimmedCanvas().toDataURL('image/png')
    setImgBase64(base64Signature)

    try {
      // Request to be
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // set new base64 include signature
      setBase64Pdf('something')

      setIsSignature(true)

      //   notification
      swalToast.fire({
        icon: 'success',
        title: 'Created signature successfully. Please review your signature.',
      })
      onClose()
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: 'Something went wrong',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal onClose={onClose} dialogClassName='mw-500px' show={true} title='Create Signature'>
      <div className='p-30px'>
        <h3 className='fs-20 fw-medium mb-24px'>Create your signature below:</h3>
        <SignatureCanvas
          ref={signatureRef}
          penColor='black'
          canvasProps={{
            width: 300,
            height: 100,
            className: 'border border-gray-600 card',
          }}
        />
      </div>

      <div className='border-top border-gray-200 p-30px gap-3'>
        <div className='d-flex align-items-center justify-content-end gap-8px'>
          <Button
            className='btn-light btn-active-light-primary'
            disabled={loading}
            onClick={clearSignature}
          >
            Clear
          </Button>
          <Button disabled={loading} loading={loading} onClick={handlePreviewContract}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateSignatureModal
