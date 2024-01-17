/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import * as Yup from 'yup'
import {useFormik} from 'formik'

import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {KTIcon} from '@/_metronic/helpers'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {MAKETTING_TABLE_CONFIG} from './config'
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

export const NewEditMarkettingSchema = Yup.object().shape({
  marketing_type_name: Yup.string()
    .required('Marketing Type is required')
    .max(255, 'Marketing Type must be at most 255 characters'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreatEditMarkettingType = ({
  show,
  handleClose,
  titleLable = 'New',
  data = [],
  loadapi,
  setLoadApi,
  handleUpdated,
}: Props) => {
  const {rows, settings} = MAKETTING_TABLE_CONFIG
  const {endpoint, swalToastTitle} = settings
  const stepperRef = useRef<HTMLDivElement | null>(null)

  const [status, setStatus] = useState(data?.status === 0 ? false : true)

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
    validationSchema: NewEditMarkettingSchema,
    onSubmit: async (values: any, actions: any) => {
      if (titleLable === 'New') {
        await request
          .post(endpoint || '', {
            ...values,
            status: status ? 1 : 0,
            is_default: values.is_default ? 1 : 0,
          })
          .then((response) => {
            const marketing_name = values.marketing_type_name
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: `Marketing "${marketing_name}" successfully created`,
              })
            }
            resetForm()
            setStatus(false)
            handleUpdated()
            handleClose()
            setLoadApi(!loadapi)
          })
          .catch((error) => {
            swalToast.fire({
              icon: 'error',
              title:
                error?.response?.data?.message ||
                'The system is having an error, please try again in a few minutes',
            })
          })
          .finally(() => setSubmitting(false))
      }

      if (titleLable === 'Edit') {
        await request
          .post(endpoint + '/' + data?.id, {
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
                    response?.data?.data['marketing_type_name']
                  ) + ' updated',
              })
            }
            handleUpdated()
            handleClose()
            setLoadApi(!loadapi)
          })
          .catch((error) => {
            swalToast.fire({
              icon: 'error',
              title:
                error?.response?.data?.message ||
                'The system is having an error, please try again in a few minutes',
            })
          })
          .finally(() => setSubmitting(false))
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
      <div className='modal-header padding-model-header'>
        <h2 className='m-0'>{titleLable} MarKeting Type</h2>
        <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
          <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
        </div>
      </div>
      <div
        style={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
        className='modal-body  py-30px ps-30px pe-30px '
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

                      if (['status', 'is_default'].includes(row.key)) {
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
                        <div key={row?.key} style={{flex: '0 0 50%'}}>
                          <div className='d-flex flex-column mb-16px'>
                            <Input
                              required={!!isRequired ? true : false}
                              label={row?.name}
                              name={row?.key}
                              type={typeInput}
                              onBlur={handleBlur}
                              value={values[row?.key] || ''}
                              onChange={handleChange}
                              error={errors[row.key]}
                              touched={touched[row.key]}
                            />
                          </div>
                        </div>
                      )
                    })}
                </>
              ) : null}

              <div className='mt-16px d-flex flex-row gap-5'>
                <CheckboxRounded
                  label='Default'
                  checked={values.is_default}
                  onChange={handleChange}
                  request_info={true}
                  showLabelCheck={true}
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
        </div>
      </div>
      <div className='d-flex flex-end py-30px ps-30px pe-30px border-top border-gray-200'>
        <Button
          type='reset'
          onClick={() => handleClose()}
          className='btn-lg btn-secondary fs-6 me-8px'
        >
          Cancel
        </Button>
        <Button
          className='btn-lg btn-primary fs-6'
          type='submit'
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

export {CreatEditMarkettingType}
