/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'

import * as Yup from 'yup'
import {LOAN_TYPE_TABLE_CONFIG} from './LoanTableConfig'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {convertErrorMessageResponse} from '@/app/utils'
import {KTIcon} from '@/_metronic/helpers'
import TextArea from '@/components/textarea/TextArea'
import ErrorMessage from '@/components/error/ErrorMessage'
import Input from '@/components/input'
import InputCheck from '@/components/input/InputCheckRounded'
import Button from '@/components/button/Button'

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
  const [status, setStatus] = useState(data?.status === 0 ? false : true)
  const {rows, endpoint} = LOAN_TYPE_TABLE_CONFIG
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
    },
    validationSchema: CreateLoanTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      if (title === 'New') {
        try {
          const {data} = await request.post(endpoint || '', {
            ...values,
            status: status ? 1 : 0,
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
        <div className='modal-header' style={{padding: 30}}>
          <h2>{title} Loan Type</h2>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <div className='flex-row-fluid' style={{padding: 30}}>
          <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
            {rows.map((row) => {
              const {infoCreateEdit, key} = row || {}
              const {isRequired, typeInput} = infoCreateEdit || {}

              if (['id', 'status'].includes(row.key)) {
                return null
              }

              const props = row.key === 'interest' ? {noThereAreCommas: false} : {}

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
                      {errors[row?.key] && touched[row?.key] && (
                        <ErrorMessage className='mt-2' message={errors[row?.key] as string} />
                      )}
                    </div>
                  ) : (
                    <div className='d-flex flex-column mb-16px'>
                      <Input
                        type={typeInput || 'text'}
                        title={row.name}
                        name={row.key}
                        value={values[row.key] || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required={isRequired}
                        {...props}
                      />

                      {errors[row?.key] && touched[row?.key] && (
                        <ErrorMessage className='mt-2' message={errors[row?.key] as string} />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
            <div className='mt-16px'>
              <InputCheck
                checked={status}
                onChange={() => setStatus(!status)}
                id='status'
                title='Status'
              />
            </div>
          </form>
        </div>
        <div style={{borderTop: '1px solid #F1F1F2'}}>
          <div className='d-flex justify-content-end' style={{padding: 30}}>
            <Button
              type='reset'
              onClick={() => handleClose()}
              className='btn-lg btn-secondary align-self-center me-8px'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='btn-lg btn-primary'
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
