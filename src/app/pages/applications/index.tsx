import {FC, useMemo, useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import BackgroundCheck from './background-check/BackgroundCheck'
import Step from '../../components/step/Step'
import {STEP_APPLICATION} from '../../constants/step'
import './style.scss'
import HeaderApplication from '../../components/applications/HeaderApplication'
import {PropsStepApplication, StepItem} from '../../modules/auth'
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
  const [stepCompleted, setStepCompleted] = useState<number>(0)
  const [changeStep, setChangeStep] = useState<number | undefined>()
  const [formData, setFormData] = useState<{[key: string]: string | any[]}>(
    STEP_APPLICATION.flatMap((item) => item.config).reduce(
      (result, current) => ({
        ...result,
        [current?.key as string]: current?.defaultValue || '',
      }),
      {}
    )
  )

  const percentCompleted = useMemo(
    () => (100 / (STEP_APPLICATION.length - 1)) * stepCompleted,

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const _STEP_APPLICATION: StepItem[] = useMemo(() => {
    const lengthStep = STEP_APPLICATION.length
    return STEP_APPLICATION.map((item, i) => {
      // Last step no edit anything
      if (i + 1 === lengthStep) {
        return item
      }

      const allFieldShow = item.config || []
      const totalField = allFieldShow.length
      const fieldDone = allFieldShow.reduce((acc, item) => {
        let isDone: boolean = true

        const valueCheck = formData[item.key]

        // Check array
        if (Array.isArray(valueCheck) && !(valueCheck.length > 0)) isDone = false

        // Check string
        if (typeof valueCheck === 'string' && !valueCheck) isDone = false

        // convert boolean to return 1 or 0
        return acc + +isDone
      }, 0)

      return {
        ...item,
        desc: (
          <span>
            Has been filled out{' '}
            <span className='text-gray-900 fw-bold'>
              {fieldDone}/{totalField}
            </span>{' '}
            information fields.
          </span>
        ),
      }
    })
  }, [formData])

  return (
    <>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'New Application'}</PageTitle>
      <div className='row gx-3 gx-xl-6 gy-8'>
        <div className='col-3 col-xxl-2 order-1'>
          <Step
            data={_STEP_APPLICATION}
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
                config={STEP_APPLICATION[currentStep - 1].config || []}
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
