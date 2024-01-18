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
import clsx from 'clsx'

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
  quota_new: Yup.string().required('Quota For New Borrower is required'),
  quota_existing: Yup.string().required('Quota For Existing Borrower is required'),
  quota_foreigner: Yup.string().required('Quota For Foreigner Borrower is required'),
  late_fee: Yup.string().required('Late Fee is required'),
  late_interest: Yup.number()
    .required('Late Interest is required')
    .max(100, 'Late Fee must be at most 100')
    .positive('Late Fee must be a positive number'),
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
            late_interest: +values.late_interest,
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
            late_interest: +values.late_interest,
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
      dialogClassName='modal-dialog modal-dialog-centered mw-800px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <>
        <div className='modal-header padding-model-header'>
          <h2 className='m-0'>{title} Loan Type</h2>
          <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
            <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
          </div>
        </div>
        <div
          style={{
            maxHeight: 'calc(100vh - 400px)',
            overflowY: 'auto',
            padding: '30px 27px 30px 30px',
          }}
          className='modal-body row'
        >
          {rows.map((row, i) => {
            const {infoCreateEdit, name, key} = row
            const {
              typeInput,
              isRequired,
              typeComponent,
              component,
              subTextWhenChecked,
              subTextWhenNoChecked,
              column,
            } = infoCreateEdit || {}

            const Component = component as any

            if (['id', 'status'].includes(row.key)) {
              return null
            }

            const props = row.key === 'interest' ? {noThereAreCommas: false} : {}

            if (typeComponent === 'checkbox-rounded') {
              return (
                <div className='mt-16px col-6' key={i}>
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
              <div className={clsx(['mb-16px', column ? 'col-6' : 'col-12'])} key={i}>
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
            )
          })}
          <div className='mt-16px col-6'>
            <CheckboxRounded
              label='Status'
              checked={status}
              onChange={() => setStatus(!status)}
              id='status'
            />
          </div>
        </div>

        <div className='border-top border-gray-200'>
          <div className='d-flex justify-content-end py-30px ps-30px pe-30px'>
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
