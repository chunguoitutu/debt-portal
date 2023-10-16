/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'

import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Input} from '../../../../components/inputs/input'
import InputCheck from '../../../../components/inputs/inputCheck'
import {KTIcon} from '../../../../_metronic/helpers'
import {swalToast} from '../../../swal-notification'
import request from '../../../axios'
import TextArea from '../../../components/textarea/TextArea'
import ErrorMessageFormik from '../../../components/error/ErrorMessageFormik'

type Props = {
  setLoadApi: any
  loadapi: boolean
  data?: any
  show: boolean
  titleLable?: string
  handleClose: () => void
  handleUpdated: () => void
}

export const NewAddressSchema = Yup.object().shape({
  address_type_name: Yup.string().required('Address Type name is required.'),
  description: Yup.string().required('Description is required.'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const NewAddress = ({
  show,
  handleClose,
  titleLable = 'New',
  data = [],
  loadapi,
  setLoadApi,
  handleUpdated,
}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)

  const [status, setStatus] = useState(data ? data?.status : false)

  const {values, touched, errors, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues: {
      address_type_name: data ? data?.address_type_name : '',
      description: data ? data?.description : '',
    },
    validationSchema: NewAddressSchema,
    onSubmit: async (values: any, actions: any) => {
      if (titleLable === 'New') {
        await request
          .post('config/address_type', {
            ...values,
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: 'Success',
              })
            }
            handleUpdated()
            handleClose()
            resetForm()
            setStatus(false)
            setLoadApi(!loadapi)
          })
          .catch((e) => {
            swalToast.fire({
              icon: 'error',
              title: e?.message,
            })
          })
      }

      if (titleLable === 'Edit') {
        await request
          .post('config/address_type/' + data?.id, {
            ...values,
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: 'Success',
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
      }
    },
  })

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-500px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{titleLable} Address Type</h2>
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
              <Input
                title='Address Type Name'
                id='address_type_name'
                error={errors.address_type_name}
                touched={touched.address_type_name}
                errorTitle={errors.address_type_name}
                value={values.address_type_name}
                onChange={handleChange}
              />
              <div className='mb-8'>
                <TextArea
                  title='Description'
                  name='description'
                  value={values.description || ''}
                  onChange={handleChange}
                />

                <ErrorMessageFormik
                  className='mt-2'
                  shouldShowMessage={!!(errors.description && touched.description)}
                  message={errors.description as string}
                />
              </div>
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

export {NewAddress}