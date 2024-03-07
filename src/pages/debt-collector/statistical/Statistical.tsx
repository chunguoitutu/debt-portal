import {Swiper, SwiperSlide} from 'swiper/react'
import DebtTile from '@/components/debt-title'
import {Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './style.scss'
import CollectedAmount from '@/components/collected-amount'
import {Input} from '@/components/input'
import {useFormik} from 'formik'
import ListStatistical from '@/components/list-statistical'
import {getDaysOfCurrentDate} from '@/app/utils/get-current-date'

const dataCollector = {
  id: 1,
  amount_collected: 5000,
  amount_notcollected: 4000,
  home_visit: 10,
  commission: 2000,
  must_collect_amount: 7000,
  total_home_visit: 17,
  task: 50,
}

const Statistical = () => {
  const {values, handleChange} = useFormik({
    initialValues: {
      date: '',
    },
    // validationSchema:'',
    onSubmit: () => {},
  })

  const dataStatistical = [
    {
      id: 1,
      loan_no: 'L-A2024-123',
      customer_name: 'Ronaldo',
      total_outstanding: '5000',
      status: 2,
    },
    {
      id: 2,
      loan_no: 'L-A2024-123',
      customer_name: 'Alicia Ekia',
      total_outstanding: '5000',
      status: 2,
    },
    {
      id: 3,
      loan_no: 'L-A2024-123',
      customer_name: 'Mac Hong Quan',
      total_outstanding: '5000',
      status: 2,
    },
    {
      id: 4,
      loan_no: 'L-A2024-123',
      customer_name: 'Low G',
      total_outstanding: '5000',
      status: 2,
    },
  ]

  return (
    <>
      <DebtTile title='Statistical' />
      <div className='d-flex flex-column gap-12px overflow-auto'>
        <div className='card' style={{borderRadius: '0px'}}>
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className='mySwiper cursor-grab'
            style={{maxHeight: '220px'}}
          >
            <SwiperSlide className='p-12px pb-16px pt-16px'>
              <CollectedAmount
                title={'collected'}
                amount_collected={dataCollector.amount_collected}
                must_collect_amount={dataCollector.must_collect_amount}
              />
            </SwiperSlide>
            <SwiperSlide className='p-12px pb-16px pt-16px'>
              <CollectedAmount
                title={'uncollected'}
                amount_not_collected={dataCollector.amount_notcollected}
                must_collect_amount={dataCollector.must_collect_amount}
              />
            </SwiperSlide>
            <SwiperSlide className='p-12px pb-16px pt-16px'>
              <CollectedAmount
                title={'visit'}
                home_visit={dataCollector.home_visit}
                total_home_visit={dataCollector.total_home_visit}
              />
            </SwiperSlide>
            <SwiperSlide className='p-12px pb-16px pt-16px'>
              <CollectedAmount
                title={'commission'}
                task={dataCollector.task}
                amount_collected={dataCollector.amount_collected}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='card p-12px' style={{borderRadius: '0px'}}>
          <div className='d-flex flex-row align-items-center justify-content-between mb-16px'>
            <div className='d-flex flex-column'>
              <div className='fs-24 fw-bold text-primary'>32 Loan</div>
              <div className='fs-16 fw-medium text-gray-900'>Total Success Collection</div>
              <div className='fs-13 fw-normal text-gray-600 mt-4px'>
                Successful debt collection list on 24-02-2024
              </div>
            </div>
            <div className='align-self-start'>
              <Input
                name={'date'}
                value={values.date}
                onChange={handleChange}
                type='date'
                max={getDaysOfCurrentDate()}
                style={{minWidth: '170px'}}
              />
            </div>
          </div>
          <div>
            <ListStatistical data={dataStatistical} classShared='' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Statistical
