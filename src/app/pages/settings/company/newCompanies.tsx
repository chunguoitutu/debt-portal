/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'

import * as Yup from 'yup'
import {useFormik} from 'formik'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Input} from '../../../inputs/input'
import Select from '../../../selects/select'
import InputCheck from '../../../inputs/inputCheck'
import {KTIcon} from '../../../../_metronic/helpers'
import {InputTime} from '../../../inputs/inputTime'
import axios from 'axios'
import {REACT_APP_BASE_URL_API} from '../../../modules/auth/core/_requests'
import moment from 'moment'
import {swalToast} from '../../../swal-notification'
import request from '../../../axios'

type Props = {
  setLoadApi: any
  loadapi: boolean
  data?: any
  show: boolean
  titleLable?: string
  handleClose: () => void
}

const numberAllowDotRegex = /^[0-9.]+$/
function handleKeyPress(e: any) {
  e = e || window.event
  const charCode = typeof e.which == 'undefined' ? e.keyCode : e.which
  const charStr = String.fromCharCode(charCode)
  const dotInvalid = true
    ? charStr === '.' && true
    : e.target.value.includes('.') && charStr === '.'
  ;(dotInvalid || !charStr.match(numberAllowDotRegex)) && e.preventDefault()
}
function handlePaste(e: any) {
  let valueCopied = e.clipboardData.getData('text/plain')
  const oldValue = +e.target.value
  if (
    Number.isNaN(+valueCopied) ||
    ((oldValue % 1 !== 0 || true) && +valueCopied % 1 !== 0) ||
    +valueCopied < 0
  )
    e.preventDefault()
}
export const newCompaniesSchema = Yup.object().shape({
  company_name: Yup.string().required('Company name is not null'),
  company_code: Yup.string().required('Company code is not null'),
  business_uen: Yup.string().required('Company code is not null'),
  address_id: Yup.string().required('address is not null'),
  telephone: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(11, 'Maximum 11 symbols')
    .required('Telephone code is not null'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is not null'),
  website: Yup.string().required('Website code is not null'),
  registration_date: Yup.string().required('Registration date code is not null'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const NewCompanies = ({
  show,
  handleClose,
  titleLable = 'New',
  data = [],
  loadapi,
  setLoadApi,
}: Props) => {
  console.log(data)

  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [stepper, setStepper] = useState<StepperComponent | null>(null)
  const [dataCompany, setDataCompany] = useState([])

  const [status, setStatus] = useState(data ? data?.status : false)

  useEffect(() => {
    request
      .get('config/address')
      .then((response) => {
        console.log(response)

        setDataCompany(response.data.data)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
  }, [])

  const {values, touched, errors, handleChange, handleSubmit, setFieldValue, resetForm} = useFormik(
    {
      initialValues: {
        company_name: data ? data?.company_name : '',
        company_code: data ? data?.company_code : '',
        business_uen: data ? data?.business_uen : '',
        address_id: data ? data?.address_id : '',
        telephone: data ? data?.telephone : '',
        email: data ? data?.email : '',
        website: data ? data?.website : '',
        registration_date: data ? moment(data?.registration_date).format('YYYY-MM-DDTHH:mm') : '',
      },
      validationSchema: newCompaniesSchema,
      onSubmit: async (values: any, actions: any) => {
        if (titleLable === 'New') {
          await request
            .post('config/company', {
              ...values,
              address_id: Number(values.address_id),
              registration_date: new Date(values.registration_date),
              status: status ? 1 : 0,
            })
            .then((response) => {
              if (!response.data?.error) {
                swalToast.fire({
                  icon: 'success',
                  title: 'Success',
                })
              }
              handleClose()
              resetForm()
              setStatus(false)
              setLoadApi(!loadapi)
            })
            .catch((e) => {
              handleClose()
              swalToast.fire({
                icon: 'error',
                title: e?.message,
              })
            })
        }

        if (titleLable === 'Edit') {
          await request
            .post('config/company/' + data?.id, {
              ...values,
              address_id: Number(values.address_id),
              registration_date: new Date(values.registration_date),
              status: status ? 1 : 0,
            })
            .then((response) => {
              if (!response.data?.error) {
                swalToast.fire({
                  icon: 'success',
                  title: 'Success',
                })
              }
              handleClose()
              setLoadApi(!loadapi)
            })
            .catch((error) => {
              handleClose()
              swalToast.fire({
                icon: 'error',
                title: error?.message,
              })
            })
        }
      },
    }
  )

  const loadStepper = () => {
    setStepper(StepperComponent.createInsance(stepperRef.current as HTMLDivElement))
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-600px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{titleLable} Company</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>
      <div
        style={{maxHeight: '500px', overflowY: 'auto'}}
        className='modal-body py-lg-10 px-lg-10 '
      >
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
              <Input
                title='Company Name'
                id='company_name'
                error={errors.company_name}
                touched={touched.company_name}
                errorTitle={errors.company_name}
                value={values.company_name}
                onChange={handleChange}
              />
              <Input
                title='Company Code'
                id='company_code'
                error={errors.company_code}
                touched={touched.company_code}
                errorTitle={errors.company_code}
                value={values.company_code}
                onChange={handleChange}
              />
              <Input
                title='Business Uen'
                id='business_uen'
                error={errors.business_uen}
                touched={touched.business_uen}
                errorTitle={errors.business_uen}
                value={values.business_uen}
                onChange={handleChange}
              />
              <Select
                datas={dataCompany}
                valueTitle='street_1'
                setValueTitle='id'
                title='Address Id'
                id='address_id'
                errors={errors.address_id}
                touched={touched.address_id}
                errorTitle={errors.address_id}
                value={values.address_id}
                onChange={setFieldValue}
              />

              <Input
                onPaste={handlePaste}
                onKeyPressCapture={handleKeyPress}
                title='Telephone'
                id='telephone'
                error={errors.telephone}
                touched={touched.telephone}
                errorTitle={errors.telephone}
                value={values.telephone}
                onChange={handleChange}
              />
              <Input
                title='Email'
                id='email'
                error={errors.email}
                touched={touched.email}
                errorTitle={errors.email}
                value={values.email}
                onChange={handleChange}
              />
              <Input
                title='Website'
                id='website'
                error={errors.website}
                touched={touched.website}
                errorTitle={errors.website}
                value={values.website}
                onChange={handleChange}
              />
              <InputTime
                title='Registration Date'
                id='registration_date'
                error={errors.registration_date}
                touched={touched.registration_date}
                errorTitle={errors.registration_date}
                value={values.registration_date}
                onChange={handleChange}
              />
              <InputCheck
                title='Status'
                checked={status}
                onChange={() => setStatus(!status)}
                id='Status'
              />
              <div className='d-flex flex-end pt-10'>
                <button type='submit' className='btn btn-lg btn-primary'>
                  {titleLable === 'Edit' ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {NewCompanies}
