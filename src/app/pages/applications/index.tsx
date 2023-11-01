import {FC, useMemo, useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import BackgroundCheck from './background-check/BackgroundCheck'
import Step from '../../components/step/Step'
import {STEP_APPLICATION} from '../../constants/step'
import './style.scss'
import HeaderApplication from '../../components/applications/HeaderApplication'
import {PropsStepApplication} from '../../modules/auth'
import Remark from './remark/Remark'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Applications',
    path: '/applications',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

export const Applications = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [stepCompleted, setStepCompleted] = useState<number>(1)
  const [changeStep, setChangeStep] = useState<number | undefined>()
  const [formData, setFormData] = useState<{[key: string]: string | any[]}>(
    STEP_APPLICATION.flatMap((item) => item.config).reduce(
      (result, current) => ({
        ...result,
        [current.key]: current?.defaultValue || '',
      }),
      {}
    )
  )

  const percentCompleted = useMemo(
    () => (100 / STEP_APPLICATION.length) * (stepCompleted === 1 ? 0 : stepCompleted + 1),
    [stepCompleted]
  )

  const CurrentComponentControl: FC<PropsStepApplication> | undefined = useMemo(() => {
    return STEP_APPLICATION[currentStep - 1].component
  }, [currentStep])

  function handleValidateBeforeChangeStep(step: number) {
    setChangeStep(step)
  }

  function handleContinue(stepWantGoTo: number | undefined) {
    // if argument undefined will go to next step
    if (!stepWantGoTo) {
      if (currentStep === STEP_APPLICATION.length) {
        return alert('Completed fill form')
      }

      setStepCompleted(currentStep)
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(stepWantGoTo)

      // reset change step
      setChangeStep(undefined)
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'New Application'}</PageTitle>
      <div className='row gx-3 gx-xl-6 gy-8'>
        <div className='col-3 col-xxl-2 order-1'>
          <Step
            data={STEP_APPLICATION}
            stepCompleted={stepCompleted}
            currentStep={currentStep}
            onGoToStep={handleValidateBeforeChangeStep}
          />
        </div>
        <div className='application-details-form card card-body col-9 col-xxl-8 order-2 p-0 d-flex flex-column h-fit-content'>
          <HeaderApplication
            labelStep={`${currentStep}. ${STEP_APPLICATION[currentStep - 1].label}`}
            percentCompleted={percentCompleted}
            className='p-10'
          />

          <div className='form-wrap w-100 p-10'>
            {CurrentComponentControl && (
              <CurrentComponentControl
                config={STEP_APPLICATION[currentStep - 1].config}
                formData={formData}
                setFormData={setFormData}
                onGoToStep={handleContinue}
                changeStep={changeStep}
                setChangeStep={setChangeStep}
              />
            )}
          </div>
        </div>
        <div className='d-none d-xxl-block col-xxl-2 order-0 order-xxl-3'>
          <div style={{paddingBottom: '30px'}}>
            <BackgroundCheck />
          </div>
          <div>
            {/* <PrintOptions /> */}
            <Remark />
          </div>
        </div>
      </div>
    </>
  )
}
