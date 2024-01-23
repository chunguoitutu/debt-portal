import {Component, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {DOCUMENT_TABLE_CONFIG} from './config'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {convertErrorMessageResponse} from '@/app/utils'
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

export const CreateLoanTypeSchema = Yup.object().shape({
  type_name: Yup.string()
    .required('Document Type is required')
    .max(255, 'Document Type must be at most 255 characters'),
  description: Yup.string().max(1024, 'Description must be at most 1024 characters'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateEditDocumentType = ({
  show,
  handleClose,
  title = 'New',
  data = {},
  loadApi,
  setLoadApi,
  handleUpdated,
}: Props) => {
  const [status, setStatus] = useState(data?.status === 0 ? false : true)
  const [isDefault, setIsDefault] = useState(data?.is_default === 0 ? false : true)

  const {rows, endpoint} = DOCUMENT_TABLE_CONFIG

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
  } = useFormik({
    initialValues: {
      type_name: data.type_name || '',
      description: data.description || '',
      is_default: data.is_default === 1 ? true : false,
    },
    validationSchema: CreateLoanTypeSchema,
    onSubmit: async (values, actions: any) => {
      if (title === 'New') {
        try {
          const response = await request.post(endpoint || '', {
            ...values,
            status: status ? 1 : 0,
            is_default: values.is_default ? 1 : 0,
          })
          const document_name = values.type_name
          handleUpdated()
          handleClose()
          resetForm()
          setStatus(false)
          setLoadApi(!loadApi)
          swalToast.fire({
            timer: 1500,
            icon: 'success',
            title: `Document Type "${document_name}" successfully created`,
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
          const response = await request.put(endpoint + '/' + data?.id, {
            ...values,
            status: status ? 1 : 0,
            is_default: values.is_default ? 1 : 0,
          })
          const document_name = values.type_name
          handleUpdated()
          handleClose()
          setLoadApi(!loadApi)
          swalToast.fire({
            timer: 1500,
            icon: 'success',
            title: `Document Type "${document_name}" successfully updated`,
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
      dialogClassName='modal-dialog modal-dialog-centered mw-800px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <>
        <div className='modal-header padding-model-header '>
          <h2 className='m-0'>{title} Document Type</h2>
          <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
            <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
          </div>
        </div>
        <div
          style={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
          className='flex-row-fluid py-30px ps-30px pe-30px'
        >
          <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
            {rows.map((row, i) => {
              const {infoCreateEdit, name, key} = row
              const {
                isRequired,
                typeComponent,
                component,
                subTextWhenChecked,
                subTextWhenNoChecked,
              } = infoCreateEdit || {}

              const Component = component as any

              if (
                ['id', 'status', 'created_date', 'updated_date', 'is_default'].includes(row.key)
              ) {
                return null
              }

              // if (typeComponent === 'checkbox-rounded') {
              //   return (
              //     <div className='mt-16px d-flex flex-row' key={i}>
              //       <Component
              //         label={name}
              //         checked={values[key]}
              //         onChange={handleChange}
              //         subTextWhenChecked={subTextWhenChecked}
              //         subTextWhenNoChecked={subTextWhenNoChecked}
              //         id={key}
              //       />
              //     </div>
              //   )
              // }

              return (
                <div key={row.key} style={{flex: '0 0 50%'}}>
                  {row.key === 'description' ? (
                    <div>
                      <TextArea
                        label={row.name}
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
                        required={isRequired}
                        error={errors[row.key] as string}
                        touched={!!touched[row.key]}
                      />
                    </div>
                  )}
                </div>
              )
            })}
            <div className='mt-16px d-flex flex-row gap-30px'>
              <CheckboxRounded
                showLabelCheck={true}
                request_info={true}
                label='Default'
                checked={values.is_default}
                onChange={handleChange}
                id='is_default'
              />
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
export default CreateEditDocumentType
