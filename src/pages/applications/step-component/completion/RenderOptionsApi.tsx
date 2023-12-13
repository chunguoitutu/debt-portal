import {useEffect, useState} from 'react'
import request from '../../../../app/axios'

type Props = {config?: any; data?: any; options?: any}

const RenderOptionsApi = ({config, data}: Props) => {
  const [dataLoanType, setDataLoanType] = useState([])

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function onFetchDataList() {
    try {
      request
        .post(config.dependencyApi || '', {status: true, pageSize: 99999, currentPage: 1})
        .then((res) => {
          setDataLoanType(res.data.data)
        })
    } catch (error) {
    } finally {
    }
  }

  const lable: any = dataLoanType.filter(
    (d: any) => Number(d[config.keyFilter]) === Number(data[config.key])
  )

  return (
    <div className='text-start fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px td-completion fs-14 text-gray-900'>
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}

export default RenderOptionsApi
