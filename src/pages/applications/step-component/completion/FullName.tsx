type Props = {
  data: any
}

function FullName({data}: Props) {
  return (
    <div className='text-start fw-semibold p-0 m-0 min-h-20px fs-12 td-completion text-gray-900'>
      {data.lastname} {data.middlename} {data.firstname}
    </div>
  )
}

export default FullName
