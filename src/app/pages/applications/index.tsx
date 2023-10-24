import {useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import ApplicationsDetails from './applications-details/ApplicationsDetails'

import BackgroundCheck from './background-check/BackgroundCheck'
import PrintOptions from './print-options/PrintOptions'
import Step from '../../components/step/Step'
import {STEP_APPLICATION} from '../../constants/step'

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
  const [stepCompleted] = useState<number>(5)

  function handleChangeStep(step: number) {
    setCurrentStep(step)
  }

  return (
    <>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'New Application'}</PageTitle>
      <div className='row gx-3 gx-xl-6 gy-8'>
        <div className='col-3 col-xxl-2 order-1'>
          <Step
            data={STEP_APPLICATION}
            stepError={[1, 2]}
            stepCompleted={stepCompleted}
            currentStep={currentStep}
            onGoToStep={handleChangeStep}
          />
        </div>
        <div className='col-9 col-xxl-8 order-2'>
          <ApplicationsDetails />
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
