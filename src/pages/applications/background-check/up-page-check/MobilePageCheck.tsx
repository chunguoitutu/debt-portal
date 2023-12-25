import {KTIcon} from '@/_metronic/helpers'
import React, {useEffect, useState} from 'react'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import GoogleSearchPageCheck from '.'

type Props = {
  handleShow: () => void
  payload: string
}

const MobilePageCheck = ({handleShow, payload}: Props) => {
  const [search, setSearch] = useState(payload || '')
  const [loadApi, setLoadApi] = useState(false)
  const [loadApiCheck, setLoadApiCheck] = useState(false)
  const [dataSearch, setDataSeacrch] = useState({
    url: '',
    screenshot: '',
  })

  useEffect(() => {
    setLoadApiCheck(true)
    request
      .post('/google-search/up-page-check', {
        searchTerm: search,
      })
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
      .finally(() => {
        setLoadApiCheck(false)
      })
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
        <h5 className='font-bold fs-20 text-gray-900 m-0'> UN Page Check</h5>
        <button
          type='button'
          className='btn btn-sm btn-icon explore-btn-dismiss '
          onClick={handleShow}
        >
          <KTIcon iconName='cross' className='fs-2' />
        </button>
      </div>
      <GoogleSearchPageCheck
        handleReGetApi={() => {
          setLoadApi(!loadApi)
        }}
        loadApiCheck={loadApiCheck}
        setSearch={setSearch}
        search={search}
        handleClose={handleShow}
        mobile={true}
        dataSearch={dataSearch}
      />
    </div>
  )
}

export default MobilePageCheck
