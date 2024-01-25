import Icons from '@/components/icons'
import {useDrag} from 'react-dnd'
import PriorityMyTasks from './priorityMyTasks'

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
      ref={drag}
      className='card p-16px d-flex flex-column wrapper-my-tasks-child gap-16px'
    >
      <PriorityMyTasks status={data?.status} />
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
          <Icons name={'PeopleMyTasks'} />
          <p className='fs-14 fw-normal test-gay-900 p-0 m-0'>{data?.user}</p>
        </div>
      </div>
    </div>
  )
}

export default ButtonMyTask
