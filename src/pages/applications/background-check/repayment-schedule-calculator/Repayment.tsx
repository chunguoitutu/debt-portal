import React, {useEffect, useRef, useState} from 'react'
import {Table} from 'react-bootstrap'
import * as Yup from 'yup'
import moment from 'moment'
import {useFormik} from 'formik'
import './style.scss'

import {REPAYMENT_SHEDULE_CALCULATOR_CONFIG, REPAYMENT_SHEDULE_TABLES} from './config'
import {DEFAULT_MSG_ERROR, STEP_REPAYMENT_SCHEDULE_CALCULATOR} from '@/app/constants'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {Input} from '@/components/input'
import {Select} from '@/components/select'
import Step from '@/components/step/Step'
import {MONTHLY_DUE_DATE, getCurrentDate} from '@/app/utils'
import {formatNumber} from '@/app/utils'
import Button from '@/components/button/Button'

type Props = {
  handleClose: any
  mobile?: boolean
}

type ResponseRepayment = {
  balance_principal: number
  instalment_due_date: string
  instalment_no: number
  interest_per_month: number
  principal_per_month: number
}

export const RepaymentScheduleCalculatorSchema = Yup.object().shape({
  totalsAmount: Yup.string().required('Amount of Loan $ is required'),
  per_month_percent: Yup.string().required('Interest per Month % is required'),
  totalsMonthPayment: Yup.string().required('No. of Instalment is required'),
  first_repayment_date: Yup.string().required('First Repayment Date is required'),
  monthly_due_date: Yup.string().required('Monthly Due Date is required'),
})
const Repayment = ({handleClose, mobile = false}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [dataRepayment, setDataRepayment] = useState<ResponseRepayment[]>([])
  function handleChangeStep(step: number) {
    setCurrentStep(step)
    if (stepperRef.current) {
      stepperRef.current.scrollTop = 0
    }
  }
  const {rows} = REPAYMENT_SHEDULE_CALCULATOR_CONFIG
  const {rows: rowsTable} = REPAYMENT_SHEDULE_TABLES
  const {values, touched, errors, handleChange, handleSubmit, handleBlur, setFieldValue} =
    useFormik({
      initialValues: {
        totalsAmount: '',
        per_month_percent: '4.0',
        totalsMonthPayment: '1',
        first_repayment_date: moment(new Date()).format('YYYY-MM-DD'),
        monthly_due_date: getCurrentDate(),
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

  const getDayWithSuffix = (day) => {
    const dString = String(day)
    const last = +dString.slice(-2)
    if (last > 3 && last < 21) return 'th'
    switch (last % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const formattedMonthlyDueDate =
    values.monthly_due_date + getDayWithSuffix(values.monthly_due_date)

  useEffect(() => {
    if (parseInt(values.totalsMonthPayment, 10) > 1) {
      setFieldValue('per_month_percent', '3.95')
    } else {
      setFieldValue('per_month_percent', '4.0')
    }
  }, [values.totalsMonthPayment])

  return (
    <div
      className={`table-calculator-style modal-body px-30px py-0 `}
      style={{
        maxHeight: mobile ? 'calc(100vh - 100px)' : 'calc(100vh - 200px)',
        overflowY: 'auto',
      }}
    >
      <div ref={stepperRef}>
        <div style={{width: '100%'}} className='pt-30px'>
          <div style={{width: '100%'}} className=' d-xxl-flex  justify-content-between'>
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
                <div
                  style={{
                    width: mobile ? 'calc(100% - 10px)' : '60.3%',
                    marginTop: mobile ? '30px' : '0',
                    paddingLeft: mobile ? '0px' : '30px',
                  }}
                >
                  {rows?.map((row) => (
                    <div key={row?.key}>
                      {row?.typeComponent === 'select' ? (
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
                          options={MONTHLY_DUE_DATE || []}
                          value={values[row?.key] || ''}
                        />
                      ) : (
                        <div className='d-flex flex-column mb-16px'>
                          <Input
                            required={row?.require ? true : false}
                            label={row?.name}
                            name={row?.key}
                            onBlur={handleBlur}
                            type={row.type}
                            noThereAreCommas={row?.noThereAreCommas}
                            value={values[row?.key] || ''}
                            onChange={handleChange}
                            error={errors[row.key] as string}
                            touched={!!touched[row.key]}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className='d-flex flex-end py-30px '>
                    <Button
                      onClick={handleClose}
                      type='reset'
                      className='btn-lg btn-secondary fs-6 me-8px'
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleSubmit()}
                      type='submit'
                      className='btn btn-lg btn-primary fs-6'
                    >
                      Calculate
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className='position-relative'
                  style={{
                    width: mobile ? 'calc(100% - 10px)' : '100%',
                    marginTop: mobile ? '30px' : '0',
                    paddingLeft: mobile ? '00px' : '30px',
                  }}
                >
                  {/* information for calculator */}
                  <div
                    className={`d-flex amount-header-calculator   ${
                      mobile ? ' flex-column ' : 'gap-10 flex-row '
                    } `}
                  >
                    <div
                      className={`${
                        mobile ? '' : 'gap-10 '
                      } d-flex justify-content-start algin-items-center w-100`}
                    >
                      <div
                        className='gap-1 p-6 w'
                        style={{width: mobile ? '170px' : 'fit-content', minWidth: 'auto'}}
                      >
                        <div className='fs-7 fw-medium text-gray-600 text-nowrap'>
                          Amount Of Loan $
                        </div>
                        <div className='fs-4 fw-semibold'>${formatNumber(values.totalsAmount)}</div>
                      </div>
                      <div
                        className='gap-1 p-6'
                        style={{width: mobile ? '170px' : 'fit-content', minWidth: 'auto'}}
                      >
                        <div className='fs-7 fw-medium text-gray-600 text-nowrap'>
                          No. Of Instalment
                        </div>
                        <div className='fs-4 fw-semibold'>{values.totalsMonthPayment}</div>
                      </div>
                      <div
                        className={`gap-1 p-6`}
                        style={{width: mobile ? '170px' : 'fit-content', minWidth: 'auto'}}
                      >
                        <div className='fs-7 fw-medium text-gray-600 text-nowrap'>
                          Monthly Due Date
                        </div>
                        <div className='fs-4 fw-semibold'>{formattedMonthlyDueDate}</div>
                      </div>
                    </div>
                    <div
                      className={`${
                        mobile ? ' ' : 'gap-10 '
                      } d-flex justify-content-start algin-items-center w-100`}
                    >
                      <div
                        className='gap-1 p-6'
                        style={{width: mobile ? '170px' : 'fit-content', minWidth: 'auto'}}
                      >
                        <div className='fs-7 fw-medium text-gray-600 text-nowrap'>
                          Interest Per Month %
                        </div>
                        <div className='fs-4 fw-semibold'>
                          {formatNumber(values.per_month_percent)}
                        </div>
                      </div>
                      <div
                        className='gap-1 p-6'
                        style={{width: mobile ? '170px' : 'fit-content', minWidth: 'auto'}}
                      >
                        <div className='fs-7 fw-medium text-gray-600 text-nowrap'>
                          First Repayment Date
                        </div>
                        <div className='fs-4 fw-semibold'>
                          {moment(values.first_repayment_date).format('MMM DD, YYYY')}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* calculator table */}
                  <div className='pt-24px row algin-items-center justify-content-between'>
                    <div className={`${mobile ? 'col-12 ' : 'col-6'} `}>
                      <Table className='table-bordered mb-24px ' responsive='sm'>
                        <tbody className='border-calculator'>
                          <tr>
                            <td className='label-calculator'>Loan Amount</td>
                            <td className='content-calculator w-200px p-12px'>
                              ${formatNumber(values.totalsAmount)}
                            </td>
                          </tr>
                          <tr>
                            <td className='label-calculator'>Interest (Per Month)</td>
                            <td className='content-calculator w-200px p-12px'>
                              {formatNumber(values.per_month_percent)}%
                            </td>
                          </tr>
                          <tr>
                            <td className='label-calculator'>Interest (Per Annum)</td>
                            <td className='content-calculator w-200px p-12px'>
                              {formatNumber(+values.per_month_percent * 12)}%
                            </td>
                          </tr>
                          <tr>
                            <td className='label-calculator'>Term</td>
                            <td className='content-calculator text-transform-none w-200px'>
                              {values.totalsMonthPayment} Month(s)
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className={`${mobile ? 'col-12' : 'col-6'}`}>
                      <Table responsive='sm' className='table-bordered mb-24px'>
                        <tbody>
                          <tr>
                            <td className='label-calculator'>Principal (Per Month)</td>
                            <td className='content-calculator w-200px p-12px'>
                              ${formatNumber(+values.totalsAmount / +values.totalsMonthPayment)}
                            </td>
                          </tr>
                          <tr>
                            <td className='label-calculator'>Interest (Per Month)</td>
                            <td className='content-calculator w-200px p-12px'>
                              $
                              {formatNumber(
                                dataFooterTable.totalInterest / +values.totalsMonthPayment
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className='label-calculator'>Monthly Instalment Amount</td>
                            <td className='content-calculator w-200px p-12px'>
                              $
                              {formatNumber(
                                dataFooterTable.totalInterest / +values.totalsMonthPayment +
                                  +values.totalsAmount / +values.totalsMonthPayment
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className='label-calculator'>Total Interest For Full Term</td>
                            <td className='content-calculator w-200px'>
                              ${formatNumber(dataFooterTable.totalInterest)}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  {/* table show charge per month */}
                  <div className='overflow-y-auto pt-0'>
                    <Table responsive='sm' className='table-bordered'>
                      <thead style={{backgroundColor: '#F9F9F9'}}>
                        <tr>
                          {rowsTable.map((el) => (
                            <th
                              key={el.name}
                              className='border-right-table p-12px label-calculator align-top'
                            >
                              {el.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dataRepayment.map((el, index) => {
                          const {interest_per_month, principal_per_month, instalment_due_date} = el
                          const table = rowsTable.map((rt) => {
                            switch (rt.key) {
                              case 'instalment_due_date':
                                return (
                                  <td key={rt.key} className='p-12px content-calculator fs-4'>
                                    {moment(instalment_due_date).format('MM/DD/YYYY')}
                                  </td>
                                )
                              case 'monthly_inst_amount':
                                return (
                                  <td key={rt.key} className='p-12px content-calculator fs-4'>
                                    ${formatNumber(principal_per_month + interest_per_month)}
                                  </td>
                                )
                              default:
                                return (
                                  <td key={rt.key} className='p-12px content-calculator fs-4'>
                                    ${formatNumber(el[rt.key])}
                                  </td>
                                )
                            }
                          })
                          return <tr key={index}>{table}</tr>
                        })}
                        <tr style={{backgroundColor: '#F9F9F9'}}>
                          <td className='border-right-table p-12px label-calculator fs-4'>Total</td>
                          <td className='border-right-table p-12px label-calculator fs-4'>
                            ${formatNumber(dataFooterTable.totalPrinciple)}
                          </td>
                          <td className='border-right-table p-12px label-calculator fs-4'>
                            ${formatNumber(dataFooterTable.totalInterest)}
                          </td>
                          <td className='border-right-table p-12px label-calculator fs-4'>
                            ${formatNumber(dataFooterTable.totalMonthlyInst)}
                          </td>
                          <td className='border-right-table p-12px label-calculator fs-4'></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className='d-flex flex-end btn-repayment-schedule-calculator py-30px'>
                    <Button
                      onClick={handleClose}
                      type='reset'
                      className='btn-lg btn-secondary me-8px'
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(1)}
                      type='submit'
                      className='btn-lg btn-primary'
                    >
                      Recalculate
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Repayment
