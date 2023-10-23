import ContentListButton from '../../../components/list-button/ContentListButton'
import ImgCalendar from '../../../images/ImgCalendar'
import ImgLoanCrossCheck from '../../../images/ImgLoanCrossCheck'

const configBackgroudCheck = {
  title: 'Background check',
  row: [
    {
      value: 'Repayment Schedule Calculator',
      icon: <ImgCalendar />,
      background: '#F8F5FF',
      onclick: () => {
        alert('Repayment Schedule Calculator')
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

const BackgroundCheck = () => {
  return <ContentListButton config={configBackgroudCheck} />
}

export default BackgroundCheck
