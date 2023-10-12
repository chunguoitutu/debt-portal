/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'

import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Input} from '../../../../components/inputs/input'
import Select from '../../../../components/selects/select'
import InputCheck from '../../../../components/inputs/inputCheck'
import {KTIcon} from '../../../../_metronic/helpers'
import {InputTime} from '../../../../components/inputs/inputTime'
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
export const NewBranchSchema = Yup.object().shape({
  business_uen: Yup.string().required('Company name is not null'),
  company_id: Yup.string().required('Company code is not null'),
  branch_name: Yup.string().required('Company code is not null'),
  telephone: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(11, 'Maximum 11 symbols')
    .required('Telephone code is not null'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is not null'),
  open_date: Yup.string().required('open_date date code is not null'),
  street_1: Yup.string().required('Street 1 date code is not null'),
  street_2: Yup.string().required('Street 2 date code is not null'),
  city: Yup.string().required('City date code is not null'),
  state: Yup.string().required('State date code is not null'),
  zipcode: Yup.string().required('Zipcode date code is not null'),
  country: Yup.string().required('Country date code is not null'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const NewBranch = ({
  show,
  handleClose,
  titleLable = 'New',
  data = [],
  loadapi,
  setLoadApi,
}: Props) => {
  useEffect(() => {
    request
      .get('config/company')
      .then((response) => {
        setDataCompany(response.data.data)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
    request
      .get(`config/branch/id/${data.id}/address/${data.address_id}`)
      .then((response) => {
        setFieldValue('street_1', response.data.data.street_1)
        setFieldValue('street_2', response.data.data.street_2)
        setFieldValue('city', response.data.data.city)
        setFieldValue('state', response.data.data.state)
        setFieldValue('zipcode', response.data.data.zipcode)
        setFieldValue('country', response.data.data.country)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
  }, [])

  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [dataCompany, setDataCompany] = useState([])

  const [status, setStatus] = useState(data ? data?.status : false)

  const {values, touched, errors, handleChange, handleSubmit, setFieldValue, resetForm} = useFormik(
    {
      initialValues: {
        business_uen: data ? data?.business_uen : '',
        company_id: data ? data?.company_id : '',
        branch_name: data ? data?.branch_name : '',
        telephone: data ? data?.telephone : '',
        email: data ? data?.email : '',
        street_1: '',
        street_2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        open_date: data ? moment(data?.open_date).format('YYYY-MM-DDTHH:mm') : '',
      },
      validationSchema: NewBranchSchema,
      onSubmit: async (values: any, actions: any) => {
        if (titleLable === 'New') {
          await request
            .post('config/address', {
              address_type_id: 1,
              street_1: values.street_1,
              street_2: values.street_2,
              city: values.city,
              state: values.state,
              zipcode: values.zipcode,
              country: values.country,
            })
            .then((response) => {
              request
                .post('config/branch', {
                  business_uen: values.business_uen,
                  company_id: Number(values.company_id),
                  branch_name: values.branch_name,
                  address_id: Number(response.data.data.id),
                  telephone: values.telephone,
                  email: values.email,
                  open_date: new Date(values.open_date),
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
            .post('config/branch/' + data?.id, {
              business_uen: values.business_uen,
              company_id: Number(values.company_id),
              branch_name: values.branch_name,
              telephone: values.telephone,
              email: values.email,
              open_date: new Date(values.open_date),
              status: status ? 1 : 0,
            })
            .then((response) => {
              request
                .post('config/address/' + data?.address_id, {
                  address_type_id: 1,
                  street_1: values.street_1,
                  street_2: values.street_2,
                  city: values.city,
                  state: values.state,
                  zipcode: values.zipcode,
                  country: values.country,
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

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{titleLable} Branch</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>
      <div style={{maxHeight: '500px', overflowY: 'auto'}} className='modal-body  '>
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
              <div className='d-flex justify-content-center gap-10 '>
                <div style={{width: '47%'}}>
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
                    valueTitle='company_name'
                    setValueTitle='id'
                    title='Company Id'
                    id='company_id'
                    errors={errors.company_id}
                    touched={touched.company_id}
                    errorTitle={errors.company_id}
                    value={values.company_id}
                    onChange={setFieldValue}
                  />
                  <Input
                    title='Branch Name'
                    id='branch_name'
                    error={errors.branch_name}
                    touched={touched.branch_name}
                    errorTitle={errors.branch_name}
                    value={values.branch_name}
                    onChange={handleChange}
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
                  <InputTime
                    title='Open Date'
                    id='open_date'
                    error={errors.open_date}
                    touched={touched.open_date}
                    errorTitle={errors.open_date}
                    value={values.open_date}
                    onChange={handleChange}
                  />
                  <InputCheck
                    title='Status'
                    checked={status}
                    onChange={() => setStatus(!status)}
                    id='Status'
                  />
                </div>
                <div style={{width: '47%'}}>
                  <Input
                    title='Street 1'
                    id='street_1'
                    error={errors.street_1}
                    touched={touched.street_1}
                    errorTitle={errors.street_1}
                    value={values.street_1}
                    onChange={handleChange}
                  />
                  <Input
                    title='Street 2'
                    id='street_2'
                    error={errors.street_2}
                    touched={touched.street_2}
                    errorTitle={errors.street_2}
                    value={values.street_2}
                    onChange={handleChange}
                  />
                  <Input
                    title='City'
                    id='city'
                    error={errors.city}
                    touched={touched.city}
                    errorTitle={errors.city}
                    value={values.city}
                    onChange={handleChange}
                  />
                  <Input
                    title='State'
                    id='state'
                    error={errors.state}
                    touched={touched.state}
                    errorTitle={errors.state}
                    value={values.state}
                    onChange={handleChange}
                  />
                  <Input
                    title='Zip Code'
                    id='zipcode'
                    error={errors.zipcode}
                    touched={touched.zipcode}
                    errorTitle={errors.zipcode}
                    value={values.zipcode}
                    onChange={handleChange}
                  />

                  <Input
                    title='Country'
                    id='country'
                    error={errors.country}
                    touched={touched.country}
                    errorTitle={errors.country}
                    value={values.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

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

export {NewBranch}
