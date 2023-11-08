import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {Button} from 'react-bootstrap'
import Icons from '../../../components/icons'
import {KTCardBody} from '../../../../_metronic/helpers'
import {APPLICATION_LISTING_CONFIG} from './config'
import React from 'react'
import Input from '../../../components/input'
import RowPerPage from '../../../components/row-per-page'
import {ResponseApplicationListing, SearchCriteria} from '../../../modules/auth'
import request from '../../../axios'
import PaginationArrow from '../../../components/pagination.tsx'
import {Link} from 'react-router-dom'

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
  const {settings, rows} = APPLICATION_LISTING_CONFIG
  const [showInput, setShowInput] = React.useState<boolean>(false)

  function showInputFilter() {
    setShowInput(!showInput)
  }

  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  })

  const [dataFilters, setDataFilter] = React.useState({})
  const [data, setData] = React.useState([])

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
            return (
              <td key={i}>
                {component ? <Component /> : <span className={classNameTableBody}>{value}</span>}
              </td>
            )
          })}
        </tr>
      )
    })
  }

  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponseApplicationListing>>, 'total'>
  ) {
    try {
      const {data: response} = await request.post(settings.endPointGetListing + '/listing', body)
      Array.isArray(response.data) && setData(response.data)
      response?.searchCriteria && setSearchCriteria(response?.searchCriteria)
    } catch (error) {
      // no thing
    }
  }

  async function handleChangePagination(data: Omit<SearchCriteria, 'total'>) {
    onFetchDataList({...searchCriteria, ...data, filters: dataFilters})
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

            <Button
              onClick={() => {}}
              className='btn-secondary align-self-center m-2 fs-6'
              style={{color: '#3E97FF', background: ''}}
              disabled={false}
            >
              <Icons name={'ExportIcon'} />
              Export
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
                  {rows.map(
                    (row, i) =>
                      !row?.isHide && (
                        <th className={row?.classNameTableHead} key={i}>
                          <div className='d-flex flex-row gap-3 cursor-pointer'>
                            <span>{row.name}</span>
                          </div>
                        </th>
                      )
                  )}
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
                            onChange={(e: React.ChangeEvent<any>) => {
                              setDataFilter((prev) => ({
                                ...prev,
                                [row.key]: e.target.value,
                              }))
                            }}
                          />
                        </td>
                      )
                    })}
                  </tr>
                ) : null}
                {data.length ? (
                  renderRows()
                ) : (
                  <tr>
                    <td colSpan={7}>
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
                filters: dataFilters,
              })
            }
          />
          <PaginationArrow
            onChangePagePagination={handleChangePagination}
            searchCriteria={searchCriteria}
          />
        </div>
      </div>
    </div>
  )
}

export default ApplicationListing
