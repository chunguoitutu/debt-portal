import Icons from '@/components/icons'
import Button from '@/components/button/Button'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../style.scss'
import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {formatMoney} from '@/app/utils'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

const NextPayment = () => {
  const data = [
    {
      date: '14',
      month: 'Jan, 2024',
      instalment: '5000',
      instalment_balance: '5000',
    },
    {
      date: '14',
      month: 'Feb, 2024',
      instalment: '5100',
      instalment_balance: '5100',
    },
    {
      date: '14',
      month: 'Mar, 2024',
      instalment: '5200',
      instalment_balance: '5200',
    },
    {
      date: '14',
      month: 'Apr, 2024',
      total: '$820.00',
      instalment: '4500',
      instalment_balance: '4500',
    },
    {
      date: '14',
      month: 'May, 2024',
      total: '$820.00',
      instalment: '4500',
      instalment_balance: '4500',
    },
  ]

  const [selectedPayment, setSelectedPayment] = useState(null)
  const [active, setActive] = useState<any[]>([0])
  const [displayedData, setDisplayedData] = useState(data.slice(0, 4))
  const [slideShowRes, setSlideShowRes] = useState(
    (window.innerWidth || document.documentElement.clientWidth) > 1024
      ? 4
      : (window.innerWidth || document.documentElement.clientWidth) > 400
      ? 3
      : 2
  )

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth || document.documentElement.clientWidth
      setSlideShowRes(windowWidth > 1024 ? 4 : windowWidth > 400 ? 3 : 2)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setActive([0])
    setSelectedPayment(data[0])
  }, [])

  function handleToggleViewCpf(id: number) {
    const isSelected = active.includes(id)

    const newList = isSelected ? [] : [id]

    setActive(newList)
    setSelectedPayment(isSelected ? null : data[id])
  }

  const CustomNextArrow = () => (
    <div className='align-self-center cursor-pointer'>
      <FontAwesomeIcon icon={faChevronRight} color='#4b5675' className='p-8px' />
    </div>
  )

  const sliderSettings = {
    infinite: false,
    slidesToShow: slideShowRes,
    slidesToScroll: 1,
    className: 'd-flex flex-row pb-20px pb-xxl-40px pb-xl-24px pb-lg-40px pb-md-40px',
    nextArrow: <CustomNextArrow />,
  }

  return (
    <div className='bg-white dashboard-portal p-xxl-30px p-xl-30px p-lg-30px p-20px pt-20px main-height kj'>
      {/* header */}
      <div className='text-gray-900 fs-20 fw-bold pb-20px pb-xxl-44px pb-xl-44px pb-lg-42px pb-md-40px '>
        Next Closest Repayment Date
      </div>
      {/* body */}
      {/* calendar */}
      <Slider {...sliderSettings}>
        {data.map((payment, i) => (
          <div
            key={i}
            className={clsx([
              'd-flex flex-column gap-8px p-8px cursor-pointer',
              active.includes(i) ? 'calendar text-white' : 'calendar-no-active text-gray-700',
            ])}
            onClick={() => {
              handleToggleViewCpf(i)
              setSelectedPayment(payment)
            }}
          >
            <div className='calendar-text-head'>{payment.date}</div>
            <div className='text-center fs-14 fw-medium'>{payment.month}</div>
          </div>
        ))}
      </Slider>
      {/* calendar detail */}
      <div className='gap-16px'>
        <div className='d-flex flex-column mb-16px'>
          <div className='calendar-detail-date'>{selectedPayment && selectedPayment.date}</div>
          <div className='calendar-detail-my'>{selectedPayment && selectedPayment.month}</div>
        </div>
        <div className='col-12'>
          <div className='row'>
            <div className='col-6 d-flex flex-column'>
              <div className='loan-details d-flex flex-column justify-content-between flex-grow-1'>
                <div className='fs-16 fw-normal text-gray-500 text-two-line-customer text-three-line-customer'>
                  Instalment Total
                </div>
                <div className='fs-2 fw-medium text-gray-900'>
                  {selectedPayment && formatMoney(selectedPayment.instalment)}
                </div>
              </div>
            </div>
            <div className='col-6 d-flex flex-column'>
              <div className='loan-details d-flex flex-column justify-content-between flex-grow-1'>
                <div className='fs-16 fw-normal text-gray-500 '>Instalment Total Balance</div>
                <div className='fs-2 fw-medium text-gray-900'>
                  {selectedPayment && formatMoney(selectedPayment.instalment_balance)}
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-6 d-flex flex-column'>
              <div className='d-flex flex-column justify-content-between h-100'>
                <Button className='w-100 mt-16px btn btn-secondary '>View Loan Details</Button>
              </div>
            </div>
            <div className='col-6 d-flex flex-column'>
              <div className='d-flex flex-column justify-content-between h-100'>
                <Button className='w-100 mt-16px btn btn-primary btn-mobile-responsive-customer'>
                  Payment Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextPayment
