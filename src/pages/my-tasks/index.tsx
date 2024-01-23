import Button from '@/components/button/Button'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import {FC, useState} from 'react'

import {KTIcon} from '@/_metronic/helpers'
import {MY_TASK_CONFIG} from './config'
import {Input} from '@/components/input'
import {TextArea} from '@/components/textarea'
import {PropsStepApplication, UserInfo} from '@/app/types'
import clsx from 'clsx'
import Radio from '@/components/radio/Radio'
import {Select} from '@/components/select'
import UploadFile from '@/components/file/UploadFile'
import {PRIORITY_MY_TASK} from '@/app/utils'

const MyTasks = (props) => {
  const [showPopupCreate, setShowPopupCreate] = useState(false)
  const [userListing, setUserListing] = useState<(UserInfo & {fullname: string})[]>([])

  function handleShowCreate() {
    setShowPopupCreate(!showPopupCreate)
  }

  function handleCreateTask() {
    alert('Create Successfully')
    setShowPopupCreate(!showPopupCreate)
  }

  function renderComponent() {
    return (
      <div className='col-12'>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 align-self-center'>Priority</div>
          <div className='col-10'>
            <Radio name='priority' checked={true} />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 align-self-center'>Task Title</div>
          <div className='col-10'>
            <Input name={'task_title'} value={''} onChange={() => {}} />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 pt-2'>Description</div>
          <div className='col-10'>
            <TextArea id='description' name={'description'} value={''} onChange={() => {}} />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-2 fs-16 fw-medium text-gray-900 align-self-center'>Start - End</div>
          <div className='col-10'>
            <div className='row'>
              <div className='col-12 d-flex flex-row gap-1'>
                <div className='col-6'>
                  <Input name={'task_title'} value={''} onChange={() => {}} type='date' />
                </div>
                <div className='col-6'>
                  <Input name={'task_title'} value={''} onChange={() => {}} type='date' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-2 fs-16 fw-medium text-gray-900 align-self-center'>Assign To</div>
          <div className='col-10'>
            <Select
              name='officer_id'
              options={userListing}
              keyValueOption={'id'}
              keyLabelOption={'fullname'}
              onChange={() => {}}
              value={''}
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

export default MyTasks
