import request from '@/app/axios'
import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import {ChangeEvent, FC, useEffect, useMemo, useRef, useState} from 'react'
import ErrorMessage from '@/components/error/ErrorMessage'
import {useFormik} from 'formik'
import {Modal} from 'react-bootstrap'
import {WarningAlert} from '@/components/alert'
import SwitchFormControl from '../switch-form-control'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import {convertErrorMessageResponse} from '@/app/utils'
import {swalToast} from '@/app/swal-notification'
import {EditModalProps} from '@/app/types'

const ModalEdit: FC<EditModalProps> = ({config, currentUser, onClose}) => {
  const {label, note, rows, validation, isSendOtp, otpInfo, messageSuccess} = config
  const [otp, setOtp] = useState<string | null>(null)
  const [otpExpire, setOtpExpire] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const inputs: React.RefObject<HTMLInputElement>[] = Array.from({length: 6}, () => useRef(null))

  const initValue = useMemo(() => {
    return rows.reduce(
      (acc, row) => ({
        ...acc,
        [row.key]: currentUser?.[row.key] || row?.infoCreateEdit?.defaultValue || '',
      }),
      {} as any
    )
  }, [config])

  useEffect(() => {
    if (!otpExpire) return

    const timer = setInterval(() => {
      setOtpExpire(otpExpire - 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [otpExpire])

  useEffect(() => {
    // Focus first input
    if (inputs.length > 0 && inputs[0].current) {
      inputs[0].current.focus()
    }
  }, [otp])

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: validation,
    validateOnChange: false,
    onSubmit: handleSendOTP,
  })
  const {values, isSubmitting, dirty, handleSubmit, setSubmitting} = formik

  const handleInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const value = input.value

    if (value && index < inputs.length - 1) {
      inputs[index + 1].current?.focus()
    }

    if (!value && index > 0) {
      inputs[index - 1].current?.focus()
    }
  }

  function handlePasteOtp(e: any) {
    e.preventDefault()
    const valueCopied = e.clipboardData.getData('text/plain')
    const numberCopied = valueCopied?.replaceAll(/\D/g, '')

    let index = 0

    inputs.forEach((input) => {
      const oldValue = input?.current?.value

      if (!oldValue) {
        input.current.value = numberCopied?.[index] || ''
        index++
      }
    })
  }

  async function handleSendOTP() {
    const payload = validation.cast(values)

    try {
      const {data} = await request.post('/site/send-otp', payload)
      const {otp} = data || {}

      if (!otp) {
        setError(DEFAULT_MSG_ERROR)
      }

      setOtp(otp)
      setOtpExpire(60)
      error && setError(null)
    } catch (error) {
      setError(convertErrorMessageResponse(error))
    } finally {
      setSubmitting(false)
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

  async function handleUpdate() {
    setSubmitting(true)
    try {
      // handle update
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 300)
      })

      onClose()
      swalToast.fire({
        icon: 'success',
        title: messageSuccess,
      })
    } catch (error) {
      swalToast.fire({
        icon: 'success',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVerifyOTP() {
    setSubmitting(true)

    const otpVerify = inputs.reduce((otpString, inputRef) => {
      if (inputRef.current) {
        return otpString + inputRef.current.value
      }
      return otpString
    }, '')

    if (!otpExpire || otpVerify.length > 6 || otpVerify !== otp) {
      setError(otpInfo.messageNotMatch || DEFAULT_MSG_ERROR)
      setSubmitting(false)
      return
    }

    try {
      // handle verify
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1)
        }, 300)
      })

      onClose()
      swalToast.fire({
        icon: 'success',
        title: messageSuccess,
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-500px'
      show={true}
      onHide={() => !dirty && onClose()} // only click outside close modal dialog when values changed
      backdrop={true}
    >
      <form className='p-30px d-flex flex-column gap-32px'>
        <h3 className='fs-24 fw-bold text-center m-0'>{otp ? otpInfo?.label : label}</h3>

        {otp ? (
          <div className='d-flex flex-column gap-20px'>
            <div className='d-flex flex-column text-center gap-8px'>
              <p className='fw-semibold m-0 fs-16'>
                OTP will expire after <span className='text-danger fw-bold'>{otpExpire}</span>{' '}
                seconds
              </p>
              <span className='text-gray-600 fw-normal fs-14'>
                Enter the verification code we sent to: {values.email}
              </span>
            </div>

            <div className='place-control d-flex flex-column gap-8px'>
              <h3 className='fs-16 fw-semibold'>Type Your 6 Digit Verification Code</h3>

              <div className='d-flex align-items-center gap-12px'>
                {inputs.map((inputRef, index) => (
                  <Input
                    className='w-60px h-60px text-align-center text-center'
                    key={index}
                    type='number'
                    maxLength={1}
                    ref={inputRef}
                    onPaste={handlePasteOtp}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                ))}
              </div>
              {error && <ErrorMessage message={error} />}
            </div>

            <span className='text-gray-600 fw-normal fs-14 text-center'>
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
          <div className='d-flex flex-column gap-20px'>
            <div className='d-flex flex-column gap-20px'>
              {note && <WarningAlert text={note} />}
              {error && (
                <div className='bg-light-danger p-16px rounded-3 text-danger text-center'>
                  {error}
                </div>
              )}
            </div>
            <div className='row gy-24px'>
              {rows?.map((row) => {
                return <SwitchFormControl formik={formik} row={row} key={row.key} />
              })}
            </div>
          </div>
        )}
      </form>

      {/* Action */}
      <div className='d-flex align-items-center justify-content-center gap-8px border-top border-gray-200 p-16px'>
        <Button className='btn-secondary' disabled={isSubmitting} onClick={onClose}>
          Cancel
        </Button>
        <Button
          type='submit'
          loading={isSubmitting}
          disabled={!dirty || isSubmitting}
          onClick={() => (otp ? handleVerifyOTP() : isSendOtp ? handleSubmit() : handleUpdate())}
        >
          Submit
        </Button>
      </div>
    </Modal>
  )
}

export default ModalEdit
