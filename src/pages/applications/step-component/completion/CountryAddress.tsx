import request from '@/app/axios'
import {useEffect, useState} from 'react'

type Props = {
  keyData: string
}

const CountryAddress = ({keyData}: Props) => {
  const [dataLoanType, setDataLoanType] = useState([])

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function onFetchDataList() {
    try {
      request
        .post('/config/country/listing', {status: true, pageSize: 99999, currentPage: 1})
        .then((res) => {
          setDataLoanType(res.data.data)
        })
    } catch (error) {
    } finally {
    }
  }

  const lable: any = dataLoanType.filter((d: any) => d?.name === keyData)

  return (
    <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
      {lable[0]?.nicename}
    </div>
  )
}

export default CountryAddress
