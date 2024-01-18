import React from 'react'

function getAbbreviation(name: string) {
  const words = name.split(' ')
  let abbreviation = ''

  words.forEach((word) => {
    abbreviation += word.charAt(0).toUpperCase()
  })

  return abbreviation
}

const activeCustomer = [
  {
    value: 1,
    label: 'active',
    background: '#E8FFF3',
    color: '#50CD89',
  },
  {
    value: 2,
    label: 'In-Prison',
    background: '#FFE2E5',
    color: '#F64E60',
  },
  {
    value: 3,
    label: 'Decreased',
    background: '#FFE2E5',
    color: '#F64E60',
  },
  {
    value: 4,
    label: 'Bankrupt',
    background: '#FFE2E5',
    color: '#F64E60',
  },
  {
    value: 5,
    label: 'Missing',
    background: '#FFE2E5',
    color: '#F64E60',
  },
]

interface Props {
  data: any
}

const BorrowersHeader = ({data}: Props) => {
  const dataActive = activeCustomer.filter((el) => el.value === Number(data?.status || 1))[0]
  return (
    <div className='card d-flex flex-row '>
      <div
        style={{
          borderRight: '1px solid #F1F1F2',
        }}
        className='col-lg-5'
      >
        <div className=' pt-30px pb-12px px-16px m-0 d-flex justify-content-center align-items-center '>
          <p className='text-uppercase avatar-borrowers '>
            {getAbbreviation(`${data?.fullName || ''}`)}
          </p>
        </div>
        <div className=' pb-30px pt-12px px-30px m-0 d-flex justify-content-center align-items-center gap-8px flex-column'>
          <p className='text-gray-900 fs-20 fw-bold p-0 m-0 text-center'>{data?.fullName || ''}</p>
          <p className='fw-normal fs-16 text-gray-900 p-0 m-0'>{data?.customer_no}</p>
          <p
            style={{
              color: dataActive?.color,
              background: dataActive?.background,
              padding: '2px 8px 2px 8px',
            }}
            className='fw-bold fs-13 rounded-4   m-0'
          >
            {dataActive?.label}
          </p>
        </div>
      </div>
      <div className='col-lg-7 py-30px d-flex justify-content-center align-items-center'>
        <div className='p-0 m-0'>
          <p className=' text-gray-900 fs-12 p-0 m-0 text-center '>
            General information about the loan
          </p>
          <div className='d-flex justify-content-center align-items-center flex-column p-0 m-0 gap-8px my-24px'>
            <p className='fs-20 fw-bold m-0 p-0 loan-amount-customer'>
              ${Number(data?.outstanding_loan_amount || 0)}
            </p>
            <p className='p-0 m-0'>outstanding loan amount</p>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <div
              style={{
                borderRight: '1px solid #F1F1F2',
              }}
              className='d-flex justify-content-center align-items-center py-0 px-8px  m-0 flex-column py-4px gap-8px'
            >
              <p className='p-0 m-0 fs-20 text-gray-900 fw-bold'>
                {Number(data?.full_settled) || 0} loans
              </p>
              <p>Full Settled</p>
            </div>
            <div
              className='d-flex justify-content-center align-items-center py-0 px-8px  m-0  flex-column  gap-8px'
              style={{
                borderRight: '1px solid #F1F1F2',
              }}
            >
              <p className='p-0 m-0 fs-20 text-gray-900 fw-bold'>
                {Number(data?.unrecoverable || 0)} loans
              </p>
              <p>Unrecoverable</p>
            </div>
            <div className='d-flex justify-content-center align-items-center py-0 px-8px m-0  flex-column  gap-8px '>
              <p className='p-0 m-0 fs-20 text-gray-900 fw-bold'>
                {Number(data?.outstanding_loan || 0)} loans
              </p>
              <p className='fs-12 text-gray-700 fw-normal'>Outstanding Loan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BorrowersHeader
