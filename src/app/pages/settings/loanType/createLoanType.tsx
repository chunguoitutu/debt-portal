/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {swalToast} from '../../../swal-notification'

import * as Yup from 'yup'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Input} from '../../../inputs/input'
import {KTIcon} from '../../../../_metronic/helpers'
import request from '../../../axios'

type Props = {
  setLoadApi: any
  loadApi: boolean
  data?: any
  show: boolean
  title?: string
  handleClose: () => void
}

export const CreateLoanTypeSchema = Yup.object().shape({
  type_name: Yup.string().required('Loan Type Name is required'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateLoanType = ({
  show,
  handleClose,
  title = 'New',
  data = {},
  loadApi,
  setLoadApi,
}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stepper, setStepper] = useState<StepperComponent | null>(null)
  const [status, setStatus] = useState(data.status || false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataLoan, setDataLoan] = useState([])

  useEffect(() => {
    request
      .get('config/loan_type')
      .then((response) => {
        setDataLoan(response.data.data)
      })
      .catch((error) => {
        console.error('Error:', error?.message)
      })
  }, [])

  const {values, touched, errors, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues: {
      type_name: data.type_name || '',
      description: data.description || '',
    },
    validationSchema: CreateLoanTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      if (title === 'New') {
        try {
          await request.post('config/loan_type', {
            ...values,
            status: status ? 1 : 0,
          })
          handleClose()
          resetForm()
          setStatus(false)
          setLoadApi(!loadApi)
          swalToast.fire({
            icon: 'success',
            title: 'Created Loan Successfully',
          })
        } catch (error) {
          console.error(error)
          swalToast.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again!',
          })
        }
      } else {
        try {
          await request.post(`config/loan_type/${data.id}`, {
            ...values,
            status: status ? 1 : 0,
          })
          handleClose()
          setLoadApi(!loadApi)
          swalToast.fire({
            icon: 'success',
            title: 'Updated Loan Type Successfully',
          })
        } catch (error) {
          console.error(error)
          console.error(error)
          swalToast.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again!',
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
      <div className='modal-header'>
        <h2>{title} Loan Type</h2>
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
                id='type_name'
                error={errors.type_name}
                touched={touched.type_name}
                errorTitle={errors.type_name}
                value={values.type_name}
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
              <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid '>
                  <div style={{fontWeight: 500, fontSize: 14}}>Status</div>
                <input
                  className='form-check-input ms-4'
                  style={{width: 50, height: 25}}
                  type='checkbox'
                  name='notifications'
                  onChange={() => setStatus(!status)}
                  checked={status}
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

export default CreateLoanType
