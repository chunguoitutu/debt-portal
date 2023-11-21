import React, {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import moment from 'moment'
import {COMPANY_MANAGEMENT_CONFIG} from '../company-management/config'
import Input from '../../../components/input'
import ErrorMessage from '../../../components/error/ErrorMessage'
import Button from '../../../components/button/Button'
import request from '../../../app/axios'
import {swalToast} from '../../../app/swal-notification'
import {KTIcon} from '../../../_metronic/helpers'
import {DEFAULT_MSG_ERROR} from '../../../app/constants/error-message'
import InputCheck from 'src/components/input/InputCheckRounded'

type Props = {
  setLoadApi: any
  loadapi: boolean
  data?: any
  show: boolean
  titleLable?: string
  handleClose: () => void
  handleUpdated: () => void
}

export const newCompaniesSchema = Yup.object().shape({
  company_name: Yup.string().required('Company Name is required'),
  company_code: Yup.string().required('Company Code is required'),
  business_uen: Yup.string().required('Business Uen is required'),
  // telephone: Yup.string()
  //   .min(6, 'Minimum 6 symbols')
  //   .max(11, 'Maximum 11 symbols')
  //   .required('Telephone is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols'),
  // .required('Email Uen is required'),
  open_date: Yup.string().required('Open Date is required'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateEditCompanies = ({
  show,
  handleClose,
  titleLable = 'New',
  data,
  loadapi,
  setLoadApi,
  handleUpdated,
}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const {rows} = COMPANY_MANAGEMENT_CONFIG
  const [information, setInformation] = React.useState<any>(null)

  const [status, setStatus] = useState(data ? data?.status : true)

  React.useEffect(() => {
    if (data?.id) {
      request
        .get(`config/company/${data.id}`)
        .then(({data}) => {
          if (!data?.error) setInformation(data?.data)
        })
        .catch((error) => {
          console.error('Error: ', error?.message)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setSubmitting,
  } = useFormik({
    initialValues: {
      company_name: data ? data?.['company_name'] : '',
      company_code: data ? data?.['company_code'] : '',
      business_uen: data ? data?.['business_uen'] : '',
      telephone: information ? String(information?.telephone) : '',
      email: data ? data?.['email'] : '',
      address: data ? data?.['address'] : '',
      open_date: data ? data?.['open_date'].slice(0, 11) : '',
    },
    validationSchema: newCompaniesSchema,
    onSubmit: async (values: any, actions: any) => {
      if (!information?.id) {
        await request
          .post('config/company', {
            company_name: values.company_name,
            company_code: values.company_code,
            business_uen: values.business_uen,
            telephone: String(values.telephone),
            email: values.email,
            address: values.address,
            open_date: new Date(values.open_date),
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: `Company${
                  !!response?.data?.data?.company_name
                    ? ' ' + response?.data?.data?.company_name + ' '
                    : ' '
                }successfully created`,
              })
            }
            handleUpdated()
            handleClose()
            setLoadApi(!loadapi)
          })
          .catch((error) => {
            swalToast.fire({
              icon: 'error',
              title: DEFAULT_MSG_ERROR,
            })
          })
          .finally(() => setSubmitting(false))
      } else {
        await request
          .post('config/company/' + information?.id, {
            company_name: values.company_name,
            company_code: values.company_code,
            business_uen: values.business_uen,
            telephone: String(values.telephone),
            email: values.email,
            address: values.address,
            open_date: new Date(values.open_date),
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: `Company${
                  !!response?.data?.data?.company_name
                    ? ' ' + response?.data?.data?.company_name + ' '
                    : ' '
                }successfully updated`,
              })
            }
            handleUpdated()
            handleClose()
            setLoadApi(!loadapi)
          })
          .catch((error) => {
            swalToast.fire({
              icon: 'error',
              title: error?.message,
            })
          })
          .finally(() => setSubmitting(false))
      }
    },
  })

  React.useEffect(() => {
    if (information) {
      rows.forEach((row) => {
        if (row.key === 'open_date') {
          setFieldValue(row.key, moment(information?.['open_date']).format('YYYY-MM-DD'))
        } else {
          setFieldValue(row.key, information[row.key])
        }
      }, {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information])

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div
        style={{
          padding: '30px',
        }}
        className='modal-header'
      >
        <h2>{titleLable} Company</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>

      <div
        style={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
        className='modal-body  p-30px'
      >
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          <div className=''>
            <div className='card-body  px-lg-7 row gx-10'>
              <>
                {rows.map((row) => (
                  <div key={row?.key} style={{flex: '0 0 50%'}}>
                    <div className='d-flex flex-column mb-16px'>
                      <Input
                        required={row?.require ? true : false}
                        title={row.name}
                        onBlur={handleBlur}
                        name={row?.key}
                        type={row?.type || 'text'}
                        value={values[row?.key] || ''}
                        onChange={handleChange}
                      />

                      {errors[row?.key] && touched[row?.key] && (
                        <ErrorMessage className='mt-2' message={errors[row?.key] as string} />
                      )}
                    </div>
                  </div>
                ))}
              </>
              <InputCheck
                title='Status'
                checked={status}
                onChange={() => setStatus(!status)}
                id='Status'
              />
            </div>

            <div className='d-flex flex-end pt-30px'>
              <button
                type='reset'
                onClick={() => handleClose()}
                className='btn btn-secondary align-self-center me-3'
              >
                Cancel
              </button>
              <Button
                className='btn-lg btn-primary'
                type='submit'
                loading={isSubmitting}
                onClick={() => handleSubmit()}
              >
                {titleLable === 'Edit' ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateEditCompanies}
