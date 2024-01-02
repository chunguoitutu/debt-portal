type Props = {
  config: any
  data: any
  keyData: any
}

const ShowYesNo = ({keyData}: Props) => {
  return (
    <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
      {Number(keyData) === 1 ? 'Yes' : 'No'}
    </div>
  )
}
export default ShowYesNo
