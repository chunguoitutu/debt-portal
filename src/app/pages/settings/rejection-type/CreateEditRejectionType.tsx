/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'

import * as Yup from 'yup'
import {useFormik} from 'formik'
import {Input} from '../../../components/inputs/input'
import InputCheck from '../../../components/inputs/inputCheck'
import {KTIcon} from '../../../../_metronic/helpers'
import {swalToast} from '../../../swal-notification'
import request from '../../../axios'
import TextArea from '../../../components/textarea/TextArea'
import ErrorMessage from '../../../components/error/ErrorMessage'
import {REJECTION_TYPE_TABLE_CONFIG} from './RejectinonTypeConfig'

type Props = {
  setLoadApi: any
  loadapi: boolean
  data?: any
  show: boolean
  titleLable?: string
  handleClose: () => void
  handleUpdated: () => void
}

export const CreateEditRejectionTypeSchema = Yup.object().shape({
  rejection_type_name: Yup.string().required('Rejection type name is required.'),
  rejection_type_code: Yup.string().required('Rejection type Code is required.'),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateEditRejectionType = ({
  show,
  handleClose,
  titleLable = 'New',
  data = [],
  loadapi,
  setLoadApi,
  handleUpdated,
}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)

  const [status, setStatus] = useState(data?.length > 0 ? data?.status : true)
  const {rows, settings} = REJECTION_TYPE_TABLE_CONFIG
  const {swalToastTitle, endpoint} = settings

  const generateField = React.useMemo(() => {
    if (data) {
      return rows
        .filter((row) => !!row.informCreateEdit)
        .reduce((a, b) => {
          a[b.key] = data[b.key] || ''
          return a
        }, {})
    }
    return {}

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const {values, touched, errors, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues: {
      ...generateField,
    },
    validationSchema: CreateEditRejectionTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      if (titleLable === 'New') {
        await request
          .post(endpoint || '', {
            ...values,
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: swalToastTitle + ' created',
              })
            }
            handleUpdated()
            handleClose()
            resetForm()
            setStatus(false)
            setLoadApi(!loadapi)
          })
          .catch((e) => {
            swalToast.fire({
              icon: 'error',
              title: e?.message,
            })
          })
      }

      if (titleLable === 'Edit') {
        await request
          .post(endpoint + '/' + data?.id, {
            ...values,
            status: status ? 1 : 0,
          })
          .then((response) => {
            if (!response.data?.error) {
              swalToast.fire({
                icon: 'success',
                title: swalToastTitle + ' updated',
              })
            }
            handleUpdated()
            handleClose()
            setLoadApi(!loadapi)
          })
          .catch((error) => {
            swalToast.fire({
              icon: 'error',
              title: error?.message,
            })
          })
      }
    },
  })

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-600px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{titleLable} Rejection Type</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>
      <div style={{maxHeight: '600px', overflowY: 'auto'}} className='modal-body  '>
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column '
          id='kt_modal_create_app_stepper'
        >
          <div className='flex-row-fluid '>
            <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
              {data ? (
                <>
                  {rows
                    .filter((data) => !!data.informCreateEdit)
                    .map((row) => {
                      const {isRequired, typeInput} = row.informCreateEdit || {}
                      return (
                        <div key={row.key} style={{flex: '0 0 50%'}}>
                          {row.key === 'rejection_type_description' ? (
                            <div className='mb-8'>
                              <TextArea
                                title={row.name}
                                name={row.key}
                                value={values[row.key] || ''}
                                onChange={handleChange}
                              />

                              <ErrorMessage
                                className='mt-2'
                                shouldShowMessage={!!(errors[row.key] && touched[row.key])}
                                message={errors[row.key] as string}
                              />
                            </div>
                          ) : (
                            <Input
                              required={isRequired ? true : false}
                              title={row.name}
                              id={row.key}
                              type={typeInput}
                              error={errors[row.key]}
                              touched={touched[row.key]}
                              errorTitle={errors[row.key]}
                              value={values[row.key] || ''}
                              onChange={handleChange}
                            />
                          )}
                        </div>
                      )
                    })}
                </>
              ) : null}
              <InputCheck
                title='Status'
                checked={status}
                onChange={() => setStatus(!status)}
                id='Status'
              />
              <div className='d-flex flex-end pt-10'>
                <button type='submit' className='btn btn-lg btn-primary'>
                  {titleLable === 'Edit' ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateEditRejectionType}
