import {LoanDetailsProps, OrderBy} from '@/app/types'
import {FC, useEffect, useState} from 'react'
import {TableSecondary} from '@/components/table'

import {CONFIG_FULL_SETTLED_LOAN__HISTORY} from './config'
import TableFooterCustomer from './TableFooterCustomer'

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
        tableFooter={TableFooterCustomer({
          data: full_settled_loan,
          KeyData: ['total_collection', 'loan_amount', 'p&l'],
        })}
      />
    </div>
  )
}

export default FullSettledLoan
