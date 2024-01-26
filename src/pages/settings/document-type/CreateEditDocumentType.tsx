import {ChangeEvent, Component, Fragment, useMemo, useState} from 'react'
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
import {DataResponse, DocumentTypeItem} from '@/app/types'
import clsx from 'clsx'

type Props = {
  data?: DocumentTypeItem | null
  handleClose: () => void
  handleUpdated: () => void
}

const CreateEditDocumentType = ({data, handleClose, handleUpdated}: Props) => {
  const {rows, settings} = DOCUMENT_TABLE_CONFIG
  const {validation, endpoint} = settings

  const generateField = useMemo(() => {
    return rows
      .filter((row) => row.infoCreateEdit)
      .reduce(
        (acc, config) => ({
          ...acc,
          [config.key]: data?.[config.key] ?? config.infoCreateEdit?.defaultValue ?? '',
        }),
        {} as DocumentTypeItem
      )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const {
    values,
    touched,
    errors,
    isSubmitting,
    dirty,
    handleBlur,
    handleSubmit,
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: generateField,
    validationSchema: validation,
    validateOnChange: false,
    onSubmit: handleCreateOrUpdate,
  })

  function handleChange(e: ChangeEvent<any>) {
    const {name, type, value, checked} = e.target

    const newValue = type === 'checkbox' ? +checked : value
    setFieldValue(name, newValue)
  }

  async function handleCreateOrUpdate() {
    const payload = validation.cast(values) // automatically trim and format number (declare in validateSchema formik)

    try {
      const {data: dataRes} = data?.id
        ? await request.put<DataResponse<DocumentTypeItem>>(endpoint + '/' + data?.id, payload) // edit
        : await request.post<DataResponse<DocumentTypeItem>>(endpoint || '', payload) // create

      // unknown error
      if (dataRes?.error) {
        return swalToast.fire({
          icon: 'error',
          title: convertErrorMessageResponse(dataRes?.message),
        })
      }

      const message = `Document Type "${dataRes?.data?.type_name}" successfully ${
        data?.id ? 'updated' : 'created'
      }`

      handleUpdated()
      handleClose()
      swalToast.fire({
        icon: 'success',
        title: message,
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-800px'
      show={true}
      onHide={handleClose}
      backdrop={true}
    >
      {/* Header */}
      <div className='modal-header padding-model-header '>
        <h2 className='m-0'>{data?.id ? 'Edit' : 'New'} Document Type</h2>
        <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
          <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
        </div>
      </div>
      <div
        style={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
        className='flex-row-fluid py-30px ps-30px pe-30px'
      >
        <form
          className='row gy-16px gx-30px'
          onSubmit={handleSubmit}
          noValidate
          id='kt_modal_create_app_form'
        >
          {rows
            .filter((el) => el.infoCreateEdit)
            .map((row) => {
              const {infoCreateEdit, name, key} = row
              const {
                required,
                typeComponent,
                subTextWhenChecked,
                subTextWhenNoChecked,
                type,
                className,
                column,
              } = infoCreateEdit || {}

              switch (typeComponent) {
                case 'checkbox-rounded':
                  return (
                    <div className={clsx([`col-${column || 12}`, className])} key={key}>
                      <CheckboxRounded
                        key={key}
                        name={key}
                        label={name}
                        checked={!!values[key]}
                        onChange={handleChange}
                        subTextWhenChecked={subTextWhenChecked}
                        subTextWhenNoChecked={subTextWhenNoChecked}
                        id={key}
                      />
                    </div>
                  )
                case 'input':
                  return (
                    <div className={clsx([`col-${column || 12}`, className])} key={key}>
                      <div className='d-flex flex-column'>
                        <Input
                          required={!!required}
                          label={name}
                          onBlur={handleBlur}
                          name={key}
                          value={values[key] || ''}
                          type={type}
                          onChange={handleChange}
                          error={errors[key] as string}
                          touched={!!touched[key]}
                        />
                      </div>
                    </div>
                  )
                case 'textarea':
                  return (
                    <div className={clsx([`col-${column || 12}`, className])} key={key}>
                      <TextArea
                        label={name}
                        onBlur={handleBlur}
                        name={row.key}
                        value={values[row.key] || ''}
                        onChange={handleChange}
                        error={errors[row.key] as string}
                        touched={!!touched[row.key]}
                      />
                    </div>
                  )
                default:
                  return <Fragment key={key}></Fragment>
              }
            })}
        </form>
      </div>

      {/* Action */}
      <div className='d-flex flex-end py-30px ps-30px pe-30px border-top border-gray-200'>
        <Button
          type='reset'
          onClick={handleClose}
          disabled={isSubmitting}
          className='btn-lg btn-secondary align-self-center me-8px fs-6'
        >
          Cancel
        </Button>
        <Button
          type='submit'
          className='btn-lg btn-primary fs-6'
          loading={isSubmitting}
          disabled={isSubmitting || (data?.id && !dirty)}
          onClick={() => handleSubmit()}
        >
          {data?.id ? 'Update' : 'Create'}
        </Button>
      </div>
    </Modal>
  )
}
export default CreateEditDocumentType
