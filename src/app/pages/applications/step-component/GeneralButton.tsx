import {FC} from 'react'
import Button from '../../../components/button/Button'
import {PropsStepApplication} from '../../../modules/auth'

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
  const {isSubmitting, values} = formik
  return (
    <div
      className='d-flex flex-end mt-10 full'
      style={{padding: currentStep === 6 ? '0px 30px 30px 0px' : '0px'}}
    >
      <Button
        loading={isSubmitting && isDraft}
        onClick={() => handleSaveDraft()}
        className='btn-secondary align-self-center me-3'
        disabled={isSubmitting}
      >
        Save Draft
      </Button>
      <Button
        type='submit'
        loading={isSubmitting && !isDraft}
        disabled={isSubmitting}
        onClick={() => handleSubmit()}
      >
        {currentStep === 6 ? (values.customer_no ? 'Update' : 'Save') : 'Continue'}
      </Button>
    </div>
  )
}

export default GeneralButton
