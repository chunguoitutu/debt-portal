import request from '@/app/axios'
import Icons from '@/components/icons'
import NoRecord from '@/components/no-records'
import React, {useEffect, useState} from 'react'
import {CONFIG_ADDRESS, DataOverview} from './config'

const Addresses = ({data}: DataOverview) => {
  const [open, setOpen] = useState<any>({
    index1: 1,
    index2: 1,
  })

  const [dataAddressType, setDataAddressType] = useState<any>([])
  const [newData, setNewData] = useState([])

  useEffect(() => {
    request
      .post('/config/address_type/listing', {status: true, pageSize: 99999, currentPage: 1})
      .then((data) => {
        setDataAddressType(data?.data?.data)
      })
    const groupedData: any = (data?.addresses || []).reduce((acc, obj) => {
      if (!acc[obj.address_type_id]) {
        acc[obj.address_type_id] = []
      }
      acc[obj.address_type_id].push(obj)
      return acc
    }, {})

    const d = (Object.values(groupedData || []) || []).forEach((el: any, index) =>
      (el || []).forEach((e, idx) => {
        if (Number(e?.is_default || 0) === 1) {
          setOpen({
            index1: index + 1,
            index2: idx + 1,
          })
        }
      })
    )
    setNewData(Object.values(groupedData) || [])
  }, [])
  const capitalizeFirstLetter = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return (
    <div>
      {newData.length > 0
        ? (newData || [])?.map((array: any, index) => {
            return (
              <div key={index} className=''>
                {(array || [])?.map((d, idx) => {
                  return (
                    <div
                      style={{
                        borderBottom:
                          open?.index1 === index + 1 && open?.index2 === idx + 1
                            ? ''
                            : '1px dashed #DBDFE9',
                      }}
                      key={idx}
                      className='d-flex flex-column '
                    >
                      <div
                        onClick={() => {
                          if (open?.index1 === index + 1 && open?.index2 === idx + 1) {
                            setOpen({})
                          } else {
                            setOpen({
                              index1: index + 1,
                              index2: idx + 1,
                            })
                          }
                        }}
                        className='d-flex justify-content-between align-items-center  my-12px cursor-pointer'
                      >
                        <div className='d-flex justify-content-center align-items-center'>
                          <Icons name={'AddressCustomer'} />
                          <p className='ps-4px p-0 m-0 fs-16 fw-semibold text-gray-900'>
                            {dataAddressType
                              .filter((dataAddr: any) => dataAddr?.id === d?.address_type_id)[0]
                              ?.address_type_name.toLowerCase()
                              ?.includes('home')
                              ? 'Home'
                              : dataAddressType.filter(
                                  (dataAddr: any) => dataAddr?.id === d?.address_type_id
                                )[0]?.address_type_name}{' '}
                            {(array || []).length > 1 && idx + 1}
                          </p>
                          {Number(d?.is_default || 0) === 1 && (
                            <p className='default_overview_customer'>Default</p>
                          )}
                        </div>
                        <div className='cursor-pointer'>
                          {open?.index1 === index + 1 && open?.index2 === idx + 1 ? (
                            <Icons name={'MinusCustomer'} />
                          ) : (
                            <Icons name={'AddCustomer'} />
                          )}
                        </div>
                      </div>
                      {CONFIG_ADDRESS.map((confg, i) => {
                        return (
                          <div key={i}>
                            {open?.index1 === index + 1 && open.index2 === idx + 1 && (
                              <div
                                style={{
                                  marginLeft: '28px',
                                }}
                                className='d-flex  gap-16px  mb-12px'
                              >
                                <p className='col-3 fs-14 fw-normal text-gray-700 p-0 m-0'>
                                  {confg.value}
                                </p>
                                <p className='col-9 fs-14 fw-semibold text-gray-900 p-0 m-0'>
                                  {d?.[confg.key] || false ? (
                                    <span>
                                      {confg?.key === 'country'
                                        ? capitalizeFirstLetter(d?.[confg.key] || '')
                                        : d?.[confg.key]}
                                    </span>
                                  ) : (
                                    <span className=' text-capitalize none-company-detail m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                                      None
                                    </span>
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })
        : NoRecord()}
    </div>
  )
}

export default Addresses
