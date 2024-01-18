import {Link, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import numeral from 'numeral'
import moment from 'moment'
import clsx from 'clsx'
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
import {handleFormatFilter, isObject, parseJson} from '@/app/utils'
import Badge from '@/components/badge/Badge'
import Loading from '@/components/table/components/Loading'
import ButtonEdit from '@/components/button/ButtonEdit'
import SortBy from '@/components/sort-by'
import {KTCardBody} from '@/_metronic/helpers'
import {useAuth} from '@/app/context/AuthContext'
import {useSocket} from '@/app/context/SocketContext'
import {APPLICATION_LISTING_CONFIG_DASHBOARD} from '../../../../../pages/dashboard/config/config-application-dashboard'
import {SESSION_NAME} from '@/app/constants'

const ApplicationDashboard = () => {
  const {settings, rows} = APPLICATION_LISTING_CONFIG_DASHBOARD || {}
  const {showAction = true, showEditButton} = settings || {}

  const {company_id} = useAuth()
  const {socket} = useSocket()

  // Get search criteria from session
  const sessionData = isObject(
    parseJson(sessionStorage.getItem(SESSION_NAME.applicationFilter) || '')
  )
    ? parseJson(sessionStorage.getItem(SESSION_NAME.applicationFilter) || '')
    : {}

  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [dataFilter, setDataFilter] = React.useState<{[key: string]: any}>(
    isObject(sessionData?.dataFilter) ? sessionData?.dataFilter : {}
  )
  const [data, setData] = React.useState<ApplicationItem[]>([])
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>(sessionData?.orderBy || 'desc')
  const [keySort, setKeySort] = useState<string>(sessionData?.keySort || 'id')
  const [searchValue, setSearchValue] = useState<string>(sessionData?.searchValue || '')
  const [loadApi, setLoadApi] = React.useState<boolean>(true)
  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: 5,
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
            pageSize: 5,
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
      handleSaveSearchToSession()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_id, keySort, orderBy, pageSize, currentPage, loadApi])

  const navigate = useNavigate()

  function handleSaveSearchToSession() {
    const data = {
      searchValue,
      dataFilter,
      pageSize,
      currentPage,
    }

    sessionStorage.setItem(SESSION_NAME.applicationFilter, JSON.stringify(data))
  }

  function handleNavigateEditApplication(item: ApplicationItem) {
    navigate(`/application/edit/${item.id}`)
  }

  const renderRows = () => {
    return data.map((item, idx) => {
      return (
        <tr key={idx}>
          {rows.map(({key, component, classNameTableBody, isHide, options, infoFilter}, i) => {
            const {keyLabelOption, keyValueOption} = infoFilter || {}

            if (isHide) {
              return <React.Fragment key={i}></React.Fragment>
            }
            let Component = component || React.Fragment
            let value = item[key]

            if (key === 'id') {
              return (
                <td key={i} className='w-xxl-6 fw-semibold fs-14 ps-5'>
                  {Number(idx) +
                    1 +
                    (Number(searchCriteria.currentPage) * Number(searchCriteria.pageSize) -
                      Number(searchCriteria.pageSize))}
                </td>
              )
            }

            if (key === 'status') {
              let title: string = ''
              let color: string = ''
              if (item[key] === 1) {
                title = 'Awaiting Approval'
                color = 'warning'
              } else if (item[key] === 2) {
                title = 'Rejected'
                color = 'danger'
              } else if (item[key] === 3) {
                title = 'Approved'
                color = 'success'
              } else {
                title = 'Draft'
                color = 'info'
              }

              return (
                <td
                  key={i}
                  className={clsx([
                    'fs-14 fw-semibold hover-applications-listing',
                    classNameTableBody,
                  ])}
                >
                  <Badge color={color as any} title={title as any} key={i} />
                </td>
              )
            }

            return (
              <td key={i} className={classNameTableBody}>
                {component ? (
                  <Component />
                ) : (
                  <span className='fw-semibold fs-14 fw-semibold'>{value}</span>
                )}
              </td>
            )
          })}
          {showAction && showEditButton && (
            <td className='text-center'>
              <div className='d-flex align-items-center justify-content-center gap-1'>
                {showEditButton && (
                  <ButtonEdit onClick={() => handleNavigateEditApplication(item)} />
                )}
              </div>
            </td>
          )}
        </tr>
      )
    })
  }

  // get list application
  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponseApplicationListing>>, 'total'>
  ) {
    setLoading(true)
    try {
      const {data: response} = await request.post(settings.endPointGetListing, {
        ...body,
        company_id: +company_id,
        keySort: keySort,
        orderBy: orderBy,
      })
      Array.isArray(response.data) && setData(response.data)
      response?.searchCriteria && setSearchCriteria(response?.searchCriteria)
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

  return (
    <div className='card p-5 h-fit-content'>
      <div>
        {!!newDataSocket && (
          <div className='wrapper-records-applications'>
            <div className='p-0 m-0'>
              <p className='records-applications'>
                Detected {newDataSocket} new {Number(newDataSocket) === 1 ? 'record' : 'records'}.
              </p>
              <p className='records-applications-reset'>Do you want to refresh the data now?</p>
            </div>

            <Button disabled={loading} loading={loading} onClick={handleRefreshDataSocket}>
              Refresh
            </Button>
          </div>
        )}

        <KTCardBody className='py-4'>
          <div className='table-responsive'>
            <table
              id='kt_table_users'
              className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            >
              <thead>
                <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                  {rows
                    .filter((item) => !item.isHide)
                    .map((item, i) => {
                      const {classNameTableHead, name, infoFilter, key} = item

                      return (
                        <th
                          className={clsx([
                            'text-nowrap min-w-75px user-select-none',
                            classNameTableHead,
                          ])}
                          data-title={item.key}
                          key={i}
                        >
                          <div className='cursor-pointer'>
                            <span className='fs-14 fw-bold'>{name}</span>
                          </div>
                        </th>
                      )
                    })}
                  {showAction && <th className='text-center w-125px fs-6 fw-bold'>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  renderRows()
                ) : (
                  <tr>
                    <td colSpan={rows.length + 1}>
                      <div className='d-flex text-center w-100 align-content-center justify-content-center fs-14 fw-medium text-gray-600'>
                        No matching records found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </KTCardBody>

        <div
          style={{
            padding: '10px 22.75px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {loading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default ApplicationDashboard
