import {STATUS_APPLICATION_FILTER} from '@/app/utils'
import {Checkbox} from '@/components/checkbox'

type Props = {
  value: any
  onChange: (e) => void
}

const Status = ({value, onChange}: Props) => {
  return (
    <div>
      <p className='fs-16 fw-semibold text-gray-900 pb-8px m-0'>Status</p>

      <div className='d-flex flex-column gap-8px'>
        {STATUS_APPLICATION_FILTER.map((data, index) => {
          return (
            <Checkbox
              key={index}
              name={data.label}
              value={Number(data.value)}
              label={data.label}
              classNameLabel={`ms-8px ${
                (value?.in || []).includes(Number(data.value)) ? 'text-gray-900 ' : 'text-gray-600 '
              } fs-16 fw-semibold `}
              checked={(value?.in || []).includes(Number(data.value))}
              onChange={onChange}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Status
