import {useEffect, useState} from 'react'

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
interface props {
  data: any
}
const BackgroundCheck = ({data}: props) => {
  const [show, setShow] = useState<boolean>(false)
  const [showValidationPhone, setShowValidationPhone] = useState<boolean>(false)
  const [dataCookie, setDataCookie] = useState<any>({})
  const [showMLCBReport, setShowMLCBReport] = useState<boolean>(false)
  const [showSearchCheck, setShowSearchCheck] = useState<boolean>(false)
  const [showSearchPageCheck, setShowSearchPageCheck] = useState<boolean>(false)

  const {applicationIdEdit} = useParams()

  useEffect(() => {
    try {
      const cookie: any = Cookies.get('createAplication')
      setDataCookie(JSON.parse(cookie || ''))
    } catch (error) {
      setDataCookie({})
    }
  }, [Cookies.get('createAplication')])

  const configBackgroudCheck = {
    title: 'Tools',
    row: [
      {
        value: 'Google Search Check',
        icon: <Icons name={'GoogleCheck'} />,
        background: '#E2E5E7',
        show: ![2, 3].includes(
          !!data.application?.status ? data?.application?.status : dataCookie?.application?.status
        ),
        onclick: () => {
          if (
            (!!data?.customer?.lastname || !!dataCookie?.customer?.lastname) &&
            (!!data?.customer?.firstname || !!dataCookie?.customer?.firstname)
          ) {
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
        icon: <Icons name={'GoogleCheck'} />,
        background: '#E2E5E7',
        show: ![2, 3].includes(
          !!data?.application?.status ? data?.application?.status : dataCookie?.application?.status
        ),
        onclick: () => {
          if (!!data?.customer?.lastname || !!dataCookie?.customer?.lastname) {
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
        icon: <Icons name={'GoogleCheck'} />,
        background: '#E2E5E7',
        show: ![2, 3].includes(
          !!data?.application?.status ? data?.application?.status : dataCookie?.application?.status
        ),
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
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        background: 'rgba(232, 255, 243, 0.85)',
        show: ![2, 3].includes(
          !!data?.application?.status ? data?.application?.status : dataCookie?.application?.status
        ),
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
        value: 'Validation Phone Number',
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        show: ![2, 3].includes(
          !!data?.application?.status ? data?.application?.status : dataCookie?.application?.status
        ),
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          setShowValidationPhone(true)
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
      <ContentListButton config={configBackgroudCheck} />
      {show && <RepaymentScheduleCalculator show={show} handleClose={() => setShow(false)} />}
      {showValidationPhone &&
        ![2, 3].includes(
          !!data?.application?.status ? data?.application?.status : dataCookie?.application?.status
        ) && <PopupValidationPhoneNumber onClose={() => setShowValidationPhone(false)} />}
      {showMLCBReport &&
        ![2, 3].includes(
          !!data?.application?.status ? data.application?.status : dataCookie?.application?.status
        ) && <MLCBReport onClose={() => setShowMLCBReport(false)} />}
      {showSearchCheck &&
        ![2, 3].includes(
          !!data.application?.status ? data.application?.status : dataCookie?.application?.status
        ) && (
          <WrapperGoogleSearch
            payload={`${
              !!data?.customer?.firstname
                ? data?.customer?.firstname
                : dataCookie?.customer?.firstname
            } ${
              !!data?.customer?.middlename
                ? data?.customer?.middlename
                : dataCookie?.customer?.middlename
            }${!!data?.customer?.middlename || dataCookie?.customer?.middlename ? ' ' : ''}${
              !!data?.customer?.lastname ? data?.customer?.lastname : dataCookie?.customer?.lastname
            }`}
            show={showSearchCheck}
            handleClose={() => setShowSearchCheck(false)}
          />
        )}

      {showSearchPageCheck &&
        ![2, 3].includes(
          !!data?.application?.status ? data?.application?.status : dataCookie?.application?.status
        ) && (
          <PageCheckDeskTop
            payload={`${
              !!data?.customer?.lastname ? data?.customer?.lastname : dataCookie?.customer?.lastname
            }`}
            show={showSearchPageCheck}
            handleClose={() => setShowSearchPageCheck(false)}
          />
        )}
    </>
  )
}

export default BackgroundCheck
