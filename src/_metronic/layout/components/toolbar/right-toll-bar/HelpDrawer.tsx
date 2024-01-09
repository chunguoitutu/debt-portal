/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTIcon} from '@/_metronic/helpers'
import request from '@/app/axios'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {PropsStepApplication} from '@/app/types'
import Icons from '@/components/icons'
import MobileMLCB from '@/pages/applications/background-check/MLCB/MobileMLCB'
import MobileCaCheck from '@/pages/applications/background-check/ca-check/MobileCaCheck'
import MobileGoogleSearch from '@/pages/applications/background-check/google-search/MobileGoogleSearch'
import MobileRepayment from '@/pages/applications/background-check/repayment-schedule-calculator/MobileRepayment'
import MobilePageCheck from '@/pages/applications/background-check/up-page-check/MobilePageCheck'
import MobileValidationPhoneNumber from '@/pages/applications/background-check/validate-phone-number/MobileValidationPhone'
import {FC, useMemo, useState} from 'react'
import {useParams} from 'react-router-dom'

const HelpDrawer: FC<PropsStepApplication> = ({formik}) => {
  const {values} = formik
  const [show, setShow] = useState<boolean>(false)
  const [showValidationPhone, setShowValidationPhone] = useState<boolean>(false)
  const [showCaCheck, setShowCaCheck] = useState<boolean>(false)
  const [showMLCBReport, setShowMLCBReport] = useState<boolean>(false)
  const [showSearchCheck, setShowSearchCheck] = useState<boolean>(false)
  const [showSearchPageCheck, setShowSearchPageCheck] = useState<boolean>(false)
  const {applicationIdEdit} = useParams()
  const fullname = useMemo(
    () => [values.firstname, values.middlename, values.lastname].filter(Boolean).join(' '),
    [values.firstname, values.middlename, values.lastname]
  )
  const configBackgroudCheck = {
    title: 'Tools',
    row: [
      {
        value: 'Google Search Check',
        icon: <Icons name={'Google'} />,
        background: '#E2E5E7',
        show: true,
        onclick: () => {
          if (fullname && !!values.identification_no) {
            setShow(false)
            setShowValidationPhone(false)
            setShowMLCBReport(false)
            setShowSearchCheck(true)
            setShowCaCheck(false)
            setShowSearchPageCheck(false)
          } else {
            swalConfirm.fire({
              icon: 'error',
              title: 'You must complete entering Personal Information',
              showCancelButton: false,
              confirmButtonText: 'OK',
              customClass: {
                popup: 'm-w-300px',
                htmlContainer: 'fs-3',
                cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
                confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
                actions: 'd-flex justify-content-center w-100 ',
              },
            })
          }
        },
      },
      {
        value: 'UN Page Check',
        icon: <Icons name={'UPCheck'} />,
        background: '#E2E5E7',
        show: true,
        onclick: () => {
          if (formik.values.lastname && !!values.identification_no) {
            setShowSearchPageCheck(true)
            setShow(false)
            setShowValidationPhone(false)
            setShowCaCheck(false)

            setShowMLCBReport(false)
            setShowSearchCheck(false)
          } else {
            swalConfirm.fire({
              icon: 'error',
              title: 'You must complete entering Personal Information',
              showCancelButton: false,
              confirmButtonText: 'OK',
              customClass: {
                popup: 'm-w-300px',
                htmlContainer: 'fs-3',
                cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
                confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
                actions: 'd-flex justify-content-center w-100 ',
              },
            })
          }
        },
      },
      {
        value: 'CAs Check',
        icon: <Icons name={'Cascheck'} />,
        background: '#E2E5E7',
        show: true,
        onclick: () => {
          if (fullname && !!values.identification_no) {
            setShow(false)
            setShowValidationPhone(false)
            setShowMLCBReport(false)
            setShowSearchCheck(false)
            setShowCaCheck(true)
            setShowSearchPageCheck(false)
          } else {
            swalConfirm.fire({
              icon: 'error',
              title: 'You must complete entering Personal Information',
              showCancelButton: false,
              confirmButtonText: 'OK',
              customClass: {
                popup: 'm-w-300px',
                htmlContainer: 'fs-3',
                cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
                confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
                actions: 'd-flex justify-content-center w-100 ',
              },
            })
          }
        },
      },
      {
        value: 'Get MLCB Report',
        icon: <Icons name={'MLCB'} />,
        background: 'rgba(232, 255, 243, 0.85)',
        show: [1].includes(values.status || 0),
        onclick: () => {
          if (!!applicationIdEdit) {
            setShowCaCheck(false)

            setShow(false)
            setShowValidationPhone(false)
            setShowMLCBReport(true)
            setShowSearchCheck(false)
            setShowSearchPageCheck(false)
          } else {
            swalConfirm.fire({
              icon: 'error',
              title: 'You must fill out all forms',
              showCancelButton: false,
              confirmButtonText: 'OK',
              customClass: {
                popup: 'm-w-300px',
                htmlContainer: 'fs-3',
                cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
                confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
                actions: 'd-flex justify-content-center w-100 ',
              },
            })
          }
        },
      },
      {
        value: 'Loan Cross Check',
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        background: 'rgba(232, 255, 243, 0.85)',
        show: true,
        onclick: () => {
          alert('Loan Cross Check')
        },
      },
      {
        value: 'Validation Phone Number',
        icon: <Icons name={'Telephone'} />,
        show: true,
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          if (!!values.mobilephone_1) {
            setShow(false)
            setShowValidationPhone(true)
            setShowMLCBReport(false)
            setShowCaCheck(false)
            setShowSearchCheck(false)
            setShowSearchPageCheck(false)
          } else {
            swalConfirm.fire({
              icon: 'error',
              title: 'You must complete entering Contact Information',
              showCancelButton: false,
              confirmButtonText: 'OK',
              customClass: {
                popup: 'm-w-300px',
                htmlContainer: 'fs-3',
                cancelButton: 'btn btn-lg order-0 fs-5 btn-secondary m-8px',
                confirmButton: 'order-1 fs-5 btn btn-lg btn-primary m-8px',
                actions: 'd-flex justify-content-center w-100 ',
              },
            })
          }
        },
      },
      {
        value: 'Repayment Schedule Calculator',
        icon: <Icons name={'ImgCalendar'} />,
        background: '#F8F5FF',
        show: true,
        onclick: () => {
          setShow(true)
          setShowValidationPhone(false)
          setShowMLCBReport(false)
          setShowSearchCheck(false)
          setShowSearchPageCheck(false)
        },
      },
    ],
  }
  return (
    <div
      id='kt_help'
      style={{
        width:
          show ||
          showValidationPhone ||
          showMLCBReport ||
          showSearchCheck ||
          showSearchPageCheck ||
          showCaCheck
            ? '100%'
            : '350px',
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
      <div className='d-flex w-100'>
        {show && true && <MobileRepayment handleShow={() => setShow(false)} />}
        {showSearchCheck && true && (
          <MobileGoogleSearch
            status={[2, 3].includes(values.status || 0)}
            Nric_no={values.identification_no}
            payload={fullname}
            handleShow={() => setShowSearchCheck(false)}
          />
        )}
        {showValidationPhone && true && (
          <MobileValidationPhoneNumber
            payload={+values.mobilephone_1}
            handleShow={() => setShowValidationPhone(false)}
          />
        )}
        {showMLCBReport && [1].includes(values.status || 0) && (
          <MobileMLCB handleShow={() => setShowMLCBReport(false)} />
        )}
        {showSearchPageCheck && true && (
          <MobilePageCheck
            status={[2, 3].includes(values.status || 0)}
            Nric_no={values.identification_no}
            payload={values.lastname}
            handleShow={() => setShowSearchPageCheck(false)}
          />
        )}
        {showCaCheck && true && (
          <MobileCaCheck
            status={[2, 3].includes(values.status || 0)}
            Nric_no={values.identification_no}
            payload={fullname}
            handleShow={() => setShowCaCheck(false)}
          />
        )}
        <div className='card shadow-none rounded-0 w-350px flex-shrink-0'>
          <div
            className=' p-30px d-flex justify-content-between align-items-center'
            style={{
              border: '1px solid #F1F1F2',
            }}
          >
            <h5 className='font-bold fs-20 text-gray-900 m-0'>Background Check</h5>

            <div className='card-toolbar'>
              <button
                onClick={() => {
                  setShow(false)
                  setShowValidationPhone(false)
                  setShowMLCBReport(false)
                  setShowSearchCheck(false)
                  setShowCaCheck(false)
                  setShowSearchPageCheck(false)
                }}
                type='button'
                className='btn btn-sm btn-icon explore-btn-dismiss '
                id='kt_help_close'
              >
                <KTIcon iconName='cross' className='fs-2' />
              </button>
            </div>
          </div>
          <div style={{maxHeight: 'calc(100vh - 100px)', overflowY: 'auto'}} className='p-30px'>
            {configBackgroudCheck?.row.map((data, index) => (
              <div className='m-0 p-0' key={index}>
                {!!data?.show && (
                  <>
                    <button
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
                d-flex justify-content-center align-items-center flex-shrink-0`}
                      >
                        {data.icon}
                      </span>
                      <span className='text-gray-700 text-start fw-semibold fs-14'>
                        {data.value}
                      </span>
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export {HelpDrawer}
