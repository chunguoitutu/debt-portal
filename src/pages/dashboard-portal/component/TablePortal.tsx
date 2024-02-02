import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../style.scss'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {TableSecondary} from '@/components/table'
import {FC, useEffect, useState} from 'react'
import {LoanDetailsProps, OrderBy} from '@/app/types'
import {LOAN_CUSTOMER_PORTAL, LOAN_CUSTOMER_PORTAL_CARD_MOBILE} from '../config'
import TableMobile from '@/components/table/TableMobile'
import {useNavigate} from 'react-router-dom'

const TablePortal: FC<LoanDetailsProps> = ({loanInfo}) => {
  const {instalment_schedule = []} = loanInfo || {}
  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>('desc')
  const [keySort, setKeySort] = useState<string>('id')
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth
      setIsMobile(clientWidth < 520)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      setIsMobile(true)
    }
  }, [document.documentElement.clientWidth < 520])

  useEffect(() => {
    handleGetListing()
  }, [keySort, orderBy])

  /**
   * Handle change filter sort
   */
  function handleChangeSortBy(key: string) {
    if (key === keySort) {
      setOrderBy(orderBy === 'desc' ? 'asc' : 'desc')
    } else {
      setKeySort(key)
      setOrderBy('desc')
    }
  }

  async function handleGetListing() {
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      setLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function handleRedirectViewOther() {
    navigate('/my-loans')
  }

  function handleViewLoanDetails() {
    navigate('/my-loans/details/1')
  }

  return (
    <div className='table-portal w-100 mt-20px mt-lg-0 res-parent-table-portal'>
      <div className='p-20px p-xxl-30px p-xl-30px p-lg-30px p-md-30px p-sm-30px pb-8px pb-xl-20px pb-lg-20px pb-md-20px pb-sm-20px'>
        <div className='d-flex flex-row align-items-center justify-content-between'>
          <div className='table-header-title-res'>
            <div className='fs-20 fw-bold text-gray-900'>All Active Loans</div>
            <div className='fs-14 text-gray-400 fw-normal'>You have 2 active loans</div>
          </div>
          {!isMobile ? (
            <div className='d-flex flex-row text-primary cursor-pointer gap-8px hover-underline'>
              <div className='fs-14 text-primary fw-medium' onClick={handleRedirectViewOther}>
                View Other Loans
              </div>
              <FontAwesomeIcon icon={faChevronRight} className='mt-1' />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='p-0'>
        {isMobile ? (
          <div
            className='d-flex flex-column pt-12px p-20px cursor-pointer'
            onClick={handleViewLoanDetails}
          >
            <TableMobile
              keySort={keySort}
              orderBy={orderBy}
              className='mh-500px'
              config={LOAN_CUSTOMER_PORTAL_CARD_MOBILE}
              onChangeSortBy={handleChangeSortBy}
              data={instalment_schedule}
              actions={true}
              loading={loading}
            />
            <div className='d-flex flex-row text-primary align-items-center justify-content-center cursor-pointer gap-8px hover-underline mt-16px'>
              <div className='fs-14 text-primary fw-medium' onClick={handleRedirectViewOther}>
                View Other Loans
              </div>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        ) : (
          <TableSecondary
            keySort={keySort}
            orderBy={orderBy}
            className='mh-500px'
            config={LOAN_CUSTOMER_PORTAL}
            onChangeSortBy={handleChangeSortBy}
            data={instalment_schedule}
            actions={true}
            loading={loading}
          />
        )}
      </div>
    </div>
  )
}

export default TablePortal
