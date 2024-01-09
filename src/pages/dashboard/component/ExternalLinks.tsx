/* eslint-disable jsx-a11y/anchor-is-valid */
import {Fragment} from 'react'
import {KTIcon} from '../../../_metronic/helpers'

type Props = {
  className: string
}

const rows: Array<{description: string}> = [
  {description: 'Avg. Client Rating'},
  {description: 'Instagram Followers'},
  {description: 'Google Ads CPC'},
]

const ExternalLinks = ({className}: Props) => (
  <div className={`card card-flush ${className}`}>
    <div className='card-header pt-5'>
      <h3 className='card-title text-gray-800 fw-bold'>External Links</h3>
      <div className='card-toolbar'></div>
    </div>
    <div className='card-body pt-5'>
      {rows.map((row, index) => (
        <Fragment key={`lw26-rows-${index}`}>
          <div className='d-flex flex-stack'>
            <a href='https://monetiumcredit.com.sg/' className='text-primary fw-semibold fs-6 me-2'>
              Monetium Credit
            </a>
            <button
              type='button'
              className='btn btn-icon btn-sm h-auto btn-color-gray-400 btn-active-color-primary justify-content-end'
            >
              <KTIcon iconName='exit-right-corner' className='fs-2' />
            </button>
          </div>
          {rows.length - 1 > index && <div className='separator separator-dashed my-3' />}
        </Fragment>
      ))}
    </div>
  </div>
)
export {ExternalLinks}
