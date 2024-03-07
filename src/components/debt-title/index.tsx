import React, {FC} from 'react'
import mainLogo from '@/app/images/logo-debt.svg'
import {getFullName} from '@/app/utils'
import {useAuth} from '@/app/context/AuthContext'

interface Props {
  title: string
  className?: string
}

const DebtTile: FC<Props> = ({title, className}) => {
  const {currentUser} = useAuth()

  return (
    <div
      className={`card d-flex flex-row align-items-center justify-content-between gap-4px position-sticky top-0 ${className}`}
      style={{
        borderRadius: '0px',
        borderBottom: '1p solid #DBDFE9',
        zIndex: 999,
        borderLeft: 0,
        borderRight: 0,
      }}
    >
      <div className='d-flex flex-column p-12px'>
        <div className='fw-bold fs-18 text-gray-900'>{title}</div>
        <div className='fw-normal fs-13 text-gray-900' style={{opacity: '0.6'}}>
          Hi {getFullName(currentUser)} Welcome To Debt Collection!
        </div>
      </div>
      <div>
        <img src={mainLogo} alt='main-logo' className='pe-12px' />
      </div>
    </div>
  )
}

export default DebtTile
