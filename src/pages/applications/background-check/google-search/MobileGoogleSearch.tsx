import {KTIcon} from '@/_metronic/helpers'
import React, {useEffect, useState} from 'react'
import GoogleSearch from './GoogleSearch'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {useAuth} from '@/app/context/AuthContext'
import {useParams} from 'react-router-dom'

type Props = {
  handleShow: () => void
  payload: string
  status: boolean
  Nric_no: string
  tools: {googleSearchCheck: string; upPageCheck: string; casCheck: string}
  setTools: any
  borrower_id: number
}

const MobileGoogleSearch = ({
  handleShow,
  payload,
  status,
  Nric_no,
  setTools,
  tools,
  borrower_id,
}: Props) => {
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
            handleShow()
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
            handleShow()
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
