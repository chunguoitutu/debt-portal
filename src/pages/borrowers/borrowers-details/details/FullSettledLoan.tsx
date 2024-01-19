import {LoanDetailsProps, OrderBy, PaginationType} from '@/app/types'
import {FC, useEffect, useMemo, useState} from 'react'
import {TableSecondary} from '@/components/table'

import {Sum, filterObjectKeyNotEmpty, handleFormatFilter, isObject} from '@/app/utils'
import {CONFIG_FULL_SETTLED_LOAN__HISTORY} from './config'

const FullSettledLoan: FC<LoanDetailsProps> = ({customerInfo}) => {
  const {full_settled_loan = []} = customerInfo || {}

  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>('desc')
  const [keySort, setKeySort] = useState<string>('id')
  const [dataFilter, setDataFilter] = useState<{[key: string]: any}>({})
  const [dataFilterSubmitted, setDataFilterSubmitted] = useState<{[key: string]: any}>({})
  const [loadApi, setLoadApi] = useState<boolean>(true)
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false)
  const [pagination, setPagination] = useState<PaginationType>({
    pageSize: 10,
    currentPage: 1,
  })
  const {pageSize, currentPage} = pagination

  useEffect(() => {
    handleGetListing()
  }, [pageSize, currentPage, loadApi, keySort, orderBy])

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
    const newDataFilter = handleFormatFilter({
      dataFilter: {
        ...dataFilter,
      },
      keyDate: ['application_date'],
      keyNumber: ['loan_type_id', 'id', 'loan_terms'],
    })
    setDataFilterSubmitted(dataFilter) // show data filtered
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
        data={full_settled_loan}
        actions={true}
        loading={loading}
        pageSize={pageSize}
        currentPage={currentPage}
        showTableFooter={(full_settled_loan || []).length > 0}
        tableFooter={
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
              <td className='text-end px-10px fs-16 fw-bold'>{Sum('p&l', full_settled_loan)}</td>
              <td></td>
            </tr>
          </tfoot>
        }
      />
    </div>
  )
}

export default FullSettledLoan
