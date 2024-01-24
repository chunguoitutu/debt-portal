import Icons from '@/components/icons'
import React from 'react'
import {useDrag} from 'react-dnd'

type Props = {
  data: any
}
export const ItemTypes = {
  KNIGHT: 'knight',
}
const ButtonMyTask = ({data}: Props) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'task',
    item: {id: data},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      style={{
        opacity: isDragging ? '0.3' : '1',
        cursor: 'move',
      }}
      draggable
      ref={drag}
      className='card p-16px d-flex flex-column wrapper-my-tasks-child gap-16px'
    >
      <div className='d-flex align-items-center gap-8px'>
        <div className='bg-primary w-10px h-10px flex-shrink-0 rounded-circle'></div>
        <span className='fs-14 fw-semibold text-gray-600'>{data?.priority}</span>
      </div>
      <div className='d-flex flex-column gap-8px '>
        <h3 className='p-0 m-0 fs-16 fw-semibold test-gray-900'>{data?.title}</h3>
        <p className='p-0 m-0 fs-14 fw-normal test-gray-600'>{data?.DESCRIPTION}</p>
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex align-items-center gap-8px'>
          <Icons name={'TimeMyTasks'} />
          <p className='fs-14 fw-normal test-gay-900'>{data?.date}</p>
        </div>
        <div className='d-flex align-items-center gap-8px  p-0 m-0'>
          <Icons name={'TimeMyTasks'} />
          <p className='fs-14 fw-normal test-gay-900 p-0 m-0'>{data?.user}</p>
        </div>
      </div>
    </div>
  )
}

export default ButtonMyTask
