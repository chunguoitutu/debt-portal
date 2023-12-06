import * as React from 'react'
import {Modal} from 'react-bootstrap'
import {TABLE_LOOKUP_CUSTOMER} from '../config'
import Button from '@/components/button/Button'
import Icons from '@/components/icons'
import RowPerPage from '@/components/row-per-page'
import {Input} from '@/components/input'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowsRotate, faClose, faSearch} from '@fortawesome/free-solid-svg-icons'
import request from '../../../../app/axios'
import {KTCardBody, KTIcon} from '../../../../_metronic/helpers'
import {OrderBy, SearchCriteria, TableRow, ResponeLookupListing} from '@/app/types'
import SortBy from '@/components/sort-by'
import clsx from 'clsx'
import ButtonViewDetail from '@/components/button/ButtonViewDetail'
import './style.scss'
import Pagination from '@/components/table/components/Pagination'

type Props = {
  show?: boolean
  onClose: () => void
}

const LookupCustomer = ({show, onClose}: Props) => {
  const {settings, rows} = TABLE_LOOKUP_CUSTOMER
  const {showAction = true, showViewButton, defaultSort} = settings

  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [loadApi, setLoadApi] = React.useState<boolean>(true)
  const [searchValue, setSearchValue] = React.useState<string>('')
  const [data, setData] = React.useState<ResponeLookupListing[]>([])
  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })
  const [orderBy, setOrderBy] = React.useState<OrderBy>('asc')
  const [keySort, setKeySort] = React.useState<string>(defaultSort || 'id')
  const {pageSize, currentPage} = searchCriteria

  const [dataFilters, setDataFilter] = React.useState<Partial<ResponeLookupListing>>({})

  function showInputFilter() {
    setShowInput(!showInput)
  }

  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponeLookupListing>>, 'total'>
  ) {
    setLoadApi(false)
    try {
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
    }

    setTimeout(() => {
      setLoadApi(true)
    }, 2000 * Math.random())
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
                {showViewButton && <ButtonViewDetail onClick={() => {}} />}
              </div>
            </td>
          )}
        </tr>
      )
    })
  }

  const handleLookup = async () => {
    loadApi &&
      onFetchDataList({
        ...searchCriteria,
        filters: dataFilters,
      })
  }

  React.useEffect(() => {
    loadApi &&
      onFetchDataList({
        ...searchCriteria,
        filters: dataFilters,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keySort, orderBy, pageSize, currentPage])

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  // agrument using for clear search
  function handleSearch(forceSearchValue?: string) {
    const dataFilterChange: {[key: string]: any} = {
      ...dataFilters,
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

    loadApi && onFetchDataList(newSearchCriteria)
  }

  function handleFilter() {
    const newDataFilter = Object.keys(dataFilters).reduce((acc, key) => {
      if (dataFilters[key]) {
        let value = dataFilters[key]

        return {...acc, [key]: value}
      }

      return {...acc}
    }, {})

    const filterAndSearch = {
      ...newDataFilter,
      ...(searchValue ? {searchBar: searchValue || ''} : {}),
    }

    loadApi &&
      onFetchDataList({
        ...searchCriteria,
        currentPage: 1,
        filters: filterAndSearch,
      })
  }

  function handleResetFilter() {
    setSearchValue('')
    setDataFilter({})
    loadApi && onFetchDataList({...searchCriteria})
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
        <Modal.Header>
          <div className='flex-row-fluid'>
            <div className='d-flex justify-content-between'>
              <h2 className='m-0'>Lookup Customer</h2>
              <div
                className='btn btn-sm btn-icon btn-active-color-primary'
                onClick={() => onClose()}
              >
                <KTIcon className='fs-1' iconName='cross' />
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
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
            <div className='d-flex flex-end'>
              <Button
                onClick={showInputFilter}
                className='btn-secondary align-self-center m-2 fs-6 text-primary h-45px'
                disabled={false}
              >
                <Icons name={'filterIcon'} />
                Filter
              </Button>
            </div>
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
                                  handleFilter()
                                }
                              }}
                            />
                          </td>
                        )
                      })}
                      <td className='text-center'>
                        <div className='d-flex align-items-center justify-content-center gap-3'>
                          <div
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 text-gray-600 text-hover-primary'
                            onClick={() => handleResetFilter()}
                          >
                            <FontAwesomeIcon icon={faArrowsRotate} />
                          </div>

                          <Button
                            className='fw-medium p-12px button-application-filter-custom fs-5 text-primary btn-secondary'
                            style={{backgroundColor: '#f9f9f9', height: '35px'}}
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
        </div>
        <Modal.Footer>
          <div className='d-flex flex-end full'>
            <Button
              onClick={onClose}
              className='btn-secondary align-self-center me-3 fs-5'
              disabled={false}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              loading={false}
              disabled={false}
              onClick={handleLookup}
              className='fs-5 btn btn-primary'
            >
              Lookup
            </Button>
          </div>
        </Modal.Footer>
      </>
    </Modal>
  )
}
export default LookupCustomer
