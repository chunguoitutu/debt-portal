import * as React from 'react'
import {Modal} from 'react-bootstrap'
import {KTCardBody, KTIcon} from '../../../../../_metronic/helpers'
import {TABLE_LOOKUP_CUSTOMER} from '../config'
import Button from '../../../../components/button/Button'
import {ResponeLookupListing, SearchCriteria} from '../../../../modules/auth'
import request from '../../../../axios'
import Icons from '../../../../components/icons'
import RowPerPage from '../../../../components/row-per-page'
import PaginationArrow from '../../../../components/pagination.tsx'
import Input from '../../../../components/input'

type Props = {
  show?: boolean
  onClose: () => void
}

const LookupCustomer = ({show, onClose}: Props) => {
  const [showInput, setShowInput] = React.useState<boolean>(false)
  const [data, setData] = React.useState<ResponeLookupListing[]>([])
  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: 10,
    currentPage: 2,
    total: 20,
  })

  async function handleChangePagination(data: Omit<SearchCriteria, 'total'>) {
    setSearchCriteria({...searchCriteria, ...data})
  }

  const [dataFilters, setDataFilter] = React.useState<Partial<ResponeLookupListing>>({})
  const {settings, rows} = TABLE_LOOKUP_CUSTOMER
  function showInputFilter() {
    setShowInput(!showInput)
  }
  async function onFetchDataList(body?: Omit<SearchCriteria, 'total'>) {
    try {
      const {data: response} = await request.post(settings.endPointGetListing + '/listing', body)
      Array.isArray(response.data) && setData(response.data)
      response?.searchCriteria && setSearchCriteria(response?.searchCriteria)
    } catch (error) {
      // no thing
    }
  }
  const renderRows = () => {
    return data.map((item, idx) => {
      return (
        <>
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
        </>
      )
    })
  }
  React.useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
          <div className='d-flex flex-row'>
            <div className='d-flex align-items-center position-relative my-1 flex-grow-1 mw-1000px'>
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
            <div className='d-flex flex-end'>
              <Button
                onClick={showInputFilter}
                className='btn-secondary align-self-center m-2 fs-6'
                style={{color: '#3E97FF', background: ''}}
                disabled={false}
              >
                <Icons name={'filterIcon'} />
                Filter
              </Button>
            </div>
          </div>
          {data.length ? (
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
                    {renderRows()}
                  </tbody>
                </table>
              </div>
            </KTCardBody>
          ) : null}
        </Modal.Body>
        <div style={{padding: '22.75px', display: 'flex', justifyContent: 'space-between'}}>
          <RowPerPage
            lenghtData={searchCriteria.total}
            limit={searchCriteria.pageSize}
            page={searchCriteria.currentPage}
            setLimit={(e: any) =>
              setSearchCriteria({...searchCriteria, pageSize: e.target.value, currentPage: 1})
            }
          />
          <PaginationArrow
            onChangePagePagination={handleChangePagination}
            searchCriteria={searchCriteria}
          />
        </div>
        <Modal.Footer>
          <div className='d-flex flex-end full'>
            <Button
              onClick={onClose}
              className='btn-secondary align-self-center me-3'
              disabled={false}
            >
              Cancel
            </Button>
            <Button type='submit' loading={false} disabled={false} onClick={() => {}}>
              Lookup
            </Button>
          </div>
        </Modal.Footer>
      </>
    </Modal>
  )
}
export default LookupCustomer
