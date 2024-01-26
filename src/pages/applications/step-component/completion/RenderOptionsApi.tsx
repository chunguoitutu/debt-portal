import {useEffect, useState} from 'react'
import request from '../../../../app/axios'
import {useAuth} from '@/app/context/AuthContext'

type Props = {config?: any; data?: any; options?: any}

const RenderOptionsApi = ({config, data}: Props) => {
  const {company_id} = useAuth()
  const [dataLoanType, setDataLoanType] = useState([])

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function onFetchDataList() {
    try {
      request
        .post(config.dependencyApi || '', {
          status: true,
          pageSize: 99999,
          currentPage: 1,
          company_id: +company_id,
        })
        .then((res) => {
          setDataLoanType(res.data.data)
        })
    } catch (error) {
    } finally {
    }
  }

  const lable: any = dataLoanType.filter(
    (d: any) => Number(d[config.keyFilter]) === Number(data?.[config.key])
  )

  return (
    <div className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'>
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}

export default RenderOptionsApi
