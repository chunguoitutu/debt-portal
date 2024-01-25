import {LoanDetailsProps, OrderBy} from '@/app/types'
import {FC, useEffect, useState} from 'react'
import {TableSecondary} from '@/components/table'
import {Sum} from '@/app/utils'
import {CONFIG_OUTSTANDING_LOAN__HISTORY} from './config'

const OutstandingLoan: FC<LoanDetailsProps> = ({customerInfo}) => {
  const {outstanding_loan = []} = customerInfo || {}

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
      <tfoot className='table-foot-repayment position-sticky bottom-0 z-0 bg-gray-100'>
        <tr>
          <td className='fs-16 fw-bold  p-16px text-start'>Total</td>
          <td></td>
          <td className='text-end px-10px fs-16 fw-bold '> </td>
          <td className='text-end px-10px fs-16 fw-bold'>
            {Sum('total_collection', outstanding_loan)}
          </td>
          <td className='text-end px-10px fs-16 fw-bold'>{Sum('loan_amount', outstanding_loan)}</td>
          <td
            style={{
              color: +Sum('p&l', outstanding_loan, false) < 0 ? '#F64E60' : '#071437',
            }}
            className='text-end px-10px fs-16 fw-bold'
          >
            {Sum('p&l', outstanding_loan)}
          </td>
          <td></td>
        </tr>
      </tfoot>
    )
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
            <div
              style={{
                backgroundColor: '#071437',
              }}
              className=' w-10px h-10px flex-shrink-0 rounded-circle'
            ></div>
            <span className='fs-14 fw-semibold text-gray-600'>Positive amount - profitable</span>
          </div>
        </div>
      </div>

      <TableSecondary
        keySort={keySort}
        orderBy={orderBy}
        className='mt-16px mh-500px'
        config={CONFIG_OUTSTANDING_LOAN__HISTORY}
        onChangeSortBy={handleChangeSortBy}
        data={outstanding_loan}
        actions={true}
        loading={loading}
        showTableFooter={(outstanding_loan || []).length > 0}
        tableFooter={tableFooter()}
      />
    </div>
  )
}

export default OutstandingLoan
