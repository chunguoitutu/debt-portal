/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {ChangeEvent, FC, useMemo, useState} from 'react'
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
import {AddressTypeItem, DataResponse} from '@/app/types'

type Props = {
  data?: AddressTypeItem
  handleClose: () => void
  handleUpdated: () => void
}

const CreateEditAddressType: FC<Props> = ({handleClose, data, handleUpdated}) => {
  const {rows, settings} = ADDRESS_TABLE_CONFIG
  const {endpoint, validation} = settings

  const generateField = useMemo(() => {
    return rows
      .filter((row) => row.infoCreateEdit)
      .reduce(
        (acc, config) => ({
          ...acc,
          [config.key]: data?.[config.key] ?? config.infoCreateEdit?.defaultValue ?? '',
        }),
        {} as AddressTypeItem
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
  } = useFormik<AddressTypeItem>({
    initialValues: generateField,
    validationSchema: validation,
    validateOnChange: false,
    onSubmit: handleCreateOrUpdate,
  })

  async function handleCreateOrUpdate() {
    const payload = validation.cast(values) // automatically trim and format number (declare in validateSchema formik)

    try {
      const {data: dataRes} = data?.id
        ? await request.put<DataResponse<AddressTypeItem>>(endpoint + '/' + data?.id, payload) // edit
        : await request.post<DataResponse<AddressTypeItem>>(endpoint || '', payload) // create

      // unknown error
      if (dataRes?.error) {
        return swalToast.fire({
          icon: 'error',
          title: convertErrorMessageResponse(dataRes?.message),
        })
      }

      const message = `Address Type "${dataRes?.data?.address_type_name}" successfully ${
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
        <h2 className='m-0'>{data?.id ? 'Edit' : 'New'} Address Type</h2>
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
          <div className='flex-row-fluid '>
            <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
              <>
                {rows
                  .filter((data) => !!data.infoCreateEdit)
                  .map((row, i) => {
                    const {infoCreateEdit, name, key} = row
                    const {
                      type,
                      required,
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
                            name={key}
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
                      <div key={key} style={{flex: '0 0 50%'}}>
                        {key === 'description' ? (
                          <div className='mb-16px'>
                            <TextArea
                              onBlur={handleBlur}
                              label={name}
                              name={key}
                              value={values[key] || ''}
                              onChange={handleChange}
                              error={errors[key] as string}
                              touched={!!touched[key]}
                            />
                          </div>
                        ) : (
                          <div className='d-flex flex-column mb-16px'>
                            <Input
                              onBlur={handleBlur}
                              required={!!required ? true : false}
                              label={name}
                              name={key}
                              type={type}
                              value={values[row?.key] || ''}
                              onChange={handleChange}
                              error={errors[key] as string}
                              touched={!!touched[key]}
                            />
                          </div>
                        )}
                      </div>
                    )
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

export default CreateEditAddressType
