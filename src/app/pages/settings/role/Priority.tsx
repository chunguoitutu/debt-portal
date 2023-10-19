import {ROLE_PRIORITY} from '../../../utils/globalConfig'

type Props = {
  data: any
}

const Priority = ({data}: Props) => {
  const priority = ROLE_PRIORITY.filter((priority) => Number(data?.priority) === priority.value)

  return (
    <div
      style={{
        paddingTop: '16.25px',
        paddingBottom: '16.25px',
        height: '63.3px',
        display: 'flex',
        alignItems: 'center',
      }}
      className='text-gray-600 fw-bold '
    >
      {priority?.[0]?.label}
    </div>
  )
}

export default Priority
