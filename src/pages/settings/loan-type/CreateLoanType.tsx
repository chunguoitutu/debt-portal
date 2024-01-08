/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {LOAN_TYPE_TABLE_CONFIG} from './config'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {convertErrorMessageResponse} from '@/app/utils'
import {KTIcon} from '@/_metronic/helpers'
import {TextArea} from '@/components/textarea'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {CheckboxRounded} from '@/components/checkbox'
import {useAuth} from '@/app/context/AuthContext'

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
  type_name: Yup.string()
    .required('Loan Type is required')
    .max(45, 'Loan Type must be at most 45 characters'),
  description: Yup.string().max(45, 'Description must be at most 45 characters').nullable(),
  interest: Yup.string().required('Default Interest is required'),
  late_fee: Yup.number()
    .max(100, 'Late Fee must be at most 100')
    .positive('Late Fee must be a positive number')
    .integer('Late Fee must be an integer'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateLoanType = ({
  show,
  handleClose,
  title = 'New',
  data = {},
  loadApi,
  setLoadApi,
  handleUpdated,
}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [status, setStatus] = useState(data?.status === 0 ? false : true)
  const {rows, endpoint} = LOAN_TYPE_TABLE_CONFIG
  const {company_id} = useAuth()
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setSubmitting,
    validateForm,
    setTouched,
  } = useFormik({
    initialValues: {
      ...data,
      is_default: data.is_default === 1 ? true : false,
    },
    validationSchema: CreateLoanTypeSchema,
    onSubmit: async (values, actions: any) => {
      if (title === 'New') {
        try {
          const {data} = await request.post(endpoint || '', {
            ...values,
            status: status ? 1 : 0,
            is_default: values.is_default ? 1 : 0,
            company_id: +company_id,
          })
          if (!data.error) {
            const loan_name = values.type_name
            handleUpdated()
            handleClose()
            resetForm()
            setStatus(false)
            setLoadApi(!loadApi)
            swalToast.fire({
              timer: 1500,
              icon: 'success',
              title: `Loan Type "${loan_name}" successfully created`,
            })
          } else {
            swalToast.fire({
              timer: 1500,
              icon: 'error',
              title: `Something went wrong. Please try again!`,
            })
          }
        } catch (error) {
          const message = convertErrorMessageResponse(error)
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: message,
          })
        } finally {
          setSubmitting(false)
        }
      } else {
        try {
          await request.post(endpoint + '/' + data?.id, {
            ...values,
            status: status ? 1 : 0,
            is_default: values.is_default ? 1 : 0,
            company_id: +company_id,
          })
          const loan_name = values.type_name
          handleUpdated()
          handleClose()
          setLoadApi(!loadApi)
          swalToast.fire({
            timer: 1500,
            icon: 'success',
            title: `Loan Type "${loan_name}" successfully updated`,
          })
        } catch (error) {
          const message = convertErrorMessageResponse(error)
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: message,
          })
        } finally {
          setSubmitting(false)
        }
      }
    },
  })

  const handleBeforeSubmit = async () => {
    const checkingErrors = await validateForm(values)
    if (Object.keys(checkingErrors).length) {
      const error = Object.keys(checkingErrors).reduce((acc, curr) => ({...acc, [curr]: true}), {})
      setTouched({
        ...touched,
        ...error,
      })
    } else {
      handleSubmit()
    }
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <>
        <div
          style={{
            padding: '30px',
          }}
          className='modal-header'
        >
          <h2>{title} Loan Type</h2>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <div
          style={{maxHeight: 'calc(100vh - 500px)', overflowY: 'auto'}}
          className='modal-body  p-30px '
        >
          <div
            ref={stepperRef}
            className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
            id='kt_modal_create_app_stepper'
          >
            <div className='flex-row-fluid'>
              <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
                {rows.map((row, i) => {
                  const {infoCreateEdit, name, key} = row
                  const {
                    typeInput,
                    isRequired,
                    typeComponent,
                    component,
                    subTextWhenChecked,
                    subTextWhenNoChecked,
                  } = infoCreateEdit || {}

                  const Component = component as any

                  if (['id', 'status'].includes(row.key)) {
                    return null
                  }

                  const props = row.key === 'interest' ? {noThereAreCommas: false} : {}

                  if (typeComponent === 'checkbox-rounded') {
                    return (
                      <div className='mt-16px' key={i}>
                        <Component
                          label={name}
                          checked={values[key]}
                          onChange={handleChange}
                          subTextWhenChecked={subTextWhenChecked}
                          subTextWhenNoChecked={subTextWhenNoChecked}
                          id={key}
                        />
                      </div>
                    )
                  }

                  return (
                    <div key={row.key} style={{flex: '0 0 50%'}}>
                      {row.key === 'description' ? (
                        <div>
                          <TextArea
                            label={row.name}
                            name={row.key}
                            value={values[row.key] || ''}
                            onChange={handleChange}
                            error={errors[row.key] as string}
                            touched={!!touched[row.key]}
                          />
                        </div>
                      ) : (
                        <div className='d-flex flex-column mb-16px '>
                          <Input
                            type={typeInput || 'text'}
                            label={row.name}
                            name={row.key}
                            value={values[row.key] || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={isRequired}
                            error={errors[row.key] as string}
                            touched={!!touched[row.key]}
                            {...props}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
                <div className='mt-16px'>
                  <CheckboxRounded
                    label='Status'
                    checked={status}
                    onChange={() => setStatus(!status)}
                    id='status'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='border-top border-gray-200'>
          <div className='d-flex justify-content-end p-30px'>
            <Button
              type='reset'
              onClick={() => handleClose()}
              className='btn-lg btn-secondary align-self-center me-8px fs-6'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='btn-lg btn-primary fs-6'
              onClick={handleBeforeSubmit}
              loading={isSubmitting}
            >
              {title === 'New' ? 'Create' : 'Update'}
            </Button>
          </div>
        </div>
      </>
    </Modal>,
    modalsRoot
  )
}

export default CreateLoanType
