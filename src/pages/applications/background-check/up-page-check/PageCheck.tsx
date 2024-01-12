import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTIcon} from '@/_metronic/helpers'
import {useEffect, useState} from 'react'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import GoogleSearchPageCheck from '.'
import {useAuth} from '@/app/context/AuthContext'
import {useParams} from 'react-router-dom'

type Props = {
  show: boolean
  handleClose: () => void
  payload: string
  status: boolean
  Nric_no: string
  tools: {
    googleSearchCheck: string
    upPageCheck: string
    casCheck: string
  }
  setTools: any
  borrower_id: number
}
const modalsRoot = document.getElementById('root-modals') || document.body
const PageCheckDeskTop = ({
  show,
  borrower_id,
  handleClose,
  payload,
  status,
  Nric_no,
  setTools,
  tools,
}: Props) => {
  const [search, setSearch] = useState(payload || '')
  const [loadApi, setLoadApi] = useState(false)
  const [loadApiCheck, setLoadApiCheck] = useState(false)
  const [dataSearch, setDataSeacrch] = useState({
    url: '',
    screenshot: '',
  })
  const [loading, setLoading] = useState(false)
  const {company_id} = useAuth()
  const {applicationIdEdit} = useParams()

  useEffect(() => {
    setLoading(true)
    if (!status) {
      setLoadApiCheck(true)
      !applicationIdEdit &&
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
            setTools({...tools, upPageCheck: data?.data?.screenshot || ''})
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

      !!applicationIdEdit &&
        request
          .post('/google-search/edit-check', {
            searchTerm: search,
            name_check: 'upPageCheck',
            company_id,
            borrower_id,
          })
          .then((data) => {
            setDataSeacrch({
              screenshot: data?.data?.screenshot || '',
              url: data?.data?.url || '',
            })
            setTools({...tools, upPageCheck: data?.data?.screenshot || ''})
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
      setDataSeacrch({
        screenshot: tools?.upPageCheck || '',
        url: '',
      })
      setLoadApiCheck(false)
      setLoading(false)
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
            padding: '30px 28px 30px 30px',
          }}
          className='modal-header d-flex align-items-center justify-content-between'
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
          <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
            <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
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
