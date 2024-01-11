import {FC, useMemo, useState} from 'react'

import ContentListButton from '@/components/list-button/ContentListButton'
import RepaymentScheduleCalculator from './repayment-schedule-calculator/RepaymentScheduleCalculator'
import Icons from '@/components/icons'
import WrapperGoogleSearch from './google-search'
import {useParams} from 'react-router-dom'
import PopupValidationPhoneNumber from './validate-phone-number/PopupValidationPhoneNumber'
import MLCBReport from './MLCB/MLCBReport'
import PageCheckDeskTop from './up-page-check/PageCheck'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {PropsStepApplication} from '@/app/types'
import CaCheckDeskTop from './ca-check/DesktopCaCheck'

const BackgroundCheck: FC<PropsStepApplication> = ({formik, tools, setTools, borrower_id}) => {
  const [show, setShow] = useState<boolean>(false)
  const [showValidationPhone, setShowValidationPhone] = useState<boolean>(false)
  const [showMLCBReport, setShowMLCBReport] = useState<boolean>(false)
  const [showSearchCheck, setShowSearchCheck] = useState<boolean>(false)
  const [showCaCheck, setShowCaCheck] = useState<boolean>(false)

  const [showSearchPageCheck, setShowSearchPageCheck] = useState<boolean>(false)

  const {values} = formik
  const {applicationIdEdit} = useParams()

  const fullname = useMemo(
    () => [values.firstname, values.lastname].filter(Boolean).join(' '),
    [values.firstname, values.lastname]
  )

  const configBackgroundCheck = {
    title: 'Tools',
    row: [
      {
        value: 'Google Search Check',
        icon: <Icons name={'Google'} />,
        background: '#E2E5E7',
        opacity: !!tools?.googleSearchCheck,
        show: true,
        onclick: () => {
          if (fullname && !!values.identification_no) {
            if (!tools.googleSearchCheck) {
              swalToast.fire({
                timer: 1500,
                icon: 'error',
                title: `Google Search Check no data available`,
              })
            } else {
              setShowSearchCheck(true)
            }
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
        opacity: !!tools?.upPageCheck,
        show: true,
        onclick: () => {
          if (formik.values.lastname && !!values.identification_no) {
            if (!tools.upPageCheck) {
              swalToast.fire({
                timer: 1500,
                icon: 'error',
                title: `UN Page Check no data available`,
              })
            } else {
              setShowSearchPageCheck(true)
            }
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
        opacity: !!tools?.casCheck,
        background: '#E2E5E7',
        show: true,
        onclick: () => {
          if (fullname && !!values.identification_no) {
            if (!tools.casCheck) {
              swalToast.fire({
                timer: 1500,
                icon: 'error',
                title: `CAs Check no data available`,
              })
            } else {
              setShowCaCheck(true)
            }
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
        opacity: true,
        show: [1].includes(values.status || 0),
        onclick: () => {
          if (!!applicationIdEdit) {
            setShowMLCBReport(true)
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
        opacity: true,
        background: 'rgba(232, 255, 243, 0.85)',
        show: true,
        onclick: () => {
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `Loan Cross Check no data available`,
          })
        },
      },
      {
        value: 'Validation Phone Number',
        icon: <Icons name={'Telephone'} />,
        show: ![2, 3].includes(values.status || 0),
        opacity: true,
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          if (!!values.mobilephone_1) {
            setShowValidationPhone(true)
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
        opacity: true,
        show: ![2, 3].includes(values.status || 0),
        onclick: () => {
          setShow(true)
        },
      },
    ],
  }

  return (
    <>
      <ContentListButton config={configBackgroundCheck} />
      {show && <RepaymentScheduleCalculator show={show} handleClose={() => setShow(false)} />}
      {showValidationPhone && true && (
        <PopupValidationPhoneNumber
          payload={Number(values.mobilephone_1)}
          onClose={() => setShowValidationPhone(false)}
        />
      )}
      {showMLCBReport && [1].includes(values.status || 0) && (
        <MLCBReport onClose={() => setShowMLCBReport(false)} />
      )}
      {showSearchCheck && true && (
        <WrapperGoogleSearch
          borrower_id={borrower_id || 0}
          tools={tools}
          setTools={setTools}
          status={[2, 3].includes(values.status || 0)}
          payload={fullname}
          Nric_no={values.identification_no}
          show={showSearchCheck}
          handleClose={() => setShowSearchCheck(false)}
        />
      )}

      {showSearchPageCheck && true && (
        <PageCheckDeskTop
          tools={tools}
          borrower_id={borrower_id || 0}
          setTools={setTools}
          Nric_no={values.identification_no}
          status={[2, 3].includes(values.status || 0)}
          payload={values.lastname}
          show={showSearchPageCheck}
          handleClose={() => setShowSearchPageCheck(false)}
        />
      )}
      {showCaCheck && true && (
        <CaCheckDeskTop
          tools={tools}
          borrower_id={borrower_id || 0}
          setTools={setTools}
          Nric_no={values.identification_no}
          status={[2, 3].includes(values.status || 0)}
          payload={fullname}
          show={showCaCheck}
          handleClose={() => setShowCaCheck(false)}
        />
      )}
    </>
  )
}

export default BackgroundCheck
