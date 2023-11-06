import {FC} from 'react'
import Button from '../../../components/button/Button'
import {PropsStepApplication} from '../../../modules/auth'

interface Props extends PropsStepApplication {
  handleSubmit: () => void
  handleSaveDraft: () => void
  isDraft: boolean
}

const GeneralButton: FC<Props> = ({handleSubmit, handleSaveDraft, formik, isDraft}) => {
  const {isSubmitting} = formik
  return (
    <div className='d-flex flex-end mt-10 full'>
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
        Continue
      </Button>
    </div>
  )
}

export default GeneralButton
