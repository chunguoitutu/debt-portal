import {LoanDetailsProps, OrderBy, PaginationType} from '@/app/types'
import {FC, useEffect, useState} from 'react'
import {TableSecondary} from '@/components/table'

import {CONFIG_FULL_SETTLED_LOAN__HISTORY} from './config'
import {Sum, formatMoney} from '@/app/utils'

const UnrecoverableLoan: FC<LoanDetailsProps> = ({customerInfo}) => {
  const {unrecoverable_loan = []} = customerInfo || {}

  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>('desc')
  const [keySort, setKeySort] = useState<string>('id')
  const [pagination, setPagination] = useState<PaginationType>({
    pageSize: 10,
    currentPage: 1,
  })
  const {pageSize, currentPage} = pagination

  useEffect(() => {
    handleGetListing()
  }, [pageSize, currentPage, keySort, orderBy])

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
    <div>
      {/* Table */}
      <TableSecondary
        keySort={keySort}
        orderBy={orderBy}
        className='mt-16px mh-350px'
        config={CONFIG_FULL_SETTLED_LOAN__HISTORY}
        onChangeSortBy={handleChangeSortBy}
        data={unrecoverable_loan}
        actions={true}
        loading={loading}
        pageSize={pageSize}
        currentPage={currentPage}
        showTableFooter={(unrecoverable_loan || []).length > 0}
        tableFooter={
          <tfoot className='table-foot-repayment position-sticky bottom-0 bg-gray-100'>
            <tr>
              <td className='fs-16 fw-bold  p-16px text-start'>Total</td>
              <td></td>
              <td></td>
              <td className='text-end px-10px fs-16 fw-bold '> </td>
              <td className='text-end px-10px fs-16 fw-bold'>
                {Sum('total_collection', unrecoverable_loan)}
              </td>
              <td className='text-end px-10px fs-16 fw-bold'>
                {Sum('loan_amount', unrecoverable_loan)}
              </td>
              <td className='text-end px-10px fs-16 fw-bold'>{Sum('p&l', unrecoverable_loan)}</td>
              <td></td>
            </tr>
          </tfoot>
        }
      />
    </div>
  )
}

export default UnrecoverableLoan
