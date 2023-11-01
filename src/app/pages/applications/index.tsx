import {useMemo, useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import BackgroundCheck from './background-check/BackgroundCheck'
import PrintOptions from './print-options/PrintOptions'
import Step from '../../components/step/Step'
import {STEP_APPLICATION} from '../../constants/step'
import './style.scss'

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
  const [currentStep, setCurrentStep] = useState<number>(5)
  const [stepCompleted, setStepCompleted] = useState<number>(1)
  const [formData, setFormData] = useState<{[key: string]: string | any[]}>(
    STEP_APPLICATION.flatMap((item) => item.config).reduce(
      (result, current) => ({
        ...result,
        [current.key]: current?.defaultValue || '',
      }),
      {}
    )
  )

  const CurrentComponentControl = useMemo(() => {
    return STEP_APPLICATION[currentStep - 1].component
  }, [currentStep])

  function handleChangeStep(step: number) {
    setCurrentStep(step)
  }

  function handleContinue() {
    setStepCompleted(currentStep)
    setCurrentStep(currentStep + 1)
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
            onGoToStep={handleChangeStep}
          />
        </div>
        <div className='application-details-form card card-body col-9 col-xxl-8 order-2 p-10 d-flex flex-column h-fit-content'>
          <div className='form-wrap w-100'>
            {CurrentComponentControl && (
              <CurrentComponentControl
                config={STEP_APPLICATION[currentStep - 1].config}
                formData={formData}
                setFormData={setFormData}
                onNextStep={handleContinue}
              />
            )}
          </div>
        </div>
        <div className='d-none d-xxl-block col-xxl-2 order-0 order-xxl-3'>
          <div style={{paddingBottom: '30px'}}>
            <BackgroundCheck />
          </div>
          <div>
            <PrintOptions />
          </div>
        </div>
      </div>
    </>
  )
}
