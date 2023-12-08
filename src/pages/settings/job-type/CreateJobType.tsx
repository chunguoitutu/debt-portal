import {useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {convertErrorMessageResponse} from '@/app/utils'
import {swalToast} from '@/app/swal-notification'
import {JOB_TABLE_CONFIG} from './config'
import request from '@/app/axios'
import {KTIcon} from '@/_metronic/helpers'
import {TextArea} from '@/components/textarea'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {CheckboxRounded} from '@/components/checkbox'

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
  job_type_name: Yup.string()
    .required('Job Type is required')
    .max(255, 'Job Type must be at most 255 characters'),
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
  const [status, setStatus] = useState(data?.status === 0 ? false : true)
  const {rows, endpoint} = JOB_TABLE_CONFIG

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setSubmitting,
  } = useFormik({
    initialValues: {
      job_type_name: data.job_type_name || '',
      description: data.description || '',
      request_more_information: data.request_more_information === 1 ? true : false,
      is_default: data.is_default === 1 ? true : false,
    },
    validationSchema: CreateJobTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      if (title === 'New') {
        try {
          const response = await request.post(endpoint || '', {
            ...values,
            request_more_information: values.request_more_information ? 1 : 0,
            status: status ? 1 : 0,
            is_default: values.is_default ? 1 : 0,
          })
          const job_name = values.job_type_name
          handleUpdated()
          handleClose()
          resetForm()
          setStatus(false)
          setLoadApi(!loadApi)
          swalToast.fire({
            icon: 'success',
            title: `Job Type "${job_name}" successfully created`,

            timer: 1500,
          })
        } catch (error) {
          const message = convertErrorMessageResponse(error)
          swalToast.fire({
            icon: 'error',
            title: message,
            timer: 1500,
          })
        } finally {
          setSubmitting(false)
        }
      } else {
        try {
          const response = await request.post(endpoint + '/' + data?.id, {
            ...values,
            request_more_information: values.request_more_information ? 1 : 0,
            status: status ? 1 : 0,
            is_default: values.is_default ? 1 : 0,
          })
          const job_name = values.job_type_name
          handleUpdated()
          handleClose()
          setLoadApi(!loadApi)
          swalToast.fire({
            icon: 'success',
            title: `Job Type "${job_name}" successfully updated`,
          })
        } catch (error) {
          const message = convertErrorMessageResponse(error)
          swalToast.fire({
            icon: 'error',
            title: message,
            timer: 1500,
          })
        } finally {
          setSubmitting(false)
        }
      }
    },
  })

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
        <div className='modal-header p-30px'>
          <h2>{title} Job Type</h2>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <div className='flex-row-fluid p-30px'>
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
                    <div className='d-flex flex-column mb-16px'>
                      <Input
                        label={row.name}
                        name={row.key}
                        value={values[row.key] || ''}
                        onChange={handleChange}
                        required={isRequired}
                        error={errors[row.key] as string}
                        touched={!!touched[row.key]}
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
              onClick={() => handleSubmit()}
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

export default CreateJobType
