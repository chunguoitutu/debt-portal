import Icons from '@/components/icons'
import ContentListButton from '@/components/list-button/ContentListButton'

const configPrintOptions = {
  title: 'Print Options',
  classIcons: 'h-36px w-36px me-5',
  classButton: 'py-8px px-0px',
  classWrapper: 'py-22px px-30px',
  row: [
    {
      value: 'Loan Application',
      icon: <Icons name={'ImgPrintOptions'} />,
      background: '#F8F5FF',
      onclick: () => {
        alert('Loan Application')
      },
    },
    {
      value: 'Loan Cross Check',
      icon: <Icons name={'ImgPrintOptions'} />,
      background: '#F8F5FF',
      onclick: () => {
        alert('Loan Cross Check')
      },
    },
    {
      value: 'Loan Contract',
      icon: <Icons name={'ImgPrintOptions'} />,
      background: '#F8F5FF',
      onclick: () => {
        alert('Loan Contract')
      },
    },
    {
      value: 'SOA',
      icon: <Icons name={'ImgPrintOptions'} />,
      background: '#F8F5FF',
      onclick: () => {
        alert('SOA')
      },
    },
    {
      value: 'Retention Vocer Letter',
      icon: <Icons name={'ImgPrintOptions'} />,
      background: '#F8F5FF',
      onclick: () => {
        alert('Retention Vocer Letter')
      },
    },
    {
      value: 'Retention Vocer Letter - All',
      icon: <Icons name={'ImgPrintOptions'} />,
      background: '#F8F5FF',
      onclick: () => {
        alert('Retention Vocer Letter - All')
      },
    },
    {
      value: 'Loan Completion Letter',
      icon: <Icons name={'ImgPrintOptions'} />,
      background: '#F8F5FF',
      onclick: () => {
        alert('Loan Completion Letter')
      },
    },
    {
      value: 'SOA Form 2',
      icon: <Icons name={'ImgPrintOptions'} />,
      background: '#F8F5FF',
      onclick: () => {
        alert('SOA Form 2')
      },
    },
    {
      value: 'SOA Form 3',
      icon: <Icons name={'ImgPrintOptions'} />,
      background: '#F8F5FF',
      onclick: () => {
        alert('SOA Form 3')
      },
    },
  ],
}

const PrintOptions = () => {
  return <ContentListButton config={configPrintOptions} />
}

export default PrintOptions
