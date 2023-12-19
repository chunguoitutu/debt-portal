import {FC, useMemo, useState} from 'react'
import {useParams} from 'react-router-dom'

import Button from '@/components/button/Button'
import {PropsStepApplication} from '@/app/types'
import {useAuth} from '@/app/context/AuthContext'
import {swalConfirm, swalToast} from '@/app/swal-notification'

interface Props extends PropsStepApplication {
  handleSubmit: () => void
  handleSaveDraft: () => void
  data: any
  handleClose: () => void
  isDraft: boolean
  currentStep: number
}

const GeneralButton: FC<Props> = ({
  handleSubmit,
  handleSaveDraft,
  handleClose,
  formik,
  data,
  isDraft,
  currentStep,
}) => {
  const [number, setNumber] = useState(0)
  const {priority} = useAuth()
  const {isSubmitting, values} = formik

  const checkApprove = useMemo(() => {
    if (priority <= 2) {
      return false
    }
    if (
      (values.loan_amount_requested <= 3000 &&
        priority > 2 &&
        values.is_existing === 'new' &&
        priority > 2 &&
        values.identification_type === 'singapore_nric_no') ||
      (values.loan_amount_requested <= 5000 &&
        values.is_existing === 'existing' &&
        priority > 2 &&
        values.identification_type === 'singapore_nric_no') ||
      (values.loan_amount_requested <= 3000 &&
        priority > 2 &&
        values.identification_type === 'foreign_identification_number')
    ) {
      return false
    }

    return true
  }, [values, priority])
  const checkbugApprove = useMemo(() => {
    if (
      values.loan_amount_requested > 3000 &&
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) <= 20000 &&
      values.identification_type === 'singapore_nric_no'
    ) {
      setNumber(3000)
      return false
    }

    if (
      values.loan_amount_requested > +values.six_months_income &&
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) >= 20000 &&
      values.is_existing === 'new' &&
      values.identification_type === 'singapore_nric_no'
    ) {
      setNumber(+values.six_months_income)
      return false
    }

    if (
      values.loan_amount_requested > 5000 &&
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) < 20000 &&
      values.is_existing === 'existing' &&
      values.identification_type === 'singapore_nric_no'
    ) {
      setNumber(3000)
      return false
    }

    if (
      values.loan_amount_requested > +values.six_months_income &&
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) >= 20000 &&
      values.is_existing === 'existing' &&
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
      (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) <= 40000 &&
      10000 <= (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) &&
      values.identification_type === 'foreign_identification_number'
    ) {
      setNumber(300)
      return false
    }
    return true
  }, [values, priority])

  const {applicationIdEdit} = useParams()

  return (
    <div className='d-flex justify-content-between align-items-center  mt-10 full gap-5'>
      <div>
        {!!applicationIdEdit && (values.status === 1 || values.status === 2) && (
          <Button type='submit' onClick={handleClose} className='fs-6 btn btn-danger'>
            Reject
          </Button>
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
        {values.status !== 2 && (
          <Button
            type='submit'
            loading={isSubmitting && !isDraft}
            disabled={isSubmitting}
            onClick={handleSubmit}
            className='fs-6 btn btn-primary'
          >
            {currentStep === 6 ? (applicationIdEdit ? 'Update' : 'Save') : 'Continue'}
          </Button>
        )}
        {!!applicationIdEdit && values.status === 1 && currentStep === 6 ? (
          <Button
            className='fs-6 btn btn-primary'
            type='submit'
            disabled={isSubmitting}
            onClick={() => {
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
                      title: `Cannot borrow more than ${number}`,
                    })
              } else {
                swalConfirm.fire({
                  icon: 'success',
                  title: 'Successfully Approved This Application.',
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
            }}
          >
            Approve
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default GeneralButton
