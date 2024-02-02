/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTIcon} from '@/_metronic/helpers'
import request from '@/app/axios'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {PropsStepApplication} from '@/app/types'
import {ApplicationStatus} from '@/app/types/enum'
import Icons from '@/components/icons'

import {FC, useMemo, useState} from 'react'
import {useParams} from 'react-router-dom'

const HelpDrawer: FC<PropsStepApplication> = ({
  formik,
  tools,
  setTools,
  borrower_id,
  toolsCheckCount,
  setToolsCheckCount,
}) => {
  const {values} = formik
  const [show, setShow] = useState<boolean>(false)
  const [showValidationPhone, setShowValidationPhone] = useState<boolean>(false)
  const [showCaCheck, setShowCaCheck] = useState<boolean>(false)
  const [showMLCBReport, setShowMLCBReport] = useState<boolean>(false)
  const [showSearchCheck, setShowSearchCheck] = useState<boolean>(false)
  const [showSearchPageCheck, setShowSearchPageCheck] = useState<boolean>(false)
  const {applicationIdEdit} = useParams()
  const fullname = useMemo(
    () => [values.firstname, values.lastname].filter(Boolean).join(' '),
    [values.firstname, values.lastname]
  )

  const configBackgroudCheck = {
    title: 'Tools',
    row: [
      {
        value: 'Google Search Check',
        icon: <Icons name={'Google'} />,
        background: '#E2E5E7',
        show: true,
        opacity: !!tools?.Google,
        onclick: () => {
          if (fullname && !!values.identification_no) {
            if (
              !tools.Google &&
              [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED].includes(values.status || 0)
            ) {
              swalToast.fire({
                timer: 1500,
                icon: 'error',
                title: `Google Search Check no data available`,
              })
            } else {
              setShow(false)
              setShowValidationPhone(false)
              setShowMLCBReport(false)
              setShowSearchCheck(true)
              setShowCaCheck(false)
              setShowSearchPageCheck(false)
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
        show: true,
        opacity: !!tools?.UN,
        onclick: () => {
          if (formik.values.lastname && !!values.identification_no) {
            if (
              !tools.UN &&
              [ApplicationStatus.REJECTED, ApplicationStatus.APPROVED].includes(values.status || 0)
            ) {
              swalToast.fire({
                timer: 1500,
                icon: 'error',
                title: `UN Page Check no data available`,
              })
            } else {
              setShowSearchPageCheck(true)
              setShow(false)
              setShowValidationPhone(false)
              setShowCaCheck(false)

              setShowMLCBReport(false)
              setShowSearchCheck(false)
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
        background: '#E2E5E7',
        show: Number(toolsCheckCount?.MLCB) !== 0,
        opacity: !!tools?.casCheck,

        onclick: () => {
          if (fullname && !!values.identification_no) {
            if (
              !tools.casCheck &&
              [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED].includes(values.status || 0)
            ) {
              swalToast.fire({
                timer: 1500,
                icon: 'error',
                title: `CAs Check no data available`,
              })
            } else {
              setShow(false)
              setShowValidationPhone(false)
              setShowMLCBReport(false)
              setShowSearchCheck(false)
              setShowCaCheck(true)
              setShowSearchPageCheck(false)
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
        show: ![ApplicationStatus.APPROVED, ApplicationStatus.REJECTED].includes(
          values.status || 0
        ),
        opacity: Number(toolsCheckCount?.MLCB) === 0,
        onclick: () => {
          if (!!applicationIdEdit) {
            if (![ApplicationStatus.AWAITING_APPROVAL].includes(values.status || 0)) {
              swalConfirm.fire({
                icon: 'error',
                title: 'You must save all data first',
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
            } else {
              setShowCaCheck(false)
              setShow(false)
              setShowValidationPhone(false)
              setShowMLCBReport(true)
              setShowSearchCheck(false)
              setShowSearchPageCheck(false)
            }
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
        opacity: Number(toolsCheckCount?.Cross) === 0,
        show: true,
        onclick: () => {
          alert('Loan Cross Check')
        },
      },
      {
        value: 'Validation Phone Number',
        icon: <Icons name={'Telephone'} />,
        show: ![ApplicationStatus.REJECTED, ApplicationStatus.APPROVED].includes(
          values.status || 0
        ),
        opacity: Number(toolsCheckCount?.validatePhone) === 0,
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
        opacity: true,
        show: ![ApplicationStatus.REJECTED, ApplicationStatus.APPROVED].includes(
          values.status || 0
        ),
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
    ></div>
  )
}

export {HelpDrawer}
