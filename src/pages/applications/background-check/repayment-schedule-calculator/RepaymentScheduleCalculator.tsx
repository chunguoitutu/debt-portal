import React, {useRef, useState} from 'react'
import * as Yup from 'yup'
import {createPortal} from 'react-dom'
import {Modal, Table} from 'react-bootstrap'
import {useFormik} from 'formik'
import './style.scss'
import {REPAYMENT_SHEDULE_CALCULATOR_CONFIG, REPAYMENT_SHEDULE_TABLES} from './config'
import {DEFAULT_MSG_ERROR, STEP_REPAYMENT_SCHEDULE_CALCULATOR} from '@/app/constants'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {KTIcon} from '@/_metronic/helpers'
import Input from '@/components/input'
import ErrorMessage from '@/components/error/ErrorMessage'
import Select from '@/components/select/select'
import Step from '@/components/step/Step'
import {MONTHLY_DUE_DATE} from '@/app/utils'
import {formatNumber} from '@/app/utils'

type Props = {
  setLoadApi: any
  loadapi: boolean
  show: boolean
  handleClose: () => void
}

type ResponseRepayment = {
  balance_principal: number
  instalment_due_date: string
  instalment_no: number
  interest_per_month: number
  principal_per_month: number
}

export const RepaymentScheduleCalculatorSchema = Yup.object().shape({
  totalsAmount: Yup.string().required('Amount of Loan $ is required.'),
  per_month_percent: Yup.string().required('Interest per Month % is required.'),
  totalsMonthPayment: Yup.string().required('No. of Instalment is required.'),
  first_repayment_date: Yup.string().required('First Repayment Date is required.'),
  monthly_due_date: Yup.string().required('Monthly Due Date is required.'),
})
const modalsRoot = document.getElementById('root-modals') || document.body
const RepaymentScheduleCalculator = ({show, handleClose, loadapi, setLoadApi}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [dataRepayment, setDataRepayment] = useState<ResponseRepayment[]>([])
  function handleChangeStep(step: number) {
    setCurrentStep(step)
  }
  const {rows} = REPAYMENT_SHEDULE_CALCULATOR_CONFIG
  const {rows: rowsTable} = REPAYMENT_SHEDULE_TABLES
  const {values, touched, errors, handleChange, handleSubmit, handleBlur} = useFormik({
    initialValues: {
      totalsAmount: '',
      per_month_percent: '',
      totalsMonthPayment: '',
      first_repayment_date: '',
      monthly_due_date: '1',
    },
    validationSchema: RepaymentScheduleCalculatorSchema,
    onSubmit: async (values: any, actions: any) => {
      try {
        const {data} = await request.post('/calculate', {
          ...values,
        })
        if (data.data) {
          setDataRepayment(data.data)
          setCurrentStep(2)
        }
      } catch (error) {
        swalToast.fire({
          icon: 'error',
          title: DEFAULT_MSG_ERROR,
        })
      }
    },
  })
  const dataFooterTable = React.useMemo(() => {
    if (dataRepayment) {
      return dataRepayment.reduce(
        (a, b) => {
          const {interest_per_month, principal_per_month} = b
          return {
            totalPrinciple: a['totalPrinciple'] + principal_per_month,
            totalInterest: a['totalInterest'] + interest_per_month,
            totalMonthlyInst: a['totalMonthlyInst'] + (interest_per_month + principal_per_month),
          }
        },
        {
          totalInterest: 0,
          totalMonthlyInst: 0,
          totalPrinciple: 0,
        }
      )
    }
    return {
      totalInterest: 0,
      totalMonthlyInst: 0,
      totalPrinciple: 0,
    }
  }, [dataRepayment])
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
      <div
        style={{
          padding: '30px',
        }}
        className='modal-header p-30px d-flex align-items-center justify-content-between'
      >
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
        className={`table-calculator-style modal-body p-30px overflow-y-auto `}
        style={{
          maxHeight: 'calc(100vh - 200px)',
        }}
      >
        <div ref={stepperRef}>
          <div style={{width: '100%'}} className=''>
            <div style={{width: '100%'}} className=' d-flex  justify-content-between'>
              <div className='step-repayment-schedule'>
                <Step
                  data={STEP_REPAYMENT_SCHEDULE_CALCULATOR}
                  stepCompleted={0}
                  currentStep={currentStep}
                  onGoToStep={handleChangeStep}
                />
              </div>
              {currentStep === 1 ? (
                <>
                  <div style={{width: '60.3%'}} className='ps-30px'>
                    {rows?.map((row) => (
                      <div key={row?.key}>
                        {row?.typeText === 'date' || row?.typeText === 'select' ? (
                          <>
                            {row?.typeText === 'date' && (
                              <div className='d-flex flex-column mb-16px'>
                                <Input
                                  required={row?.require ? true : false}
                                  title={row?.name}
                                  name={row?.key}
                                  value={values[row?.key] || ''}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  type='date'
                                />
                                {errors[row.key] && touched[row.key] && (
                                  <ErrorMessage message={errors[row.key]} />
                                )}
                              </div>
                            )}
                            {row.typeText === 'select' && (
                              <Select
                                label={row?.name}
                                required={!!row?.require}
                                isOptionDefault={false}
                                id={row?.key}
                                name={row.key}
                                onChange={handleChange}
                                error={errors[row?.key]}
                                onBlur={handleBlur}
                                touched={touched[row?.key]}
                                errorTitle={errors[row?.key]}
                                options={MONTHLY_DUE_DATE || []}
                                value={values[row?.key] || ''}
                              />
                            )}
                          </>
                        ) : (
                          <div className='d-flex flex-column mb-16px'>
                            <Input
                              required={row?.require ? true : false}
                              title={row?.name}
                              name={row?.key}
                              onBlur={handleBlur}
                              type={row.type}
                              noThereAreCommas={row?.noThereAreCommas}
                              value={values[row?.key] || ''}
                              onChange={handleChange}
                            />
                            {errors[row.key] && touched[row.key] && (
                              <ErrorMessage message={errors[row.key]} />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
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
                </>
              ) : (
                <>
                  <div>
                    {/* information for calculator */}
                    <div className='d-flex amount-header-calculator flex-row gap-10'>
                      <div className='gap-1 p-6 ms-3' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>Amount Of Loan $</div>
                        <div className='fs-3 fw-bold'>${formatNumber(values.totalsAmount)}</div>
                      </div>
                      <div className='gap-1 p-6' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>No. Of Instalment</div>
                        <div className='fs-3 fw-bold'>{values.totalsMonthPayment}</div>
                      </div>
                      <div className='gap-1 p-6' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>Monthly Due Date</div>
                        <div className='fs-3 fw-bold'>{values.monthly_due_date}</div>
                      </div>
                      <div className='gap-1 p-6' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>Interest Per Month %</div>
                        <div className='fs-3 fw-bold'>
                          {formatNumber(values.per_month_percent)}%
                        </div>
                      </div>
                      <div className='gap-1 p-6' style={{width: 'fit-content'}}>
                        <div className='fs-7 fw-medium'>First Repayment Date</div>
                        <div className='fs-3 fw-bold'>{values.first_repayment_date}</div>
                      </div>
                    </div>
                    {/* calculator table */}
                    <div className='pt-7 row algin-items-center justify-content-between'>
                      <div className='col-6'>
                        <Table className='table-bordered' responsive='sm'>
                          <tbody className='border-calculator'>
                            <tr>
                              <td className='label-calculator'>Loan Amount</td>
                              <td className='content-calculator'>
                                ${formatNumber(values.totalsAmount)}
                              </td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Interest (Per Month)</td>
                              <td className='content-calculator'>
                                {formatNumber(values.per_month_percent)}%
                              </td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Interest (Per Annum)</td>
                              <td className='content-calculator'>
                                {formatNumber(+values.per_month_percent * 12)}%
                              </td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Term</td>
                              <td className='content-calculator text-transform-none'>
                                {values.totalsMonthPayment} Month(s)
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className='col-6'>
                        <Table responsive='sm' className='table-bordered'>
                          <tbody>
                            <tr>
                              <td className='label-calculator'>Principal (Per Month)</td>
                              <td className='content-calculator'>
                                ${formatNumber(+values.totalsAmount / +values.totalsMonthPayment)}
                              </td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Interest (Per Month)</td>
                              <td className='content-calculator'>
                                $
                                {formatNumber(
                                  dataFooterTable.totalInterest / +values.totalsMonthPayment
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Monthly Instalment Amount</td>
                              <td className='content-calculator'>
                                $
                                {formatNumber(
                                  dataFooterTable.totalInterest / +values.totalsMonthPayment +
                                    +values.totalsAmount / +values.totalsMonthPayment
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className='label-calculator'>Total Interest For Full Term</td>
                              <td className='content-calculator'>
                                ${formatNumber(dataFooterTable.totalInterest)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    {/* table show charge per month */}
                    <div className='overflow-y-auto pt-4'>
                      <Table responsive='sm' className='table-bordered'>
                        <thead style={{backgroundColor: '#F9F9F9'}}>
                          <tr>
                            {rowsTable.map((el) => (
                              <th key={el.name} className='border-right-table p-4 label-calculator'>
                                {el.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dataRepayment.map((el, index) => {
                            const {interest_per_month, principal_per_month, instalment_due_date} =
                              el
                            const table = rowsTable.map((rt) => {
                              switch (rt.key) {
                                case 'instalment_due_date':
                                  return (
                                    <td key={rt.key} className='p-4 content-calculator fs-4'>
                                      {instalment_due_date}
                                    </td>
                                  )
                                case 'monthly_inst_amount':
                                  return (
                                    <td key={rt.key} className='p-4 content-calculator fs-4'>
                                      ${formatNumber(principal_per_month + interest_per_month)}
                                    </td>
                                  )
                                default:
                                  return (
                                    <td key={rt.key} className='p-4 content-calculator fs-4'>
                                      ${formatNumber(el[rt.key])}
                                    </td>
                                  )
                              }
                            })
                            return <tr key={index}>{table}</tr>
                          })}
                          <tr style={{backgroundColor: '#F9F9F9'}}>
                            <td className='border-right-table p-4 label-calculator fs-4'>Total</td>
                            <td className='border-right-table p-4 label-calculator fs-4'>
                              ${formatNumber(dataFooterTable.totalPrinciple)}
                            </td>
                            <td className='border-right-table p-4 label-calculator fs-4'>
                              ${formatNumber(dataFooterTable.totalInterest)}
                            </td>
                            <td className='border-right-table p-4 label-calculator fs-4'>
                              ${formatNumber(dataFooterTable.totalMonthlyInst)}
                            </td>
                            <td className='border-right-table p-4 label-calculator fs-4'></td>
                          </tr>
                        </tbody>
                      </Table>
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
                        onClick={() => setCurrentStep(1)}
                        type='submit'
                        className='btn btn-lg btn-primary '
                      >
                        Recalculate
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}
export default RepaymentScheduleCalculator
