type Props = {
  data: any
}

function FullName({data}: Props) {
  return (
    <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
      {data.lastname} {data.firstname}
    </div>
  )
}

export default FullName
