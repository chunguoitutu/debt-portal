import request from '@/app/axios'
import {useAuth} from '@/app/context/AuthContext'
import {useSocket} from '@/app/context/SocketContext'
import {swalToast} from '@/app/swal-notification'
import {ApplicationFormData, DataResponse, UserInfo} from '@/app/types'
import {convertErrorMessageResponse, getFullName} from '@/app/utils'
import Button from '@/components/button/Button'
import Modal from '@/components/modal/Modal'
import {Select} from '@/components/select'
import {TextArea} from '@/components/textarea'
import {FormikProps, useFormik} from 'formik'
import {Dispatch, FC, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

type Props = {
  onClose: () => void
  data: {[key: string]: any}
  formik: FormikProps<ApplicationFormData>
  handleReloadApi: () => void
  setCurrentStep: Dispatch<any>
}

const ApprovalApplicationModal: FC<Props> = ({
  data,
  formik,
  onClose,
  handleReloadApi,
  setCurrentStep,
}) => {
  const {id, approved_note} = data || {}

  const [userListing, setUserListing] = useState<(UserInfo & {fullname: string})[]>([])

  const {applicationIdEdit = 0} = useParams()
  const {currentUser, priority, company_id} = useAuth()
  const {socket} = useSocket()

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
      officer_id: priority <= 2 ? '' : currentUser?.id, // if the loan approver is an employee then auto transfer the loan to that person.
    },
    onSubmit: handleApproval,
  })

  useEffect(() => {
    handleGetUsers()

    return () => {
      resetForm()
    }
  }, [])

  async function handleGetUsers() {
    try {
      const {data} = await request.post<DataResponse<UserInfo[]>>('/user/listing', {
        company_id: +company_id,
        priority_great_than: 2, // except super admin and admin
        pageSize: 999999999999999,
        currentPage: 1,
      })

      Array.isArray(data.data) &&
        setUserListing(
          data.data.map((el) => ({
            ...el,
            fullname: getFullName(el),
          }))
        )
    } catch (error) {}
  }

  async function handleApproval() {
    const {approved_note, officer_id = 0} = values

    if (!+applicationIdEdit) return setSubmitting(false)

    let payload: {[key: string]: any} = {
      approved_by: currentUser?.id,
      approved_note,
    }

    try {
      if (id) {
        await request.put(`application/approval/${id}`, payload)
      } else {
        payload = {...payload, application_id: +applicationIdEdit, officer_id: +officer_id || null}
        const {data} = await request.post(`application/approval`, payload)

        // Only emit when create approval
        socket?.emit('approvalApplicationSuccess', data.loan_id)
      }
      setCurrentStep(1)
      handleReloadApi()
      onClose()
      swalToast.fire({
        timer: 1500,
        icon: 'success',
        title: id
          ? `Description of approval successfully updated`
          : `Application successfully approved`,
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
        {/* Only show when current user is admin or super admin. If the employee approves, the loan will be assigned to that employee  */}
        {priority <= 2 && (
          <Select
            label='Assignee To'
            name='officer_id'
            options={userListing}
            keyValueOption={'id'}
            keyLabelOption={'fullname'}
            onChange={handleChange}
          />
        )}

        <TextArea
          id='approved_note'
          label={'Note'}
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
