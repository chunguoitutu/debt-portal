import {PageLink, PageTitle} from '@/_metronic/layout/core'
import Loading from '@/components/loading'
import NotFoundPage from '@/pages/not-found-page/NotFoundPage'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import LoanHeader from './LoanHeader'

import './style.scss'

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
  const [loanInfo, setLoanInfo] = useState<{[key: string]: any} | null>(null)

  const {loanId = 0} = useParams()

  useEffect(() => {
    if (!+loanId) return setError(true)

    setTimeout(() => {
      setLoanInfo({a: 1})
    }, 500)
  }, [loanId])

  if (error) return <NotFoundPage />

  if (!loanInfo) return <Loading />

  return (
    <div className='loan-details-page'>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'Loan Details'}</PageTitle>
      <div className='row gy-20px'>
        <div className='col-12 col-lg-4'>
          <LoanHeader loanInfo={loanInfo} />

          <div className='d-flex flex-lg-column mt-20px'>{/* <div>h1</div> */}</div>
        </div>
      </div>
    </div>
  )
}

export default LoanDetails
