/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {KTIcon} from '@/_metronic/helpers'
import {TextArea} from '@/components/textarea'
import Button from '@/components/button/Button'
import {Select} from '@/components/select'
import {useEffect, useMemo, useState} from 'react'
import request from '@/app/axios'
import {convertErrorMessageResponse} from '@/app/utils'
import {swalToast} from '@/app/swal-notification'
import {useAuth} from '@/app/context/AuthContext'
import {PropsStepApplication} from '@/app/types'
import {useParams} from 'react-router-dom'

type Props = {
  handleClose: () => void
  handleloadApi: () => void
}

export const CreateLoanTypeSchema = Yup.object().shape({
  rejection_id: Yup.string().required('Rejection Type is required'),
  description: Yup.string().max(1024, 'Note must be at most 1024 characters').nullable(),
})

const modalsRoot = document.getElementById('root-modals') || document.body

const Reject = ({
  handleClose,
  handleloadApi,
  formik,
  setOptionListing,
  optionListing = {},
}: Props & PropsStepApplication) => {
  const {rejection} = formik.values

  const {currentUser} = useAuth()
  const {applicationIdEdit = 0} = useParams()
  const tableName = useMemo(() => 'rejection_type', [])

  useEffect(() => {
    const data = optionListing[tableName]

    if (data) return

    request
      .post(`config/${tableName}/listing`, {
        status: true,
        pageSize: 99999,
        currentPage: 1,
      })
      .then(({data}) => {
        if (!Array.isArray(data.data) || !data.data.length) return

        setOptionListing((prev) => ({...prev, [tableName]: data.data}))

        setFieldValue('rejection_id', getRejectionIdDefault(data.data))
      })
      .catch((error: any) => {
        console.error(error)
      })
  }, [])

  function getRejectionIdDefault(data: any[]): string {
    if (!Array.isArray(data)) return ''

    const itemDefault = data?.find((el: any) => el.is_default) || data?.[0]
    return itemDefault.id || ''
  }

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      rejection_id: rejection?.id || getRejectionIdDefault(optionListing[tableName]) || '',
      description: rejection?.rejection_note || '',
    },
    validationSchema: CreateLoanTypeSchema,
    onSubmit: async (values: any, actions: any) => {
      setSubmitting(true)
      try {
        if (!rejection?.id) {
          await request.post('application/application-reject', {
            rejection_type_id: +values.rejection_id,
            application_id: +applicationIdEdit,
            rejection_note: values.description,
            rejected_by: currentUser?.id,
          })
          swalToast.fire({
            timer: 1500,
            icon: 'success',
            title: `Application successfully rejected`,
          })
        } else {
          await request.put('application/application-reject/' + rejection?.id, {
            rejection_type_id: +values.rejection_id,
            rejection_note: values.description,
            rejected_by: currentUser?.id,
          })
          swalToast.fire({
            timer: 1500,
            icon: 'success',
            title: `Reject application successfully updated`,
          })
        }
        handleClose()
        setSubmitting(false)

        handleloadApi()
      } catch (error) {
        const message = convertErrorMessageResponse(error)
        swalToast.fire({
          icon: 'error',
          title: message,
          timer: 1500,
        })
        setSubmitting(false)
      }
    },
  })
  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={true}
      onHide={handleClose}
      backdrop={true}
    >
      <>
        <div className='modal-header p-30px'>
          <h2>{!rejection?.id ? '' : 'Update'} Reject Application</h2>
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <div className='flex-row-fluid p-30px'>
          <form onSubmit={handleSubmit} noValidate id='kt_modal_create_app_form'>
            <div className='d-flex flex-column mb-16px'>
              <Select
                keyLabelOption='rejection_type_name'
                keyValueOption='id'
                options={optionListing[tableName]}
                id='rejection_id'
                label={'Rejection Type'}
                name={'rejection_id'}
                value={values.rejection_id || ''}
                onChange={handleChange}
                required={true}
                onBlur={handleBlur}
                error={errors['rejection_id'] as string}
                touched={!!touched['rejection_id']}
              />
            </div>
            <div>
              <TextArea
                id='description'
                label={'Note'}
                name={'description'}
                value={values['description'] || ''}
                onChange={handleChange}
                error={errors['description'] as string}
                touched={!!touched['description']}
              />
            </div>
          </form>
        </div>
        <div className='border-top border-gray-200'>
          <div className='d-flex justify-content-end p-30px'>
            <Button
              type='reset'
              onClick={() => handleClose()}
              className='btn-lg btn-secondary align-self-center me-8px'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              loading={isSubmitting}
              className='btn-lg btn-primary'
              onClick={() => {
                handleSubmit()
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </>
    </Modal>,
    modalsRoot
  )
}

export default Reject
