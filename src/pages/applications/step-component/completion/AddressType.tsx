import {useEffect, useState} from 'react'
import request from '../../../../app/axios'

type Props = {config?: any; data?: any; options?: any; keyData?: number}

const RenderOptionsApiAddress = ({config, keyData}: Props) => {
  const [dataLoanType, setDataLoanType] = useState([])

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function onFetchDataList() {
    try {
      request.post(config.dependencyApi || '', {status: true}).then((res) => {
        setDataLoanType(res.data.data)
      })
    } catch (error) {
    } finally {
    }
  }

  const lable: any = dataLoanType.filter(
    (d: any) => Number(d[config.keyFilter]) === Number(keyData)
  )

  return (
    <div className='text-start fw-semibold p-0 m-0 min-h-20px td-completion text-gray-900'>
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}

export default RenderOptionsApiAddress
