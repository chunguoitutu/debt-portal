/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'

import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Input} from '../../../components/inputs/input'
import InputCheck from '../../../components/inputs/inputCheck'
import {KTIcon} from '../../../../_metronic/helpers'
import {swalToast} from '../../../swal-notification'
import request from '../../../axios'
import TextArea from '../../../components/textarea/TextArea'
import ErrorMessage from '../../../components/error/ErrorMessage'

type Props = {
  setLoadApi: any
  loadapi: boolean
  data?: any
  show: boolean
  titleLable?: string
  handleClose: () => void
  handleUpdated: () => void
}

export const CreateEditRejectionTypeSchema = Yup.object().shape({
  rejection_type_name: Yup.string().required('Rejection type name is required.'),
  rejection_type_code: Yup.string().required('Rejection type Code is required.'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateEditRejectionType = ({
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
      rejection_type_name: data ? data?.rejection_type_name : '',
      rejection_type_code: data ? data?.rejection_type_code : '',
      rejection_type_description: data ? data?.rejection_type_description : '',
    },
    validationSchema: CreateEditRejectionTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      if (titleLable === 'New') {
        await request
          .post('config/rejection_type', {
            ...values,
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: 'Rejection type successfully created',
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
          .post('config/rejection_type/' + data?.id, {
            ...values,
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: 'Rejection type successfully updated',
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
      dialogClassName='modal-dialog modal-dialog-centered mw-600px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{titleLable} Rejection Type</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>
      <div style={{maxHeight: '600px', overflowY: 'auto'}} className='modal-body  '>
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          <div className='flex-row-fluid '>
            <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
              <Input
                required={true}
                title='Rejection Type Name'
                id='rejection_type_name'
                error={errors.rejection_type_name}
                touched={touched.rejection_type_name}
                errorTitle={errors.rejection_type_name}
                value={values.rejection_type_name}
                onChange={handleChange}
              />
              <Input
                required={true}
                title='Rejection Type Code'
                id='rejection_type_code'
                error={errors.rejection_type_code}
                touched={touched.rejection_type_code}
                errorTitle={errors.rejection_type_code}
                value={values.rejection_type_code}
                onChange={handleChange}
              />
              <div className='mb-8'>
                <TextArea
                  title='Rejection Type Description'
                  name='rejection_type_description'
                  value={values.rejection_type_description || ''}
                  onChange={handleChange}
                />

                <ErrorMessage
                  className='mt-2'
                  shouldShowMessage={
                    !!(errors.rejection_type_description && touched.rejection_type_description)
                  }
                  message={errors.rejection_type_description as string}
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

export {CreateEditRejectionType}
