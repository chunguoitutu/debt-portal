import request from '@/app/axios'
import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import {ChangeEvent, FC, useEffect, useRef, useState} from 'react'
import phoneImg from '@/app/images/phone.svg'
import ErrorMessage from '@/components/error/ErrorMessage'
import {swalConfirm} from '@/app/swal-notification'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {
  COUNTRY_PHONE_CODE,
  convertErrorMessageResponse,
  convertMessageErrorRequired,
} from '@/app/utils'
import {Select} from '@/components/select'
import Tippy from '@tippyjs/react'

type Props = {
  payload: any
  onClose: () => void
}

const validationSchema = Yup.object().shape({
  phone_number: Yup.string().required(convertMessageErrorRequired('Phone Number')),
})

const ValidationPhoneNumber: FC<Props> = ({onClose, payload}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [otp, setOtp] = useState<string | null>(null)
  const [otpExpire, setOtpExpire] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const inputs: React.RefObject<HTMLInputElement>[] = Array.from({length: 6}, () => useRef(null))

  useEffect(() => {
    if (!otpExpire) return

    const timer = setInterval(() => {
      setOtpExpire(otpExpire - 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [otpExpire])

  const formik = useFormik({
    initialValues: {
      phone_number: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSendOTP,
  })

  const callApi = async () => {
    try {
      const {data} = await request.post('/site/send-otp', {payload: `+${payload}`})
      const {otp} = data || {}

      if (!otp) {
        return
      }

      setOtp(otp)
      setOtpExpire(60)
      {
        error && setError(null)
      }
    } catch (error) {
      setError(convertErrorMessageResponse(error))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    callApi()
  }, [])
  async function handleSendOTP() {
    setLoading(true)
    callApi()
  }

  const handleInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const value = input.value

    if (value && index < inputs.length - 1) {
      inputs[index + 1].current?.focus()
    }

    // Xử lý khi xóa
    if (!value && index > 0) {
      inputs[index - 1].current?.focus()
    }
  }

  async function handleResendOTP() {
    try {
      await handleSendOTP()
      inputs.forEach((inputRef) => {
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      })

      setError(null)

      // Focus first input
      if (inputs.length > 0 && inputs[0].current) {
        inputs[0].current.focus()
      }
    } catch (error) {}
  }

  function handleVerifyOTP() {
    const otpVerify = inputs.reduce((otpString, inputRef) => {
      if (inputRef.current) {
        return otpString + inputRef.current.value
      }
      return otpString
    }, '')

    if (!otpExpire || otpVerify.length > 6 || otpVerify !== otp) {
      setError('The phone OTP is not match, please try again, or sesend again.')
      return
    }

    onClose()
    swalConfirm.fire({
      icon: 'success',
      html: `
      <div class="d-flex flex-column gap-8px">
        <span class="fs-20 fw-bold">Phone number verification was successful!</span>
        <span class="fs-3 text-gray-800">Continue completing the loan documents.</span>
      </div>
      `,
      width: 'unset',
      showCancelButton: false,
      confirmButtonText: 'Confirm',
      customClass: {
        htmlContainer: 'fs-3',
        cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
        confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
        actions: 'd-flex justify-content-center w-100 ',
      },
    })
  }

  return (
    <div className=' p-0 m-0'>
      <div className='d-flex flex-column align-items-center p-30px w-100'>
        {otp ? (
          <div className='d-flex flex-column align-items-center w-fit-content'>
            <img src={phoneImg} alt='phone' className='w-160px object-fit-cover d-block' />

            <div className='body d-flex flex-column gap-8px text-center'>
              <h1 className='fs-2tx m-0'>Verification Phone Number</h1>
              <p className='fw-semibold m-0 fs-16'>
                OTP will expire after <span className='text-danger fw-bold'>{otpExpire}</span>{' '}
                seconds
              </p>
              <span className='text-gray-600 fw-semibold fs-14'>
                Enter the verification code we sent to: {formik.values.phone_number}
              </span>
            </div>

            <div className='place-control align-self-start d-flex flex-column gap-8px my-32px'>
              <h3 className='fs-16 fw-semibold'>Type your 6-digit verification code</h3>

              <div className='d-flex align-items-center gap-12px'>
                {inputs.map((inputRef, index) => (
                  <Input
                    className='w-60px h-60px text-align-center text-center'
                    key={index}
                    type='number'
                    maxLength={1}
                    ref={inputRef}
                    onPaste={(e) => e.preventDefault()}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                ))}
              </div>
              {error && <ErrorMessage message={error || ''} />}
            </div>

            <span className='text-gray-600 fw-semibold fs-14'>
              Haven't received the verification code?{' '}
              <span
                className={otpExpire ? 'text-gray-500' : 'text-primary cursor-pointer'}
                onClick={handleResendOTP}
              >
                Resend OTP
              </span>
            </span>
          </div>
        ) : (
          <>
            <div className='text-center h-100'>
              <div className='spinner-grow text-primary' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-secondary' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-success' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-danger' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-warning' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-info' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-light' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
              <div className='spinner-grow text-dark' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className='border-top border-gray-200 p-30px'>
        <div className='d-flex align-items-center justify-content-center gap-8px'>
          <Button className='btn-secondary fs-6' onClick={onClose}>
            Cancel
          </Button>
          <Button className='fs-6 btn-primary' onClick={handleVerifyOTP}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ValidationPhoneNumber
