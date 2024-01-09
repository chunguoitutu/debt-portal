import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTIcon} from '@/_metronic/helpers'
import {useEffect, useState} from 'react'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import GoogleSearchPageCheck from '.'
import {useAuth} from '@/app/context/AuthContext'

type Props = {
  show: boolean
  handleClose: () => void
  payload: string
  status: boolean
  Nric_no: string
}
const modalsRoot = document.getElementById('root-modals') || document.body
const PageCheckDeskTop = ({show, handleClose, payload, status, Nric_no}: Props) => {
  const [search, setSearch] = useState(payload || '')
  const [loadApi, setLoadApi] = useState(false)
  const [loadApiCheck, setLoadApiCheck] = useState(false)
  const [dataSearch, setDataSeacrch] = useState({
    url: '',
    screenshot: '',
  })
  const [loading, setLoading] = useState(false)
  const {company_id} = useAuth()

  useEffect(() => {
    setLoading(true)
    if (!status) {
      setLoadApiCheck(true)
      request
        .post('/google-search/up-page-check', {
          searchTerm: search,
          Nric_no,
          company_id,
        })
        .then((data) => {
          setDataSeacrch({
            screenshot: data?.data?.screenshot || '',
            url: data?.data?.url || '',
          })
        })
        .catch((e) => {
          handleClose()
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `System error, please try again in a few minutes`,
          })
        })
        .finally(() => {
          setLoadApiCheck(false)
          setLoading(false)
        })
    } else {
      setLoadApiCheck(true)
      request
        .post('/google-search/get/up-page-check', {
          searchTerm: search,
          Nric_no,
          company_id,
        })
        .then((data) => {
          setDataSeacrch({
            screenshot: data?.data?.screenshot || '',
            url: '',
          })
        })
        .catch((e) => {
          handleClose()
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `System error, please try again in a few minutes`,
          })
        })
        .finally(() => {
          setLoading(false)

          setLoadApiCheck(false)
        })
    }
  }, [loadApi])
  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='card'>
        <div
          style={{
            padding: '30px',
          }}
          className='modal-header p-30px d-flex align-items-center justify-content-between'
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              fontStyle: 'normal',
              lineHeight: '24px',
              textTransform: 'capitalize',
              color: '#071437',
            }}
            className='mb-0px'
          >
            UN Page Check
          </h2>
          <div
            style={{width: '24px', height: '24px'}}
            className='btn btn-sm  btn-icon  btn-active-color-primary'
            onClick={handleClose}
          >
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <GoogleSearchPageCheck
          handleReGetApi={() => {
            setLoadApi(!loadApi)
          }}
          status={loading}
          loadApiCheck={loadApiCheck}
          setSearch={setSearch}
          search={search}
          handleClose={handleClose}
          dataSearch={dataSearch}
        />
      </div>
    </Modal>,
    modalsRoot
  )
}

export default PageCheckDeskTop
