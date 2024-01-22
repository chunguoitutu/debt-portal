import {LoanDetailsProps, OrderBy} from '@/app/types'
import {FC, useEffect, useState} from 'react'
import {TableSecondary} from '@/components/table'

import {Sum} from '@/app/utils'
import {CONFIG_FULL_SETTLED_LOAN__HISTORY} from './config'

const FullSettledLoan: FC<LoanDetailsProps> = ({customerInfo}) => {
  const {full_settled_loan = []} = customerInfo || {}

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

  const tableFooter = () => {
    return (
      <tfoot className='table-foot-repayment position-sticky bottom-0 bg-gray-100'>
        <tr>
          <td className='fs-16 fw-bold  p-16px text-start'>Total</td>
          <td></td>
          <td></td>
          <td className='text-end px-10px fs-16 fw-bold '></td>
          <td className='text-end px-10px fs-16 fw-bold'>
            {Sum('total_collection', full_settled_loan)}
          </td>
          <td className='text-end px-10px fs-16 fw-bold'>
            {Sum('loan_amount', full_settled_loan)}
          </td>
          <td
            style={{
              color: +Sum('p&l', full_settled_loan, false) < 0 ? '#F64E60' : '#071437',
            }}
            className='text-end px-10px fs-16 fw-bold'
          >
            {Sum('p&l', full_settled_loan)}
          </td>
          <td></td>
        </tr>
      </tfoot>
    )
  }
  return (
    <div>
      {/* Table */}
      <TableSecondary
        keySort={keySort}
        orderBy={orderBy}
        className='mt-16px mh-500px'
        config={CONFIG_FULL_SETTLED_LOAN__HISTORY}
        onChangeSortBy={handleChangeSortBy}
        data={full_settled_loan}
        actions={true}
        loading={loading}
        showTableFooter={(full_settled_loan || []).length > 0}
        tableFooter={tableFooter()}
      />
    </div>
  )
}

export default FullSettledLoan
