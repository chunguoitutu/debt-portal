import {KTIcon} from '@/_metronic/helpers'
import React, {useEffect, useState} from 'react'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import GoogleSearchPageCheck from '.'
import {useAuth} from '@/app/context/AuthContext'
import CasCheckSearch from './CaCheck'
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

const MobileCaCheck = ({
  handleShow,
  payload,
  status,
  Nric_no,
  setTools,
  tools,
  borrower_id,
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
          .post('/google-search/ca-page-check', {
            searchTerm: search,
            Nric_no,
            company_id,
          })
          .then((data) => {
            setDataSeacrch({
              screenshot: data?.data?.screenshot || '',
              url: data?.data?.url || '',
            })
            setTools({...tools, casCheck: data?.data?.screenshot || ''})
          })
          .catch((e) => {
            handleShow()
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
            name_check: 'casCheck',
            company_id,
            borrower_id,
          })
          .then((data) => {
            setDataSeacrch({
              screenshot: data?.data?.screenshot || '',
              url: data?.data?.url || '',
            })
            setTools({...tools, casCheck: data?.data?.screenshot || ''})
          })
          .catch((e) => {
            handleShow()
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
        screenshot: tools?.casCheck || '',
        url: '',
      })
      setLoading(false)
      setLoadApiCheck(false)
    }
  }, [loadApi])
  return (
    <div className='w-100'>
      <div
        className=' p-30px d-flex justify-content-between align-items-center'
        style={{
          borderBottom: '1px solid #F1F1F2',
          height: '98px',
        }}
      >
        <h5 className='font-bold fs-20 text-gray-900 m-0'> CAs Check</h5>
        <button
          type='button'
          className='btn btn-sm btn-icon explore-btn-dismiss '
          onClick={handleShow}
        >
          <KTIcon iconName='cross' className='fs-2' />
        </button>
      </div>
      <CasCheckSearch
        handleReGetApi={() => {
          setLoadApi(!loadApi)
        }}
        loadApiCheck={loadApiCheck}
        setSearch={setSearch}
        search={search}
        handleClose={handleShow}
        mobile={true}
        status={loading}
        dataSearch={dataSearch}
      />
    </div>
  )
}

export default MobileCaCheck
