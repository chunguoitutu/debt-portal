import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTIcon} from '@/_metronic/helpers'
import GoogleSearch from './GoogleSearch'
import {useEffect, useState} from 'react'
import request from '@/app/axios'
import {useParams} from 'react-router-dom'
import {swalToast} from '@/app/swal-notification'

type Props = {
  show: boolean
  handleClose: () => void
  payload: string
}
const modalsRoot = document.getElementById('root-modals') || document.body
const WrapperGoogleSearch = ({show, handleClose, payload}: Props) => {
  const [dataSearch, setDataSeacrch] = useState({
    url: '',
    screenshot: '',
  })

  useEffect(() => {
    request
      .get('/google-search/google/' + `${payload}`)
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
            Google Search
          </h2>
          <div
            style={{width: '24px', height: '24px'}}
            className='btn btn-sm  btn-icon  btn-active-color-primary'
            onClick={handleClose}
          >
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        </div>
        <GoogleSearch handleClose={handleClose} dataSearch={dataSearch} />
      </div>
    </Modal>,
    modalsRoot
  )
}

export default WrapperGoogleSearch
