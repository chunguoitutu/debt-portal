import NoRecord from '@/components/no-records'
import carImg from '@/app/images/car.svg'
import {CustomerVehicle} from '@/app/types/customer'
import {Fragment, useEffect, useState} from 'react'
import {DataOverview, VEHICLE_CONFIG} from './config'
import {formatDate, formatMoney} from '@/app/utils'
import clsx from 'clsx'
import Icons from '@/components/icons'

const Vehicles = ({data}: DataOverview) => {
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

                {isActive ? <Icons name={'MinusCustomer'} /> : <Icons name={'AddCustomer'} />}
              </div>

              {/* Body */}
              {isActive && (
                <div
                  style={{
                    paddingLeft: '28px',
                  }}
                  className='grid-2-column gap-12px'
                >
                  {VEHICLE_CONFIG.map((el, i) => {
                    let value = vehicle[el.key]

                    if (el?.format === 'date') {
                      value = formatDate(value, 'DD MMM, YYYY')
                    } else if (el?.format === 'money') {
                      value = formatMoney(+value)
                    }

                    return (
                      <Fragment key={i}>
                        <span className='fs-14 text-gray-700 w-fit-content'>{el.label}</span>
                        <span className='fs-14 text-gray-900 fw-semibold'>{value}</span>
                      </Fragment>
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
