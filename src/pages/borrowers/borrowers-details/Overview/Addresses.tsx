import request from '@/app/axios'
import React, {useEffect, useState} from 'react'

const config = [
  {
    key: 'unit',
    value: 'Unit',
  },
  {
    key: 'block',
    value: 'Block',
  },
  {
    key: 'building',
    value: 'Building',
  },
  {
    key: 'street',
    value: 'Street',
  },
  {
    key: 'postal_code',
    value: 'Postal',
  },
  {
    key: 'country',
    value: 'Country',
  },
  {
    key: 'address_label',
    value: 'Address Label',
  },
]

type Props = {
  data: any
}

const Addresses = ({data}: Props) => {
  const [dataAddressType, setDataAddressType] = useState<any>([])

  useEffect(() => {
    request
      .post('/config/address_type/listing', {status: true, pageSize: 99999, currentPage: 1})
      .then((data) => {
        setDataAddressType(data?.data?.data)
      })
  }, [])

  const groupedData: any = (data?.addresses || []).reduce((acc, obj) => {
    if (!acc[obj.address_type_id]) {
      acc[obj.address_type_id] = []
    }
    acc[obj.address_type_id].push(obj)
    return acc
  }, {})
  const arrayData = Object.values(groupedData)

  return (
    <div>
      {(arrayData || [])?.map((array: any, index) => {
        return (
          <div key={index} className=''>
            {(array || [])?.map((d, idx) => {
              return (
                <div key={idx} className='d-flex flex-column gap-12px'>
                  <div>
                    {dataAddressType
                      .filter((dataAddr: any) => dataAddr?.id === d?.address_type_id)[0]
                      ?.address_type_name.toLowerCase()
                      ?.includes('home')
                      ? 'Home Addresses'
                      : dataAddressType.filter(
                          (dataAddr: any) => dataAddr?.id === d?.address_type_id
                        )[0]?.address_type_name}
                  </div>
                  {config.map((confg, i) => {
                    return (
                      <div key={i}>
                        <div className='d-flex  gap-16px'>
                          <p className='col-3 fs-14 fw-normal text-gray-700 p-0 m-0'>
                            {confg.value}
                          </p>
                          <p className='col-9 fs-14 fw-semibold text-gray-900 p-0 m-0'>
                            {d?.[confg.key] || false ? (
                              d?.[confg.key]
                            ) : (
                              <p className=' text-capitalize none-company-detail m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                                None
                              </p>
                            )}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Addresses
