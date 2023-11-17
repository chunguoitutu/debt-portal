import {useEffect, useState} from 'react'
import request from '../../../../axios'

type Props = {config?: any; data?: any; options?: any; keyData?: string}

const LableOptionsCountry = ({config, keyData}: Props) => {
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
    (d: any) => Number(d[config.keyFilter]) === Number(keyData)
  )

  console.log(lable)

  return (
    <div
      style={{
        textAlign: 'start',
        padding: '0px',
        lineHeight: '20px',
        minHeight: '20px',
        fontWeight: '500px',
        fontStyle: 'normal',
        fontSize: '14px',
        color: '#071437',
        margin: '0px',
      }}
    >
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}

export default LableOptionsCountry
