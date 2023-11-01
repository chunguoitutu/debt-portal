import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {FC} from 'react'
import {StepItem} from '../../modules/auth'

type Props = {
  currentStep: number
  onGoToStep: (step: number) => void
  stepCompleted: number
  stepError?: number[]
  data: StepItem[]
}

const Step: FC<Props> = ({currentStep, stepCompleted, stepError, onGoToStep, data}) => {
  function handleGoToStep(step: number) {
    step <= stepCompleted && onGoToStep(step)
  }

  return (
    <div className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'>
      <div className='stepper-nav'>
        {data.map(({desc, label}, i) => {
          const status =
            currentStep === i + 1
              ? 'current'
              : i + 1 <= stepCompleted
              ? 'completed cursor-pointer'
              : ''
          return (
            <div
              className={`stepper-item ${status}`}
              data-kt-stepper-element='nav'
              onClick={() => handleGoToStep(i + 1)}
              key={i}
            >
              <div className='stepper-wrapper'>
                <div className='stepper-icon w-40px h-40px'>
                  <i className='stepper-check fas fa-check'></i>
                  <span className='stepper-number'>{i + 1}</span>
                </div>

                <div className='stepper-label'>
                  <h3 className='stepper-title text-capitalize'>
                    <span> {label}</span>
                    {stepError?.includes(i + 1) && (
                      <FontAwesomeIcon className='text-danger ms-2' icon={faTriangleExclamation} />
                    )}
                  </h3>
                  {desc && <div className='stepper-desc text-capitalize'>{desc}</div>}
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
