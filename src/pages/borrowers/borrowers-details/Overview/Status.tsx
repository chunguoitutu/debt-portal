import React from 'react'

type Props = {
  data: any
}
const StatusS = [
  {
    key: 'blacklisted',
    value: 'Blacklisted',
  },
  {
    key: 'exclusion_remarks',
    value: 'Exclusion remarks',
  },
]
const Status = ({data}: Props) => {
  return (
    <div className='d-flex flex-column gap-16px'>
      {StatusS.map((status, i) => {
        return (
          <div key={i} className='d-flex  gap-16px'>
            <h1 className='col-3 fs-14 fw-normal text-gray-700 p-0 m-0'>{status.value} </h1>
            <p className='col-9 fs-14 fw-semibold text-gray-900 p-0 m-0'>
              {data?.status?.[status.key] || false || status?.key === 'blacklisted' ? (
                <span>
                  {status?.key === 'blacklisted'
                    ? Number(data?.status?.[status.key] || 0) === 1
                      ? 'Yes'
                      : 'No'
                    : data?.status?.[status.key]}
                </span>
              ) : (
                <span className=' text-capitalize none-company-detail m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                  None
                </span>
              )}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Status
