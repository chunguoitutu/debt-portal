import {getCSSVariableValue} from '@/_metronic/assets/ts/_utils'
import ChartPortal from '@/app/images/chart-portal.svg'
import {formatMoney} from '@/app/utils'
import {FC, useEffect, useRef, useState} from 'react'

type Props = {
  chartSize?: number
  chartLine?: number
  chartRotate?: number
  className?: string
}

const Statistical: FC<Props> = ({chartSize = 160, chartLine = 25, chartRotate = 0, className}) => {
  //=================================MAIN LOGIC IN HERE=================================//

  const [isMobile, setIsMobile] = useState<boolean>(
    document.documentElement.clientWidth < 520 ? true : false
  )

  useEffect(() => {
    const handleResize = () => {
      const clientWidth = document.documentElement.clientWidth
      setIsMobile(clientWidth < 520)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      setIsMobile(true)
    }
  }, [document.documentElement.clientWidth < 520])

  console.log(isMobile)

  //==================================START HANDLE FOR CHART==================================//
  const chartRef = useRef<HTMLDivElement | null>(null)

  const initChart = function (
    chartSize: number = 160,
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
    <>
      {isMobile ? (
        <div className={`loan-amount-portal p-20px position-relative ${className}`}>
          <div className='loan-amount-title'>Statistical</div>

          <div className='text-gray-400 fs-14 mt-8px fw-normal pb-20px'>
            Payment amount & Balance at the end of period
          </div>

          <div className='pt-20px'>
            <div className='d-flex flex-wrap align-items-start justify-content-start hoho pt-xl-44px pt-xxl-0'>
              <div className='d-flex flex-center  w-100 pt-2 hjhj align-items-center justify-content-center'>
                <div className='position-absolute fw-bold text-gray-900' style={{fontSize: '20px'}}>
                  75%
                </div>
                <div
                  id='kt_card_widget_17_chart'
                  ref={chartRef}
                  style={{minWidth: chartSize + 'px', minHeight: chartSize + 'px'}}
                  data-kt-size={chartSize}
                  data-kt-line={chartLine}
                ></div>
              </div>
              <div className='d-flex flex-column ps-xl-24px ps-lg-0px flex-md-row gap-md-20px gap-sm-20px ps-md-30px ps-sm-20px mt-md-30px mt-lg-0 mt-xl-0 flex-xl-column flex-lg-column gap-xl-0 gap-lg-0 ps-sx-20px w-100'>
                <div className='mb-xl-20px mb-lg-8px col-12 w-100'>
                  <div className='row'>
                    <div className='text-gray-700 fw-normal fs-4 amount-loan-details-repsonsive-font col-6'>
                      Payment amount
                    </div>
                    <div className='text-gray-900 fs-2hx fw-bold fs-responsive-loan-chart-details col-6 text-end'>
                      {formatMoney(820)}
                    </div>
                  </div>
                </div>
                <div className='d-flex flex-row col-12 w-100'>
                  <div className='row flex-grow-1'>
                    <div className='text-gray-700 fw-normal fs-4 amount-loan-details-repsonsive-font col-6'>
                      Balance at the end of the period
                    </div>
                    <div className='text-primary fs-2hx fw-bold fs-responsive-loan-chart-details col-6 text-end text-balance'>
                      {formatMoney(26640)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`loan-amount-portal p-20px position-relative ${className}`}>
          <div className='loan-amount-title'>Statistical</div>

          <div className='text-gray-400 fs-14 mt-8px fw-normal pb-20px'>
            Payment amount & Balance at the end of period
          </div>

          <div className='pt-20px'>
            <div className='d-flex flex-wrap align-items-start justify-content-start hoho pt-xl-44px pt-xxl-0'>
              <div className='d-flex flex-center w-lg-100 w-xl-unset w-xs-100 pt-2 hjhj'>
                <div className='position-absolute fw-bold text-gray-900' style={{fontSize: '20px'}}>
                  75%
                </div>
                <div
                  id='kt_card_widget_17_chart'
                  ref={chartRef}
                  style={{minWidth: chartSize + 'px', minHeight: chartSize + 'px'}}
                  data-kt-size={chartSize}
                  data-kt-line={chartLine}
                ></div>
              </div>
              <div className='d-flex flex-column ps-xl-30px ps-lg-0px flex-md-row gap-md-20px gap-sm-20px ps-md-30px ps-sm-20px mt-md-30px mt-lg-0 mt-xl-0 flex-xl-column flex-lg-column gap-xl-0 gap-lg-0 ps-sx-20px'>
                <div className='mb-xl-20px mb-lg-8px'>
                  <div className='text-gray-900 fs-2hx fw-bold fs-responsive-loan-chart-details'>
                    {formatMoney(820)}
                  </div>
                  <div className='text-gray-700 fw-normal fs-4 amount-loan-details-repsonsive-font'>
                    Payment amount
                  </div>
                </div>
                <div>
                  <div className='text-primary fs-2hx fw-bold fs-responsive-loan-chart-details'>
                    {formatMoney(26640)}
                  </div>
                  <div className='text-gray-700 fw-normal fs-4 amount-loan-details-repsonsive-font text-truncate'>
                    Balance at the end of the period
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Statistical
