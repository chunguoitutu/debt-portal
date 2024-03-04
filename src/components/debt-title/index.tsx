import React, {FC} from 'react'
import mainLogo from '@/app/images/logo-mc.png'

interface Props {
  title: string
  className?: string
}

const DebtTile: FC<Props> = ({title, className}) => {
  const username = 'Lionel Messi'
  return (
    <div
      className={`card d-flex flex-row align-items-center justify-content-between gap-4px position-sticky top-0 ${className}`}
      style={{
        borderRadius: '0px',
        borderBottom: '1p solid #DBDFE9',
        zIndex: 999,
      }}
    >
      <div className='d-flex flex-column p-12px'>
        <div className='fw-bold fs-16 text-gray-900'>{title}</div>
        <div className='fw-normal fs-13'>Hi {username} to debt collection!</div>
      </div>
      <div>
        <img src={mainLogo} alt='main-logo' className='pe-12px' />
      </div>
    </div>
  )
}

export default DebtTile
