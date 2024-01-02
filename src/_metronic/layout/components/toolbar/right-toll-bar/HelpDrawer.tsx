/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTIcon} from '@/_metronic/helpers'
import request from '@/app/axios'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import {swalToast} from '@/app/swal-notification'
import Icons from '@/components/icons'
import MobileMLCB from '@/pages/applications/background-check/MLCB/MobileMLCB'
import MobileGoogleSearch from '@/pages/applications/background-check/google-search/MobileGoogleSearch'
import MobileRepayment from '@/pages/applications/background-check/repayment-schedule-calculator/MobileRepayment'
import MobilePageCheck from '@/pages/applications/background-check/up-page-check/MobilePageCheck'
import MobileValidationPhoneNumber from '@/pages/applications/background-check/validate-phone-number/MobileValidationPhone'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const HelpDrawer = () => {
  const [show, setShow] = useState<boolean>(false)
  const [showValidationPhone, setShowValidationPhone] = useState<boolean>(false)
  const [data, setData] = useState<any>({})
  const [showMLCBReport, setShowMLCBReport] = useState<boolean>(false)
  const [showSearchCheck, setShowSearchCheck] = useState<boolean>(false)
  const [showSearchPageCheck, setShowSearchPageCheck] = useState<boolean>(false)
  const [checkPending, setCheckPending] = useState(0)
  const {applicationIdEdit} = useParams()

  useEffect(() => {
    if (!applicationIdEdit) return

    request.get(`/application/detail/${applicationIdEdit}`).then((res) => {
      setData(res?.data?.data)
      setCheckPending(Number(res?.data?.data?.application?.status))
    })
  }, [applicationIdEdit])

  const configBackgroudCheck = {
    title: 'Tools',
    row: [
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
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        show: checkPending === 1,
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          setShow(false)
          setShowValidationPhone(true)
          setShowMLCBReport(false)
          setShowSearchCheck(false)
          setShowSearchPageCheck(false)
        },
      },
      {
        value: 'Get MLCB Report',
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        background: 'rgba(232, 255, 243, 0.85)',
        show: checkPending === 1,
        onclick: () => {
          setShow(false)
          setShowValidationPhone(false)
          setShowMLCBReport(true)
          setShowSearchCheck(false)
          setShowSearchPageCheck(false)
        },
      },
      {
        value: 'Google Search Check',
        icon: <Icons name={'GoogleCheck'} />,
        background: '#E2E5E7',
        show: checkPending === 1,
        onclick: () => {
          setShow(false)
          setShowValidationPhone(false)
          setShowMLCBReport(false)
          setShowSearchCheck(true)
          setShowSearchPageCheck(false)
        },
      },
      {
        value: 'UN Page Check',
        icon: <Icons name={'GoogleCheck'} />,
        background: '#E2E5E7',
        show: !!applicationIdEdit && data.application?.status === 1,
        onclick: () => {
          setShowSearchPageCheck(true)
          setShow(false)
          setShowValidationPhone(false)
          setShowMLCBReport(false)
          setShowSearchCheck(false)
        },
      },
      {
        value: 'CAs Check',
        icon: <Icons name={'GoogleCheck'} />,
        background: '#E2E5E7',
        show: !!applicationIdEdit && data.application?.status === 1,
        onclick: () => {
          request
            .post('/pdf/ca-check', {})
            .then((data) => {
              if (data?.data?.pdf) {
                fetch(`data:application/pdf;base64,${data?.data?.pdf}`)
                  .then((response) => response.blob())
                  .then((blob) => {
                    const blobUrl = URL.createObjectURL(blob)

                    window.open(blobUrl, '_blank')
                  })
                  .catch(() => {
                    swalToast.fire({
                      icon: 'error',
                      title: DEFAULT_MSG_ERROR,
                    })
                  })
              }
            })
            .catch((e) => {
              swalToast.fire({
                timer: 1500,
                icon: 'error',
                title: `System error, please try again in a few minutes`,
              })
            })
            .finally(() => {})
        },
      },
    ],
  }
  return (
    <div
      id='kt_help'
      style={{
        width:
          show || showValidationPhone || showMLCBReport || showSearchCheck || showSearchPageCheck
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
        {show && <MobileRepayment handleShow={() => setShow(false)} />}
        {showSearchCheck && (
          <MobileGoogleSearch
            payload={`${data.customer?.firstname} ${data.customer?.middlename}${
              !!data.customer?.middlename ? ' ' : ''
            }${data.customer?.lastname}`}
            handleShow={() => setShowSearchCheck(false)}
          />
        )}
        {showValidationPhone && (
          <MobileValidationPhoneNumber handleShow={() => setShowValidationPhone(false)} />
        )}
        {showMLCBReport && <MobileMLCB handleShow={() => setShowMLCBReport(false)} />}
        {showSearchPageCheck && (
          <MobilePageCheck
            payload={`${data.customer?.lastname}`}
            handleShow={() => setShowSearchPageCheck(false)}
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
                 bg-transparent d-flex justify-content-center align-items-center flex-shrink-0`}
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
