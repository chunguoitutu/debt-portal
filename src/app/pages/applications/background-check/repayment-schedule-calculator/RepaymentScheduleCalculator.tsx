import * as Yup from 'yup'
import {createPortal} from 'react-dom'
import {Modal, Table} from 'react-bootstrap'
import {REPAYMENT_SHEDULE_CALCULATOR_CONFIG} from './config'
import {InputTime} from '../../../../components/inputs/inputTime'
import {Input} from '../../../../components/inputs/input'
import {KTIcon} from '../../../../../_metronic/helpers'
import React, {useRef, useState} from 'react'
import {useFormik} from 'formik'
import Step from '../../../../components/step/Step'
import {STEP_REPAYMENT_SCHEDULE_CALCULATOR} from '../../../../constants/step'
import './style.scss'

type Props = {
  setLoadApi: any
  loadapi: boolean
  show: boolean
  handleClose: () => void
}
export const RepaymentScheduleCalculatorSchema = Yup.object().shape({
  amount_of_loan: Yup.string().required('Amount of Loan $ is required.'),
  interest_per_month: Yup.string().required('Interest per Month % is required.'),
  no_of_instalment: Yup.string().required('No. of Instalment is required.'),
  first_repayment_date: Yup.string().required('First Repayment Date is required.'),
  monthly_due_date: Yup.string().required('Monthly Due Date is required.'),
})
const modalsRoot = document.getElementById('root-modals') || document.body
const RepaymentScheduleCalculator = ({show, handleClose, loadapi, setLoadApi}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [stepCompleted] = useState<number>(1)
  function handleChangeStep(step: number) {
    setCurrentStep(step)
  }
  const {rows} = REPAYMENT_SHEDULE_CALCULATOR_CONFIG

  function handleChangeCalculator() {
    setCurrentStep(2)
  }
  const {values, touched, errors, handleChange, handleSubmit} = useFormik({
    initialValues: {
      amount_of_loan: '',
      interest_per_month: '',
      no_of_instalment: '',
      first_repayment_date: '',
      monthly_due_date: '',
    },
    validationSchema: RepaymentScheduleCalculatorSchema,
    onSubmit: async (values: any, actions: any) => {
      handleChangeCalculator()
    },
  })

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-modal'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header p-30px d-flex align-items-center justify-content-between'>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            fontStyle: 'normal',
            lineHeight: '24px',
            textTransform: 'capitalize',
            color: '#071437',
          }}
          className='mb-0px'
        >
          Repayment Schedule Calculator
        </h2>
        <div
          style={{width: '24px', height: '24px'}}
          className='btn btn-sm  btn-icon  btn-active-color-primary'
          onClick={handleClose}
        >
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>

      <div
        className={`modal-body py-lg-10 px-lg-10 overflow-y-auto `}
        style={{
          maxHeight: 'calc(100vh - 200px)',
        }}
      >
        <div ref={stepperRef}>
          <div style={{width: '100%'}} className=''>
            <div style={{width: '100%'}} className=' d-flex  justify-content-between'>
              <div>
                <Step
                  data={STEP_REPAYMENT_SCHEDULE_CALCULATOR}
                  stepError={[1, 2]}
                  stepCompleted={stepCompleted}
                  currentStep={currentStep}
                  onGoToStep={handleChangeStep}
                />
              </div>
              {currentStep === 1 ? (
                <>
                  <div style={{width: '60.3%'}} className='ps-30px'>
                    {rows.map((row) => (
                      <div key={row.key}>
                        {row.key === 'first_repayment_date' ? (
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
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {/* information for calculator */}
                    <div className='d-flex amount-header-calculator flex-row gap-10'>
                      <div className='gap-1 p-6 ms-3' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>Amount Of Loan $</div>
                        <div className='fs-3 fw-bold'>$25,000.00</div>
                      </div>
                      <div className='gap-1 p-6' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>No. Of Instalment</div>
                        <div className='fs-3 fw-bold'>$25,000.00</div>
                      </div>
                      <div className='gap-1 p-6' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>Monthly Due Date</div>
                        <div className='fs-3 fw-bold'>$25,000.00</div>
                      </div>
                      <div className='gap-1 p-6' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>Interest Per Month %</div>
                        <div className='fs-3 fw-bold'>4.00</div>
                      </div>
                      <div className='gap-1 p-6' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>First Repayment Date</div>
                        <div className='fs-3 fw-bold'>4.00</div>
                      </div>
                    </div>

                    {/* calculator table */}
                    <div className='pt-4 row algin-items-center justify-content-between '>
                      <div className='col-6'>
                        <Table className='table-bordered' responsive='sm'>
                          <tbody className='border-calculator'>
                            <tr>
                              <td className='label-calculator'>Loan Amount</td>
                              <td className='content-calculator'>$25,000.00</td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Interest (Per Month)</td>
                              <td className='content-calculator'>T4.00%</td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Interest (Per Annum)</td>
                              <td className='content-calculator'>48.00%</td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Term</td>
                              <td className='content-calculator'>1 Month (S)</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className='col-6 '>
                        <Table responsive='sm' className='table-bordered'>
                          <tbody>
                            <tr>
                              <td className='label-calculator'>Principal (Per Month)</td>
                              <td className='content-calculator'>$25,000.00</td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Interest (Per Month)</td>
                              <td className='content-calculator'>$1,000.00</td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Monthly Instalment Amount</td>
                              <td className='content-calculator'>$26,000.00</td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Total Interest For Full Term</td>
                              <td className='content-calculator'>$1,000.00</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className='d-flex flex-end pt-30px gap-8px'>
              <button
                onClick={handleClose}
                type='reset'
                className='btn btn-secondary align-self-center'
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit()}
                type='submit'
                className='btn btn-lg btn-primary '
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
