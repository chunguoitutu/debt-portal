/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTIcon} from '../../../_metronic/helpers'
import {Dropdown1} from '../../../_metronic/partials/content/dropdown/Dropdown1'

type Props = {
  className: string
}

const UserTask: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className} custom-w`} style={{width: '99%'}}>
      <div className='card-header align-items-center border-0 mt-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bold mb-2 text-dark'>Activities</span>
          <span className='text-muted fw-semibold fs-7'>Assigned to Me</span>
        </h3>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-2' />
          </button>
          <Dropdown1 />
        </div>
      </div>
      <div className='card-body pt-5'>
        <div className='timeline-label'>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>08:42</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-warning fs-1'></i>
            </div>
            <div className='fw-mormal timeline-content text-muted ps-3'>
              Outlines keep you honest. And keep structure
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>10:00</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-success fs-1'></i>
            </div>
            <div className='timeline-content d-flex'>
              <span className='fw-bold text-gray-800 ps-3'>Internal meeting</span>
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>14:37</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            <div className='timeline-content fw-bold text-gray-800 ps-3'>
              Make deposit
              <a href='#' className='text-primary'>
                {' '}
                USD 700
              </a>
              . to ESL
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>16:50</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-primary fs-1'></i>
            </div>
            <div className='timeline-content fw-mormal text-muted ps-3'>
              Approval application
              <a href='/application' className='text-primary'>
                {' '}
                A-CO-2024-00018
              </a>
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>21:03</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            <div className='timeline-content fw-semibold text-gray-800 ps-3'>
              New application submitted
              <a href='/application/listing' className='text-primary'>
                {''} A-CO-2024-00020
              </a>
              .
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>16:50</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-primary fs-1'></i>
            </div>
            <div className='timeline-content fw-mormal text-muted ps-3'>
              Reject application
              <a href='/application' className='text-primary'>
                {' '}
                A-CO-2024-00016
              </a>
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>21:03</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            <div className='timeline-content fw-semibold text-gray-800 ps-3'>
              New application submitted
              <a href='/application/listing' className='text-primary'>
                {''} A-CO-2024-00021
              </a>
              .
            </div>
          </div>
          <div className='timeline-item'>
            <div className='timeline-label fw-bold text-gray-800 fs-6'>10:30</div>
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-success fs-1'></i>
            </div>
            <div className='timeline-content fw-mormal text-muted ps-3'>
              Finance KPI Mobile app launch preparion meeting
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {UserTask}
