import {Dispatch, FC, useEffect, useMemo, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

import Button from '@/components/button/Button'
import {PropsStepApplication} from '@/app/types'
import {useAuth} from '@/app/context/AuthContext'
import {swalConfirm, swalConfirmCancel, swalToast} from '@/app/swal-notification'
import ApprovalApplicationModal from './approval'
import clsx from 'clsx'
import Reject from './reject/Reject'
import {ApplicationStatus} from '@/app/types/enum'
import request from '@/app/axios'
import {
  BANK_INFO_CONFIG,
  BLOCK_ADDRESS_CONFIG,
  COMPLETION_CONFIG,
  CONTACT_INFORMATION,
  EMPLOYMENT_CONFIG,
  GENERAL_INFORMATION_CONFIG,
  LOAN_DETAILS_CONFIG,
} from './config'
import {getIdDefault} from '@/app/utils'

interface Props extends PropsStepApplication {
  handleSubmit: () => void
  handleSaveDraft: () => void
  handleReloadApi: () => void
  setCurrentStep: Dispatch<any>
  isDraft: boolean
  dataEdit: any
  currentStep: number
}

const GeneralButton: FC<Props> = (props) => {
  const {
    dataEdit,
    handleSubmit,
    handleSaveDraft,
    handleReloadApi,
    formik,
    setCurrentStep,
    isDraft,
    currentStep,
    setStepCompleted,
    optionListing,
  } = props
  const {isSubmitting, values, setFieldValue} = formik

  const [number, setNumber] = useState(0)
  const [showPopupApproval, setShowPopupApproval] = useState<boolean>(false)
  const [showPopupRejection, setShowPopupRejection] = useState<boolean>(false)
  const {priority} = useAuth()

  const navigate = useNavigate()

  const checks = useMemo(() => {
    if (currentStep !== 6) return true

    const check = Object.keys(values).map((check) => {
      if (Array.isArray(values[check]) && !!dataEdit) {
        if (values[check]?.length == 0) {
          return true
        }
        if (values[check]?.length === dataEdit[check]?.length) {
          const test = values[check].map((data, index) => {
            const d = Object.keys(data).map((d) => {
              if ((data[d] || '').toString() === (dataEdit[check][index][d] || '').toString()) {
                return true
              } else {
                return false
              }
            })

            return d.includes(false)
          })
          return !test.includes(true)
        }
        return false
      }
      if (!Array.isArray(values[check]) && values[check] === dataEdit[check] && !!dataEdit) {
        return true
      }
      return false
    })
    return check.includes(false)
  }, [currentStep])

  const checkApprove = useMemo(() => {
    if (priority <= 2) {
      return false
    }
    if (values.loan_amount_requested <= 3000 && priority > 2) {
      return false
    }

    return true
  }, [values, priority])

  const checkbugApprove = useMemo(() => {
    if (
      values.loan_amount_requested > 3000 &&
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) < 20000 &&
      values.identification_type === 'singapore_nric_no'
    ) {
      setNumber(3000)
      return false
    }

    if (
      values.loan_amount_requested > +values.six_months_income &&
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) >= 20000 &&
      values.identification_type === 'singapore_nric_no'
    ) {
      setNumber(+values.six_months_income)
      return false
    }

    if (
      values.loan_amount_requested > 500 &&
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) < 10000 &&
      values.identification_type === 'foreign_identification_number'
    ) {
      setNumber(500)
      return false
    }

    if (
      values.loan_amount_requested > +values.six_months_income &&
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) >= 40000 &&
      values.identification_type === 'foreign_identification_number'
    ) {
      setNumber(+values.six_months_income)
      return false
    }

    if (
      values.loan_amount_requested > 3000 &&
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) < 40000 &&
      10000 <= (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) &&
      values.identification_type === 'foreign_identification_number'
    ) {
      setNumber(3000)

      return false
    }
    return true
  }, [values, priority])

  const {applicationIdEdit} = useParams()

  async function handleApproval() {
    if (checkApprove || !checkbugApprove) {
      checkbugApprove
        ? swalConfirm.fire({
            icon: 'error',
            title: 'No permission to proceed. Please contact company admin',
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
        : swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `Cannot borrow more than $${number}`,
          })
      return
    }

    setShowPopupApproval(true)
  }

  async function handleNavigateLoan() {
    if (!values.approval?.loan_id) return

    navigate(`/loans/details/${values.approval?.loan_id}`)
  }

  function handleTogglePopupRejection() {
    setShowPopupRejection(!showPopupRejection)
  }

  async function handleCancelApplication(applicationIdEdit: any) {
    try {
      const result = await swalConfirmCancel.fire({
        title: 'Are You Sure?',
        text: `You Won't Be Able To Revert This.`,
      })

      if (result.isConfirmed) {
        if (!applicationIdEdit) {
          navigate('/application/create')
          setCurrentStep(1)
          setStepCompleted(0)
          formik.resetForm()

          const listConfig = GENERAL_INFORMATION_CONFIG.filter((item) => item.dependencyApi)

          listConfig.forEach((item) => {
            if (item.key === 'country_id') return
            setFieldValue(
              item.key,
              getIdDefault(optionListing[item.keyOfOptionFromApi || item.key])
            )
          })

          swalToast.fire({
            timer: 1500,
            icon: 'success',
            title: 'Application successfully canceled',
          })
        } else {
          await request.put(`/application/cancel-application/${applicationIdEdit}`, {
            application_id: applicationIdEdit,
          })
          navigate('/application/create')
          setCurrentStep(1)
          setStepCompleted(1)
          swalToast.fire({
            timer: 1500,
            icon: 'success',
            title: 'Application successfully canceled',
          })
        }
      }
    } catch (error) {
      swalToast.fire({
        timer: 1500,
        icon: 'error',
        title: 'The system is having an error, please try again in a few minutes',
      })
    }
  }
  return (
    <>
      {showPopupApproval && (
        <ApprovalApplicationModal
          setCurrentStep={setCurrentStep}
          handleReloadApi={handleReloadApi}
          formik={formik}
          data={{...values.approval}}
          onClose={() => setShowPopupApproval(!showPopupApproval)}
        />
      )}
      {showPopupRejection && (
        <Reject
          {...props}
          setCurrentStep={setCurrentStep}
          handleloadApi={handleReloadApi}
          handleClose={handleTogglePopupRejection}
        />
      )}

      <div
        className={clsx([
          'd-flex justify-content-between align-items-center mt-10 full gap-5',
          currentStep === 6 ? 'pb-30px' : 'pb-0',
        ])}
      >
        <div>
          {(!applicationIdEdit && currentStep !== 6) ||
          (values.status === ApplicationStatus.DRAFT && currentStep !== 6) ? (
            <Button
              type='submit'
              onClick={() => handleCancelApplication(applicationIdEdit)}
              className={`fs-6 btn btn-danger`}
            >
              Cancel
            </Button>
          ) : (
            !!applicationIdEdit &&
            values.status === ApplicationStatus.AWAITING_APPROVAL && (
              <Button
                type='submit'
                onClick={handleTogglePopupRejection}
                className={`fs-6 btn btn-danger`}
              >
                Reject
              </Button>
            )
          )}
        </div>

        <div className='d-flex gap-5'>
          {!applicationIdEdit && currentStep !== 6 && (
            <Button
              loading={isSubmitting && isDraft}
              onClick={handleSaveDraft}
              className='btn-secondary align-self-center d-flex none fs-6'
              disabled={isSubmitting}
            >
              Save Draft
            </Button>
          )}
          {![ApplicationStatus.REJECTED, ApplicationStatus.APPROVED].includes(
            values.status || 0
          ) && (
            <Button
              type='submit'
              loading={isSubmitting && !isDraft}
              disabled={isSubmitting || (!checks && !!applicationIdEdit && currentStep === 6)}
              onClick={handleSubmit}
              className='fs-6 btn btn-primary'
            >
              {currentStep === 6 ? (applicationIdEdit ? 'Update' : 'Save') : 'Continue'}
            </Button>
          )}
          {!!applicationIdEdit &&
            values.status === ApplicationStatus.AWAITING_APPROVAL &&
            currentStep === 6 && (
              <Button
                className='fs-6 btn btn-primary'
                type='submit'
                disabled={isSubmitting || (checks && !!applicationIdEdit && currentStep === 6)}
                onClick={handleApproval}
              >
                Approve
              </Button>
            )}

          {!!applicationIdEdit && values.status === ApplicationStatus.APPROVED && (
            <Button className='fs-6 btn btn-success' type='submit' onClick={handleNavigateLoan}>
              Go To Loan
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default GeneralButton
