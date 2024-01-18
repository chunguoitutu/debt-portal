import {CUSTOMER_EMPLOYMENT_CONFIG} from './config'

const Employment = ({data}: any) => {
  const {employment} = data || {}

  return (
    <div>
      <div className='grid-2-column gap-12px'>
        {CUSTOMER_EMPLOYMENT_CONFIG.map((el, i) => {
          let value = employment?.[el.key]

          if (el.key === 'employment_status') {
            const isSelfEmployed = employment[el.key] === 'UNEMPINC' ? true : false
            value = isSelfEmployed ? 'Yes' : 'No'
          } else if (el.format === 'option') {
            const label = el.options?.find((o) => o.value === value)?.label || ''
            value = label
          }

          return (
            <>
              <span className='fs-14 text-gray-700 w-fit-content'>{el.label}</span>
              <span className='fs-14 text-gray-900 fw-semibold'>{value}</span>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Employment
