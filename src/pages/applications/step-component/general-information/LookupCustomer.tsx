import React, {useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowsRotate, faClose, faSearch} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import './style.scss'

import {TABLE_LOOKUP_CUSTOMER} from '../config'
import request from '../../../../app/axios'
import {KTCardBody, KTIcon} from '../../../../_metronic/helpers'
import Icons from '@/components/icons'
import Button from '@/components/button/Button'
import RowPerPage from '@/components/row-per-page'
import {Input} from '@/components/input'
import {
  OrderBy,
  SearchCriteria,
  TableRow,
  ResponseLookupListing,
  ApplicationFormData,
} from '@/app/types'
import SortBy from '@/components/sort-by'
import ButtonViewDetail from '@/components/button/ButtonViewDetail'
import Pagination from '@/components/table/components/Pagination'
import {convertResidentialTypeSingPass, handleFormatFilter} from '@/app/utils'
import Loading from '@/components/table/components/Loading'
import {Checkbox} from '@/components/checkbox'
import {useAuth} from '@/app/context/AuthContext'
import {FormikProps} from 'formik'
import moment from 'moment'

type Props = {
  show?: boolean
  onClose: () => void
  formik: FormikProps<ApplicationFormData>
}

const LookupCustomer = ({show, onClose, formik}: Props) => {
  const {settings, rows} = TABLE_LOOKUP_CUSTOMER
  const {showAction = true, showViewButton, defaultSort} = settings
  const [checkFilter, setCheckFilter] = React.useState<any>({})
  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [loadApi, setLoadApi] = React.useState<boolean>(true)
  const [searchValue, setSearchValue] = React.useState<string>('')
  const [data, setData] = React.useState<ResponseLookupListing[]>([])
  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })
  const [orderBy, setOrderBy] = React.useState<OrderBy>('asc')
  const [keySort, setKeySort] = React.useState<string>(defaultSort || 'id')
  const {pageSize, currentPage} = searchCriteria
  const [dataFilters, setDataFilter] = React.useState<Partial<ResponseLookupListing>>({})
  const [loading, setLoading] = React.useState<boolean>(false)
  const [filterButtonClicked, setFilterButtonClicked] = React.useState(false)

  const {company_id} = useAuth()

  function showInputFilter() {
    setShowInput(!showInput)
  }

  function isUseFilterButton() {
    setFilterButtonClicked(!filterButtonClicked)
  }

  const showFilter = [
    {
      key: 'customer_no',
      value: 'Customer No',
    },
    {
      key: 'identification_no',
      value: 'Nric',
    },
    {
      key: 'firstname',
      value: 'Fist Name',
    },
    {
      key: 'lastname',
      value: 'Last Name',
    },
  ]

  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponseLookupListing>>, 'total'>
  ) {
    setLoading(true)
    try {
      setCheckFilter(body?.filters || {})
      const {data: response} = await request.post(settings.endPointGetListing + '/listing', {
        ...body,
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

  const {setFieldValue, setFieldError} = formik

  async function handleGetApplicationById(nric: any) {
    try {
      const {data} = await request.post(`/application/nric_no/${nric}`, {
        company_id,
      })

      const formattedDateOfBirth = moment(data?.data.date_of_birth).format('YYYY-MM-DD')
      //step 1
      setFieldValue('is_existing', 'existing')
      setFieldValue('firstname', data?.data.firstname || '')
      setFieldValue('lastname', data?.data.lastname || '')
      setFieldValue('identification_type', data?.data.identification_type || '')
      setFieldValue('identification_no', data?.data.identification_no || '')
      setFieldValue('residential_type', data?.data.borrower[0]?.residential_type || '')
      setFieldValue('customer_no', data?.data.customer_no || '')
      setFieldValue('gender', data?.data.gender || '')
      setFieldValue('date_of_birth', formattedDateOfBirth || '')
      setFieldValue('country_id', data?.data.country_id || '')

      onClose()
    } catch (error) {
      setFieldValue('is_existing', 'new')
      setFieldValue('country_id', 192)
    } finally {
    }
  }

  async function handleChangePagination(goToPage: number) {
    loadApi && onFetchDataList({...searchCriteria, currentPage: goToPage})
  }

  function handleChangeSortBy(item: TableRow) {
    if (item.key === keySort) {
      setOrderBy(orderBy === 'desc' ? 'asc' : 'desc')
    } else {
      setKeySort(item.key)
      setOrderBy('asc')
    }
  }

  const renderRows = () => {
    return data.map((item, idx) => {
      return (
        <tr key={idx}>
          {rows.map(({key, component, classNameTableBody, isHide}, i) => {
            if (isHide) {
              return <React.Fragment key={i}></React.Fragment>
            }
            let Component = component || React.Fragment
            let value = item[key]
            if (key === 'id') {
              return <td key={i}>{idx + 1}</td>
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
              <td key={i} className='fs-6 fw-medium ' style={{color: '#78829D'}}>
                {component ? <Component /> : <span className={classNameTableBody}>{value}</span>}
              </td>
            )
          })}
          {showAction && showViewButton && (
            <td className='text-center'>
              <div className='d-flex align-items-center justify-content-center gap-1'>
                {showViewButton && (
                  <Button
                    className='btn btn-secondary text-hover-primary text-gray-600'
                    style={{height: 44, width: 59, padding: 8}}
                    onClick={() => {
                      handleGetApplicationById(item.identification_no)
                      onClose()
                    }}
                  >
                    Select
                  </Button>
                )}
              </div>
            </td>
          )}
        </tr>
      )
    })
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onFetchDataList({
        ...searchCriteria,
        filters: handleFormatFilter({
          dataFilter: {
            ...dataFilters,
            searchBar: searchValue,
          },
        }),
      })
    }, 300)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySort, orderBy, pageSize, currentPage, loadApi])

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function handleResetFilter() {
    setSearchValue('')
    setDataFilter({})
    setLoadApi(!loadApi)
  }

  //to call api when get listing/filter/search
  function handleReGetApi() {
    setLoadApi(!loadApi)
  }

  return (
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      show={show}
      onHide={onClose}
      backdrop={true}
      scrollable={true}
    >
      <>
        <Modal.Header className='p-30px'>
          <div className='flex-row-fluid'>
            <div className='d-flex justify-content-between'>
              <h2 className='mt-2'>Lookup Customer</h2>
              <div
                className='btn btn-sm btn-icon btn-active-color-primary'
                onClick={() => onClose()}
              >
                <KTIcon className='fs-1' iconName='cross' />
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body style={{maxHeight: 450}}>
          <div className='d-flex flex-row align-items-center'>
            <Input
              transparent={true}
              classShared='flex-grow-1 h-30px mb-5'
              placeholder='Search'
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
            <div className='d-flex flex-end ms-4 fs-6'>
              <Button
                style={{
                  backgroundColor:
                    Object.keys(checkFilter).length !== 0 &&
                    !(
                      Object.keys(checkFilter).length === 1 &&
                      Object.keys(checkFilter).includes('searchBar')
                    )
                      ? '#c4cada'
                      : '#f1f1f4',
                }}
                onClick={() => {
                  showInputFilter(), isUseFilterButton()
                }}
                className='btn-secondary align-self-center my-2 fs-6 text-primary h-45px'
                disabled={false}
              >
                <Icons name={'filterIcon'} />
                Filter
              </Button>
            </div>

            <div className='d-flex flex-end ms-2'>
              <Button
                onClick={() => {
                  handleReGetApi()
                }}
                className='btn btn-primary align-self-center my-2 fs-5 h-45px fs-6'
                disabled={filterButtonClicked}
              >
                Search
              </Button>
            </div>
          </div>
          <div>
            {/*  */}
            {Object.keys(checkFilter).length !== 0 &&
              !(
                Object.keys(checkFilter).length === 1 &&
                Object.keys(checkFilter).includes('searchBar')
              ) && (
                <div className='d-flex justify-content  pt-24px pb-24px pt-14px m-0 '>
                  <h1 className='fs-14 text-gray-600 fw-semibold m-0 py-4px  mt-16px '>Filter:</h1>

                  <div className='d-flex justify-content-start align-items-center p-0 m-0 flex-wrap '>
                    {showFilter.map((filter, index) => (
                      <div key={index} className='p-0 m-0'>
                        {(!!checkFilter[`${filter.key}`] || checkFilter[`${filter.key}`] === 0) && (
                          <div className='wrapper-filter-application mt-16px ms-16px py-0 '>
                            <h2 className='filter-title-show'>
                              {filter.value}: {checkFilter[`${filter.key}`]}
                            </h2>
                            <div
                              onClick={() => {
                                setDataFilter({...dataFilters, [`${filter.key}`]: ''})
                                setLoadApi(!loadApi)
                              }}
                              className='p-0 m-0 cursor-pointer'
                            >
                              <Icons name={'CloseSmall'} />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      handleResetFilter()
                    }}
                    className='reset-all-filter-application mt-16px ms-16px'
                  >
                    Reset All
                  </button>
                </div>
              )}
            {/*  */}
          </div>
          <KTCardBody className='py-4'>
            <div className='table-responsive'>
              <table
                id='kt_table_users'
                className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
              >
                <thead>
                  <tr className='text-start text-muted fw-bold fs-6 text-uppercase gs-0'>
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
                    {<th className='text-center w-150px'>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {showInput ? (
                    <tr>
                      {rows.map((row, i) => {
                        if (row.key === 'id')
                          return (
                            <td key={i}>
                              <React.Fragment />
                            </td>
                          )
                        return (
                          <td key={i}>
                            <Input
                              name={row.key}
                              value={dataFilters[row.key] || ''}
                              onChange={(e: React.ChangeEvent<any>) => {
                                setDataFilter((prev) => ({
                                  ...prev,
                                  [row.key]: e.target.value,
                                }))
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleReGetApi()
                                }
                              }}
                            />
                          </td>
                        )
                      })}
                      <td className='text-center' style={{height: 44}}>
                        <div
                          className='d-flex align-items-center justify-content-center gap-3'
                          style={{height: 44}}
                        >
                          <div
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 text-gray-600 text-hover-primary reload-apply-filter'
                            onClick={() => handleResetFilter()}
                            style={{width: 44}}
                          >
                            <FontAwesomeIcon icon={faArrowsRotate} />
                          </div>

                          <Button
                            className='btn text-primary btn-secondary fw-medium fs-14 btn-sm me-1 fw-medium text-primary reload-apply-filter'
                            style={{
                              backgroundColor: '#f9f9f9',
                              width: 55,
                            }}
                            onClick={handleReGetApi}
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
                      <td colSpan={7}>
                        <div className='d-flex text-center w-100 align-content-center justify-content-center text-gray-600 fw-medium'>
                          No matching records found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </KTCardBody>
        </Modal.Body>
        <div style={{padding: '10px 22.75px', display: 'flex', justifyContent: 'space-between'}}>
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
        <Modal.Footer style={{padding: 24}}>
          <div className='d-flex flex-end full'>
            <Button
              onClick={onClose}
              className='btn-secondary align-self-center me-3 fs-6'
              disabled={false}
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </>
    </Modal>
  )
}
export default LookupCustomer
