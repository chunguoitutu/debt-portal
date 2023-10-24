import {ROLE_PRIORITY} from '../../../utils/globalConfig'

type Props = {
  data: any
}

const Priority = ({data}: Props) => {
  const priority = ROLE_PRIORITY.find((priority) => Number(data?.priority) === priority.value)

  return <span>{priority?.label}</span>
}

export default Priority
