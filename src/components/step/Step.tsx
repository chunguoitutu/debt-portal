import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {StepItem} from '@/app/types'
import {FC} from 'react'
import clsx from 'clsx'

type Props = {
  currentStep: number
  onGoToStep: (step: number) => void
  stepCompleted: number
  stepError?: number[]
  data: StepItem[]
  className?: string
  classNameLabel?: string
}

const Step: FC<Props> = ({
  currentStep,
  stepCompleted,
  stepError,
  onGoToStep,
  data,
  className,
  classNameLabel,
}) => {
  function handleGoToStep(step: number) {
    step <= stepCompleted + 1 && onGoToStep(step)
  }

  return (
    <div className='stepper stepper-pills stepper-column'>
      <div className={clsx(['stepper-nav w-100', className])}>
        {data.map(({desc, label}, i) => {
          const status =
            currentStep === i + 1
              ? 'current'
              : i + 1 <= stepCompleted + 1
              ? 'completed cursor-pointer'
              : ''

          return (
            <div
              className={clsx(['stepper-item', status])}
              data-kt-stepper-element='nav'
              onClick={() => handleGoToStep(i + 1)}
              key={i}
            >
              <div className='stepper-wrapper w-100 d-flex align-items-center'>
                <div className='stepper-icon w-40px h-40px me-16px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>{i + 1}</span>
                </div>

                <div className='stepper-label w-fit-content'>
                  <h3 className='stepper-title text-capitalize'>
                    <span
                      className={clsx([
                        currentStep === i + 1 ? 'text-gray-900' : 'text-gray-600',
                        classNameLabel,
                      ])}
                    >
                      {label}
                    </span>
                    {stepError?.includes(i + 1) && (
                      <FontAwesomeIcon className='text-danger ms-2' icon={faTriangleExclamation} />
                    )}
                  </h3>
                  {desc && (
                    <div className='text-capitalize fs-12 fw-semibold text-B5B5C3 min-w-250px min-w-xxl-auto'>
                      {desc}
                    </div>
                  )}
                </div>
              </div>

              {data.length !== i + 1 && <div className='stepper-line h-40px'></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Step
