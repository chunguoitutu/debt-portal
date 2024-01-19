import React from 'react'

import {PageLink, PageTitle} from '@/_metronic/layout/core'
import Loading from '@/components/loading'
import NotFoundPage from '@/pages/not-found-page/NotFoundPage'
import {useEffect, useMemo, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'

import './style.scss'
import HorizontalMenu from '@/components/menu'
import {LoanInfo} from '@/app/types'
import request from '@/app/axios'
import {getMenuHorizontalCustomerDetails} from '@/app/constants/menu'
import {useAuth} from '@/app/context/AuthContext'
import BorrowersHeader from './BorrowersHeader'
import Overview from './overview/Overview'

type Props = {}
const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'customers',
    path: '/customers/listing',
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

const BorrowerDetail = (props: Props) => {
  const {customerId} = useParams()
  const {currentUser} = useAuth()
  const isAdminOrSuperAdmin = useMemo(
    () => ((currentUser?.priority || 0) > 2 ? false : true),
    [currentUser]
  )

  const [error, setError] = useState<boolean>(false)
  const [customerInfo, setCustomerInfo] = useState<any | null>(null)
  const [activeMenu, setActiveMenu] = useState<string>(
    getMenuHorizontalCustomerDetails(isAdminOrSuperAdmin)?.[0].value
  )

  const CUSTOMER_DETAILS_MENU = useMemo(
    () => getMenuHorizontalCustomerDetails(isAdminOrSuperAdmin),
    [isAdminOrSuperAdmin, currentUser]
  )

  useEffect(() => {
    if (!customerId) return setError(true)

    handleGetLoanDetails()
  }, [customerId])

  const CurrentComponent = useMemo(() => {
    return getMenuHorizontalCustomerDetails(isAdminOrSuperAdmin).find(
      (el) => el.value === activeMenu
    )?.component
  }, [activeMenu])

  function handleChangeActiveMenu(newValue: string) {
    setActiveMenu(newValue)
  }

  async function handleGetLoanDetails() {
    // Expect a number
    if (!customerId) return

    try {
      const {data} = await request.get(`/borrower/details/${customerId}`)
      if (data.error) {
        setError(true)
      }

      setCustomerInfo(data.data)
    } catch (error) {
      setError(true)
    }
  }

  // ============================== RENDER JSX, handle logic above ======================================================
  // if (error) return <NotFoundPage />

  // if (!loanInfo) return <Loading />

  return (
    <div className='loan-details-page h-100'>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'Customer Details'}</PageTitle>
      <div className='row gy-20px  h-100'>
        <div className='col-12 col-xxl-5 '>
          <div className='row h-100 flex-column flex-lg-row flex-xxl-column'>
            <div className='col-12 col-lg-6 col-xxl-12'>
              <BorrowersHeader data={customerInfo?.customer_details} />
            </div>

            <div className='col-12 col-lg-6 col-xxl-12 flex-grow-1 mt-20px mt-lg-0 mt-xxl-20px'>
              <Overview data={customerInfo?.overview || {}} />
            </div>
          </div>
        </div>

        <div className='col-12 col-xxl-7'>
          <div className='card p-30px h-100'>
            <h2 className='fs-20 fw-bolder mb-4'>Details</h2>

            <HorizontalMenu
              className='mt-24px'
              data={CUSTOMER_DETAILS_MENU}
              active={activeMenu}
              onChangeActiveMenu={(newValue: string) => {
                handleChangeActiveMenu(newValue)
              }}
            />

            {CurrentComponent && (
              <CurrentComponent
                loanInfo={null}
                setLoanInfo={() => {}}
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default BorrowerDetail