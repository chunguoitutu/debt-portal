import {useState} from 'react'

import ContentListButton from '@/components/list-button/ContentListButton'
import RepaymentScheduleCalculator from './repayment-schedule-calculator/RepaymentScheduleCalculator'
import Icons from '@/components/icons'
import PopupValidationPhoneNumber from './PopupValidationPhoneNumber'

const BackgroundCheck = () => {
  const [show, setShow] = useState<boolean>(false)
  const [showValidationPhone, setShowValidationPhone] = useState<boolean>(false)

  const configBackgroudCheck = {
    title: 'Background check',
    row: [
      {
        value: 'Repayment Schedule Calculator',
        icon: <Icons name={'ImgCalendar'} />,
        background: '#F8F5FF',
        onclick: () => {
          setShow(true)
        },
      },
      {
        value: 'Loan Cross Check',
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          alert('Loan Cross Check')
        },
      },
      {
        value: 'Validation Phone Number',
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          setShowValidationPhone(true)
        },
      },
    ],
  }

  return (
    <div className='h-100'>
      <ContentListButton config={configBackgroudCheck} />
      {show && <RepaymentScheduleCalculator show={show} handleClose={() => setShow(false)} />}
      {showValidationPhone && (
        <PopupValidationPhoneNumber onClose={() => setShowValidationPhone(false)} />
      )}
    </div>
  )
}

export default BackgroundCheck
