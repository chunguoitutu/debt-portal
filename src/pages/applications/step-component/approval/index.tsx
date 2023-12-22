import request from '@/app/axios'
import {useAuth} from '@/app/context/AuthContext'
import {swalToast} from '@/app/swal-notification'
import {ApplicationFormData} from '@/app/types'
import {convertErrorMessageResponse} from '@/app/utils'
import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import Modal from '@/components/modal/Modal'
import {Select} from '@/components/select'
import {TextArea} from '@/components/textarea'
import {FormikProps, useFormik} from 'formik'
import {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as Yup from 'yup'

type Props = {
  onClose: () => void
  data: {[key: string]: any}
  formik: FormikProps<ApplicationFormData>
}

const ApprovalApplicationModal: FC<Props> = ({data, formik, onClose}) => {
  const {id, approved_note} = data || {}

  const {applicationIdEdit = 0} = useParams()
  const {currentUser} = useAuth()

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    resetForm,
    handleSubmit,
    setSubmitting,
  } = useFormik({
    initialValues: {
      approved_note: approved_note || '',
    },
    onSubmit: handleApproval,
  })

  useEffect(() => {
    return () => {
      resetForm()
    }
  }, [])

  async function handleApproval() {
    const {approved_note} = values

    if (!+applicationIdEdit) return setSubmitting(false)

    const payload = {
      approved_by: currentUser?.id,
      approved_note,
    }

    try {
      if (id) {
        delete payload.approved_by
        const {data} = await request.put(`application/approval/${id}`, payload)

        formik.setFieldValue('approval', {
          ...formik.values.approval,
          ...data.data,
        })
      } else {
        await request.post(`application/approval/${applicationIdEdit}`, payload)
      }

      onClose()
      swalToast.fire({
        timer: 1500,
        icon: 'success',
        title: id ? `Update application approve successfully` : `Application successfully approval`,
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

  return (
    <Modal dialogClassName='mw-800px' show={true} onClose={onClose} title='Approval Application'>
      <form className='p-30px'>
        <TextArea
          id='approved_note'
          label={'Description'}
          name={'approved_note'}
          value={values['approved_note'] || ''}
          onChange={handleChange}
          error={errors['approved_note'] as string}
          touched={!!touched['approved_note']}
        />
      </form>

      <div className='border-top border-gray-200'>
        <div className='d-flex justify-content-end p-30px'>
          <Button
            disabled={isSubmitting}
            onClick={onClose}
            className='btn-lg btn-secondary align-self-center me-8px'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            loading={isSubmitting}
            disabled={isSubmitting}
            className='btn-lg btn-primary'
            onClick={() => {
              handleSubmit()
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ApprovalApplicationModal
