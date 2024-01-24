import {useDrop} from 'react-dnd'
import ButtonMyTask from './ButtonMyTask'
import Cookies from 'js-cookie'

type Props = {
  dataS: Array<any>
  statusMyTaskTable: string
  setData: any
}

const MapData = ({dataS, statusMyTaskTable, setData}: Props) => {
  const [{isOver}, drop] = useDrop(
    () => ({
      accept: 'task',
      drop: (item: any) => {
        Cookies.set('myTasks', JSON.stringify(item))
        const newData = dataS.filter((el) => Number(el?.id) !== Number(item?.id?.id))
        const updateData = newData.concat({...item?.id, task: statusMyTaskTable})
        setData(updateData)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  )

  return (
    <div ref={drop} className={`wrapper-my-tasks d-flex flex-column gap-8px`}>
      {dataS.map((data, i) => {
        if (data?.task === statusMyTaskTable)
          return (
            <div key={i} className=''>
              <ButtonMyTask data={data} />
            </div>
          )
        return
      })}
      {isOver && <div className='is-over-my-tasks'></div>}
    </div>
  )
}

export default MapData
