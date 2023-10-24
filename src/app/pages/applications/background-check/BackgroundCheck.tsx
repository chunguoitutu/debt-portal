import {useState} from 'react'
import ContentListButton from '../../../components/list-button/ContentListButton'
import ImgCalendar from '../../../images/ImgCalendar'
import ImgLoanCrossCheck from '../../../images/ImgLoanCrossCheck'
import RepaymentScheduleCalculator from './repayment-schedule-calculator/RepaymentScheduleCalculator'

const BackgroundCheck = () => {
  const [show, setShow] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)

  const configBackgroudCheck = {
    title: 'Background check',
    row: [
      {
        value: 'Repayment Schedule Calculator',
        icon: <ImgCalendar />,
        background: '#F8F5FF',
        onclick: () => {
          setShow(true)
        },
      },
      {
        value: 'Loan Cross Check',
        icon: <ImgLoanCrossCheck />,
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          alert('Loan Cross Check')
        },
      },
    ],
  }

  return (
    <div>
      <ContentListButton config={configBackgroudCheck} />
      {show && (
        <RepaymentScheduleCalculator
          setLoadApi={setLoadApi}
          loadapi={loadapi}
          show={show}
          handleClose={() => setShow(false)}
        />
      )}
    </div>
  )
}

export default BackgroundCheck
