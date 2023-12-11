import {FC} from 'react'
import {useParams} from 'react-router-dom'

import Button from '@/components/button/Button'
import {ApplicationFormData, PropsStepApplication} from '@/app/types'
import {swalConfirm} from '@/app/swal-notification'

interface Props extends PropsStepApplication {
  handleSubmit: () => void
  handleSaveDraft: () => void
  handleClose: () => void
  isDraft: boolean
  currentStep: number
  originData: ApplicationFormData
}

const GeneralButton: FC<Props> = ({
  handleSubmit,
  handleSaveDraft,
  handleClose,
  formik,
  isDraft,
  currentStep,
  originData,
}) => {
  const {isSubmitting, values} = formik

  const {applicationIdEdit} = useParams()

  function handleApproval() {
    swalConfirm
      .fire({
        confirmButtonText: 'Confirm',
        title: 'Are You Sure?',
        text: `Acceptance of $${originData.loan_amount_requested} Loan Request.`,
        customClass: {
          htmlContainer: 'fs-3',
          cancelButton: 'btn btn-lg order-0 fs16-line22 btn-secondary m-8px',
          confirmButton: 'order-1 fs16-line22 btn btn-lg btn-primary m-8px',
          actions: 'd-flex justify-content-center w-100 ',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          alert('Please wait this feature later.')
        }
      })
  }

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
        <Button
          type='submit'
          loading={isSubmitting && !isDraft}
          disabled={isSubmitting}
          onClick={handleSubmit}
          className='fs-6 btn btn-primary'
        >
          {currentStep === 6 ? (applicationIdEdit ? 'Update' : 'Save') : 'Continue'}
        </Button>
        {!!applicationIdEdit && values.status === 1 && currentStep === 6 ? (
          <Button
            className='fs-6 btn btn-primary'
            type='submit'
            disabled={isSubmitting}
            onClick={handleApproval}
          >
            Approve
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default GeneralButton
