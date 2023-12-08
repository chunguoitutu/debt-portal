import {FC} from 'react'
import {useParams} from 'react-router-dom'

import Button from '@/components/button/Button'
import {PropsStepApplication} from '@/app/types'

interface Props extends PropsStepApplication {
  handleSubmit: () => void
  handleSaveDraft: () => void
  handleClose: () => void
  isDraft: boolean
  currentStep: number
}

const GeneralButton: FC<Props> = ({
  handleSubmit,
  handleSaveDraft,
  handleClose,
  formik,
  isDraft,
  currentStep,
}) => {
  const {isSubmitting} = formik

  const {applicationIdEdit} = useParams()

  return (
    <div className='d-flex justify-content-between align-items-center  mt-10 full gap-5'>
      <div>
        {!!applicationIdEdit && (
          <Button type='submit' onClick={handleClose} className='fs-5 btn btn-danger'>
            Reject
          </Button>
        )}
      </div>
      <div className='d-flex gap-5'>
        {!applicationIdEdit && currentStep !== 6 && (
          <Button
            loading={isSubmitting && isDraft}
            onClick={handleSaveDraft}
            className='btn-secondary align-self-center d-flex none fs-5'
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
          className='fs-5 btn btn-primary'
        >
          {currentStep === 6 ? (applicationIdEdit ? 'Update' : 'Save') : 'Continue'}
        </Button>
        {currentStep === 6 ? (
          <Button
            className='fs-5 btn btn-primary'
            type='submit'
            disabled={isSubmitting}
            onClick={() => {}}
          >
            Approve
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default GeneralButton
