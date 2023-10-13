type Props = {
  EnhancedTableHead: any[]
  rows: any[]
}

const EnhancedTable = ({EnhancedTableHead, rows}: Props) => {
  return (
    <div className={`card `}>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                {EnhancedTableHead.map((data, index) => (
                  <th
                    key={index}
                    className={
                      'text-black fs-6 ' + (EnhancedTableHead.length === index + 1 && 'text-center')
                    }
                  >
                    {data}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows?.map((row, indexs) => (
                <tr key={indexs}>
                  {row.map((data: any, index: number) => (
                    <td key={index}>{data}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EnhancedTable
