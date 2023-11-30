import {faArrowsRotate, faClose, faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import numeral from 'numeral'
import moment from 'moment'
import clsx from 'clsx'

import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import {APPLICATION_LISTING_CONFIG} from './config'
import RowPerPage from '@/components/row-per-page'
import PaginationArrow from '@/components/pagination.tsx'
import Badge from '@/components/badge/Badge'
import Loading from '@/components/table/components/Loading'
import {
  ApplicationItem,
  OrderBy,
  ResponseApplicationListing,
  SearchCriteria,
  TableRow,
} from '@/app/types'
import request from '@/app/axios'
import {filterObjectKeyNotEmpty} from '@/app/utils'
import ButtonEdit from '@/components/button/ButtonEdit'
import SortBy from '@/components/sort-by'
import {PageLink, PageTitle} from '@/components/breadcrumbs'
import {KTCardBody} from '@/_metronic/helpers'
import {useAuth} from '@/app/context/AuthContext'
import './style.scss'
import Input from '@/components/input'

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

  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [dataFilter, setDataFilter] = React.useState<{[key: string]: any}>({})
  const [data, setData] = React.useState<ApplicationItem[]>([])
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [orderBy, setOrderBy] = useState<OrderBy>('asc')
  const [keySort, setKeySort] = useState<string>('id')
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })

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

    onFetchDataList({
      ...searchCriteria,
      filters: newDataFilter,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_id, keySort, orderBy])

  const navigate = useNavigate()

  function handleEditApplication(item: ApplicationItem) {
    navigate(`/application/edit/${item.id}`)
  }

  function showInputFilter() {
    setShowInput(!showInput)
  }

  const renderRows = () => {
    return data.map((item, idx) => {
      return (
        <tr key={idx}>
          {rows.map(
            ({key, component, classNameTableBody, isHide, type, options, infoFilter}, i) => {
              const {fieldLabelOption, fieldValueOption} = infoFilter || {}

              if (isHide) {
                return <React.Fragment key={i}></React.Fragment>
              }
              let Component = component || React.Fragment
              let value = item[key]

              if (type === 'date') {
                value = moment(item[key]).format('MMM D, YYYY')
              }

              if (type === 'money') {
                value = numeral(item[key]).format('$0,0.00')
              }

              // handle for select
              if (dataOption[key] || options) {
                const currentItem =
                  (options || dataOption[key]).find(
                    (item) => item[fieldValueOption || 'value'] === value
                  ) || {}

                value = currentItem[fieldLabelOption || 'label'] || ''
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

              return (
                <td key={i} className={classNameTableBody}>
                  {component ? (
                    <Component />
                  ) : (
                    <span className='fw-semibold fs-14 fw-semibold'>{value}</span>
                  )}
                </td>
              )
            }
          )}
          {showAction && showEditButton && (
            <td className='text-center'>
              <div className='d-flex align-items-center justify-content-center gap-1'>
                {showEditButton && <ButtonEdit onClick={() => handleEditApplication(item)} />}
              </div>
            </td>
          )}
        </tr>
      )
    })
  }

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

  async function handleChangePagination(data: Omit<SearchCriteria, 'total'>) {
    onFetchDataList({...searchCriteria, ...data, filters: dataFilter})
  }

  function handleChangeFilter(e: React.ChangeEvent<any>) {
    const {value, name} = e.target
    setDataFilter({...dataFilter, [name]: value})
  }

  function handleChangeFromToFilter(key: 'gte' | 'lte', e: React.ChangeEvent<HTMLInputElement>) {
    const {value, name} = e.target
    setDataFilter({
      ...dataFilter,
      [name]: {
        ...dataFilter[name],
        [key]: value,
      },
    })
  }

  function handleResetFilter() {
    setDataFilter({})
    setSearchValue('')
    onFetchDataList({...searchCriteria})
  }

  function handleConvertDataFilter(oldDataFilter: {[key: string]: any}) {
    const filter = Object.keys(oldDataFilter).reduce((acc, key) => {
      // Check value object
      if (
        typeof oldDataFilter[key] === 'object' &&
        !Number.isNaN(oldDataFilter[key]) &&
        !Array.isArray(oldDataFilter[key])
      ) {
        const objectHasValue = filterObjectKeyNotEmpty(oldDataFilter[key])

        if (Object.keys(objectHasValue).length) {
          // object but type date
          if (key === 'application_date') {
            // add 1 days if key = lte
            const objectDate = Object.keys(objectHasValue).reduce(
              (acc, key) => ({
                ...acc,
                [key]: new Date(
                  key === 'lte'
                    ? moment(objectHasValue[key], 'YYYY-MM-DD').add(1, 'days')
                    : objectHasValue[key]
                ),
              }),
              {}
            )

            return {...acc, [key]: objectDate}
          }

          // convert value to number
          const newObject = Object.keys(objectHasValue).reduce(
            (acc, key) => ({
              ...acc,
              [key]: +objectHasValue[key],
            }),
            {}
          )

          return {...acc, [key]: newObject}
        } else {
          return {...acc}
        }
      }

      if (dataFilter[key]) {
        let value = dataFilter[key]

        if (['loan_type_id', 'id'].includes(key)) {
          value = +value
        }

        return {...acc, [key]: value}
      }

      return {...acc}
    }, {})

    return {...filter, ...(searchValue ? {searchBar: searchValue || ''} : {})}
  }

  function handleFilter() {
    const newDataFilter = handleConvertDataFilter(dataFilter)

    onFetchDataList({
      ...searchCriteria,
      currentPage: 1,
      filters: newDataFilter,
    })
  }

  function handleChangeSortBy(item: TableRow) {
    if (item.key === keySort) {
      setOrderBy(orderBy === 'desc' ? 'asc' : 'desc')
    } else {
      setKeySort(item.key)
      setOrderBy('asc')
    }
  }

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  // agrument using for clear search
  function handleSearch(forceSearchValue?: string) {
    const newDataFilter = handleConvertDataFilter(dataFilter)

    const dataFilterChange: {[key: string]: any} = {
      ...newDataFilter,
      searchBar: forceSearchValue || searchValue,
    }

    // remove search bar if not value
    if (!searchValue || !forceSearchValue) {
      delete dataFilterChange.searchBar
    }

    const newSearchCriteria = {
      ...searchCriteria,
      currentPage: 1,
      filters: dataFilterChange,
    }

    onFetchDataList(newSearchCriteria)
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
                handleSearch(searchValue)
              }
            }}
            insertLeft={
              <FontAwesomeIcon
                className='ps-12px cursor-pointer text-gray-600 text-hover-gray-900'
                icon={faSearch}
                onClick={() => handleSearch(searchValue)}
              />
            }
            insertRight={
              searchValue ? (
                <FontAwesomeIcon
                  className='pe-12px cursor-pointer text-gray-600 text-hover-gray-900'
                  icon={faClose}
                  onClick={() => {
                    setSearchValue('')
                    handleSearch('')
                  }}
                />
              ) : null
            }
          />
          <div className='d-flex flex-end ms-4'>
            <Button
              onClick={showInputFilter}
              className='btn-secondary align-self-center m-2 fs-6 text-primary h-45px'
              disabled={false}
            >
              <Icons name={'filterIcon'} />
              Filter
            </Button>

            <Link to='/application/create'>
              <Button
                className='btn-primary align-self-center m-2 fs-6 text-white h-45px'
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
            <table
              id='kt_table_users'
              className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            >
              <thead>
                <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                  {rows
                    .filter((item) => !item.isHide)
                    .map((item, i) => {
                      const {classNameTableHead, name, isSort, key} = item

                      return (
                        <th
                          className={clsx(['text-nowrap min-w-75px', classNameTableHead])}
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
                  {showAction && <th className='text-center w-150px fs-6 fw-bold'>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {showInput ? (
                  <tr>
                    {rows.map((row, i) => {
                      if (!row.infoFilter) return <td key={i}></td>
                      const {infoFilter, key, options, classNameTableBody} = row || {}
                      const {component, typeComponent, typeInput, isFromTo} = infoFilter || {}

                      const Component = component
                      let props: {[key: string]: any} = {
                        name: key,
                        value: dataFilter[key] || '',
                        onChange: handleChangeFilter,
                      }

                      if (typeComponent === 'select') {
                        props = {
                          ...props,
                          options: options || dataOption[key],
                          fieldLabelOption: infoFilter?.fieldLabelOption || 'label',
                          fieldValueOption: infoFilter?.fieldValueOption || 'value',
                        }
                      } else {
                        // type input
                        props = {
                          ...props,
                          type: typeInput || 'text',
                        }
                      }

                      return (
                        <td key={i} className={clsx(['align-top', classNameTableBody])}>
                          {isFromTo ? (
                            <div className='d-flex flex-column gap-3'>
                              <Component
                                {...props}
                                placeholder='from'
                                value={dataFilter[key]?.['gte'] || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handleChangeFromToFilter('gte', e)
                                }}
                              />
                              <Component
                                {...props}
                                placeholder='to'
                                value={dataFilter[key]?.['lte'] || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handleChangeFromToFilter('lte', e)
                                }}
                              />
                            </div>
                          ) : (
                            <Component classShared={''} {...props} />
                          )}
                        </td>
                      )
                    })}

                    {/* td refresh */}
                    <td
                      className='d-flex mt-2 align-items-center justify-content-center'
                      style={{borderBottom: 'none'}}
                    >
                      <div className='gap-3'>
                        <div
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 text-gray-600 text-hover-primary'
                          onClick={() => handleResetFilter()}
                        >
                          <FontAwesomeIcon icon={faArrowsRotate} />
                        </div>

                        <Button
                          className='fw-medium p-12px button-application-filter-custom fs-6 text-primary'
                          onClick={handleFilter}
                        >
                          Apply
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : null}
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
            setLimit={(e: any) =>
              onFetchDataList({
                ...searchCriteria,
                pageSize: e.target.value,
                currentPage: 1,
                filters: dataFilter,
              })
            }
          />
          <PaginationArrow
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
