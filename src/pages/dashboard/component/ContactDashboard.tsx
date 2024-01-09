/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

type Props = {
  className: string
  description: string
  icon: boolean
  stats: number
  labelColor: string
  textColor: string
}

const items: Array<{
  name: string
  initials?: string
  src?: string
  state?: string
}> = [
  {name: 'Alan Warden', initials: 'C', state: 'warning'},
  {name: 'Melody Macy', src: toAbsoluteUrl('/media/avatars/300-2.jpg')},
  {name: 'Susan Redwood', initials: 'R', state: 'primary'},
  {name: 'Michael Eberon', src: toAbsoluteUrl('/media/avatars/300-11.jpg')},
  {name: 'Perry Matthew', initials: 'P', state: 'danger'},
  {name: 'Barry Walter', src: toAbsoluteUrl('/media/avatars/300-12.jpg')},
]

const ContactDashBoard = ({className, description, icon, stats, labelColor, textColor}: Props) => (
  <div className={`card card-flush ${className}`}>
    <div className='card-header pt-5'>
      <div className='card-title d-flex flex-column'>
        <div className='card-title d-flex flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Contact Another Staff</span>
          <span className='text-gray-600 pt-1 fw-semibold fs-6'>Information</span>
        </div>
      </div>
    </div>
    <div className='card-body d-flex flex-column justify-content-end pe-0'>
      <span className='fs-6 fw-bolder text-gray-800 d-block mb-2'>Manager</span>
      <div className='symbol-group symbol-hover flex-nowrap'>
        {items.map((item, index) => (
          <div
            className='symbol symbol-35px symbol-circle'
            data-bs-toggle='tooltip'
            title={item.name}
            key={`cw7-item-${index}`}
          >
            {item.src && <img alt='Pic' src={item.src} />}
            {item.state && item.initials && (
              <span
                className={clsx(
                  'symbol-label fw-bold',
                  'bg-' + item.state,
                  'text-inverse-' + item.state
                )}
              >
                {item.initials}
              </span>
            )}
          </div>
        ))}

        <a href='#' className='symbol symbol-35px symbol-circle'>
          <span
            className={clsx('symbol-label fs-8 fw-bold', 'bg-' + labelColor, 'text-' + textColor)}
          >
            +42
          </span>
        </a>
      </div>
      <span className='fs-6 fw-bolder text-gray-800 d-block mb-2 mb-4'>Argent</span>
      <div className='symbol-group symbol-hover flex-nowrap'>
        {items.map((item, index) => (
          <div
            className='symbol symbol-35px symbol-circle'
            data-bs-toggle='tooltip'
            title={item.name}
            key={`cw7-item-${index}`}
          >
            {item.src && <img alt='Pic' src={item.src} />}
            {item.state && item.initials && (
              <span
                className={clsx(
                  'symbol-label fw-bold',
                  'bg-' + item.state,
                  'text-inverse-' + item.state
                )}
              >
                {item.initials}
              </span>
            )}
          </div>
        ))}

        <a href='#' className='symbol symbol-35px symbol-circle'>
          <span
            className={clsx('symbol-label fs-8 fw-bold', 'bg-' + labelColor, 'text-' + textColor)}
          >
            +42
          </span>
        </a>
      </div>
    </div>
  </div>
)
export {ContactDashBoard}
