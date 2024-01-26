/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {ChangeEvent, FC, Fragment, useMemo, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {JOB_TABLE_CONFIG} from './config'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {KTIcon} from '@/_metronic/helpers'
import {TextArea} from '@/components/textarea'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {convertErrorMessageResponse} from '@/app/utils'
import {DataResponse, JobTypeItem} from '@/app/types'
import {CheckboxRounded} from '@/components/checkbox'
import clsx from 'clsx'

type Props = {
  data?: JobTypeItem
  handleClose: () => void
  handleUpdated: () => void
}

const CreateEditJobType: FC<Props> = ({handleClose, data, handleUpdated}) => {
  const {rows, settings} = JOB_TABLE_CONFIG
  const {endpoint, validation} = settings

  const generateField = useMemo(() => {
    return rows
      .filter((row) => row.infoCreateEdit)
      .reduce(
        (acc, config) => ({
          ...acc,
          [config.key]: data?.[config.key] ?? config.infoCreateEdit?.defaultValue ?? '',
        }),
        {} as JobTypeItem
      )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const {
    values,
    touched,
    errors,
    isSubmitting,
    dirty,
    handleSubmit,
    setSubmitting,
    handleBlur,
    setFieldValue,
  } = useFormik<JobTypeItem>({
    initialValues: generateField,
    validationSchema: validation,
    validateOnChange: false,
    onSubmit: handleCreateOrUpdate,
  })

  async function handleCreateOrUpdate() {
    const payload = validation.cast(values) // automatically trim and format number (declare in validateSchema formik)

    try {
      const {data: dataRes} = data?.id
        ? await request.put<DataResponse<JobTypeItem>>(endpoint + '/' + data?.id, payload) // edit
        : await request.post<DataResponse<JobTypeItem>>(endpoint || '', payload) // create

      // unknown error
      if (dataRes?.error) {
        return swalToast.fire({
          icon: 'error',
          title: convertErrorMessageResponse(dataRes?.message),
        })
      }

      const message = `Job Type "${dataRes?.data?.job_type_name}" successfully ${
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

  function handleChange(e: ChangeEvent<any>) {
    const {name, type, value, checked} = e.target

    const newValue = type === 'checkbox' ? +checked : value
    setFieldValue(name, newValue)
  }

  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      style={{}}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-800px'
      show={true}
      onHide={handleClose}
      backdrop={true}
    >
      {/* Header */}
      <div className='modal-header p-30px'>
        <h2 className='m-0'>{data?.id ? 'Edit' : 'New'} Job Type</h2>
        <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
          <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
        </div>
      </div>

      {/* Body */}
      <div
        style={{maxHeight: 'calc(100vh - 200px)'}}
        className='modal-body py-30px ps-30px pe-30px overflow-x-auto'
      >
        <div
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          <div className='flex-row-fluid'>
            <form
              className='row gx-30px gy-16px'
              onSubmit={handleSubmit}
              noValidate
              id='kt_modal_create_app_form'
            >
              <>
                {rows
                  .filter((data) => !!data.infoCreateEdit)
                  .map((row) => {
                    const {infoCreateEdit, name, key} = row
                    const {
                      type,
                      required,
                      typeComponent,
                      column,
                      className,
                      subTextWhenChecked,
                      subTextWhenNoChecked,
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
                        )
                      case 'textarea':
                        return (
                          <div className={clsx([`col-${column || 12}`, className])} key={key}>
                            <TextArea
                              label={name}
                              onBlur={handleBlur}
                              name={key}
                              value={values[key] || ''}
                              onChange={handleChange}
                              error={errors[key] as string}
                              touched={!!touched[key]}
                            />
                          </div>
                        )
                      default:
                        return <Fragment key={key}></Fragment>
                    }
                  })}
              </>
            </form>
          </div>
        </div>
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

export default CreateEditJobType
