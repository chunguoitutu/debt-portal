import {priorityMyTasks} from './config'

type Props = {
  status: number | string
}

const PriorityMyTasks = ({status}: Props) => {
  const view = priorityMyTasks.filter((el) => el.value === Number(status || 1))
  return (
    <div>
      <div className='d-flex align-items-center gap-8px'>
        <div
          style={{
            background: view?.[0].bg,
          }}
          className=' w-10px h-10px flex-shrink-0 rounded-circle'
        ></div>
        <span className='fs-14 fw-semibold text-gray-600'>{view?.[0].label}</span>
      </div>
    </div>
  )
}

export default PriorityMyTasks
