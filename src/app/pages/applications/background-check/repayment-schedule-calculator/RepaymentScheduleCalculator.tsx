import * as Yup from 'yup'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {REPAYMENT_SHEDULE_CALCULATOR_CONFIG} from './config'
import {InputTime} from '../../../../components/inputs/inputTime'
import {Input} from '../../../../components/inputs/input'
import {KTIcon} from '../../../../../_metronic/helpers'
import {useRef} from 'react'
import {useFormik} from 'formik'

type Props = {
  setLoadApi: any
  loadapi: boolean
  show: boolean
  handleClose: () => void
}
export const RepaymentScheduleCalculatorSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required.'),
  lastname: Yup.string().required('Last name is required.'),
  username: Yup.string().required('User name is required.'),
  company_id: Yup.string().required('Branch is required.'),
  role_id: Yup.string().required('Role is required.'),
  email: Yup.string().email("Email isn't valid").required('Email is required.'),
  telephone: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(11, 'Maximum 11 symbols')
    .required('Telephone is required.'),
})
const modalsRoot = document.getElementById('root-modals') || document.body
const RepaymentScheduleCalculator = ({show, handleClose, loadapi, setLoadApi}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const {rows} = REPAYMENT_SHEDULE_CALCULATOR_CONFIG

  const {values, touched, errors, handleChange, handleSubmit} = useFormik({
    initialValues: {},
    validationSchema: RepaymentScheduleCalculatorSchema,
    onSubmit: async (values: any, actions: any) => {},
  })

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
        <h2>Repayment Schedule Calculator</h2>
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
                        noThereAreCommas={row?.noThereAreCommas}
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
            </div>

            <div className='d-flex flex-end pt-10'>
              <button
                onClick={() => handleSubmit()}
                type='submit'
                className='btn btn-lg btn-primary'
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export default RepaymentScheduleCalculator
