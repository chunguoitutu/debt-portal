import {swalToast} from '@/app/swal-notification'
import request from '@/app/axios'
import {convertErrorMessageResponse} from '@/app/utils'
import {CompanyItem, DataResponse} from '@/app/types'
import {useEffect, useState} from 'react'

import Loading from '@/components/loading'
import EditOrganization from './EditOrganization'

export const Organization = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<CompanyItem | null>(null)

  useEffect(() => {
    handleGetOrganization()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleGetOrganization() {
    setLoading(true)
    try {
      const {data} = await request.get<DataResponse<CompanyItem>>('/config/company/1')

      // unknown error
      if (data?.error || !data?.data) {
        return swalToast.fire({
          icon: 'error',
          title: convertErrorMessageResponse(data?.message),
        })
      }

      // handle get success
      setData(data.data)
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  return <EditOrganization data={data} onGetOrganization={handleGetOrganization} />
}
