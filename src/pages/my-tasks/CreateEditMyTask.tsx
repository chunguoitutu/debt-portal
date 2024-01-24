import Button from '@/components/button/Button'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {ChangeEvent, FC, useEffect, useState} from 'react'
import * as Yup from 'yup'

import {KTIcon} from '@/_metronic/helpers'
import {MY_TASK_CONFIG} from './config'
import {Input} from '@/components/input'
import {TextArea} from '@/components/textarea'
import {Base64Item, DataResponse, PropsStepApplication, UserInfo} from '@/app/types'
import clsx from 'clsx'
import Radio from '@/components/radio/Radio'
import {Select} from '@/components/select'
import UploadFile from '@/components/file/UploadFile'
import {
  PRIORITY_TASK,
  convertFileToBase64,
  convertMessageErrorRequired,
  getFullName,
} from '@/app/utils'
import request from '@/app/axios'
import {useAuth} from '@/app/context/AuthContext'
import {getDaysOfCurrentDate} from '@/app/utils/get-current-date'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {swalToast} from '@/app/swal-notification'
import {DEFAULT_MSG_ERROR} from '@/app/constants'
import RenderFile from '@/components/file/RenderFile'

type props = {
  data?: any
}

const schema = Yup.object().shape({
  task_title: Yup.string().required(convertMessageErrorRequired()),
})

const CreateEditMyTask = ({data}: props) => {
  const [showPopupCreate, setShowPopupCreate] = useState(false)
  const [file, setFile] = useState<Base64Item[]>([])
  const [descriptionState, setDescriptionState] = useState<any>('')

  const [userListing, setUserListing] = useState<(UserInfo & {fullname: string})[]>([])
  const {company_id} = useAuth()

  function handleShowCreate() {
    setShowPopupCreate(!showPopupCreate)
  }

  async function handleCreateTask() {
    const payload = {
      task_title: values?.task_title,
      start_date: values?.start_date,
      end_date: values?.end_date,
      officer_id: +values?.officer_id,
      priority: values?.priority,
      document: values?.document,
      description: descriptionState,
    }

    try {
      // logic post in here
      // const {} = request.post('/abc', payload)
      swalToast.fire({
        icon: 'success',
        title: 'New Task Create Successfully',
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: DEFAULT_MSG_ERROR,
      })
    } finally {
      setSubmitting(false)
    }
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
      priority: PRIORITY_TASK[1].value || '',
      task_title: data?.task_title || '',
      officer_id: data?.loan_assignment?.officer_id || '',
      start_date: data?.start_date || '',
      end_date: data?.end_date || '',
      document: data?.document || [],
      description: data?.descriptionState || '',
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
        priority_great_than: 2,
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

  async function handleFileChange(event: any) {
    const files: FileList | null = event.target.files

    const fileList = Array.from(files || []).filter((file) => {
      const fileSizeMB = file.size / (1024 * 1024)

      return fileSizeMB <= 200 && file.type === 'application/pdf'
    })

    if (!fileList.length) {
      event.target.value = ''
      return swalToast.fire({
        icon: 'error',
        title: 'Something went wrong. Please make sure your file is pdf and does not exceed 200MB',
      })
    }

    const fileBase64List: Base64Item[] = []

    try {
      for (const file of fileList) {
        const fileBase64 = await convertFileToBase64(file)

        if (!fileBase64) return

        const newFile: Base64Item = {
          document_name: file.name || '',
          base64: fileBase64,
          size: file.size,
          type: file.type,
        }
        fileBase64List.push(newFile)
      }
    } catch (error) {
      //   return swalToast.fire({
      //     icon: 'error',
      //     title: 'Something went wrong.',
      //   })
    }

    event.target.value = ''
    setFile([...file, ...fileBase64List])
  }

  function handleChangeDescription(value: string) {
    setDescriptionState(value)
  }

  function renderComponent() {
    return (
      <div className='col-12'>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 align-self-center'>Priority</div>
          <div className='d-flex flex-row gap-16px col-10'>
            {PRIORITY_TASK.map((item, i) => (
              <Radio
                key={i}
                classNameLabel={clsx([
                  values.priority === item.value
                    ? 'fs-4 fw-medium'
                    : 'text-gray-600 fs-4 fw-medium',
                ])}
                name='priority'
                label={item.label}
                checked={values.priority === item.value}
                value={item.value}
                onChange={handleChange}
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
              formats={['link', 'list', 'bullet']}
              id='description'
              value={descriptionState}
              onChange={handleChangeDescription}
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 align-self-center'>Start - End</div>
          <div className='col-10 ' style={{width: '81%'}}>
            <div className='row'>
              <div className='col-12 d-flex flex-row gap-6'>
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
            <UploadFile
              className='w-100'
              handleFileChange={(e) => {
                handleFileChange(e)
              }}
            />
          </div>
        </div>
        {!!file.length && (
          <div className='col-12'>
            <div className='row'>
              <div className='col-2'></div>
              <div className='col-10'>
                <RenderFile
                  className='mt-30px pt-30px border-top border-gray-200'
                  url='/borrower-document/'
                  arrayMap={file || []}
                  setUploadFile={(index) => {
                    const updatedFiles = [...file]
                    updatedFiles.splice(index, 1)
                    setFile(updatedFiles)
                  }}
                />
              </div>
            </div>
          </div>
        )}
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
            style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}
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
