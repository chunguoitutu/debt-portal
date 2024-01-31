import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../style.scss'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {TableSecondary} from '@/components/table'
import {FC, useEffect, useState} from 'react'
import {LoanDetailsProps, OrderBy} from '@/app/types'
import {LOAN_CUSTOMER_PORTAL} from '../config'

const TablePortal: FC<LoanDetailsProps> = ({loanInfo}) => {
  const {instalment_schedule = []} = loanInfo || {}
  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>('desc')
  const [keySort, setKeySort] = useState<string>('id')

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

  return (
    <div className='table-portal w-100 mt-20px mt-lg-0 res-parent-table-portal'>
      <div className='p-30px'>
        <div className='d-flex flex-row align-items-center justify-content-between'>
          <div className='table-header-title-res'>
            <div className='fs-20 fw-bold text-gray-900'>All Active Loans</div>
            <div className='fs-14 text-gray-400 fw-normal'>You have 2 active loans</div>
          </div>
          <div className='d-flex flex-row text-primary cursor-pointer gap-8px'>
            <div className='fs-14 text-primary fw-medium'>View Other Loans</div>
            <FontAwesomeIcon icon={faChevronRight} className='mt-1' />
          </div>
        </div>
        <div>
          {/* Table */}
          <TableSecondary
            keySort={keySort}
            orderBy={orderBy}
            className='mt-8px mh-500px'
            config={LOAN_CUSTOMER_PORTAL}
            onChangeSortBy={handleChangeSortBy}
            data={instalment_schedule}
            actions={true}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default TablePortal
