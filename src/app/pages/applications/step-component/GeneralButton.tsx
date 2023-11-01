import * as React from 'react'
import Button from '../../../components/button/Button'

const GeneralButton = ({handleSubmit}) => {
  return (
    <div className='d-flex flex-end mt-10 full'>
      <Button onClick={() => {}} className='btn-secondary align-self-center me-3' disabled={false}>
        Save Draft
      </Button>
      <Button loading={false} disabled={false} onClick={() => handleSubmit()}>
        Continue
      </Button>
    </div>
  )
}

export default GeneralButton
