/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useMemo, useState} from 'react'
import './style.scss'

import Button from '@/components/button/Button'
import {
  ApplicationItem,
  OrderBy,
  ResponseApplicationListing,
  SearchCriteria,
  TableRow,
} from '@/app/types'
import request from '@/app/axios'
import {formatNumber, handleFormatFilter, isObject, parseJson} from '@/app/utils'
import {useAuth} from '@/app/context/AuthContext'
import {useSocket} from '@/app/context/SocketContext'
import {APPLICATION_LISTING_CONFIG_DASHBOARD} from '../config/config-application-dashboard'
type Props = {
  className: string
  description: string
  color: string
  img: string
}

const CountApplication: React.FC<Props> = ({className, description, color, img}: Props) => {
  const {settings, rows} = APPLICATION_LISTING_CONFIG_DASHBOARD || {}

  const {company_id} = useAuth()
  const {socket} = useSocket()

  // Get search criteria from session
  const sessionData = isObject(parseJson(sessionStorage.getItem('application') || ''))
    ? parseJson(sessionStorage.getItem('application') || '')
    : {}

  const [dataFilter, setDataFilter] = React.useState<{[key: string]: any}>(
    isObject(sessionData?.dataFilter) ? sessionData?.dataFilter : {}
  )
  const [countApplicationApproval, setCountApplicationApproval] = useState<any>(null)
  const [data, setData] = React.useState<ApplicationItem[]>([])
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>(sessionData?.orderBy || 'desc')
  const [keySort, setKeySort] = useState<string>(sessionData?.keySort || 'id')
  const [searchValue, setSearchValue] = useState<string>(sessionData?.searchValue || '')
  const [loadApi, setLoadApi] = React.useState<boolean>(true)
  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: sessionData?.pageSize || 10,
    currentPage: sessionData?.currentPage || 1,
    total: 0,
  })
  const [newDataSocket, setNewDataSocket] = React.useState<number>(0) // new data in realtime
  const {pageSize, currentPage} = searchCriteria
  useEffect(() => {
    const handleDetectNewApplication = () => {
      setNewDataSocket((prev) => prev + 1)
    }

    socket?.on('newApplication', handleDetectNewApplication)

    return () => {
      socket?.off('newApplication', handleDetectNewApplication) // Clean up event listener on component unmount
    }
  }, [socket])

  /**
   * get api or filter
   */
  React.useEffect(() => {
    const allApi = rows
      .filter((item) => item?.infoFilter?.dependencyApi)
      .map(
        (item) =>
          request.post(item?.infoFilter?.dependencyApi as string, {
            company_id: +company_id,
            pageSize: 99999,
            currentPage: 1,
          }),
        {
          status: true,
        }
      )

    Promise.all(allApi).then((res) => {
      let result: {[key: string]: any[]} = {}

      res.forEach((res) => {
        const configItem = rows.find((item) => item.infoFilter?.dependencyApi === res.config.url)

        const data = res.data.data
        result = {...result, [configItem?.key as string]: data}

        if (!configItem) return
      })

      setDataOption(result)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!+company_id) return

    const timer = setTimeout(() => {
      onFetchDataList({
        ...searchCriteria,
      })
    }, 300)

    return () => {
      clearTimeout(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_id, keySort, orderBy, pageSize, currentPage, loadApi])

  // get list application
  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponseApplicationListing>>, 'total'>
  ) {
    setLoading(true)
    try {
      const {data: response} = await request.post(settings.endPointGetListing, {
        ...body,
        company_id: +company_id,
        pageSize: 99999,
        keySort: keySort,
        orderBy: orderBy,
        currentPage: 1,
      })
      Array.isArray(response.data) && setData(response.data)
      if (Array.isArray(response.data)) {
        const applicationsWithStatus3 = response.data.filter(
          (application: any) => application.status === 3
        )

        const countApplicationsWithStatus3 = applicationsWithStatus3.length

        setCountApplicationApproval(countApplicationsWithStatus3)
        setData(response.data)
        response?.searchCriteria && setSearchCriteria(response?.searchCriteria)
      }
    } catch (error) {
      // no thing
    } finally {
      setLoading(false)
    }
  }

  // Reset force data
  function handleRefreshDataSocket() {
    setDataFilter({})
    setSearchValue('')
    setNewDataSocket(0)
    setSearchCriteria({
      ...searchCriteria,
      currentPage: 1,
    })
    setLoadApi(!loadApi)
  }

  const percentCompleted = useMemo(
    () => (100 / searchCriteria.total) * countApplicationApproval,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countApplicationApproval]
  )

  return (
    <div
      className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}
      style={{
        backgroundColor: color,
        backgroundImage: `url('${img}')`,
      }}
    >
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <span className='fs-2hx fw-bold text-white me-2 lh-1 ls-n2'>{searchCriteria.total}</span>
          <span className='text-white opacity-75 pt-1 fw-semibold fs-6'>
            {' '}
            Total {searchCriteria.total > 1 ? 'Applications' : 'Application'}
          </span>
        </div>
      </div>
      <div className='card-body d-flex align-items-end pt-0'>
        <div className='d-flex align-items-center flex-column mt-3 w-100'>
          <div className='d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2'>
            <span>
              {countApplicationApproval} / {searchCriteria.total} Application Approval
            </span>
            <span>{formatNumber((countApplicationApproval / searchCriteria.total) * 100)}%</span>
          </div>

          {typeof percentCompleted === 'number' &&
            !(percentCompleted > 100) &&
            !(percentCompleted < 0) &&
            !Number.isNaN(+percentCompleted) && (
              <div className='col-12'>
                {/* Process bar */}
                <div className='process'>
                  <div className='process-bar'></div>
                  <div
                    className='process-bar percent-completed'
                    style={{width: `${percentCompleted}%`}}
                  ></div>
                </div>
              </div>
            )}
        </div>
      </div>
      {!!newDataSocket && (
        <div className='hihihaha d-flex flex-row align-items-center justify-content-between '>
          <div className='p-0 m-0'>
            <p className='text-white fs-16 fw-bold mb-0'>
              Detected {newDataSocket} New {Number(newDataSocket) === 1 ? 'Record' : 'Records'}.
            </p>
            <p className='text-white fs-13 fw-semibold mb-0 text-gray-300'>
              Do you want to refresh the data now?
            </p>
          </div>

          <Button disabled={loading} loading={loading} onClick={handleRefreshDataSocket}>
            Refresh
          </Button>
        </div>
      )}
    </div>
  )
}

export {CountApplication}
