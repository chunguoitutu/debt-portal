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
            <thead className=''>
              <tr className='fw-bold text-muted '>
                {EnhancedTableHead.map((data, index) => (
                  <th style={{color: 'black'}} key={index} className='min-w-150px '>
                    {data}
                  </th>
                ))}
                <th style={{color: 'black'}} className='min-w-150px'>
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, indexs) => (
                <tr key={indexs}>
                  {row.map((data: any, index: number) => (
                    <td key={index}>
                      <div className='d-flex align-items-center'>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {data}
                        </span>
                      </div>
                    </td>
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
