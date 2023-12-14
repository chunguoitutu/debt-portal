import {KTIcon} from '@/_metronic/helpers'
import React, {useEffect, useState} from 'react'
import GoogleSearch from './GoogleSearch'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'

type Props = {
  handleShow: () => void
  payload: string
}

const MobileGoogleSearch = ({handleShow, payload}: Props) => {
  const [dataSearch, setDataSeacrch] = useState({
    url: '',
    screenshot: '',
  })
  useEffect(() => {
    request
      .get('/google-search/' + `${payload}`)
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
      <GoogleSearch dataSearch={dataSearch} handleClose={handleShow} mobile={true} />
    </div>
  )
}

export default MobileGoogleSearch
