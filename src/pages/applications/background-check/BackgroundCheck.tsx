import {FC, useMemo, useState} from 'react'

import ContentListButton from '@/components/list-button/ContentListButton'
import RepaymentScheduleCalculator from './repayment-schedule-calculator/RepaymentScheduleCalculator'
import Icons from '@/components/icons'
import WrapperGoogleSearch from './google-search'
import {useParams} from 'react-router-dom'
import PopupValidationPhoneNumber from './validate-phone-number/PopupValidationPhoneNumber'
import MLCBReport from './MLCB/MLCBReport'
import PageCheckDeskTop from './up-page-check/PageCheck'
import request from '@/app/axios'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import Cookies from 'js-cookie'
import {PropsStepApplication} from '@/app/types'

const BackgroundCheck: FC<PropsStepApplication> = ({formik}) => {
  const [show, setShow] = useState<boolean>(false)
  const [showValidationPhone, setShowValidationPhone] = useState<boolean>(false)
  const [showMLCBReport, setShowMLCBReport] = useState<boolean>(false)
  const [showSearchCheck, setShowSearchCheck] = useState<boolean>(false)
  const [showSearchPageCheck, setShowSearchPageCheck] = useState<boolean>(false)

  const {values} = formik
  const {applicationIdEdit} = useParams()

  const fullname = useMemo(
    () => [values.firstname, values.middlename, values.lastname].filter(Boolean).join(' '),
    [values.firstname, values.middlename, values.lastname]
  )

  const configBackgroundCheck = {
    title: 'Tools',
    row: [
      {
        value: 'Google Search Check',
        icon: <Icons name={'Google'} />,
        background: '#E2E5E7',
        show: ![2, 3].includes(values.status || 0),
        onclick: () => {
          if (fullname) {
            setShowSearchCheck(true)
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
        show: ![2, 3].includes(values.status || 0),
        onclick: () => {
          if (formik.values.lastname) {
            setShowSearchPageCheck(true)
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
        show: ![2, 3].includes(values.status || 0),
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

      {
        value: 'Get MLCB Report',
        icon: <Icons name={'MLCB'} />,
        background: 'rgba(232, 255, 243, 0.85)',
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
        background: 'rgba(232, 255, 243, 0.85)',
        show: true,
        onclick: () => {
          alert('Loan Cross Check')
        },
      },
      {
        value: 'Validation Phone Number',
        icon: <Icons name={'Telephone'} />,
        show: ![2, 3].includes(values.status || 0),
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          setShowValidationPhone(true)
        },
      },

      {
        value: 'Repayment Schedule Calculator',
        icon: <Icons name={'ImgCalendar'} />,
        background: '#F8F5FF',
        show: true,
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
      {showValidationPhone && ![2, 3].includes(values.status || 0) && (
        <PopupValidationPhoneNumber onClose={() => setShowValidationPhone(false)} />
      )}
      {showMLCBReport && [1].includes(values.status || 0) && (
        <MLCBReport onClose={() => setShowMLCBReport(false)} />
      )}
      {showSearchCheck && ![2, 3].includes(values.status || 0) && (
        <WrapperGoogleSearch
          payload={fullname}
          show={showSearchCheck}
          handleClose={() => setShowSearchCheck(false)}
        />
      )}

      {showSearchPageCheck && ![2, 3].includes(values.status || 0) && (
        <PageCheckDeskTop
          payload={values.lastname}
          show={showSearchPageCheck}
          handleClose={() => setShowSearchPageCheck(false)}
        />
      )}
    </>
  )
}

export default BackgroundCheck
