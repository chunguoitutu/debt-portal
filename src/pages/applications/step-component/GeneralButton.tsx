import {FC} from 'react'
import Button from '../../../components/button/Button'
import {useParams} from 'react-router-dom'
import {PropsStepApplication} from '../../../app/types/common'

interface Props extends PropsStepApplication {
  handleSubmit: () => void
  handleSaveDraft: () => void
  isDraft: boolean
  currentStep: number
}

const GeneralButton: FC<Props> = ({
  handleSubmit,
  handleSaveDraft,
  formik,
  isDraft,
  currentStep,
}) => {
  const {isSubmitting} = formik

  const {applicationIdEdit} = useParams()

  return (
    <div className='d-flex flex-end mt-10 full gap-5'>
      {!applicationIdEdit && (
        <Button
          loading={isSubmitting && isDraft}
          onClick={handleSaveDraft}
          className='btn-secondary align-self-center d-flex none'
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
      >
        {currentStep === 6 ? (applicationIdEdit ? 'Update' : 'Save') : 'Continue'}
      </Button>

      {currentStep === 6 ? (
        <Button type='submit' disabled={isSubmitting} onClick={() => {}}>
          Approve
        </Button>
      ) : null}
    </div>
  )
}

export default GeneralButton
