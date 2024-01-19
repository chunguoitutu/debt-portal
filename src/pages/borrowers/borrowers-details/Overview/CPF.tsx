import {CustomerCPF} from '@/app/types/customer'
import clsx from 'clsx'
import {Fragment, useEffect, useState} from 'react'
import cpfImg from '@/app/images/cpf.svg'

import {CPF_CONFIG} from './config'
import {formatDate, formatMoney, parseJson} from '@/app/utils'
import NoRecord from '@/components/no-records'

const CPF = ({data}: any) => {
  const {cpf: cpfData} = data || {}

  const dataCPF = cpfData?.[0]

  const [showCpf, setShowCpf] = useState<any[]>([])

  const [dataParse, setDataParse] = useState<any>(null)

  useEffect(() => {
    const {amount, date, employer, month} = dataCPF
    if (!amount || !date || !employer || !month) return

    const dateParse = parseJson(date)
    const amountParse = parseJson(amount)
    const monthParse = parseJson(month)
    const employerParse = parseJson(employer)

    const newData = dateParse?.map((item, i) => {
      return {
        date: item,
        amount: amountParse[i],
        month: monthParse[i],
        employer: employerParse[i],
      }
    })

    setDataParse(newData)
  }, [dataCPF])

  function handleToggleViewCpf(id: number) {
    const isOpen = showCpf.includes(id)

    const newList = isOpen ? showCpf.filter((cpfId) => cpfId !== id) : [...showCpf, id]

    setShowCpf(newList)
  }

  return (
    <div className='d-flex flex-column gap-12px'>
      {dataParse?.length ? (
        dataParse?.map((cpf: CustomerCPF, i: number) => {
          const counter = formatDate(cpf.date, 'MMM DD, YYYY')
          const isActive = showCpf.includes(cpf.id)

          return (
            <div
              className={clsx([
                'd-flex flex-column gap-16px',
                i !== 0 && 'pt-12px border-0 border-top-1 border-dashed border-gray-300',
              ])}
              key={cpf.id}
            >
              {/* Header */}
              <div
                className='d-flex align-items-center justify-content-between gap-24px cursor-pointer'
                onClick={() => handleToggleViewCpf(cpf.id)}
                key={cpf.date}
              >
                <div className='d-flex align-items-center gap-4px' key={i}>
                  <img src={cpfImg} />
                  <span className='fs-16 fw-semibold'>{counter}</span>
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
                <div className='grid-2-column gap-12px' key={i + 1}>
                  {CPF_CONFIG?.map((el, i) => {
                    let value = cpf[el.key]

                    if (el?.key === 'date') {
                      value = formatDate(value, 'MMM DD, YYYY')
                    } else if (el?.key === 'amount') {
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
