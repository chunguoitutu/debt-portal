import {PageLink, PageTitle} from '@/_metronic/layout/core'
import Loading from '@/components/loading'
import NotFoundPage from '@/pages/not-found-page/NotFoundPage'
import {useEffect, useMemo, useState} from 'react'
import {useParams} from 'react-router-dom'
import LoanHeader from './LoanHeader'

import './style.scss'
import NextPayment from './NextPayment'
import HorizontalMenu from '@/components/menu'
import {LOAN_DETAILS_MENU} from '@/app/constants/menu'
import {LoanInfo} from '@/app/types'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Loans',
    path: '/loans/listing',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const LoanDetails = () => {
  const [error, setError] = useState<boolean>(false)
  const [loanInfo, setLoanInfo] = useState<LoanInfo | null>(null)
  const [activeMenu, setActiveMenu] = useState<string>(LOAN_DETAILS_MENU[0].value)

  const {loanId = 0} = useParams()

  useEffect(() => {
    if (!+loanId) return setError(true)

    setTimeout(() => {
      setLoanInfo({
        loan_payment: [
          {
            id: 1,
            due_date: '2023-12-19 07:49:54',
            interest_amount: 4,
            loan_id: 1,
            payment_status: 'active',
            principal_amount: 13,
            total_amount: 100,
          },
          {
            id: 2,
            due_date: '2023-12-19 07:49:54',
            interest_amount: 4,
            loan_id: 1,
            payment_status: 'active',
            principal_amount: 13,
            total_amount: 100,
          },
          {
            id: 2,
            due_date: '2023-12-19 07:49:54',
            interest_amount: 4,
            loan_id: 1,
            payment_status: 'active',
            principal_amount: 13,
            total_amount: 100,
          },
          {
            id: 2,
            due_date: '2023-12-19 07:49:54',
            interest_amount: 4,
            loan_id: 1,
            payment_status: 'active',
            principal_amount: 13,
            total_amount: 100,
          },
        ],
        loan_payment_history: [
          {
            id: 1,
            repayment_date: '2023-12-19 07:49:54',
            interest_paid: 4,
            penalty_paid: 120,
            principal_paid: 12,
            repayment_id: 1,
          },
          {
            id: 2,
            repayment_date: '2023-12-19 07:49:54',
            interest_paid: 3.95,
            penalty_paid: 120,
            principal_paid: 12,
            repayment_id: 1,
          },
          {
            id: 2,
            repayment_date: '2023-12-19 07:49:54',
            interest_paid: 3.95,
            penalty_paid: 120,
            principal_paid: 12,
            repayment_id: 1,
          },
          {
            id: 2,
            repayment_date: '2023-12-19 07:49:54',
            interest_paid: 3.95,
            penalty_paid: 120,
            principal_paid: 12,
            repayment_id: 1,
          },
          {
            id: 2,
            repayment_date: '2023-12-19 07:49:54',
            interest_paid: 3.95,
            penalty_paid: 120,
            principal_paid: 12,
            repayment_id: 1,
          },
          {
            id: 2,
            repayment_date: '2023-12-19 07:49:54',
            interest_paid: 3.95,
            penalty_paid: 120,
            principal_paid: 12,
            repayment_id: 1,
          },
          {
            id: 2,
            repayment_date: '2023-12-19 07:49:54',
            interest_paid: 3.95,
            penalty_paid: 120,
            principal_paid: 12,
            repayment_id: 1,
          },
          {
            id: 2,
            repayment_date: '2023-12-19 07:49:54',
            interest_paid: 3.95,
            penalty_paid: 120,
            principal_paid: 12,
            repayment_id: 1,
          },
        ],
      })
    }, 500)
  }, [loanId])

  const CurrentComponent = useMemo(() => {
    return LOAN_DETAILS_MENU.find((el) => el.value === activeMenu)?.component
  }, [activeMenu])

  function handleChangeActiveMenu(newValue: string) {
    setActiveMenu(newValue)
  }

  // ============================== RENDER JSX, handle logic above ======================================================
  if (error) return <NotFoundPage />

  if (!loanInfo) return <Loading />

  return (
    <div className='loan-details-page'>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'Loan Details'}</PageTitle>
      <div className='row gy-20px'>
        <div className='col-12 col-xxl-4'>
          <div className='row h-100 flex-column flex-lg-row flex-xxl-column'>
            <div className='col-12 col-lg-6 col-xxl-12'>
              <LoanHeader loanInfo={loanInfo} />
            </div>

            <div className='col-12 col-lg-6 col-xxl-12 flex-grow-1 mt-20px mt-lg-0 mt-xxl-20px'>
              <NextPayment loanInfo={loanInfo} />
            </div>
          </div>
        </div>

        <div className='col-12 col-xxl-8'>
          <div className='card p-30px h-100'>
            <h2 className='fs-20 fw-bolder mb-4'>Transactions History, Schedule And Bad Debt</h2>

            <HorizontalMenu
              className='mt-24px'
              data={LOAN_DETAILS_MENU}
              active={activeMenu}
              onChangeActiveMenu={(newValue: string) => {
                handleChangeActiveMenu(newValue)
              }}
            />

            {CurrentComponent && <CurrentComponent loanInfo={loanInfo} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanDetails
