import {PageLink, PageTitle} from '@/_metronic/layout/core'
import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import StatusMyTasks from './StatusMyTask'
import {useEffect, useState} from 'react'
import './styles.scss'
import MapData from './MapData'
import request from '@/app/axios'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'My Tasks',
    path: '/my-tasks',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

function MyTasks() {
  const [priority, setPriority] = useState<number[]>([])
  const [data, setData] = useState([])

  useEffect(() => {
    request.get('/my-tasks/listing').then((res) => {
      setData(res?.data?.data)
    })
  }, [])

  return (
    <div className='h-100'>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'My Tasks'}</PageTitle>
      <div className='card h-100'>
        <div className='d-flex pt-30px px-30px justify-content-between align-items-center pb-16px'>
          <h1 className='text-gray-900 m-0  fs-20 fw-bold'>My Tasks</h1>
          <div className='d-flex justify-content-center align-items-center gap-16px'>
            <p className='text-gray-700  fw-semibold fs-16 p-0 m-0 '>from</p>
            <Input type='date' />
            <p className='text-gray-700  fw-semibold fs-16 p-0 m-0 '>to</p>
            <Input type='date' />

            <Button
              type='reset'
              onClick={() => {}}
              className='btn-lg btn-secondary align-self-center  fs-6'
            >
              Apply
            </Button>
            <Button
              type='reset'
              onClick={() => {}}
              className='btn-lg btn-secondary align-self-center  fs-6'
            >
              Today
            </Button>
            <Button className='btn-lg btn-primary fs-6' type='submit' onClick={() => {}}>
              Create Task
            </Button>
          </div>
        </div>
        <div
          style={{
            borderTop: '1px solid #F1F1F2',
            borderBottom: '1px solid #F1F1F2',
          }}
          className='py-8px px-30px d-flex align-items-center  gap-16px'
        >
          <p className='p-0 m-0 fs-14 fw-semibold'>Priority:</p>
          <StatusMyTasks
            value={priority}
            onChange={(e) => {
              const value = e.target.value
              if (priority.includes(+value)) {
                setPriority(priority.filter((e) => +e !== Number(value || 0)))
              } else {
                setPriority([...priority, Number(value)])
              }
            }}
          />
        </div>

        <div className='px-30px pt-8px  pb-8px  d-flex position-relative h-100 gap-4px '>
          <div className='col-3 h-100 '>
            <div className=' d-flex align-items-center gap-8px pb-16px'>
              <h2 className='p-0 m-0 test-gray-900 fs-16 fw-semibold'>TO DO LIST</h2>
              <p className='p-0 m-0 fs-14 fw-normal test-gray-500'>(5 to do)</p>
            </div>
            <MapData setData={setData} dataS={data} statusMyTaskTable='todo' />
          </div>
          <div className='col-3'>
            <div className=' d-flex align-items-center gap-8px  pb-16px'>
              <h2 className='p-0 m-0 test-gray-900 fs-16 fw-semibold'>ON PROGRESS</h2>
              <p className='p-0 m-0 fs-14 fw-normal test-gray-500'>(2 tasks)</p>
            </div>
            <MapData setData={setData} dataS={data} statusMyTaskTable='onprogress' />
          </div>
          <div className='col-3'>
            <div className=' d-flex align-items-center gap-8px  pb-16px'>
              <h2 className='p-0 m-0 test-gray-900 fs-16 fw-semibold'>DONE</h2>
              <p className='p-0 m-0 fs-14 fw-normal test-gray-500'>(3 tasks)</p>
            </div>
            <MapData setData={setData} dataS={data} statusMyTaskTable='done' />
          </div>
          <div className='col-3'>
            <div className=' d-flex align-items-center gap-8px  pb-16px'>
              <h2 className='p-0 m-0 test-gray-900 fs-16 fw-semibold'>REVISED</h2>
              <p className='p-0 m-0 fs-14 fw-normal test-gray-500'>(0 tasks)</p>
            </div>
            <MapData setData={setData} dataS={data} statusMyTaskTable='revised' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyTasks
