import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTIcon} from '@/_metronic/helpers'
import GoogleSearch from './GoogleSearch'
import {useEffect, useState} from 'react'
import request from '@/app/axios'
import {useParams} from 'react-router-dom'
import {swalToast} from '@/app/swal-notification'
import {useAuth} from '@/app/context/AuthContext'

type Props = {
  show: boolean
  handleClose: () => void
  payload: string
  status: boolean
  Nric_no: string
  tools: {googleSearchCheck: string; upPageCheck: string; casCheck: string}
  setTools: any
  borrower_id: number
}
const modalsRoot = document.getElementById('root-modals') || document.body

const WrapperGoogleSearch = ({
  show,
  handleClose,
  payload,
  borrower_id,
  status,
  Nric_no,
  setTools,
  tools,
}: Props) => {
  const [dataSearch, setDataSeacrch] = useState({
    url: '',
    screenshot: '',
  })
  const {applicationIdEdit} = useParams()

  const [loading, setLoading] = useState(false)
  const {company_id} = useAuth()
  useEffect(() => {
    setLoading(true)
    if (!status) {
      !applicationIdEdit &&
        request
          .post('/google-search/google', {search: payload, Nric_no, company_id})
          .then((data) => {
            setDataSeacrch({
              screenshot: data?.data?.screenshot || '',
              url: data?.data?.url || '',
            })
            setTools({...tools, googleSearchCheck: data?.data?.screenshot || ''})
          })
          .catch((e) => {
            handleClose()
            swalToast.fire({
              timer: 1500,
              icon: 'error',
              title: `System error, please try again in a few minutes`,
            })
          })
          .finally(() => setLoading(false))
      !!applicationIdEdit &&
        request
          .post('/google-search/edit-check', {
            searchTerm: payload,
            name_check: 'googleSearchCheck',
            company_id,
            borrower_id,
          })
          .then((data) => {
            setDataSeacrch({
              screenshot: data?.data?.screenshot || '',
              url: data?.data?.url || '',
            })
            setTools({...tools, googleSearchCheck: data?.data?.screenshot || ''})
          })
          .catch((e) => {
            handleClose()
            swalToast.fire({
              timer: 1500,
              icon: 'error',
              title: `System error, please try again in a few minutes`,
            })
          })
          .finally(() => setLoading(false))
    } else {
      setDataSeacrch({
        screenshot: tools?.googleSearchCheck || '',
        url: '',
      })
      setLoading(false)
    }
  }, [])

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
            padding: '30px 25px 30px 30px',
          }}
          className='modal-header  d-flex align-items-center justify-content-between'
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
            Google Search
          </h2>
          <div className='cursor-pointer p-0 m-0' onClick={handleClose}>
            <KTIcon className='fs-1 btn-hover-close' iconName='cross' />
          </div>
        </div>
        <GoogleSearch status={loading} handleClose={handleClose} dataSearch={dataSearch} />
      </div>
    </Modal>,
    modalsRoot
  )
}

export default WrapperGoogleSearch
