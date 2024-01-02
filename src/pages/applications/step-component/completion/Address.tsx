import request from '@/app/axios'
import {useEffect, useState} from 'react'
import HousingType from './HousingType'
import ShowYesNo from './ShowYesNo'
import CountryAddress from './CountryAddress'

type Props = {
  config?: any
  data?: any
}

const configHome = [
  [
    {
      key: 'property_type',
      value: 'Property Type',
    },
    {
      key: 'home_ownership',
      value: 'Home Ownership',
    },
    {
      key: 'block',
      value: 'Block',
    },
    {
      key: 'postal_code',
      value: 'Postal',
    },
  ],
  [
    {
      key: 'housing_type',
      value: 'Housing Type',
      Component: HousingType,
      keyFilter: 'value',
    },
    {
      key: 'staying_condition',
      value: 'Staying Condition',
    },
    {
      key: 'building',
      value: 'Building',
    },
    {
      key: 'country',
      value: 'Country',
      Component: CountryAddress,
    },
  ],
  [
    {
      key: 'existing_staying',
      Component: ShowYesNo,
      value: 'Existing Staying',
    },
    {
      key: 'unit',
      value: 'Unit',
    },
    {
      key: 'street',
      value: 'Street',
    },
    {
      key: 'address_label',
      value: 'Address Label',
    },
  ],
]

const configOffice = [
  [
    {
      key: 'is_default',
      Component: ShowYesNo,
      value: 'Default work site',
    },
    {
      key: 'block',
      value: 'Block',
    },
    {
      key: 'street',
      value: 'Street',
    },
    {
      key: 'country',
      value: 'Country',
      Component: CountryAddress,
    },
  ],
  [
    {
      key: 'unit',
      value: 'Unit',
    },
    {
      key: 'building',
      value: 'Building',
    },
    {
      key: 'postal_code',
      value: 'Postal',
    },
    {
      key: 'address_label',
      value: 'Address Label',
    },
  ],
]

const Address = ({data}: Props) => {
  const [dataAddressType, setDataAddressType] = useState<any>([])

  useEffect(() => {
    request
      .post('/config/address_type/listing', {status: true, pageSize: 99999, currentPage: 1})
      .then((data) => {
        setDataAddressType(data?.data?.data)
      })
  }, [])

  const groupedData: any = data?.address_contact_info.reduce((acc, obj) => {
    if (!acc[obj.address_type_id]) {
      acc[obj.address_type_id] = []
    }
    acc[obj.address_type_id].push(obj)
    return acc
  }, {})
  const arrayData = Object.values(groupedData)

  return (
    <>
      {arrayData.map((addresses: any, i: number) => (
        <div key={i} className='w-100 p-0' style={{border: '1px solid #D4D4D4'}}>
          <h1
            className='pt-8px pb-8px ps-24px pe-24px   fw-semibold m-0 fs-14 text-gray-700'
            style={{
              background: '#D4D4D4',
            }}
          >
            {dataAddressType
              .filter((dataAddr: any) => dataAddr?.id === addresses[0]?.address_type_id)[0]
              ?.address_type_name.toLowerCase()
              ?.includes('home')
              ? 'Home Addresses'
              : dataAddressType.filter(
                  (dataAddr: any) => dataAddr?.id === addresses[0]?.address_type_id
                )[0]?.address_type_name}
          </h1>
          <div className='d-flex flex-column w-100'>
            {addresses.map((e: any, indx: number) => (
              <div
                key={indx}
                className='p-24px d-flex flex-column gap-16px'
                style={{
                  borderBottom:
                    i < data?.address_contact_info.length - 1 ? '1px solid #D4D4D4' : '',
                }}
              >
                {(dataAddressType
                  .filter((dataAddr: any) => dataAddr?.id === e?.address_type_id)[0]
                  ?.address_type_name.toLowerCase()
                  ?.includes('home')
                  ? configHome
                  : configOffice
                )?.map((children_config: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className='d-flex w-100 justify-content-between align-items-start '
                    >
                      {children_config?.map((element_config: any) => {
                        const {Component} = element_config
                        return (
                          <div key={element_config.key} className='w-100'>
                            <div
                              className='d-flex flex-column'
                              style={{
                                justifyContent: !!element_config.img ? 'center' : 'start',
                                alignItems: !!element_config.img ? 'center' : 'start',
                              }}
                            >
                              <h2 className='p-0 m-0 text-capitalize fw-semibold fs-12 text-B5B5C3'>
                                {element_config.value}
                              </h2>
                              {!!Component ? (
                                <Component
                                  dataChildren={e}
                                  data={data}
                                  config={element_config}
                                  keyData={e[element_config.key]}
                                />
                              ) : (
                                <p
                                  className='fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px text-gray-900 fs-14'
                                  style={{
                                    textAlign: !!element_config.img ? 'center' : 'start',
                                  }}
                                >
                                  {e[element_config.key]}
                                </p>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default Address
