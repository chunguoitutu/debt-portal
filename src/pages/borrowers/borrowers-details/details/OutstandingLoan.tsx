import {LoanDetailsProps, OrderBy, PaginationType} from '@/app/types'
import {FC, useEffect, useMemo, useState} from 'react'
import {TableSecondary} from '@/components/table'
import RowPerPage from '@/components/row-per-page'
import Pagination from '@/components/table/components/Pagination'
import {Sum, filterObjectKeyNotEmpty, handleFormatFilter, isObject} from '@/app/utils'
import {CONFIG_OUTSTANDING_LOAN__HISTORY} from './config'

const OutstandingLoan: FC<LoanDetailsProps> = ({customerInfo}) => {
  const {outstanding_loan = []} = customerInfo || {}

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
      <div className='d-flex align-items-center justify-content-between gap-16px py-16px border-bottom border-gray-200 position-relative'>
        <div className='d-flex align-items-center gap-32px'>
          {/* Note item */}
          <div className='d-flex align-items-center gap-8px'>
            <div className='bg-F64E60 w-10px h-10px flex-shrink-0 rounded-circle'></div>
            <span className='fs-14 fw-semibold text-gray-600'>Negative amount - loss</span>
          </div>

          {/* Note item */}
          <div className='d-flex align-items-center gap-8px'>
            <div className='bg-primary w-10px h-10px flex-shrink-0 rounded-circle'></div>
            <span className='fs-14 fw-semibold text-gray-600'>positive amount - profitable</span>
          </div>
        </div>
      </div>

      <TableSecondary
        keySort={keySort}
        orderBy={orderBy}
        className='mt-16px mh-350px'
        config={CONFIG_OUTSTANDING_LOAN__HISTORY}
        onChangeSortBy={handleChangeSortBy}
        data={outstanding_loan}
        actions={true}
        loading={loading}
        pageSize={pageSize}
        currentPage={currentPage}
        showTableFooter={(outstanding_loan || []).length > 0}
        tableFooter={
          <tfoot className='table-foot-repayment position-sticky bottom-0 bg-gray-100'>
            <tr>
              <td className='fs-16 fw-bold p-16px text-start'>Total</td>
              <td></td>
              <td className='text-end px-10px fs-16 fw-bold'> </td>
              <td className='text-end px-10px fs-16 fw-bold'>
                {Sum('total_collection', outstanding_loan)}
              </td>
              <td className='text-end px-10px fs-16 fw-bold'>
                {Sum('loan_amount', outstanding_loan)}
              </td>
              <td className='text-end px-10px fs-16 fw-bold'>{Sum('p&l', outstanding_loan)}</td>
              <td></td>
            </tr>
          </tfoot>
        }
      />
    </div>
  )
}

export default OutstandingLoan
