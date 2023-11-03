/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Input} from '../../../components/inputs/input'
import {KTIcon} from '../../../../_metronic/helpers'
import request from '../../../axios'
import InputCheck from '../../../components/inputs/InputCheckRounded'
import {JOB_TABLE_CONFIG} from './JobTableConfig'
import TextArea from '../../../components/textarea/TextArea'
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

export const CreateJobTypeSchema = Yup.object().shape({
  job_type_name: Yup.string().required('Job Type Name is required'),
  description: Yup.string().max(45, 'Description must be at most 45 characters'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateJobType = ({
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
  const [status, setStatus] = useState(data?.status === 0 ? false : true)
  const [requestMoreInformation, setRequestMoreInformation] = useState(
    data.request_more_information || false
  )

  const {rows, endpoint} = JOB_TABLE_CONFIG

  const {values, touched, errors, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues: {
      job_type_name: data.job_type_name || '',
      description: data.description || '',
    },
    validationSchema: CreateJobTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      if (title === 'New') {
        try {
          await request.post(endpoint || '', {
            ...values,
            request_more_information: requestMoreInformation ? 1 : 0,
            status: status ? 1 : 0,
          })
          handleUpdated()
          handleClose()
          resetForm()
          setStatus(false)
          setLoadApi(!loadApi)
          swalToast.fire({
            icon: 'success',
            title: `Job type successfully created.`,
            timer: 1500,
          })
        } catch (error) {
          console.error(error)
          swalToast.fire({
            icon: 'error',
            title: 'Error',
            text: DEFAULT_MESSAGE_ERROR_500,
            timer: 1500,
          })
        }
      } else {
        try {
          await request.post(endpoint + '/' + data?.id, {
            ...values,
            request_more_information: requestMoreInformation ? 1 : 0,
            status: status ? 1 : 0,
          })
          handleUpdated()
          handleClose()
          setLoadApi(!loadApi)
          swalToast.fire({
            icon: 'success',
            title: `Job type successfully updated.`,
          })
        } catch (error) {
          swalToast.fire({
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
          <h2>{title} Job Type</h2>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <div className='flex-row-fluid' style={{padding: 23}}>
          <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
            {rows.map((row) => {
              const {informCreateEdit} = row
              const {isRequired} = informCreateEdit || {}
              if (['id', 'status', 'request_more_information'].includes(row.key)) {
                return null
              }
              return (
                <div key={row.key} style={{flex: '0 0 50%'}}>
                  {row.key === 'description' ? (
                    <div>
                      <TextArea
                        title={row.name}
                        name={row.key}
                        value={values[row.key] || ''}
                        onChange={handleChange}
                      />
                    </div>
                  ) : (
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
                  )}
                </div>
              )
            })}
            <div className='mt-6'>
              <InputCheck
                onChange={() => setRequestMoreInformation(!requestMoreInformation)}
                checked={requestMoreInformation}
                id='request_more_information'
                title='Need More Information'
              />
            </div>
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

export default CreateJobType
