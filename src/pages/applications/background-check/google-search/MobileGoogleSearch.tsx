import {KTIcon} from '@/_metronic/helpers'
import React, {useEffect, useState} from 'react'
import GoogleSearch from './GoogleSearch'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {useAuth} from '@/app/context/AuthContext'

type Props = {
  handleShow: () => void
  payload: string
  status: boolean
  Nric_no: string
}

const MobileGoogleSearch = ({handleShow, payload, status, Nric_no}: Props) => {
  const [dataSearch, setDataSeacrch] = useState({
    url: '',
    screenshot: '',
  })
  const [loading, setLoading] = useState(false)
  const {company_id} = useAuth()
  useEffect(() => {
    setLoading(true)
    if (!status) {
      request
        .post('/google-search/google', {search: payload, Nric_no, company_id})
        .then((data) => {
          setDataSeacrch({
            screenshot: data?.data?.screenshot || '',
            url: data?.data?.url || '',
          })
        })
        .catch((e) => {
          handleShow()
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `System error, please try again in a few minutes`,
          })
        })
        .finally(() => setLoading(false))
    } else {
      request
        .post('/google-search/get/google', {search: payload, Nric_no, company_id})
        .then((data) => {
          setDataSeacrch({
            screenshot: data?.data?.screenshot || '',
            url: '',
          })
        })
        .catch((e) => {
          handleShow()
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `System error, please try again in a few minutes`,
          })
        })
        .finally(() => setLoading(false))
    }
  }, [])
  return (
    <div className='w-100'>
      <div
        className=' p-30px d-flex justify-content-between align-items-center'
        style={{
          borderBottom: '1px solid #F1F1F2',
          height: '98px',
        }}
      >
        <h5 className='font-bold fs-20 text-gray-900 m-0'> Google Search</h5>
        <button
          type='button'
          className='btn btn-sm btn-icon explore-btn-dismiss '
          onClick={handleShow}
        >
          <KTIcon iconName='cross' className='fs-2' />
        </button>
      </div>
      <GoogleSearch
        status={loading}
        dataSearch={dataSearch}
        handleClose={handleShow}
        mobile={true}
      />
    </div>
  )
}

export default MobileGoogleSearch
