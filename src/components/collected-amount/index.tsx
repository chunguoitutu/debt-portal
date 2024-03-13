import {FC, useEffect, useRef, useState} from 'react'
import ToDoList from '@/components/to-do-list'
import DebtTile from '@/components/debt-title'
import {Input} from '@/components/input'
import {useFormik} from 'formik'
import {getDaysOfCurrentDate} from '@/app/utils/get-current-date'
import {formatMoney} from '@/app/utils'
import moment from 'moment'
import {getCSSVariableValue} from '@/_metronic/assets/ts/_utils'
import numeral from 'numeral'

type Props = {
  chartSize?: number
  chartLine?: number
  chartRotate?: number
  className?: string
  amount_collected?: number
  amount_not_collected?: number
  must_collect_amount?: number
  home_visit?: number
  total_home_visit?: number
  task?: number
  title: 'collected' | 'uncollected' | 'visit' | 'commission'
}

const CollectedAmount: FC<Props> = ({
  chartSize = 82,
  chartLine = 13,
  chartRotate = 0,
  className,
  amount_collected,
  amount_not_collected,
  must_collect_amount,
  total_home_visit,
  home_visit,
  task,
  title,
}) => {
  const [valueCollected, setValueCollected] = useState<any>(null)
  const [valueNotCollected, setValueNotCollected] = useState<any>(null)
  const [valueHomeVisit, setValueHomeVisit] = useState<any>(null)

  const {values, handleChange} = useFormik({
    initialValues: {
      date: '',
    },
    // validationSchema:'',
    onSubmit: () => {},
  })

  const currentDate = new Date()

  let titleDebt = ''

  switch (title) {
    case 'collected':
      titleDebt = 'Total Amount Collected'
      break
    case 'uncollected':
      titleDebt = 'Total Amount Not Collected'
      break
    case 'visit':
      titleDebt = 'Total Home Visit'
      break
    case 'commission':
      titleDebt = 'Total Commission'
      break
    default:
      titleDebt = 'Unknown'
  }

  function formatMoneyNoIcon(value: number) {
    let newValue = +value || 0

    return numeral(newValue).format('0,0.00')
  }

  function handleChangePercent() {
    if (title === 'collected') {
      const percentColleted = +((amount_collected / must_collect_amount) * 100).toFixed(0)
      setValueCollected(percentColleted)
    } else if (title === 'uncollected') {
      const percentUnCollected = +((amount_not_collected / must_collect_amount) * 100).toFixed(0)
      setValueNotCollected(percentUnCollected)
    } else if (title === 'visit') {
      const percentVisit = +((home_visit / total_home_visit) * 100).toFixed(0)
      setValueHomeVisit(percentVisit)
    }
  }

  //==================================START HANDLE FOR CHART==================================//
  const chartRef = useRef<HTMLDivElement>(null)

  const initChart = function (
    chartSize: number = 82,
    chartLine: number = 13,
    chartRotate: number = 145
  ) {
    const el = chartRef.current
    if (!el) {
      return
    }
    el.innerHTML = ''

    var options = {
      size: chartSize,
      lineWidth: chartLine,
      rotate: chartRotate,
    }

    const canvas = document.createElement('canvas')
    const span = document.createElement('span')

    // @ts-ignore
    if (typeof G_vmlCanvasManager !== 'undefined') {
      // @ts-ignore
      G_vmlCanvasManager.initElement(canvas)
    }

    const ctx = canvas.getContext('2d')
    canvas.width = canvas.height = options.size

    el.appendChild(span)
    el.appendChild(canvas)

    // @ts-ignore
    ctx.translate(options.size / 2, options.size / 2) // change center
    // @ts-ignore
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI) // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
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

    // Init 2
    drawCircle('#E4E6EF', options.lineWidth, 100 / 100)
    if (title === 'collected') {
      drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, valueCollected / 100)
    } else if (title === 'visit') {
      drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, valueHomeVisit / 100)
    } else if (title === 'uncollected') {
      drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, valueNotCollected / 100)
    }
  }

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    setTimeout(() => {
      initChart(chartSize, chartLine, chartRotate)
    }, 10)
  }

  useEffect(() => {
    refreshChart()
    handleChangePercent()
  }, [chartRef, title, refreshChart])

  //==================================END HANDLE FOR CHART==================================//

  return (
    <div className='w-100 d-flex flex-column gap-24px mb-24px'>
      <div className='d-flex flex-row align-items-center justify-content-between'>
        <div className='fw-medium fs-16 text-gray-900'>{titleDebt}</div>
        <Input
          name={'date'}
          value={values.date}
          onChange={handleChange}
          type='date'
          max={getDaysOfCurrentDate()}
          style={{minWidth: '170px'}}
        />
      </div>
      <div className='d-flex flex-row align-items-center justify-content-between'>
        {title === 'collected' && (
          <div className='d-flex flex-column gap-4px'>
            <div className='d-flex flex-row fw-bold fs-24 text-gray-900 gap-8px'>
              {formatMoneyNoIcon(amount_collected)}
              <span
                className='fs-20 fw-semibold text-gray-600 align-self-center'
                style={{marginTop: '2px'}}
              >
                SGD
              </span>
            </div>
            <div className='fs-13 fw-normal text-gray-600 w-75'>
              The amount you must collect on {moment(currentDate).format('DD-MM-YYYY')} is{' '}
              <span className='text-primary fw-semibold'>
                {formatMoneyNoIcon(must_collect_amount)} SGD
                <span className='text-gray-600'>.</span>
              </span>
            </div>
          </div>
        )}

        {title === 'uncollected' && (
          <div className='d-flex flex-column gap-4px'>
            <div className='d-flex flex-row fw-bold fs-24 text-gray-900 gap-8px'>
              {formatMoneyNoIcon(amount_not_collected)}
              <span
                className='fs-20 fw-semibold text-gray-600 align-self-center'
                style={{marginTop: '2px'}}
              >
                SGD
              </span>
            </div>
            <div className='fs-13 fw-normal text-gray-600 w-75'>
              The amount you must collect on {moment(currentDate).format('DD-MM-YYYY')} is{' '}
              <span className='text-primary fw-semibold'>
                {formatMoneyNoIcon(must_collect_amount)} SGD
                <span className='text-gray-600'>.</span>
              </span>
            </div>
          </div>
        )}

        {title === 'visit' && (
          <div className='d-flex flex-column gap-4px'>
            <div className='d-flex flex-row fw-bold fs-24 text-gray-900 gap-8px'>
              {home_visit}
              <span
                className='fs-20 fw-semibold text-gray-600 align-self-center'
                style={{marginTop: '2px'}}
              >
                Home
              </span>
            </div>
            <div className='fs-13 fw-normal text-gray-600 w-75'>
              The number of houses you have to visit on {moment(currentDate).format('DD-MM-YYYY')}{' '}
              is{' '}
              <span className='text-primary fw-semibold'>
                {total_home_visit} Home<span className='text-gray-600'>.</span>
              </span>
            </div>
          </div>
        )}

        {title === 'commission' && (
          <div className='d-flex flex-column gap-4px'>
            <div className='d-flex flex-row fw-bold fs-24 text-gray-900 gap-8px'>
              {formatMoneyNoIcon(amount_collected)}
              <span
                className='fs-20 fw-semibold text-gray-600 align-self-center'
                style={{marginTop: '2px'}}
              >
                SGD
              </span>
            </div>
            <div className='fs-13 fw-normal text-gray-600 w-75'>
              You have received commissions from{' '}
              <span className='text-primary fw-semibold'>{task}</span> assigned tasks.
            </div>
          </div>
        )}

        {title !== 'commission' && (
          <div className='d-flex flex-center'>
            <div className='position-absolute fw-bold text-gray-900 mb-2 fs-16'>
              {title === 'collected' && valueCollected}
              {title === 'uncollected' && valueNotCollected}
              {title === 'visit' && valueHomeVisit}%
            </div>
            <div
              id='kt_card_widget_17_chart'
              ref={chartRef}
              style={{minWidth: chartSize + 'px', minHeight: chartSize + 'px'}}
              data-kt-size={chartSize}
              data-kt-line={chartLine}
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectedAmount
