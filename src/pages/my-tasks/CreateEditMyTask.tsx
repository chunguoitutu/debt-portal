import Button from '@/components/button/Button'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {ChangeEvent, FC, useEffect, useState} from 'react'
import * as Yup from 'yup'

import {KTIcon} from '@/_metronic/helpers'
import {MY_TASK_CONFIG} from './config'
import {Input} from '@/components/input'
import {TextArea} from '@/components/textarea'
import {DataResponse, PropsStepApplication, UserInfo} from '@/app/types'
import clsx from 'clsx'
import Radio from '@/components/radio/Radio'
import {Select} from '@/components/select'
import UploadFile from '@/components/file/UploadFile'
import {PRIORITY_MY_TASK, convertMessageErrorRequired, getFullName} from '@/app/utils'
import request from '@/app/axios'
import {useAuth} from '@/app/context/AuthContext'
import {getDaysOfCurrentDate} from '@/app/utils/get-current-date'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {MyTaskProps} from '@/app/types/my-task'

type props = {
  data?: any
}

const schema = Yup.object().shape({
  task_title: Yup.string().required(convertMessageErrorRequired()),
})

const CreateEditMyTask = ({data}: props) => {
  const [showPopupCreate, setShowPopupCreate] = useState(false)
  const [userListing, setUserListing] = useState<(UserInfo & {fullname: string})[]>([])
  const {company_id} = useAuth()

  function handleShowCreate() {
    setShowPopupCreate(!showPopupCreate)
  }

  function handleCreateTask() {
    alert('Create Successfully')
    setShowPopupCreate(!showPopupCreate)
  }

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    resetForm,
    handleSubmit,
    setSubmitting,
  } = useFormik({
    initialValues: {
      priority: data?.priority || '',
      task_title: data?.task_title || '',
      officer_id: data?.loan_assignment?.officer_id || '',
      description: data?.description || '',
      start_date: data?.start_date || '',
      end_date: data?.end_date || '',
    },
    validationSchema: schema,
    onSubmit: () => handleCreateTask(),
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
    } catch (error) {
      console.error(error)
    }
  }

  function renderComponent() {
    return (
      <div className='col-12'>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 align-self-center'>Priority</div>
          <div className='d-flex flex-row gap-16px col-10'>
            {PRIORITY_MY_TASK.map((item, i) => (
              <Radio
                key={i}
                classNameLabel={clsx([
                  data?.priority === item.value ? 'fs-4 fw-medium' : 'text-gray-600 fs-4 fw-medium',
                ])}
                name='priority'
                label={item.label}
                checked={data?.priority === item.value}
                value={item.value}
                onChange={handleChange}
                defaultValue={data?.priority[0]}
              />
            ))}
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 align-self-center'>Task Title</div>
          <div className='col-10'>
            <Input name={'task_title'} value={values.task_title} onChange={handleChange} />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 pt-2'>Description</div>
          <div className='col-10'>
            <ReactQuill
              theme='snow'
              modules={{
                toolbar: [['link'], [{list: 'ordered'}, {list: 'bullet'}]],
              }}
              style={{height: 120, marginBottom: 40}}
              formats={['link', 'list', 'bullet']}
              id='description'
              key={'description'}
              value={values.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 align-self-center'>Start - End</div>
          <div className='col-10'>
            <div className='row'>
              <div className='col-12 d-flex flex-row gap-1'>
                <div className='col-6'>
                  <Input
                    name={'start_date'}
                    value={values.start_date}
                    onChange={handleChange}
                    type='date'
                    max={getDaysOfCurrentDate()}
                  />
                </div>
                <div className='col-6'>
                  <Input
                    name={'end_date'}
                    value={values.end_date}
                    onChange={handleChange}
                    max={getDaysOfCurrentDate()}
                    type='date'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-2 fs-16 fw-medium text-gray-900 pt-2'>Assign To</div>
          <div className='col-10'>
            <Select
              name='officer_id'
              options={userListing}
              keyValueOption={'id'}
              keyLabelOption={'fullname'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.officer_id.toString()}
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 pt-2'>Attachment</div>
          <div className='col-10'>
            <UploadFile handleFileChange={() => {}} />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Button onClick={handleShowCreate}>Create Task</Button>
      {showPopupCreate && (
        <Modal
          id='kt_modal_create_app'
          tabIndex={-1}
          style={{}}
          aria-hidden='true'
          dialogClassName='modal-dialog modal-dialog-centered mw-900px'
          show={showPopupCreate}
          backdrop={true}
          onHide={() => setShowPopupCreate(false)}
        >
          {/* Header */}
          <div className='modal-header p-30px'>
            <h2 className='m-0'>Create Task</h2>
            <div
              className='btn btn-sm btn-icon btn-active-color-primary'
              onClick={() => setShowPopupCreate(false)}
            >
              <KTIcon className='fs-1' iconName='cross' />
            </div>
          </div>

          {/* Body */}
          <div
            style={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
            className='flex-row-fluid py-30px ps-30px pe-30px'
          >
            {renderComponent()}
          </div>

          {/* Footer */}
          <div className='border-top border-gray-200'>
            <div className='d-flex justify-content-end p-30px'>
              <Button
                type='reset'
                onClick={() => setShowPopupCreate(false)}
                className='btn-lg btn-secondary align-self-center me-8px fs-6'
              >
                Cancel
              </Button>
              <Button
                type='reset'
                onClick={handleCreateTask}
                className='btn-lg btn-primary align-self-center me-8px fs-6'
              >
                Create
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CreateEditMyTask
