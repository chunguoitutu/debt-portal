import {Sum} from '@/app/utils'

type Props = {
  data: any[]
  KeyData: string[]
}

const TableFooterCustomer = ({data, KeyData}: Props) => {
  return (
    <tfoot
      style={{
        bottom: '-1px',
      }}
      className='table-foot-repayment position-sticky bg-gray-100'
    >
      <tr>
        <td className='fs-16 fw-bold  p-16px text-start'>Total</td>
        <td></td>
        <td></td>
        <td className='text-end px-10px fs-16 fw-bold '> </td>
        <td className='text-end px-10px fs-16 fw-bold'>{Sum(KeyData[0], data)}</td>
        <td className='text-end px-10px fs-16 fw-bold'>{Sum(KeyData[1], data)}</td>
        <td
          style={{
            color: +Sum(KeyData[2], data, false) < 0 ? '#F64E60' : '#071437',
          }}
          className='text-end px-10px fs-16 fw-bold'
        >
          {Sum(KeyData[2], data)}
        </td>
        <td></td>
      </tr>
    </tfoot>
  )
}

export default TableFooterCustomer
