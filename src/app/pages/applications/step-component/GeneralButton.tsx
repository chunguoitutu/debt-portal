import {FC} from 'react'
import Button from '../../../components/button/Button'
import {PropsStepApplication} from '../../../modules/auth'
import {useParams} from 'react-router-dom'

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
  const {applicationIdEdit} = useParams()
  const {isSubmitting, values} = formik

  return (
    <div
      className='d-flex flex-end mt-10 full'
      style={{
        padding: currentStep === 6 ? '0px 30px 30px 0px' : '0px',
      }}
    >
      {!applicationIdEdit && (
        <Button
          loading={isSubmitting && isDraft}
          onClick={handleSaveDraft}
          className='btn-secondary align-self-center me-3 d-flex none'
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
        {currentStep === 6 ? (values.customer_no ? 'Update' : 'Save') : 'Continue'}
      </Button>
    </div>
  )
}

export default GeneralButton
