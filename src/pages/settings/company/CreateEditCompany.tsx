import React, {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import moment from 'moment'

import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {KTIcon} from '@/_metronic/helpers'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {CheckboxRounded} from '@/components/checkbox'
import {COMPANY_MANAGEMENT_CONFIG} from '../company-management/config'
import {useAuth} from '@/app/context/AuthContext'
import Cookies from 'js-cookie'

type Props = {
  setLoadApi: any
  loadapi: boolean
  data?: any
  show: boolean
  titleLable?: string
  handleClose: () => void
  handleUpdated: () => void
}

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
  const {rows, settings} = COMPANY_MANAGEMENT_CONFIG
  const {validationFormik} = settings || {}
  const [information, setInformation] = React.useState<any>(null)

  const [status, setStatus] = useState(data ? data?.status : true)

  const {company_id, setCompanyName} = useAuth()

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
      contact_person: !!data?.contact_person ? data?.['contact_person'] || '' : '',
      address: data ? data?.['address'] : '',
      open_date: data ? data?.['open_date'].slice(0, 11) : '',
    },
    validationSchema: validationFormik,
    onSubmit: async (values: any) => {
      if (!information?.id) {
        await request
          .post('config/company', {
            company_name: values.company_name.trim(),
            company_code: values.company_code.trim(),
            business_uen: values.business_uen.trim(),
            contact_person: values.contact_person.trim(),
            telephone: String(values.telephone).trim(),
            email: values.email.trim(),
            address: values.address.trim(),
            open_date: new Date(values.open_date),
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: `Company${
                  !!response?.data?.data?.company_name
                    ? ' "' + response?.data?.data?.company_name + '" '
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
              title:
                error?.response?.data?.message ||
                'The system is having an error, please try again in a few minutes',
            })
          })
          .finally(() => setSubmitting(false))
      } else {
        await request
          .post('config/company/' + information?.id, {
            company_name: values.company_name.trim(),
            company_code: values.company_code.trim(),
            business_uen: values.business_uen.trim(),
            telephone: String(values.telephone).trim(),
            contact_person: values.contact_person.trim(),
            email: values.email.trim(),
            address: values.address.trim(),
            open_date: new Date(values.open_date),
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: `Company${
                  !!response?.data?.data?.company_name
                    ? ' "' + response?.data?.data?.company_name + '" '
                    : ' '
                }successfully updated`,
              })

              const {id, company_name} = response?.data?.data || {}

              // set company name when current company name and edit company have duplicate id
              if (id === company_id) {
                setCompanyName(company_name)
                Cookies.set('company_name', company_name)
              }
            }
            handleUpdated()
            handleClose()
            setLoadApi(!loadapi)
          })
          .catch((error) => {
            swalToast.fire({
              icon: 'error',
              title:
                error?.response?.data?.message ||
                'The system is having an error, please try again in a few minutes',
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
        style={{maxHeight: 'calc(100vh - 250px)', overflowY: 'auto'}}
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
                        required={row?.required ? true : false}
                        label={row.name}
                        onBlur={handleBlur}
                        name={row?.key}
                        type={row?.type || 'text'}
                        value={values[row?.key] || ''}
                        onChange={handleChange}
                        error={errors[row.key] as string}
                        touched={!!touched[row.key]}
                      />
                    </div>
                  </div>
                ))}
              </>
              <CheckboxRounded
                label='Status'
                checked={status}
                onChange={() => setStatus(!status)}
                id='status'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex flex-end p-30px border-top border-gray-200'>
        <Button
          type='reset'
          onClick={() => handleClose()}
          className='btn-lg btn-secondary align-self-center me-8px fs-6'
        >
          Cancel
        </Button>
        <Button
          className='btn-lg btn-primary fs-6'
          type='submit'
          loading={isSubmitting}
          onClick={() => handleSubmit()}
        >
          {titleLable === 'Edit' ? 'Update' : 'Create'}
        </Button>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateEditCompanies}
