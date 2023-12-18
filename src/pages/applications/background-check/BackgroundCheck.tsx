import {useState} from 'react'

import ContentListButton from '@/components/list-button/ContentListButton'
import RepaymentScheduleCalculator from './repayment-schedule-calculator/RepaymentScheduleCalculator'
import Icons from '@/components/icons'
import WrapperGoogleSearch from './google-search'
import {useParams} from 'react-router-dom'
import PopupValidationPhoneNumber from './validate-phone-number/PopupValidationPhoneNumber'
import MLCBReport from './MLCB/MLCBReport'
import PageCheckDeskTop from './up-page-check/PageCheck'
interface props {
  data: any
}
const BackgroundCheck = ({data}: props) => {
  const [show, setShow] = useState<boolean>(false)
  const [showValidationPhone, setShowValidationPhone] = useState<boolean>(false)

  const [showMLCBReport, setShowMLCBReport] = useState<boolean>(false)
  const [showSearchCheck, setShowSearchCheck] = useState<boolean>(false)
  const [showSearchPageCheck, setShowSearchPageCheck] = useState<boolean>(false)

  const {applicationIdEdit} = useParams()

  const configBackgroudCheck = {
    title: 'Background check',
    row: [
      {
        value: 'Repayment Schedule Calculator',
        icon: <Icons name={'ImgCalendar'} />,
        background: '#F8F5FF',
        show: true,
        onclick: () => {
          setShow(true)
        },
      },
      {
        value: 'Loan Cross Check',
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        background: 'rgba(232, 255, 243, 0.85)',
        show: true,
        onclick: () => {
          alert('Loan Cross Check')
        },
      },
      {
        value: 'Validation Phone Number',
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        show: !!applicationIdEdit && data.application?.status === 1,
        background: 'rgba(232, 255, 243, 0.85)',
        onclick: () => {
          setShowValidationPhone(true)
        },
      },
      {
        value: 'Get MLCB Report',
        icon: <Icons name={'ImgLoanCrossCheck'} />,
        background: 'rgba(232, 255, 243, 0.85)',
        show: !!applicationIdEdit && data.application?.status === 1,
        onclick: () => {
          setShowMLCBReport(true)
        },
      },
      {
        value: 'Google Search Check',
        icon: <Icons name={'GoogleCheck'} />,
        background: '#E2E5E7',
        show: !!applicationIdEdit && data.application?.status === 1,
        onclick: () => {
          setShowSearchCheck(true)
        },
      },
      {
        value: 'UN Page Check',
        icon: <Icons name={'GoogleCheck'} />,
        background: '#E2E5E7',
        show: !!applicationIdEdit && data.application?.status === 1,
        onclick: () => {
          setShowSearchPageCheck(true)
        },
      },
    ],
  }

  return (
    <div className='h-100'>
      <ContentListButton config={configBackgroudCheck} />
      {show && <RepaymentScheduleCalculator show={show} handleClose={() => setShow(false)} />}
      {showValidationPhone && !!applicationIdEdit && data.application?.status === 1 && (
        <PopupValidationPhoneNumber onClose={() => setShowValidationPhone(false)} />
      )}
      {showMLCBReport && !!applicationIdEdit && data.application?.status === 1 && (
        <MLCBReport onClose={() => setShowMLCBReport(false)} />
      )}
      {showSearchCheck && !!applicationIdEdit && data.application?.status === 1 && (
        <WrapperGoogleSearch
          payload={`${data?.customer?.firstname} ${data?.customer?.middlename}${
            !!data?.customer?.middlename ? ' ' : ''
          }${data?.customer?.lastname}`}
          show={showSearchCheck}
          handleClose={() => setShowSearchCheck(false)}
        />
      )}

      {showSearchPageCheck && !!applicationIdEdit && data.application?.status === 1 && (
        <PageCheckDeskTop
          payload={`${data?.customer?.lastname}`}
          show={showSearchPageCheck}
          handleClose={() => setShowSearchPageCheck(false)}
        />
      )}
    </div>
  )
}

export default BackgroundCheck
