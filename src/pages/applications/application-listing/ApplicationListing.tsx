import {faClose, faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import numeral from 'numeral'
import moment from 'moment'
import clsx from 'clsx'
import './style.scss'

import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import {
  ApplicationItem,
  OrderBy,
  ResponseApplicationListing,
  SearchCriteria,
  TableRow,
} from '@/app/types'
import request from '@/app/axios'
import {handleFormatFilter, isObject, parseJson} from '@/app/utils'
import {APPLICATION_LISTING_CONFIG} from './config'
import RowPerPage from '@/components/row-per-page'
import Badge from '@/components/badge/Badge'
import Loading from '@/components/table/components/Loading'
import ButtonEdit from '@/components/button/ButtonEdit'
import SortBy from '@/components/sort-by'
import {PageLink, PageTitle} from '@/components/breadcrumbs'
import {KTCardBody} from '@/_metronic/helpers'
import {useAuth} from '@/app/context/AuthContext'
import {Input} from '@/components/input'
import Pagination from '@/components/table/components/Pagination'
import {FilterApplication} from './FilterApplication'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Applications',
    path: '/application/listing',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const ApplicationListing = () => {
  const {settings, rows} = APPLICATION_LISTING_CONFIG || {}
  const {showAction = true, showEditButton} = settings || {}

  const {company_id} = useAuth()

  // Get search criteria from session
  const sessionData = isObject(parseJson(sessionStorage.getItem('application') || ''))
    ? parseJson(sessionStorage.getItem('application') || '')
    : {}

  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [dataFilter, setDataFilter] = React.useState<{[key: string]: any}>(
    isObject(sessionData?.dataFilter) ? sessionData?.dataFilter : {}
  )
  const [data, setData] = React.useState<ApplicationItem[]>([])
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>(sessionData?.orderBy || 'asc')
  const [keySort, setKeySort] = useState<string>(sessionData?.keySort || 'id')
  const [searchValue, setSearchValue] = useState<string>(sessionData?.searchValue || '')
  const [loadApi, setLoadApi] = React.useState<boolean>(true)
  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: sessionData?.pageSize || 10,
    currentPage: sessionData?.currentPage || 1,
    total: 0,
  })
  const {pageSize, currentPage} = searchCriteria

  /**
   * get api or filter
   */
  React.useEffect(() => {
    const allApi = rows
      .filter((item) => item?.infoFilter?.dependencyApi)
      .map((item) => request.post(item?.infoFilter?.dependencyApi as string), {
        status: true,
      })

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

    const newDataFilter = handleConvertDataFilter(dataFilter)

    const timer = setTimeout(() => {
      onFetchDataList({
        ...searchCriteria,
        filters: handleFormatFilter({
          dataFilter: {
            ...newDataFilter,
            searchBar: searchValue,
          },
          keyDate: ['application_date'],
          keyNumber: ['loan_type_id', 'id', 'loan_terms'],
        }),
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

    sessionStorage.setItem('application', JSON.stringify(data))
  }

  function handleNavigateEditApplication(item: ApplicationItem) {
    navigate(`/application/edit/${item.id}`)
  }

  function showInputFilter() {
    setShowInput(!showInput)
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
                <td key={i} className='w-xxl-6 fw-semibold fs-14 ps-6'>
                  {Number(idx) +
                    1 +
                    (Number(searchCriteria.currentPage) * Number(searchCriteria.pageSize) -
                      Number(searchCriteria.pageSize))}
                </td>
              )
            }

            if (key === 'application_date') {
              value = moment(item[key]).format('MMM D, YYYY')
            }

            if (key === 'loan_amount_requested') {
              value = numeral(item[key]).format('$0,0.00')
            }

            // handle for select
            if (dataOption[key] || options) {
              const currentItem =
                (options || dataOption[key]).find(
                  (item) => item[keyValueOption || 'value'] === value
                ) || {}

              value = currentItem[keyLabelOption || 'label'] || ''
            }

            if (key === 'status') {
              let title: string = ''
              let color: string = ''

              if (item[key] === 1) {
                title = 'Awaiting Approval'
                color = 'warning'
              } else if (item[key] === 0) {
                title = 'Rejected'
                color = 'danger'
              } else {
                title = 'Approved'
                color = 'success'
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
            if (key === 'identification_no') {
              return (
                <td
                  key={i}
                  className='fs-6 fw-medium value-hover-render-row'
                  style={{color: '#071437'}}
                >
                  {value}
                </td>
              )
            }

            if (key === 'fullname') {
              {
                data.map((item) => item.is_draft)
                return (
                  <td key={i} className='d-flex row ms-1' style={{borderBottom: 'none'}}>
                    <div className='p-0 fw-semibold fs-14 fw-semibold'>{value}</div>
                    <div className='p-0 mt-1 fs-12 text-gray-600 fw-normal'>
                      {item.is_draft === 1 ? 'Draft' : 'Saved'}
                    </div>
                  </td>
                )
              }
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

  // Change page number
  async function handleChangePagination(goToPage: number) {
    setSearchCriteria({...searchCriteria, currentPage: goToPage})
    setLoadApi(!loadApi)
  }

  /**
   * Change search value.
   * @param e element event
   * @param key Expected use for range search
   */
  function handleChangeFilter(e: React.ChangeEvent<HTMLInputElement>, key?: 'gte' | 'lte') {
    const {value, name} = e.target
    setDataFilter({
      ...dataFilter,
      [name]: key
        ? {
            ...dataFilter[name],
            [key]: value,
          }
        : value,
    })
  }

  // Reset the filter. include search bar, filter
  function handleResetFilter() {
    setDataFilter({})
    setSearchValue('')
    setLoadApi(!loadApi)
  }

  /**
   * Delete empty fields, reformat data to send to API
   * Re-run api on useEffect
   * @returns New data after formatting
   */
  function handleConvertDataFilter(dataFilter: {[key: string]: any}) {
    return handleFormatFilter({
      dataFilter: {
        ...dataFilter,
        searchBar: searchValue,
      },
      keyDate: ['application_date'],
      keyNumber: ['loan_type_id', 'id', 'loan_terms'],
    })
  }

  /**
   * Handle change filter sort
   * Re-run api on useEffect
   */
  function handleChangeSortBy(item: TableRow) {
    if (item.key === keySort) {
      setOrderBy(orderBy === 'desc' ? 'asc' : 'desc')
    } else {
      setKeySort(item.key)
      setOrderBy('asc')
    }
  }

  // Change value search bar
  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  //to call api when get listing/filter/search
  function handleReGetApi() {
    setLoadApi(!loadApi)
  }

  function handleFilter() {
    setSearchCriteria({...searchCriteria, currentPage: 1})
    setLoadApi(!loadApi)
  }

  return (
    <div className='card p-5 h-fit-content'>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'Application Listing'}</PageTitle>

      <div>
        <div className='d-flex flex-row align-items-center'>
          <Input
            classShared='flex-grow-1 h-30px mb-5'
            placeholder='Search Customer'
            value={searchValue}
            onChange={handleChangeSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleReGetApi()
              }
            }}
            insertLeft={
              <FontAwesomeIcon
                className='ps-12px cursor-pointer text-gray-600 text-hover-gray-900'
                icon={faSearch}
                onClick={handleReGetApi}
              />
            }
            insertRight={
              searchValue ? (
                <FontAwesomeIcon
                  className='pe-12px cursor-pointer text-gray-600 text-hover-gray-900'
                  icon={faClose}
                  onClick={() => {
                    setSearchValue('')
                    handleReGetApi()
                  }}
                />
              ) : null
            }
          />
          <div className='d-flex position-relative flex-end ms-4'>
            <Button
              onClick={showInputFilter}
              className='btn-secondary align-self-center m-2 fs-14 text-primary h-45px'
              disabled={false}
            >
              <Icons name={'filterIcon'} />
              Filter
            </Button>

            <Link to='/application/create'>
              <Button
                className='btn-primary align-self-center m-2 fs-14 text-white h-45px'
                disabled={false}
              >
                <Icons name={'AddIcon'} />
                Add New Application
              </Button>
            </Link>
          </div>
        </div>
        <KTCardBody className='py-4'>
          <div className='table-responsive'>
            {showInput && (
              <FilterApplication
                onClose={showInputFilter}
                handleResetFilter={handleResetFilter}
                rows={rows}
                handleLoadApi={handleFilter}
                dataFilter={dataFilter}
                handleChangeFilter={handleChangeFilter}
                dataOption={dataOption}
              />
            )}

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

                      const {isSort} = infoFilter || {}

                      return (
                        <th
                          className={clsx([
                            'text-nowrap min-w-75px user-select-none',
                            classNameTableHead,
                          ])}
                          data-title={item.key}
                          key={i}
                          onClick={() => isSort && handleChangeSortBy(item)}
                        >
                          <div className='cursor-pointer'>
                            <span className='fs-14 fw-bold'>{name}</span>

                            {isSort && <SortBy isActive={keySort === key} orderBy={orderBy} />}
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
          <RowPerPage
            lenghtData={searchCriteria.total}
            limit={searchCriteria.pageSize}
            page={searchCriteria.currentPage}
            setLimit={(e: any) => {
              setSearchCriteria({...searchCriteria, pageSize: +e.target.value, currentPage: 1})
            }}
          />

          <Pagination
            onChangePagePagination={handleChangePagination}
            searchCriteria={searchCriteria}
          />

          {loading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default ApplicationListing
