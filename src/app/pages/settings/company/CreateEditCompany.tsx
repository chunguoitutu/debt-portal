import React, {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'

import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Input} from '../../../components/inputs/input'
import InputCheck from '../../../components/inputs/inputCheck'
import {KTIcon} from '../../../../_metronic/helpers'
import moment from 'moment'
import {swalToast} from '../../../swal-notification'
import request from '../../../axios'
import {InputTime} from '../../../components/inputs/inputTime'
import {COMPANY_MANAGEMENT_CONFIG} from '../company-management/config'

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
  company_name: Yup.string().required('Company Name is required.'),
  business_uen: Yup.string().required('Business Uen is required.'),
  telephone: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(11, 'Maximum 11 symbols')
    .required('Telephone is required.'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols'),
  open_date: Yup.string().required('Open Date is required.'),
  street_1: Yup.string().required('Street 1 is required.'),
  city: Yup.string().required('City is required.'),
  zipcode: Yup.string().required('Zip Code is required.'),
  state: Yup.string().required('State is required.'),
  country: Yup.string().required('Country is required.'),
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
    request
      .get(`config/company/id/${data.id}/address/${data.address_id}`)
      .then(({data}) => {
        if (!data?.error) setInformation(data?.data)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generateField = React.useMemo(() => {
    if (information) {
      return rows.reduce((a, b) => {
        a[b.key] = information[b.key] || ''
        return a
      }, {})
    }
    return {}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information])

  const {values, touched, errors, handleChange, handleSubmit, setFieldValue} = useFormik({
    initialValues: {
      ...generateField,
    },
    validationSchema: newCompaniesSchema,
    onSubmit: async (values: any, actions: any) => {
      await request
        .post('config/company/' + information?.id, {
          company_name: values.company_name,
          company_code: values.company_code,
          business_uen: values.business_uen,
          telephone: values.telephone as string,
          email: values.email,
          website: values.website,
          open_date: new Date(values.open_date),
        })
        .then((response) => {
          request
            .post('config/address/' + information?.address_id, {
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
                  title: 'Company successfully updated',
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
        })
        .catch((error) => {
          swalToast.fire({
            icon: 'error',
            title: error?.message,
          })
        })
    },
  })

  React.useEffect(() => {
    if (information) {
      rows.forEach((row) => {
        if (row.key === 'open_date') {
          setFieldValue(row.key, moment(information?.['open_date']).format('YYYY-MM-DDTHH:mm'))
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
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{titleLable} Company</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>

      <div style={{maxHeight: '500px', overflowY: 'auto'}} className='modal-body '>
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          <div className=''>
            <div className='card-body  px-lg-7 row gx-10'>
              {information ? (
                <>
                  {rows.map((row) => (
                    <div key={row.key} style={{flex: '0 0 50%'}}>
                      {row.key === 'open_date' ? (
                        <InputTime
                          required={row?.require ? true : false}
                          title={row.name}
                          id={row.key}
                          error={errors[row.key]}
                          touched={touched[row.key]}
                          errorTitle={errors[row.key]}
                          value={values[row.key] || ''}
                          onChange={handleChange}
                        />
                      ) : (
                        <Input
                          required={row?.require ? true : false}
                          title={row.name}
                          id={row.key}
                          type={row.type}
                          error={errors[row.key]}
                          touched={touched[row.key]}
                          errorTitle={errors[row.key]}
                          value={values[row.key] || ''}
                          onChange={handleChange}
                        />
                      )}
                    </div>
                  ))}
                </>
              ) : null}
              <InputCheck
                title='Status'
                checked={status}
                onChange={() => setStatus(!status)}
                id='Status'
              />
            </div>

            <div className='d-flex flex-end pt-10'>
              <button
                onClick={() => handleSubmit()}
                type='submit'
                className='btn btn-lg btn-primary'
              >
                {titleLable === 'Edit' ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateEditCompanies}
