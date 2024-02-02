import {FC} from 'react'
import securityImg from '@/app/images/security.png'

type Props = {
  text: string
}

const WarningAlert: FC<Props> = ({text}) => {
  return (
    <div className='bg-yellow-light d-flex align-items-center p-24px gap-24px rounded-4 border border-dashed border-yellow'>
      <img src={securityImg} alt='security' />

      <p className='m-0 fs-14'>{text}</p>
    </div>
  )
}

export default WarningAlert
