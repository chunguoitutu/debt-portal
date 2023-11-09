import clsx from 'clsx'
import {FC} from 'react'
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileLines} from '@fortawesome/free-solid-svg-icons'
type Props = {
  labelStep?: string
  percentCompleted?: number
  info?: {[key: string]: any}
  className?: string
}

const HeaderApplication: FC<Props> = ({labelStep, percentCompleted, className, info}) => {
  console.log()
  return (
    <>
      <div
        className={clsx(['row align-items-center g-5 border-bottom border-gray-200', className])}
      >
        <div className='col-6 d-flex flex-column'>
          {info?.initialValues ? (
            <div className='border-application fs-2 w-fit-content'>
              <div className='d-flex flex-row gap-7'>
                <div
                  className='d-flex align-items-center justify-content-center rounded bg-light h-25'
                  style={{padding: 15}}
                >
                  <FontAwesomeIcon icon={faFileLines} size='2xl' color='gray' />
                </div>
                <div>
                  <span className='fs-7 fw-medium'>Application Number</span>
                  <div className='fs-2'>#{info.initialValues}</div>
                  <div className='fs-7 fw-medium'>
                    Create Date: {moment(info.initialValues.application_date).format('YYYY-MM-DD')}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='border-application fs-2 w-fit-content'>{labelStep}</div>
          )}
        </div>

        {/* Still show when percent = 0 */}
        {typeof percentCompleted === 'number' &&
          !(percentCompleted > 100) &&
          !(percentCompleted < 0) &&
          !Number.isNaN(+percentCompleted) && (
            <div className='col-6'>
              <div className='application-percent-completed d-flex flex-row align-items-center justify-content-between pb-2 gap-3'>
                <div className='fs-5 fw-semibold text-truncate'>Loan Application Completion</div>
                <div className='fs-6 fw-semibold'>{+percentCompleted.toFixed(2)}%</div>
              </div>

              {/* Process bar */}
              <div className='process'>
                <div className='process-bar'></div>
                <div
                  className='process-bar percent-completed'
                  style={{width: `${percentCompleted}%`}}
                ></div>
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default HeaderApplication
