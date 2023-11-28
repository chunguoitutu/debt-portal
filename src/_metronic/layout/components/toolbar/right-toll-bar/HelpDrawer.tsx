/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTIcon} from '@/_metronic/helpers'
import Icons from '@/components/icons'
import Repayment from '@/pages/applications/background-check/repayment-schedule-calculator/Repayment'
import {useState} from 'react'

const HelpDrawer = () => {
  const [show, setShow] = useState<boolean>(false)

  const configBackgroudCheck = {
    title: 'Background check',
    row: [
      {
        value: 'Repayment Schedule Calculator',
        icon: <Icons name={'ImgCalendar'} />,
        background: '#F8F5FF',
        onclick: () => {
          setShow(!show)
        },
      },
      {
        value: 'Loan Cross Check',
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          alert('Loan Cross Check')
        },
      },
    ],
  }
  return (
    <div
      id='kt_help'
      style={{
        width: show ? '100%' : '350px',
      }}
      className='bg-body  d'
      data-kt-drawer='true'
      data-kt-drawer-name='help'
      data-kt-drawer-activate='true'
      data-kt-drawer-overlay='true'
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_help_toggle'
      data-kt-drawer-close='#kt_help_close'
    >
      {/* begin::Card */}
      <div className='d-flex w-100'>
        {show && (
          <div className='w-100'>
            <div
              className=' p-30px d-flex justify-content-between align-items-center'
              style={{
                borderBottom: '1px solid #F1F1F2',
                height: '98px',
              }}
            >
              <h5 className='font-bold fs-20 text-gray-900 m-0'>Repayment Schedule Calculator</h5>
              <button
                type='button'
                className='btn btn-sm btn-icon explore-btn-dismiss '
                onClick={() => setShow(!show)}
              >
                <KTIcon iconName='cross' className='fs-2' />
              </button>
            </div>
            <Repayment handleClose={() => setShow(!show)} mobile={true} />
          </div>
        )}
        <div className='card shadow-none rounded-0 w-350px flex-shrink-0'>
          {/* begin::Header */}
          <div
            className=' p-30px d-flex justify-content-between align-items-center'
            style={{
              border: '1px solid #F1F1F2',
            }}
          >
            <h5 className='font-bold fs-20 text-gray-900 m-0'>Background Check</h5>

            <div className='card-toolbar'>
              <button
                type='button'
                className='btn btn-sm btn-icon explore-btn-dismiss '
                id='kt_help_close'
              >
                <KTIcon iconName='cross' className='fs-2' />
              </button>
            </div>
          </div>
          <div className='p-30px'>
            {configBackgroudCheck?.row.map((data, index) => (
              <button
                key={index}
                className={`py-12px px-4px
               bg-transparent d-flex justify-content-center align-items-center`}
                onClick={data.onclick}
                style={{
                  border: 'none',
                }}
              >
                <span
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    background: data?.background,
                  }}
                  className={`
                  h-48px w-48px me-5
                 bg-transparent d-flex justify-content-center align-items-center flex-shrink-0`}
                >
                  {data.icon}
                </span>
                <span className='text-gray-700 text-start fw-semibold fs-14'>{data.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export {HelpDrawer}
