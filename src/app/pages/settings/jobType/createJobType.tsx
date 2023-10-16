/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Input} from '../../../../components/inputs/input'
import {KTIcon} from '../../../../_metronic/helpers'
import request from '../../../axios'

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
  const [status, setStatus] = useState(data.status || false)
  const [requestMoreInformation, setRequestMoreInformation] = useState(
    data.request_more_information || false
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataLoan, setDataLoan] = useState([])

  useEffect(() => {
    request
      .get('config/job_type')
      .then((response) => {
        setDataLoan(response.data.data)
      })
      .catch((error) => {
        console.error('Error:', error?.message)
      })
  }, [])

  const {values, touched, errors, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues: {
      job_type_name: data.job_type_name || '',
      description: data.description || '',
    },
    validationSchema: CreateJobTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      if (title === 'New') {
        try {
          await request.post('config/job_type', {
            ...values,
            request_more_information: requestMoreInformation ? 1 : 0,
            status: status ? 1 : 0,
          })
          handleUpdated()
          handleClose()
          resetForm()
          setStatus(false)
          setLoadApi(!loadApi)
          Swal.fire({
            icon: 'success',
            title: 'Job type successfully created',
            timer: 1500,
          })
        } catch (error) {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again!',
            timer: 1500,
          })
        }
      } else {
        try {
          await request.post(`config/job_type/${data.id}`, {
            ...values,
            request_more_information: requestMoreInformation ? 1 : 0,
            status: status ? 1 : 0,
          })
          handleUpdated()
          handleClose()
          setLoadApi(!loadApi)
          Swal.fire({
            icon: 'success',
            title: 'Job type successfully update',
            timer: 1500,
          })
        } catch (error) {
          console.error(error)
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again!',
            timer: 1500,
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
      dialogClassName='modal-dialog modal-dialog-centered mw-600px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
      backdrop={true}
    >
      <div className='modal-header '>
        <h2>{title} Job Type</h2>
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
          <div className='flex-row-fluid p-1'>
            <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
              <Input
                title='Type Name'
                id='job_type_name'
                error={errors.job_type_name}
                touched={touched.job_type_name}
                errorTitle={errors.job_type_name}
                value={values.job_type_name}
                onChange={handleChange}
              />
              <Input
                title='Description'
                id='description'
                error={errors.description}
                touched={touched.description}
                errorTitle={errors.description}
                value={values.description}
                onChange={handleChange}
              />

              <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid d-flex justify-content-between align-content-center'>
                <div style={{fontWeight: 500, fontSize: 15}}>Status</div>
                <input
                  className='form-check-input ms-4'
                  style={{width: 50, height: 25}}
                  type='checkbox'
                  name='status'
                  onChange={() => setStatus(!status)}
                  checked={status}
                />
              </div>

              <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid d-flex justify-content-between align-content-center mt-xl-6'>
                <div style={{fontWeight: 500, fontSize: 15}}>Need More Information</div>
                <input
                  className='form-check-input ms-4'
                  style={{width: 50, height: 25}}
                  type='checkbox'
                  name='request_more_information'
                  onChange={() => setRequestMoreInformation(!requestMoreInformation)}
                  checked={requestMoreInformation}
                />
              </div>

              <div className='d-flex flex-end pt-10'>
                <button type='submit' className='btn btn-lg btn-primary'>
                  {title === 'New' ? 'Create' : 'Update'}
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

export default CreateJobType
