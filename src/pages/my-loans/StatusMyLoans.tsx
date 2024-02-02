import {Checkbox} from '@/components/checkbox'
import {priorityMyTasks} from './config'

type Props = {
  value: any
  onChange: (e: any) => void
}

const StatusMyLoans = ({value, onChange}: Props) => {
  return (
    <div className='d-flex gap-24px align-items-center'>
      {priorityMyTasks.map((data, index) => {
        return (
          <Checkbox
            key={index}
            name={data.label}
            value={Number(data.value)}
            label={data.label}
            classNameLabel={`text-gray-900 fs-14 fw-semibold`}
            checked={(value || []).includes(Number(data.value))}
            onChange={onChange}
          />
        )
      })}
    </div>
  )
}

export default StatusMyLoans
