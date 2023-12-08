/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import * as Yup from 'yup'
import {useFormik} from 'formik'

import {ADDRESS_TABLE_CONFIG} from './config'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {KTIcon} from '@/_metronic/helpers'
import {TextArea} from '@/components/textarea'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {convertErrorMessageResponse} from '@/app/utils'
import {CheckboxRounded} from '@/components/checkbox'

type Props = {
  setLoadApi: any
  loadapi: boolean
  data?: any
  show: boolean
  titleLable?: string
  handleClose: () => void
  handleUpdated: () => void
}

export const CreateEditAddressSchema = Yup.object().shape({
  address_type_name: Yup.string()
    .required('Address Type is required')
    .max(255, 'Address Type must be at most 255 characters'),
  description: Yup.string().max(1024, 'Description must be at most 1024 characters'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateEditAddress = ({
  show,
  handleClose,
  titleLable = 'New',
  data = [],
  loadapi,
  setLoadApi,
  handleUpdated,
}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)

  const [status, setStatus] = useState(data?.status === 0 ? false : true)

  const {rows, settings} = ADDRESS_TABLE_CONFIG
  const {swalToastTitle, endpoint} = settings

  const generateField = React.useMemo(() => {
    if (data) {
      return rows
        .filter((row) => !!row.infoCreateEdit)
        .reduce((a, b) => {
          a[b.key] = data[b.key] || ''
          return a
        }, {})
    }
    return {}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setSubmitting,
    handleBlur,
  } = useFormik({
    initialValues: {
      ...generateField,
      is_default: data.is_default === 1 ? true : false,
    },
    validationSchema: CreateEditAddressSchema,
    onSubmit: async (values: any, actions: any) => {
      if (titleLable === 'New') {
        await request
          .post(endpoint || '', {
            ...values,
            status: status ? 1 : 0,
            is_default: values.is_default ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title:
                  (swalToastTitle || '').replace(
                    /\/%\//g,
                    `${response?.data?.data['address_type_name']}`
                  ) + ' created',
              })
            }
            handleUpdated()
            handleClose()
            resetForm()
            setStatus(false)
            setLoadApi(!loadapi)
          })
          .catch((error) => {
            const message = convertErrorMessageResponse(error)
            swalToast.fire({
              icon: 'error',
              title: message,
              timer: 1500,
            })
          })
          .finally(() => {
            setSubmitting(false)
          })
      }

      if (titleLable === 'Edit') {
        await request
          .post(endpoint + '/' + data?.id, {
            ...values,
            status: status ? 1 : 0,
            is_default: values.is_default ? 1 : 0,
          })
          .then((response) => {
            const address = values.address_type_name
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title:
                  (swalToastTitle || '').replace(
                    /\/%\//g,
                    `${response?.data?.data['address_type_name']}`
                  ) + ' updated',
              })
            }
            handleUpdated()
            handleClose()
            setLoadApi(!loadapi)
          })
          .catch((error) => {
            const message = convertErrorMessageResponse(error)
            swalToast.fire({
              icon: 'error',
              title: message,
              timer: 1500,
            })
          })
          .finally(() => {
            setSubmitting(false)
          })
      }
    },
  })

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      style={{}}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header p-30px'>
        <h2 className='m-0'>{titleLable} Address Type</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>
      <div
        style={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
        className='modal-body p-30px  '
      >
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          <div className='flex-row-fluid '>
            <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
              {data ? (
                <>
                  {rows
                    .filter((data) => !!data.infoCreateEdit)
                    .map((row, i) => {
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
                        <div key={row?.key} style={{flex: '0 0 50%'}}>
                          {row?.key === 'description' ? (
                            <div className='mb-16px'>
                              <TextArea
                                onBlur={handleBlur}
                                label={row?.name}
                                name={row?.key}
                                value={values[row?.key] || ''}
                                onChange={handleChange}
                                error={errors[row.key] as string}
                                touched={!!touched[row.key]}
                              />
                            </div>
                          ) : (
                            <div className='d-flex flex-column mb-16px'>
                              <Input
                                onBlur={handleBlur}
                                required={!!isRequired ? true : false}
                                label={row?.name}
                                name={row?.key}
                                type={typeInput}
                                value={values[row?.key] || ''}
                                onChange={handleChange}
                                error={errors[row.key] as string}
                                touched={!!touched[row.key]}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                </>
              ) : null}
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
      <div className='d-flex flex-end p-30px border-top border-gray-200'>
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
          loading={isSubmitting}
          onClick={() => handleSubmit()}
        >
          {titleLable === 'Edit' ? 'Update' : 'Create'}
        </Button>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateEditAddress}
