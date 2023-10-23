import {useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import BackgroundCheck from './backgroundCheck'
import PrintOptions from './PrintOptions'
import StepApplication from './step/StepApplication'

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
  const [currentStep, setCurrentStep] = useState<number>(4)
  const [stepCompleted, setStepCompleted] = useState<number>(5)

  function handleChangeStep(step: number) {
    setCurrentStep(step)
  }

  return (
    <>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'New Application'}</PageTitle>
      <div className='d-flex flex-row'>
        <div className='border-4' style={{flex: '0 0 20%'}}>
          <StepApplication
            stepError={[1, 2]}
            stepCompleted={stepCompleted}
            currentStep={currentStep}
            onGoToStep={handleChangeStep}
          />
        </div>
        <div className='border-4' style={{flex: '0 0 60%'}}>
          <span>row 2</span>
        </div>
        <div className='border-4' style={{flex: '0 0 20%'}}>
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
