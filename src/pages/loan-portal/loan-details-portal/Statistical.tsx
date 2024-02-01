import {getCSSVariableValue} from '@/_metronic/assets/ts/_utils'
import ChartPortal from '@/app/images/chart-portal.svg'
import {formatMoney} from '@/app/utils'
import {FC, useEffect, useRef} from 'react'

type Props = {
  chartSize?: number
  chartLine?: number
  chartRotate?: number
}

const Statistical: FC<Props> = ({chartSize = 140, chartLine = 25, chartRotate = 0}) => {
  //=================================MAIN LOGIC IN HERE=================================//

  //==================================START HANDLE FOR CHART==================================//
  const chartRef = useRef<HTMLDivElement | null>(null)

  const initChart = function (
    chartSize: number = 120,
    chartLine: number = 18,
    chartRotate: number = 145
  ) {
    const el = document.getElementById('kt_card_widget_17_chart')
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
    drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, 75 / 100)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //==================================END HANDLE FOR CHART==================================//

  return (
    <div className={`loan-amount-portal mt-20px p-20px position-relative`}>
      <div className='loan-amount-title'>Next Payment Date</div>

      <div className='text-gray-500 fs-14 mt-16px fw-normal'>
        Payment aount & Balance at the end of period
      </div>

      <div className='pt-24px'>
        <div className='d-flex flex-wrap align-items-start justify-content-start'>
          <div className='d-flex flex-center pt-2'>
            <div
              id='kt_card_widget_17_chart'
              ref={chartRef}
              style={{minWidth: chartSize + 'px', minHeight: chartSize + 'px'}}
              data-kt-size={chartSize}
              data-kt-line={chartLine}
            ></div>
          </div>
          <div className='d-flex flex-column ps-24px'>
            <div className='mb-20px'>
              <div className='text-gray-900 fs-2hx fw-bold'>{formatMoney(820)}</div>
              <div className='text-gray-600 fw-normal fs-4'>Payment amount</div>
            </div>
            <div>
              <div className='text-primary fs-2hx fw-bold'>{formatMoney(26640)}</div>
              <div className='text-gray-600 fw-normal fs-4'>Balance at the end of the period</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistical
