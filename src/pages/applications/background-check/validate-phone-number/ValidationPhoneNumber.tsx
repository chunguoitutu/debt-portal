import request from '@/app/axios'
import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import {ChangeEvent, FC, useEffect, useRef, useState} from 'react'
import phoneImg from '@/app/images/phone.svg'
import ErrorMessage from '@/components/error/ErrorMessage'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {COUNTRY_PHONE_CODE, convertErrorMessageResponse, convertFieldRequired} from '@/app/utils'
import {useParams} from 'react-router-dom'
import Tippy from '@tippyjs/react'
import {Select} from '@/components/select'

type Props = {
  payload: any
  onClose: () => void
  toolsCheckCount: {
    MLCB: number
    Cross: number
    validatePhone: number
  }
  setToolsCheckCount: any
}

const validationSchema = Yup.object().shape({
  phone_number: Yup.string().required(convertFieldRequired('Phone Number')),
})

const ValidationPhoneNumber: FC<Props> = ({
  onClose,
  payload,
  setToolsCheckCount,
  toolsCheckCount,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [otp, setOtp] = useState<string | null>(null)
  const [otpExpire, setOtpExpire] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {applicationIdEdit} = useParams()

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
      phone_number: !!payload ? (payload as string) : '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSendOTP,
  })

  async function handleSendOptToPhone() {
    setLoading(true)

    try {
      if (!formik.values.phone_number) return
      const {data} = await request.post('/site/send-otp', {
        payload: `+${formik.values.phone_number}`,
      })
      const {otp} = data || {}

      if (!otp) {
        return
      }

      setOtp(otp)
      setOtpExpire(60)
      error && setError(null)
    } catch (error) {
      setError(convertErrorMessageResponse(error))
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   setLoading(true)
  //   callApi()
  // }, [])
  async function handleSendOTP() {
    setLoading(true)
    handleSendOptToPhone()
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
      setError('The phone OTP is not match, please try again, or resend again.')
      return
    }
    !applicationIdEdit &&
      setToolsCheckCount({
        ...toolsCheckCount,
        validatePhone: Number(toolsCheckCount.validatePhone || 0) + 1,
      })
    !!applicationIdEdit &&
      request
        .post('/site/update_count_sendOpt', {
          application_id: +applicationIdEdit,
          phone_count: Number(toolsCheckCount.validatePhone || 0),
        })
        .then((data) => {
          setToolsCheckCount({
            ...toolsCheckCount,
            validatePhone: Number(data?.data?.data.phone_verified || 0),
          })
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
            confirmButtonText: 'OK',
            customClass: {
              htmlContainer: 'fs-3',
              cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
              confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
              actions: 'd-flex justify-content-center w-100 ',
            },
          })
        })
        .catch(() => {
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `Validation Phone Number no data available`,
          })
        })
  }

  return (
    <div className=' p-0 m-0'>
      <div className='d-flex flex-column align-items-center p-30px w-100 1'>
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
              <h3 className='fs-16'>Type Your 6 Digit Verification Code</h3>

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
              {error && <ErrorMessage message={error} />}
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
            {error && (
              <div className='bg-light-danger w-100 text-center p-12px mb-16px rounded-5'>
                <ErrorMessage className='m-0' message={error as string} />
              </div>
            )}
            <Input
              classShared='w-100'
              type='number'
              {...formik.getFieldProps('phone_number')}
              label='Phone Number'
              error={formik.errors['phone_number'] as string}
              touched={formik.touched['phone_number'] as boolean}
              insertLeft={
                <Tippy offset={[120, 0]} content='Please choose the phone number you prefer.'>
                  {/* Wrapper with a span tag to show tooltip */}
                  <span>
                    <Select
                      isOptionDefault={false}
                      classShared='m-0'
                      className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                      name='country_phone_code'
                      options={COUNTRY_PHONE_CODE}
                      disabled
                    />
                  </span>
                </Tippy>
              }
              required={true}
              {...formik.getFieldProps('phone_number')}
            />
          </>
        )}
      </div>
      <div className='border-top border-gray-200 p-30px'>
        {otp ? (
          <div className='d-flex align-items-center justify-content-center gap-8px'>
            <Button className='btn-secondary fs-6' onClick={onClose}>
              Cancel
            </Button>
            <Button className='fs-6 btn-primary' onClick={handleVerifyOTP}>
              Confirm
            </Button>
          </div>
        ) : (
          <div className='d-flex justify-content-end'>
            <Button
              className='btn-primary fs-6 w-fit-content ms-auto'
              loading={loading}
              disabled={loading}
              onClick={() => formik.handleSubmit()}
            >
              Send OTP
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ValidationPhoneNumber
