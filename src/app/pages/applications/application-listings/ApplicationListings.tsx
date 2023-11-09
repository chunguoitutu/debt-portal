import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Button} from 'react-bootstrap'
import Icons from '../../../components/icons'
import {KTCardBody} from '../../../../_metronic/helpers'
import {APPLICATION_LISTING_CONFIG} from './config'
import React, {useMemo, useState} from 'react'
import RowPerPage from '../../../components/row-per-page'
import {ApplicationItem, ResponseApplicationListing, SearchCriteria} from '../../../modules/auth'
import request from '../../../axios'
import PaginationArrow from '../../../components/pagination.tsx'
import {Link, useNavigate} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import Badge from '../../../components/badge/Badge'
import ButtonEdit from '../../../components/button/ButtonEdit'
import Checkbox from '../../../components/checkbox/Checkbox'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import {filterObjectKeyNotEmpty} from '../../../utils'
import Loading from '../../../components/table/components/Loading'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Application Listing',
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

  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [dataFilter, setDataFilter] = React.useState<{[key: string]: any}>({})
  const [data, setData] = React.useState<ApplicationItem[]>([])
  const [listIdChecked, setListIdChecked] = React.useState<number[]>([])
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [loading, setLoading] = useState<boolean>(false)

  React.useEffect(() => {
    onFetchDataList()

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

  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })

  const navigate = useNavigate()

  const isCheckedAll = useMemo(() => {
    const listIdCurrentPage = data.map((item) => item.id)

    // If all id current page not include listIdChecked return false
    if (listIdChecked.some((id) => listIdCurrentPage.includes(id))) {
      return data.every((item) => listIdChecked.includes(item.id))
    } else {
      return false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listIdChecked])

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
          <td>
            <Checkbox
              name=''
              checked={listIdChecked.includes(item.id)}
              onChange={(e) => handleCheckItem(e, item)}
            />
          </td>
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
                  <td key={i} className={classNameTableBody}>
                    <Badge color={color as any} title={title as any} key={i} />
                  </td>
                )
              }

              return (
                <td key={i} className={classNameTableBody}>
                  {component ? (
                    <Component />
                  ) : (
                    <span className='text-gray-600 fw-semibold'>{value}</span>
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
      const {data: response} = await request.post(settings.endPointGetListing, body)
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

  function handleCheckItem(e: React.ChangeEvent<HTMLInputElement>, item: ApplicationItem) {
    if (e.target.checked) {
      setListIdChecked([...listIdChecked, item.id])
    } else {
      setListIdChecked(listIdChecked.filter((id) => id !== item.id))
    }
  }

  function handleToggleCheckAll(e: React.ChangeEvent<HTMLInputElement>) {
    const listIdCurrentPage = data.map((item) => item.id)

    if (e.target.checked) {
      const newListId = Array.from(new Set([...listIdChecked, ...listIdCurrentPage]))
      setListIdChecked(newListId)
    } else {
      // if page 1 deselect still list id page 2
      setListIdChecked(listIdChecked.filter((id) => !listIdCurrentPage.includes(id)))
    }
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
  }

  function handleFilter() {
    const newDataFilter = Object.keys(dataFilter).reduce((acc, key) => {
      // Check value object
      if (
        typeof dataFilter[key] === 'object' &&
        !Number.isNaN(dataFilter[key]) &&
        !Array.isArray(dataFilter[key])
      ) {
        const objectHasValue = filterObjectKeyNotEmpty(dataFilter[key])

        if (Object.keys(objectHasValue).length) {
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
          return {...acc, [key]: objectHasValue}
        } else {
          return {...acc}
        }
      }

      if (dataFilter[key]) return {...acc, [key]: dataFilter[key]}

      return {...acc}
    }, {})

    onFetchDataList({
      ...searchCriteria,
      filters: newDataFilter,
    })
  }

  return (
    <div className='card p-5 h-fit-content'>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'Application Listing'}</PageTitle>

      <div>
        <div className='d-flex flex-row'>
          <div className='d-flex align-items-center position-relative my-1 flex-grow-1 mw-1200px'>
            <i className='ki-duotone ki-magnifier fs-1 position-absolute ms-6'>
              <span className='path1'></span>
              <span className='path2'></span>
            </i>
            <input
              type='text'
              data-kt-user-table-filter='search'
              className='form-control form-control-solid ps-14 w-100'
              placeholder='Search Customer'
            />
          </div>
          <div className='d-flex flex-end ms-4'>
            <Button
              onClick={showInputFilter}
              className='btn-secondary align-self-center m-2 fs-6'
              style={{color: '#3E97FF', background: ''}}
              disabled={false}
            >
              <Icons name={'filterIcon'} />
              Filter
            </Button>

            <Link to='/application/create'>
              <Button
                className='btn-primary align-self-center m-2 fs-6'
                style={{color: '#fff', background: ''}}
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
                  <td>
                    {!!data.length && (
                      <Checkbox name='' checked={isCheckedAll} onChange={handleToggleCheckAll} />
                    )}
                  </td>
                  {rows.map(
                    (row, i) =>
                      !row?.isHide && (
                        <th className={row?.classNameTableHead} key={i}>
                          <div className='cursor-pointer'>
                            <span>{row.name}</span>
                          </div>
                        </th>
                      )
                  )}
                  {showAction && <th className='text-center w-150px'>Action</th>}
                </tr>
              </thead>
              <tbody>
                {showInput ? (
                  <tr>
                    {/* td checkbox */}
                    <td></td>
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
                    <td className='text-center align-top'>
                      <div className='d-flex align-items-center justify-content-center gap-3'>
                        <div
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 text-gray-600 text-hover-primary'
                          onClick={() => handleResetFilter()}
                        >
                          <FontAwesomeIcon icon={faArrowsRotate} />
                        </div>

                        <Button onClick={handleFilter}>Filter</Button>
                      </div>
                    </td>
                  </tr>
                ) : null}
                {data.length ? (
                  renderRows()
                ) : (
                  <tr>
                    <td colSpan={rows.length + 1}>
                      <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                        No matching records found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </KTCardBody>

        <div style={{padding: '10px 22.75px', display: 'flex', justifyContent: 'space-between'}}>
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
