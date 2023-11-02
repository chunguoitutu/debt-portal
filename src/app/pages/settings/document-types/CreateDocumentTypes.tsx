/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'

import * as Yup from 'yup'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Input} from '../../../components/inputs/input'
import {KTIcon} from '../../../../_metronic/helpers'
import request from '../../../axios'
import InputCheck from '../../../components/inputs/InputCheckRounded'
import {DOCUMENT_TABLE_CONFIG} from './DocumentTableConfig'
import {DEFAULT_MESSAGE_ERROR_500} from '../../../constants/error-message'
import {swalToast} from '../../../swal-notification'

type Props = {
  setLoadApi: any
  loadApi: boolean
  data?: any
  show: boolean
  title?: string
  handleClose: () => void
  handleUpdated: () => void
}

export const CreateLoanTypeSchema = Yup.object().shape({
  type_name: Yup.string().required('Document Type Name is required'),
  description: Yup.string().max(1024, 'Description must be at most 1024 characters'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateDocumentType = ({
  show,
  handleClose,
  title = 'New',
  data = {},
  loadApi,
  setLoadApi,
  handleUpdated,
}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stepper, setStepper] = useState<StepperComponent | null>(null)
  const [status, setStatus] = useState(data.status || true)

  const {rows, endpoint} = DOCUMENT_TABLE_CONFIG

  const {values, touched, errors, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues: {
      type_name: data.type_name || '',
      description: data.description || '',
    },
    validationSchema: CreateLoanTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      if (title === 'New') {
        try {
          await request.post(endpoint || '', {
            ...values,
            status: status ? 1 : 0,
          })
          handleUpdated()
          handleClose()
          resetForm()
          setStatus(false)
          setLoadApi(!loadApi)
          swalToast.fire({
            timer: 1500,
            icon: 'success',
            title: 'Document type successfully created',
          })
        } catch (error) {
          console.error(error)
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: 'Error',
            text: DEFAULT_MESSAGE_ERROR_500,
          })
        }
      } else {
        try {
          await request.post(endpoint + '/' + data?.id, {
            ...values,
            status: status ? 1 : 0,
          })
          handleUpdated()
          handleClose()
          setLoadApi(!loadApi)
          swalToast.fire({
            timer: 1500,
            icon: 'success',
            title: 'Document type successfully update',
          })
        } catch (error) {
          console.error(error)
          console.error(error)
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: 'Error',
            text: DEFAULT_MESSAGE_ERROR_500,
          })
        }
      }
    },
  })

  const loadStepper = () => {
    setStepper(StepperComponent.createInsance(stepperRef.current as HTMLDivElement))
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
      backdrop={true}
    >
      <>
        <div className='modal-header'>
          <h2>{title} Document Type</h2>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <div className='flex-row-fluid' style={{padding: 23}}>
          <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
            {rows.map((row) => {
              const {informCreateEdit} = row
              const {isRequired} = informCreateEdit || {}
              if (['id', 'status', 'created_date', 'updated_date'].includes(row.key)) {
                return null
              }
              return (
                <div key={row.key} style={{flex: '0 0 50%'}}>
                  <Input
                    title={row.name}
                    id={row.key}
                    error={errors[row.key]}
                    touched={touched[row.key]}
                    errorTitle={errors[row.key]}
                    value={values[row.key] || ''}
                    onChange={handleChange}
                    required={isRequired}
                  />
                </div>
              )
            })}
            <div className='mt-6'>
              <InputCheck
                checked={status}
                onChange={() => setStatus(!status)}
                id='status'
                title='Status'
              />
            </div>
            <div className='d-flex justify-content-end pt-4'>
              <button type='submit' className='btn btn-lg btn-primary'>
                {title === 'New' ? 'Create' : 'Update'}
              </button>
            </div>{' '}
          </form>
        </div>
      </>
    </Modal>,
    modalsRoot
  )
}
export default CreateDocumentType
