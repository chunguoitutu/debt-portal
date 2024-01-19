/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useRef, useState} from 'react'
import {KTIcon} from '../../../_metronic/helpers'
import {getCSSVariableValue} from '../../../_metronic/assets/ts/_utils'
import {useThemeMode} from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {BorrowerItem, OrderBy, ResponseBorrowerListing, SearchCriteria} from '@/app/types'
import request from '@/app/axios'
import {useAuth} from '@/app/context/AuthContext'
import {handleFormatFilter, isObject, parseJson} from '@/app/utils'
import {BORROWER_CONFIG_LISTING} from '../config/config-borrower-dashboard'

type Props = {
  className: string
  size?: number
  line?: number
  rotate?: number
}

const ChartCustomer: FC<Props> = ({className, size = 70, line = 11, rotate = 145}) => {
  const year = new Date().getFullYear()

  const sessionData = isObject(parseJson(sessionStorage.getItem('borrower-dashboard') || ''))
    ? parseJson(sessionStorage.getItem('borrower-dashboard') || '')
    : {}

  const {settings, rows} = BORROWER_CONFIG_LISTING || {}
  const {showAction = true, showEditButton} = settings || {}
  const [loadApi, setLoadApi] = React.useState<boolean>(true)

  const [data, setData] = React.useState<BorrowerItem[]>([])
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [dataFilter, setDataFilter] = React.useState<{[key: string]: any}>(
    isObject(sessionData?.dataFilter) ? sessionData?.dataFilter : {}
  )

  const [orderBy, setOrderBy] = useState<OrderBy>(sessionData?.orderBy || 'desc')
  const [keySort, setKeySort] = useState<string>(sessionData?.keySort || 'id')
  const [searchValue, setSearchValue] = useState<string>(sessionData?.searchValue || '')

  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    pageSize: sessionData?.pageSize || 5,
    currentPage: sessionData?.currentPage || 1,
    total: 0,
  })

  const {pageSize, currentPage} = searchCriteria
  const {company_id} = useAuth()
  const chartRef = useRef<HTMLDivElement | null>(null)

  function handleSaveSearchToSession() {
    const data = {
      searchValue,
      dataFilter,
      pageSize,
      currentPage,
    }

    sessionStorage.setItem('borrower', JSON.stringify(data))
  }

  useEffect(() => {
    if (!+company_id) return

    const newDataFilter = handleConvertDataFilter(dataFilter)

    const timer = setTimeout(() => {
      onFetchDataList({
        ...searchCriteria,
        filters: newDataFilter,
      })
    }, 300)

    return () => {
      clearTimeout(timer)
      handleSaveSearchToSession()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_id, keySort, orderBy, pageSize, currentPage, loadApi])

  function handleConvertDataFilter(dataFilter: {[key: string]: any}) {
    return handleFormatFilter({
      dataFilter: {
        ...dataFilter,
        searchBar: searchValue,
      },
      keyDate: ['date_of_birth'],
      keyNumber: ['loan_type_id', 'id', 'loan_terms'],
    })
  }

  async function onFetchDataList(
    body?: Omit<SearchCriteria<Partial<ResponseBorrowerListing>>, 'total'>
  ) {
    setLoading(true)
    try {
      const {data: response} = await request.post(settings.endPointGetListing, {
        ...body,
        company_id: +company_id,
        keySort: keySort,
        orderBy: orderBy,
      })
      Array.isArray(response.data) && setData(response.data)
      response?.searchCriteria && setSearchCriteria(response?.searchCriteria)
    } catch (error) {
      // no thing
    } finally {
      setLoading(false)
    }
  }

  const initChart = function (size: number = 120, line: number = 18, rotate: number = 145) {
    const el = chartRef.current
    if (!el) {
      return
    }
    el.innerHTML = ''

    const options = {
      size: size,
      lineWidth: 12,
      rotate: rotate,
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.height = options.size

    el.appendChild(canvas)

    ctx?.translate(options.size / 2, options.size / 2)
    ctx?.rotate((-1 / 2 + options.rotate / 180) * Math.PI)

    const radius = (options.size - options.lineWidth) / 2

    const drawCircle = function (color: string, lineWidth: number, percent: number) {
      percent = Math.min(Math.max(0, percent || 1), 1)
      if (!ctx) {
        return
      }

      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false)
      ctx.strokeStyle = color
      ctx.lineCap = 'round' // butt, round or square
      ctx.lineWidth = lineWidth
      ctx.stroke()
    }

    // Adjust percentages so that they add up to 100%
    drawCircle('#E4E6EF', options.lineWidth, 100 / 100)
    drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, 100 / 125)
    drawCircle(getCSSVariableValue('--bs-warning'), options.lineWidth, 100 / 175)
    drawCircle(getCSSVariableValue('--bs-success'), options.lineWidth, 100 / 350)
  }

  useEffect(() => {
    initChart(size, line, rotate)
  }, [size, line, rotate])

  return (
    <div className={`card card-flush ${className}`}>
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <div className='d-flex align-items-center'>
            <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{`${searchCriteria.total}`}</span>

            <span className='badge badge-light-success fs-base'>
              <KTIcon iconName='arrow-up' className='fs-5 text-success ms-n1' /> 20%
            </span>
          </div>
          <span className='text-gray-500 pt-1 fw-semibold fs-6'>{`Total customer in the ${year}`}</span>
        </div>
      </div>

      <div className='card-body pt-2 pb-4 d-flex flex-wrap align-items-center'>
        <div className='d-flex flex-center me-5 pt-2'>
          <div
            id='kt_card_widget_17_chart'
            ref={chartRef}
            style={{minWidth: size + 'px', minHeight: size + 'px'}}
            data-kt-size={size}
            data-kt-line={line}
          ></div>
        </div>

        <div className='d-flex flex-column content-justify-center flex-row-fluid'>
          <div className='d-flex fw-semibold align-items-center'>
            <div className='bullet w-8px h-3px rounded-2 bg-success me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Customers Who Have Fully Paid Off</div>
            <div className=' fw-bolder text-gray-700 text-xxl-end'>3</div>
          </div>
          <div className='d-flex fw-semibold align-items-center my-3'>
            <div className='bullet w-8px h-3px rounded-2 bg-warning me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Customer With Remaining Balance</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>3</div>
          </div>
          <div className='d-flex fw-semibold align-items-center mb-2'>
            <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>New Customer</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>2</div>
          </div>
          <div className='d-flex fw-semibold align-items-center my-3 mt-1'>
            <div className='bullet w-8px h-3px rounded-2 bg-gray-400 me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Old Customer</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>1</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ChartCustomer}
