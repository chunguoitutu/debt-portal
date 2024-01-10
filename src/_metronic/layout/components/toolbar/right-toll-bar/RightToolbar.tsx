import {FC} from 'react'
import {ToggleHelpDrawer} from './ToggleHelpDrawer'
import {HelpDrawer} from './HelpDrawer'
import {PropsStepApplication} from '@/app/types'

const RightToolbar: FC<PropsStepApplication> = ({
  setStepCompleted,
  formik,
  config,
  setSingpass,
  singpass,
  borrower_id,
  tools,
  setTools,
  optionListing,
  setOptionListing,
}) => {
  return (
    <>
      <div className='engage-toolbar d-flex position-fixed px-5 fw-bolder zindex-2 top-50 end-0 transform-90 mt-20 gap-2'>
        <ToggleHelpDrawer />
      </div>
      <HelpDrawer
        setOptionListing={setOptionListing}
        optionListing={optionListing}
        borrower_id={borrower_id}
        tools={tools}
        setTools={setTools}
        setStepCompleted={setStepCompleted}
        formik={formik}
        config={config}
        setSingpass={setSingpass}
        singpass={singpass}
      />
    </>
  )
}

export {RightToolbar}
