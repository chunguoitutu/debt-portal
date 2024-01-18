import NoRecord from '@/components/no-records'
import carImg from '@/app/images/car.svg'
import {CustomerVehicle} from '@/app/types/customer'
import {useEffect, useState} from 'react'
import {VEHICLE_CONFIG} from './config'
import {formatDate, formatMoney} from '@/app/utils'
import clsx from 'clsx'

const Vehicles = ({data}: any) => {
  const {vehicle: vehicleListing} = data || {}

  const [viewVehicle, setViewVehicle] = useState<number[]>([])

  useEffect(() => {
    const idDefault = vehicleListing?.[0]?.id

    setViewVehicle([idDefault])
  }, [vehicleListing])

  function handleToggleViewVehicle(id: number) {
    const isOpen = viewVehicle.includes(id)

    const newList = isOpen
      ? viewVehicle.filter((vehicleId) => vehicleId !== id)
      : [...viewVehicle, id]

    setViewVehicle(newList)
  }

  return (
    <div className='d-flex flex-column gap-12px'>
      {vehicleListing?.length ? (
        vehicleListing.map((vehicle: CustomerVehicle, i: number) => {
          const counter = i + 1
          const isActive = viewVehicle.includes(vehicle.id)

          return (
            <div
              className={clsx([
                'd-flex flex-column gap-16px',
                i !== 0 && 'pt-12px border-0 border-top-1 border-dashed border-gray-300',
              ])}
              key={vehicle.id}
            >
              {/* Header */}
              <div
                className='d-flex align-items-center justify-content-between gap-24px cursor-pointer'
                onClick={() => handleToggleViewVehicle(vehicle.id)}
              >
                <div className='d-flex align-items-center gap-4px'>
                  <img src={carImg} />
                  <span className='fs-16 fw-semibold'>Vehicle {counter}</span>
                </div>

                {isActive ? (
                  <i className='ki-duotone ki-minus-square toggle-on text-primary fs-1'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                  </i>
                ) : (
                  <i className='ki-duotone ki-plus-square toggle-off fs-1'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                    <span className='path3'></span>
                  </i>
                )}
              </div>

              {/* Body */}
              {isActive && (
                <div className='grid-2-column gap-12px'>
                  {VEHICLE_CONFIG.map((el, i) => {
                    let value = vehicle[el.key]

                    if (el?.format === 'date') {
                      value = formatDate(value, 'MMM DD, YYYY')
                    } else if (el?.format === 'money') {
                      value = formatMoney(+value)
                    }

                    return (
                      <>
                        <span className='fs-14 text-gray-700 w-fit-content'>{el.label}</span>
                        <span className='fs-14 text-gray-900 fw-semibold'>{value}</span>
                      </>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })
      ) : (
        <NoRecord />
      )}
    </div>
  )
}

export default Vehicles
