import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTIcon} from '@/_metronic/helpers'
import moment from 'moment'
import PriorityMyTasks from './priorityMyTasks'
import Icons from '@/components/icons'
import {convertSize} from '@/app/utils'
import Button from '@/components/button/Button'
type Props = {
  show: boolean
  onShow: () => void
}

const data = {
  date: '2024-1-2 00:00:00',
  status: 1,
  title: 'Contract Signing and Disbursement',
  note: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry,s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
  link: [
    'http://example.ysentertaiment.com/kasufd/jau62537hd/826hndalsmnd/9827364/task001',
    'http://example.ysentertaiment.com/kasufd/9827364/task001',
    'http://example.ysentertaiment.com/dsfsdf/fsd541/sdf451/task365',
  ],
  startDate: '2024-1-2',
  endDate: '2024-1-2',
  createedBy: 'Egent.001',
  assignTo: 'Egent.001',
  file: [
    {
      name: 'ID Card - Back side.pdf',
      size: 20000,
    },
    {
      name: 'ID Card - Back side.pdf',
      size: 20000,
    },
    {
      name: 'ID Card - Back side.pdf',
      size: 20000,
    },
    {
      name: 'ID Card - Back side.pdf',
      size: 20000,
    },
  ],
}
const modalsRoot = document.getElementById('root-modals') || document.body
const ViewMyTask = ({show, onShow}: Props) => {
  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      style={{}}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={onShow}
      backdrop={true}
    >
      <div className='d-flex justify-content-between align-items-start p-30px  '>
        <div>
          <h2 className='m-0 title-my-tasks-view'>{moment(data.date).date()}</h2>
          <p className='title-my-tasks-view-date'>{moment(data.date).format('MMM - YYYY')}</p>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <p className='pe-24px p-0 m-0 test-gray-600'>
            Updated {moment().diff(moment(data.date), 'days')} days ago
          </p>
          <div className='cursor-pointer p-0 m-0' onClick={onShow}>
            <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
          </div>
        </div>
      </div>
      <div
        style={{
          maxHeight: 'calc(100vh - 290px)',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        className='d-flex justify-content-center mx-14px align-items-start px-30px pb-30px  gap-30px'
      >
        <div className='col-7 '>
          <PriorityMyTasks status={1} />
          <div>
            <h1 className='fs-16 test-gray-900 fw-semibold m-0 px-0 pt-16px pb-8px '>
              {data.title}
            </h1>
            <p className='fs-14 fw-normal test-gray-600'>{data.note}</p>
          </div>
          <div className='pt-8px d-flex flex-column gap-8px'>
            {data.link.map((el, i) => {
              return (
                <div
                  className='d-flex justify-content-start align-items-start text-break gap-8px'
                  key={i}
                >
                  <div className='bg-primary w-5px h-5px flex-shrink-0 rounded-circle mt-8px'></div>{' '}
                  <p className='link-view-my-tasks'>{el}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className='col-5'>
          <div className='d-flex justify-content-start align-items-center gap-8px'>
            <Icons name={'TimeMyTasks'} />
            <p className='fs-13 test-gray-600 fw-normal p-0 m-0'>Start Date:</p>
            <p className='m-0 fs-13 test-gray-900 fw-normal p-0'>
              {moment(data.startDate).format('DD MMM, YYYY')}
            </p>
          </div>
          <div className='d-flex justify-content-start align-items-center gap-8px pt-10px'>
            <Icons name={'TimeMyTasks'} />
            <p className='fs-13 test-gray-600 fw-normal p-0 m-0'>Start Date:</p>
            <p className='m-0 fs-13 test-gray-900 fw-normal p-0'>
              {moment(data.startDate).format('DD MMM, YYYY')}
            </p>
          </div>
          <div className='d-flex justify-content-start align-items-center gap-8px  pt-10px'>
            <Icons name={'PeopleMyTasks'} />
            <p className='fs-13 test-gray-600 fw-normal p-0 m-0'>Start Date:</p>
            <p className='m-0 fs-13 test-gray-900 fw-normal p-0'>
              {moment(data.startDate).format('DD MMM, YYYY')}
            </p>
          </div>
          <div className='d-flex justify-content-start align-items-center gap-8px  pt-10px'>
            <Icons name={'PeopleMyTasks'} />
            <p className='fs-13 test-gray-600 fw-normal p-0 m-0'>Start Date:</p>
            <p className='m-0 fs-13 test-gray-900 fw-normal p-0'>
              {moment(data.startDate).format('DD MMM, YYYY')}
            </p>
          </div>
          <div className='d-flex flex-column gap-8px mt-16px'>
            {data.file.map((e, i) => {
              return (
                <div
                  style={{
                    border: '1px solid  #F1F1F2',
                  }}
                  className='d-flex justify-content-start rounded-5 align-items-center gap-16px py-8px'
                >
                  <Icons name={'FileMyTask'} />
                  <div className='d-flex flex-column gay-4px'>
                    <h1 className='fs-12 test-gray-900 fw-semibold p-0 m-0'>{e.name}</h1>
                    <p className='fs-12  test-gray-400 fw-semibold p-0 m-0'>
                      {convertSize(Number(e.size) || 0)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div
        className='p-30px d-flex justify-content-end gap-16px'
        style={{
          borderTop: '1px solid  #F1F1F2',
        }}
      >
        <Button
          type='reset'
          onClick={() => {}}
          className='btn-lg btn-secondary align-self-center  fs-6'
        >
          Delete Task
        </Button>
        <Button className='btn-lg btn-primary fs-6' type='submit' onClick={() => {}}>
          Edit
        </Button>
      </div>
    </Modal>,
    modalsRoot
  )
}

export default ViewMyTask
