import {TERM_UNIT} from '@/app/utils'

type Props = {
  data: any
  config?: any
}

const TermUnit = ({data, config}: Props) => {
  const currentTermUnit = TERM_UNIT.find((term) => term.value === data[config.key].toString())

  return (
    <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
      {currentTermUnit.label}
    </div>
  )
}

export default TermUnit
