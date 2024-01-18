import {CustomerCPF} from '@/app/types/customer'
import clsx from 'clsx'
import {Fragment, useEffect, useState} from 'react'
import carImg from '@/app/images/car.svg'

import {CPF_CONFIG} from './config'
import {formatDate, formatMoney} from '@/app/utils'
import NoRecord from '@/components/no-records'

type Props = {}

const CPF = ({data}: any) => {
  const {cpf: cpfData} = data || {}

  const [showCpf, setShowCpf] = useState<any[]>([])

  useEffect(() => {
    const idDefault = cpfData?.[0].id
    setShowCpf([idDefault])
  }, [cpfData])

  function handleToggleViewCpf(id: number) {
    const isOpen = showCpf.includes(id)

    const newList = isOpen ? showCpf.filter((cpfId) => cpfId !== id) : [...showCpf, id]

    setShowCpf(newList)
  }

  return (
    <div className='d-flex flex-column gap-12px'>
      {cpfData?.length ? (
        cpfData.map((vehicle: CustomerCPF, i: number) => {
          const counter = i + 1
          const isActive = showCpf.includes(vehicle.id)

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
                onClick={() => handleToggleViewCpf(vehicle.id)}
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
                  {CPF_CONFIG.map((el, i) => {
                    let value = vehicle[el.key]

                    if (el?.format === 'date') {
                      value = formatDate(value, 'MMM DD, YYYY')
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

export default CPF
